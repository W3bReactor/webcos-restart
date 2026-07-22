"use client";

import Img from "next/image";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {CopyIcon, UploadIcon2} from "@/shared/assets";
import {Modal} from "@/shared/ui";
import {PickupColorSettings} from "@/widgets/PickupColor/ui/PickupColorSettings/PickupColorSettings";
import styles from "./PickupColorWindow.module.css";

type ColorFormat = "HEX" | "RGBA";

export interface PickedColor {
    hex: string;
    rgba: [string, string, string, string];
    type: ColorFormat;
}

interface Point {
    x: number;
    y: number;
}

const BASE_WIDTH = 860;
const BASE_HEIGHT = 615;
const FIT_PADDING = 56;
const GRID_STEP = 32;
const MAGNIFIER_PIXELS = 11;
const MAGNIFIER_SIZE = 132;
const MIN_SCALE = 0.05;
const MAX_SCALE = 32;

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const toHex = (r: number, g: number, b: number) =>
    `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;

const formatColor = (color: PickedColor) =>
    color.type === "HEX" ? color.hex : `rgba(${color.rgba.join(", ")})`;

export const PickupColorWindow = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const magnifierRef = useRef<HTMLCanvasElement | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const sourceCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationRef = useRef<number | null>(null);
    const colorTypeRef = useRef<ColorFormat>("HEX");

    const viewportRef = useRef({width: BASE_WIDTH, height: BASE_HEIGHT});
    const viewRef = useRef({x: 0, y: 0, scale: 1});
    const activePointersRef = useRef(new Map<number, Point>());
    const draggingRef = useRef(false);
    const movedRef = useRef(false);
    const lastPointRef = useRef<Point>({x: 0, y: 0});
    const pinchRef = useRef<{
        distance: number;
        scale: number;
        anchor: Point;
    } | null>(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursor, setCursor] = useState({x: 0, y: 0});
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [recentColors, setRecentColors] = useState<PickedColor[]>([]);
    const [dataColor, setDataColor] = useState<PickedColor>({
        hex: "#ffffff",
        rgba: ["255", "255", "255", "1"],
        type: "HEX",
    });

    useEffect(() => {
        colorTypeRef.current = dataColor.type;
    }, [dataColor.type]);

    const requestDraw = useCallback(() => {
        if (animationRef.current) return;

        animationRef.current = requestAnimationFrame(() => {
            const canvas = canvasRef.current;
            const ctx = ctxRef.current;
            const img = imageRef.current;
            const {width, height} = viewportRef.current;
            const {x, y, scale} = viewRef.current;
            const dpr = window.devicePixelRatio || 1;

            if (!canvas || !ctx) return;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            ctx.save();
            ctx.lineWidth = 1;

            let step = GRID_STEP * scale;
            while (step < 18) step *= 2;
            while (step > 72) step /= 2;

            const startX = ((x % step) + step) % step;
            const startY = ((y % step) + step) % step;

            ctx.strokeStyle = "rgba(255,255,255,0.055)";
            for (let gridX = startX; gridX <= width; gridX += step) {
                ctx.beginPath();
                ctx.moveTo(gridX, 0);
                ctx.lineTo(gridX, height);
                ctx.stroke();
            }

            for (let gridY = startY; gridY <= height; gridY += step) {
                ctx.beginPath();
                ctx.moveTo(0, gridY);
                ctx.lineTo(width, gridY);
                ctx.stroke();
            }
            ctx.restore();

            if (img) {
                ctx.save();
                ctx.imageSmoothingEnabled = scale < 6;
                ctx.shadowColor = "rgba(0,0,0,0.24)";
                ctx.shadowBlur = 24;
                ctx.shadowOffsetY = 10;
                ctx.drawImage(
                    img,
                    x,
                    y,
                    img.naturalWidth * scale,
                    img.naturalHeight * scale
                );
                ctx.restore();
            }

            animationRef.current = null;
        });
    }, []);

    const setCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const previous = viewportRef.current;
        const dpr = window.devicePixelRatio || 1;

        viewportRef.current = {width, height};
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        viewRef.current.x += (width - previous.width) / 2;
        viewRef.current.y += (height - previous.height) / 2;
        requestDraw();
    }, [requestDraw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        ctxRef.current = canvas.getContext("2d");
        setCanvasSize();

        const resizeObserver = new ResizeObserver(setCanvasSize);
        resizeObserver.observe(canvas);

        return () => {
            resizeObserver.disconnect();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [setCanvasSize]);

    const getCanvasPoint = useCallback((clientX: number, clientY: number): Point => {
        const canvas = canvasRef.current;
        if (!canvas) return {x: 0, y: 0};

        const rect = canvas.getBoundingClientRect();
        const {width, height} = viewportRef.current;

        if (!rect.width || !rect.height) return {x: 0, y: 0};

        return {
            x: ((clientX - rect.left) / rect.width) * width,
            y: ((clientY - rect.top) / rect.height) * height,
        };
    }, []);

    const canvasToImage = (point: Point): Point => ({
        x: (point.x - viewRef.current.x) / viewRef.current.scale,
        y: (point.y - viewRef.current.y) / viewRef.current.scale,
    });

    const isImagePointInside = (point: Point) => {
        const img = imageRef.current;
        if (!img) return false;

        return (
            point.x >= 0 &&
            point.y >= 0 &&
            point.x < img.naturalWidth &&
            point.y < img.naturalHeight
        );
    };

    const resetView = useCallback((image = imageRef.current) => {
        const {width, height} = viewportRef.current;

        if (!image || width <= 1 || height <= 1) return;

        const fitScale = Math.min(
            (width - FIT_PADDING) / image.naturalWidth,
            (height - FIT_PADDING) / image.naturalHeight
        );
        const nextScale = clamp(fitScale, MIN_SCALE, 4);

        viewRef.current = {
            x: (width - image.naturalWidth * nextScale) / 2,
            y: (height - image.naturalHeight * nextScale) / 2,
            scale: nextScale,
        };

        setZoom(nextScale);
        requestDraw();
    }, [requestDraw]);

    const setScaleAtPoint = useCallback((point: Point, nextScale: number) => {
        const view = viewRef.current;
        const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
        const imagePoint = {
            x: (point.x - view.x) / view.scale,
            y: (point.y - view.y) / view.scale,
        };

        viewRef.current = {
            x: point.x - imagePoint.x * clampedScale,
            y: point.y - imagePoint.y * clampedScale,
            scale: clampedScale,
        };

        setZoom(clampedScale);
        requestDraw();
    }, [requestDraw]);

    const zoomFromCenter = (factor: number) => {
        const {width, height} = viewportRef.current;
        setScaleAtPoint({x: width / 2, y: height / 2}, viewRef.current.scale * factor);
    };

    const loadImage = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) return;

        const url = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(url);

            const sourceCanvas = document.createElement("canvas");
            const sourceCtx = sourceCanvas.getContext("2d", {willReadFrequently: true});

            if (!sourceCtx) return;

            sourceCanvas.width = img.naturalWidth;
            sourceCanvas.height = img.naturalHeight;
            sourceCtx.drawImage(img, 0, 0);

            imageRef.current = img;
            sourceCanvasRef.current = sourceCanvas;
            sourceCtxRef.current = sourceCtx;
            activePointersRef.current.clear();
            pinchRef.current = null;
            draggingRef.current = false;
            movedRef.current = false;

            setImageLoaded(true);
            setShowMagnifier(false);
            setRecentColors([]);
            resetView(img);
        };

        img.src = url;
    }, [resetView]);

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const pastedFile = Array.from(e.clipboardData?.items ?? [])
                .find((item) => item.type.startsWith("image/"))
                ?.getAsFile();

            if (pastedFile) {
                loadImage(pastedFile);
            }
        };

        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, [loadImage]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingFile(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsDraggingFile(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingFile(false);

        const file = e.dataTransfer.files?.[0];
        if (file) loadImage(file);
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        loadImage(file);
        e.target.value = "";
    };

    const drawMagnifier = (canvasPoint: Point) => {
        const sourceCanvas = sourceCanvasRef.current;
        const img = imageRef.current;
        const magCanvas = magnifierRef.current;

        if (!sourceCanvas || !img || !magCanvas) return;

        const imagePoint = canvasToImage(canvasPoint);
        if (!isImagePointInside(imagePoint)) {
            setShowMagnifier(false);
            return;
        }

        const magCtx = magCanvas.getContext("2d");
        if (!magCtx) return;

        const dpr = window.devicePixelRatio || 1;
        const sample = MAGNIFIER_PIXELS;
        const half = Math.floor(sample / 2);
        const sourceX = clamp(Math.round(imagePoint.x) - half, 0, Math.max(0, img.naturalWidth - sample));
        const sourceY = clamp(Math.round(imagePoint.y) - half, 0, Math.max(0, img.naturalHeight - sample));

        magCanvas.width = MAGNIFIER_SIZE * dpr;
        magCanvas.height = MAGNIFIER_SIZE * dpr;
        magCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        magCtx.clearRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);

        magCtx.fillStyle = "#111827";
        magCtx.fillRect(0, 0, MAGNIFIER_SIZE, MAGNIFIER_SIZE);
        magCtx.imageSmoothingEnabled = false;
        magCtx.drawImage(
            sourceCanvas,
            sourceX,
            sourceY,
            sample,
            sample,
            0,
            0,
            MAGNIFIER_SIZE,
            MAGNIFIER_SIZE
        );

        const cell = MAGNIFIER_SIZE / sample;

        magCtx.strokeStyle = "rgba(255,255,255,0.28)";
        magCtx.lineWidth = 1;
        for (let i = 0; i <= sample; i += 1) {
            const offset = Math.round(i * cell) + 0.5;
            magCtx.beginPath();
            magCtx.moveTo(offset, 0);
            magCtx.lineTo(offset, MAGNIFIER_SIZE);
            magCtx.stroke();

            magCtx.beginPath();
            magCtx.moveTo(0, offset);
            magCtx.lineTo(MAGNIFIER_SIZE, offset);
            magCtx.stroke();
        }

        const center = half * cell;
        magCtx.strokeStyle = "#ffffff";
        magCtx.lineWidth = 2;
        magCtx.strokeRect(center + 1, center + 1, cell - 2, cell - 2);
    };

    const pickColor = (canvasPoint: Point) => {
        const sourceCtx = sourceCtxRef.current;
        if (!sourceCtx) return;

        const imagePoint = canvasToImage(canvasPoint);
        if (!isImagePointInside(imagePoint)) return;

        const pixel = sourceCtx.getImageData(
            Math.floor(imagePoint.x),
            Math.floor(imagePoint.y),
            1,
            1
        ).data;

        const nextColor: PickedColor = {
            hex: toHex(pixel[0], pixel[1], pixel[2]),
            rgba: [
                String(pixel[0]),
                String(pixel[1]),
                String(pixel[2]),
                Number(pixel[3] / 255).toFixed(2),
            ],
            type: colorTypeRef.current,
        };

        setDataColor(nextColor);
        setRecentColors((colors) => [
            nextColor,
            ...colors.filter((color) => color.hex !== nextColor.hex || color.rgba[3] !== nextColor.rgba[3]),
        ].slice(0, 8));
    };

    const getPointerDistance = (pointers: Point[]) =>
        Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);

    const getPointerCenter = (pointers: Point[]): Point => ({
        x: (pointers[0].x + pointers[1].x) / 2,
        y: (pointers[0].y + pointers[1].y) / 2,
    });

    const startPinch = () => {
        const pointers = Array.from(activePointersRef.current.values());
        if (pointers.length < 2) return;

        const center = getPointerCenter(pointers);
        pinchRef.current = {
            distance: getPointerDistance(pointers),
            scale: viewRef.current.scale,
            anchor: canvasToImage(center),
        };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!imageLoaded) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        activePointersRef.current.set(e.pointerId, getCanvasPoint(e.clientX, e.clientY));
        setShowMagnifier(false);

        if (activePointersRef.current.size >= 2) {
            movedRef.current = true;
            draggingRef.current = false;
            startPinch();
            return;
        }

        draggingRef.current = true;
        movedRef.current = false;
        lastPointRef.current = {x: e.clientX, y: e.clientY};
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvasPoint = getCanvasPoint(e.clientX, e.clientY);
        setCursor({x: e.clientX, y: e.clientY});

        if (!imageLoaded) return;

        if (activePointersRef.current.has(e.pointerId)) {
            activePointersRef.current.set(e.pointerId, canvasPoint);
        }

        const pointers = Array.from(activePointersRef.current.values());

        if (pointers.length >= 2 && pinchRef.current) {
            const center = getPointerCenter(pointers);
            const distance = getPointerDistance(pointers);
            const nextScale = clamp(
                pinchRef.current.scale * (distance / pinchRef.current.distance),
                MIN_SCALE,
                MAX_SCALE
            );

            viewRef.current = {
                x: center.x - pinchRef.current.anchor.x * nextScale,
                y: center.y - pinchRef.current.anchor.y * nextScale,
                scale: nextScale,
            };

            setZoom(nextScale);
            requestDraw();
            return;
        }

        if (draggingRef.current) {
            const dx = e.clientX - lastPointRef.current.x;
            const dy = e.clientY - lastPointRef.current.y;

            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                movedRef.current = true;
                viewRef.current.x += dx;
                viewRef.current.y += dy;
                lastPointRef.current = {x: e.clientX, y: e.clientY};
                requestDraw();
            }

            return;
        }

        if (e.pointerType === "mouse" || e.pointerType === "pen") {
            const imagePoint = canvasToImage(canvasPoint);
            const inside = isImagePointInside(imagePoint);
            setShowMagnifier(inside);
            if (inside) drawMagnifier(canvasPoint);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvasPoint = getCanvasPoint(e.clientX, e.clientY);

        activePointersRef.current.delete(e.pointerId);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }

        if (pinchRef.current) {
            pinchRef.current = null;
            draggingRef.current = false;
            movedRef.current = true;
            return;
        }

        draggingRef.current = false;

        if (!movedRef.current) {
            pickColor(canvasPoint);
        }
    };

    const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
        activePointersRef.current.delete(e.pointerId);
        draggingRef.current = false;
        pinchRef.current = null;
        setShowMagnifier(false);
    };

    const handlePointerLeave = () => {
        if (!draggingRef.current && !pinchRef.current) {
            setShowMagnifier(false);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleNativeWheel = (e: WheelEvent) => {
            if (!imageLoaded) return;

            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.88 : 1.12;
            setScaleAtPoint(
                getCanvasPoint(e.clientX, e.clientY),
                viewRef.current.scale * delta
            );
        };

        canvas.addEventListener("wheel", handleNativeWheel, {passive: false});

        return () => canvas.removeEventListener("wheel", handleNativeWheel);
    }, [getCanvasPoint, imageLoaded, setScaleAtPoint]);

    const onCopy = async (color = dataColor) => {
        const value = formatColor(color);

        try {
            await navigator.clipboard.writeText(value);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = value;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.append(textarea);
            textarea.select();
            document.execCommand("copy");
            textarea.remove();
        }

        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
    };

    const onClose = () => setSettingsOpen(false);

    const zoomPercent = Math.round(zoom * 100);

    return (
        <div
            className={`${styles.pickupWindow} ${isDraggingFile ? styles.pickupWindowDragging : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Modal isOpen={settingsOpen} onClose={onClose}>
                <PickupColorSettings
                    onClose={onClose}
                    color={dataColor}
                    setColor={(color) => {
                        colorTypeRef.current = color.type;
                        setDataColor(color);
                    }}
                />
            </Modal>

            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
                onPointerLeave={handlePointerLeave}
                onContextMenu={(e) => e.preventDefault()}
            />

            {showMagnifier && imageLoaded && (
                <canvas
                    ref={magnifierRef}
                    className={styles.magnifier}
                    style={{
                        top: cursor.y + 18,
                        left: cursor.x + 18,
                    }}
                />
            )}

            <div className={styles.pickupTop}>
                <div className={styles.pickupColor}>
                    <button
                        className={styles.pickupCurrentColor}
                        style={{background: dataColor.hex}}
                        type="button"
                        onClick={() => setSettingsOpen(true)}
                        aria-label="Открыть настройки цвета"
                    />
                    <button
                        className={styles.pickupCopyColor}
                        onClick={() => onCopy()}
                        type="button"
                        aria-label={`Скопировать ${formatColor(dataColor)}`}
                    >
                        <Img src={CopyIcon} alt="" />
                        <span className={styles.pickupCopyText}>{formatColor(dataColor)}</span>
                    </button>
                </div>

                <div className={styles.pickupTopActions}>
                    <button
                        onClick={() => inputFileRef.current?.click()}
                        className={styles.pickupPillButton}
                        type="button"
                    >
                        Загрузить
                    </button>
                    <button
                        onClick={() => resetView()}
                        className={styles.pickupPillButton}
                        disabled={!imageLoaded}
                        type="button"
                    >
                        Сброс
                    </button>
                </div>
            </div>

            <div className={styles.zoomControls} aria-label="Управление масштабом">
                <button
                    className={styles.zoomButton}
                    onClick={() => zoomFromCenter(0.8)}
                    disabled={!imageLoaded}
                    type="button"
                    aria-label="Уменьшить масштаб"
                >
                    -
                </button>
                <span className={styles.zoomValue}>{zoomPercent}%</span>
                <button
                    className={styles.zoomButton}
                    onClick={() => zoomFromCenter(1.25)}
                    disabled={!imageLoaded}
                    type="button"
                    aria-label="Увеличить масштаб"
                >
                    +
                </button>
            </div>

            {recentColors.length > 0 && (
                <div className={styles.recentColors} aria-label="Недавно выбранные цвета">
                    {recentColors.map((color) => (
                        <button
                            key={`${color.hex}-${color.rgba.join("-")}`}
                            className={styles.recentColor}
                            style={{background: color.hex}}
                            onClick={() => {
                                const nextColor = {...color, type: colorTypeRef.current};
                                setDataColor(nextColor);
                                onCopy(nextColor);
                            }}
                            type="button"
                            aria-label={`Скопировать ${formatColor(color)}`}
                        />
                    ))}
                </div>
            )}

            {copied && <div className={styles.copyToast}>Скопировано</div>}

            {isDraggingFile && (
                <div className={styles.dropOverlay}>
                    Отпустите изображение
                </div>
            )}

            {!isDraggingFile && !imageLoaded && (
                <div className={styles.pickupUploadWrapper}>
                    <button
                        className={styles.pickupUploadBtn}
                        onClick={() => inputFileRef.current?.click()}
                        type="button"
                    >
                        <Img className={styles.pickupUploadIcon} src={UploadIcon2} alt="" />
                        <span className={styles.pickupUploadDesc}>Загрузить изображение</span>
                    </button>
                    <p className={styles.pickupUploadInfo}>
                        Кликните, перетащите файл сюда или вставьте скриншот в поле загрузки.
                    </p>
                </div>
            )}

            <div className={styles.helpBar}>
                <span>Клик - выбрать</span>
                <span>Перетаскивание - двигать</span>
                <span>Колесо или pinch - масштаб</span>
            </div>

            <input
                ref={inputFileRef}
                type="file"
                hidden
                onChange={onImageChange}
                accept="image/*"
            />
        </div>
    );
};
