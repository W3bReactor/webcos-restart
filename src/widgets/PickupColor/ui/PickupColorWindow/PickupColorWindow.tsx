"use client"
import styles from './PickupColorWindow.module.css'
import React, {useEffect, useRef, useState} from "react";
import Img from "next/image";
import {CopyIcon, UploadIcon2} from "@/shared/assets";
import {PickupColorSettings} from "@/widgets/PickupColor/ui/PickupColorSettings/PickupColorSettings";
import {Modal} from "@/shared/ui";

export const PickupColorWindow = () => {
    const [isDraggingFile, setIsDraggingFile] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingFile(true);
    };

    const handleDragLeave = () => {
        setIsDraggingFile(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingFile(false);

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith("image/")) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            imageRef.current = img;
            setImageLoaded(true);

            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;
            ctxRef.current = ctx;

            canvas.width = 860;
            canvas.height = 615;

            requestDraw();
        };
    };

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const magnifierRef = useRef<HTMLCanvasElement | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const imageRef = useRef<HTMLImageElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const panRef = useRef({ x: 0, y: 0 });
    const scaleRef = useRef(1);

    const draggingRef = useRef(false);
    const movedRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });

    const animationRef = useRef<number | null>(null);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [showMagnifier, setShowMagnifier] = useState(false);

    const [cursor, setCursor] = useState({ x: 0, y: 0 });

    const [dataColor, setDataColor] = useState({
        hex: "#FFFFFF",
        rgba: ["255", "255", "255", "1"],
        type: "HEX",
    });

    const [hover, setHover] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // ===== DRAW =====
    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const img = imageRef.current;

        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        for (let x = 0; x < canvas.width; x += 25) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += 25) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        if (!img) return;

        ctx.drawImage(
            img,
            panRef.current.x,
            panRef.current.y,
            img.width * scaleRef.current,
            img.height * scaleRef.current
        );
    };

    const requestDraw = () => {
        if (animationRef.current) return;
        animationRef.current = requestAnimationFrame(() => {
            draw();
            animationRef.current = null;
        });
    };

    // ===== MAGNIFIER =====
    const drawMagnifier = (x: number, y: number) => {
        const mainCtx = ctxRef.current;
        const magCanvas = magnifierRef.current;

        if (!mainCtx || !magCanvas) return;

        const magCtx = magCanvas.getContext("2d");
        if (!magCtx) return;

        const size = 80;

        const pixel = mainCtx.getImageData(x - 5, y - 5, 10, 10);

        magCanvas.width = size;
        magCanvas.height = size;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 10;
        tempCanvas.height = 10;

        const tempCtx = tempCanvas.getContext("2d")!;
        tempCtx.putImageData(pixel, 0, 0);

        magCtx.imageSmoothingEnabled = false;
        magCtx.drawImage(tempCanvas, 0, 0, 10, 10, 0, 0, size, size);

        magCtx.strokeStyle = "rgba(255,255,255,0.2)";
        for (let i = 0; i <= size; i += size / 10) {
            magCtx.beginPath();
            magCtx.moveTo(i, 0);
            magCtx.lineTo(i, size);
            magCtx.stroke();

            magCtx.beginPath();
            magCtx.moveTo(0, i);
            magCtx.lineTo(size, i);
            magCtx.stroke();
        }

        magCtx.strokeStyle = "#fff";
        magCtx.strokeRect(size / 2 - size / 20, size / 2 - size / 20, size / 10, size / 10);
    };

    // ===== IMAGE LOAD =====
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const img = new Image();
        img.src = URL.createObjectURL(e.target.files[0]);

        img.onload = () => {
            imageRef.current = img;
            setImageLoaded(true);

            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;
            ctxRef.current = ctx;

            canvas.width = 860;
            canvas.height = 615;

            requestDraw();
        };
    };

    // ===== COLOR =====
    const pickColor = (x: number, y: number) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        const pixel = ctx.getImageData(x, y, 1, 1).data;

        const r = pixel[0];
        const g = pixel[1];
        const b = pixel[2];
        const a = (pixel[3] / 255).toFixed(2);

        const hex =
            "#" +
            [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

        setDataColor({
            hex,
            rgba: [String(r), String(g), String(b), a],
            type: dataColor.type,
        });
    };

    // ===== EVENTS =====
    const handleMouseDown = (e: React.MouseEvent) => {
        draggingRef.current = true;
        movedRef.current = false;
        setShowMagnifier(false);
        lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCursor({ x: e.clientX, y: e.clientY });

        // FIX 1 — если нет изображения → не показываем лупу
        if (!imageLoaded) {
            setShowMagnifier(false);
            return;
        }

        // FIX 2 — если вышли за canvas → скрываем лупу
        const inside =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (!inside) {
            setShowMagnifier(false);
            return;
        }

        if (!draggingRef.current) {
            setShowMagnifier(true);
            drawMagnifier(x, y);
            return;
        }

        const dx = e.clientX - lastPosRef.current.x;
        const dy = e.clientY - lastPosRef.current.y;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            movedRef.current = true;
        }

        panRef.current.x += dx;
        panRef.current.y += dy;

        lastPosRef.current = { x: e.clientX, y: e.clientY };

        requestDraw();
    };

    const handleMouseLeave = () => {
        // FIX 3 — всегда скрываем лупу при выходе
        setShowMagnifier(false);
        draggingRef.current = false;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        draggingRef.current = false;

        if (!movedRef.current) {
            const rect = canvasRef.current!.getBoundingClientRect();
            pickColor(e.clientX - rect.left, e.clientY - rect.top);
        }
    };

    // ===== ZOOM =====
    const handleWheel = (e: React.WheelEvent) => {
        const isTrackpad = Math.abs(e.deltaY) < 30;
        const zoomSpeed = isTrackpad ? 0.005 : 0.0015;

        const scaleAmount = -e.deltaY * zoomSpeed;

        const newScale = Math.min(
            Math.max(0.2, scaleRef.current + scaleAmount),
            5
        );

        const rect = canvasRef.current!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const scaleRatio = newScale / scaleRef.current;

        panRef.current.x = mouseX - (mouseX - panRef.current.x) * scaleRatio;
        panRef.current.y = mouseY - (mouseY - panRef.current.y) * scaleRatio;

        scaleRef.current = newScale;

        requestDraw();
    };

    const onCopy = async () => {
        const value =
            dataColor.type === "HEX"
                ? dataColor.hex
                : `rgba(${dataColor.rgba.join(",")})`;

        await navigator.clipboard.writeText(value);
    };


    // ===== PREVENT PAGE SCROLL ON CANVAS WHEEL =====
    useEffect(() => {
        const preventScroll = (e: WheelEvent) => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            // FIX — блокируем скролл только если курсор над canvas
            const rect = canvas.getBoundingClientRect();

            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            if (inside) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", preventScroll, { passive: false });

        return () => {
            window.removeEventListener("wheel", preventScroll);
        };
    }, []);

    const onClose = () => setSettingsOpen(false);

    return (
        <div
            className={styles.pickupWindow}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDrop}
        >
            <Modal isOpen={settingsOpen} onClose={onClose}>
                <PickupColorSettings
                    onClose={onClose}
                    color={dataColor}
                    setColor={setDataColor}
                />
            </Modal>

            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave} // FIX 4 (важно)
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                onContextMenu={(e) => e.preventDefault()}
                // FIX: поддержка device toolbar + touch
                onPointerDown={(e) => {
                    draggingRef.current = true;
                    movedRef.current = false;

                    canvasRef.current?.setPointerCapture(e.pointerId);

                    lastPosRef.current = { x: e.clientX, y: e.clientY };
                    setShowMagnifier(false);
                }}
                onPointerMove={(e) => {
                    const rect = canvasRef.current!.getBoundingClientRect();

                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    setCursor({ x: e.clientX, y: e.clientY });

                    // FIX: лупа только если есть изображение и внутри canvas
                    if (!imageLoaded) {
                        setShowMagnifier(false);
                        return;
                    }

                    const inside =
                        e.clientX >= rect.left &&
                        e.clientX <= rect.right &&
                        e.clientY >= rect.top &&
                        e.clientY <= rect.bottom;

                    if (!inside) {
                        setShowMagnifier(false);
                        return;
                    }

                    if (!draggingRef.current) {
                        setShowMagnifier(true);
                        drawMagnifier(x, y);
                        return;
                    }

                    const dx = e.clientX - lastPosRef.current.x;
                    const dy = e.clientY - lastPosRef.current.y;

                    // 🔥 FIX: убираем “микро-рывки”
                    const deadZone = 0.5;

                    if (Math.abs(dx) > deadZone || Math.abs(dy) > deadZone) {
                        panRef.current.x += dx;
                        panRef.current.y += dy;

                        lastPosRef.current = { x: e.clientX, y: e.clientY };
                        requestDraw();
                    }
                }}
                onPointerUp={(e) => {
                    draggingRef.current = false;

                    canvasRef.current?.releasePointerCapture(e.pointerId);

                    if (!movedRef.current) {
                        const rect = canvasRef.current!.getBoundingClientRect();
                        pickColor(e.clientX - rect.left, e.clientY - rect.top);
                    }
                }}
                onPointerCancel={() => (draggingRef.current = false)}
            />

            {/* ЛУПА */}
            {showMagnifier && imageLoaded && (
                <canvas
                    ref={magnifierRef}
                    style={{
                        position: "fixed",
                        top: cursor.y + 20,
                        left: cursor.x + 20,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.4)",
                        pointerEvents: "none",
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                    }}
                />
            )}

                <div className={styles.pickupTop}>
                    <div className={styles.pickupColor}>
                        <div
                            className={styles.pickupCurrentColor}
                            style={{ background: dataColor.hex }}
                            onClick={() => setSettingsOpen(true)}
                        />
                        <div className={styles.pickupCopyColor}>
                            <Img src={CopyIcon} alt="copy" />
                            <p onClick={onCopy} className={styles.pickupCopyText}>
                                {dataColor.type === "HEX"
                                    ? dataColor.hex
                                    : `rgba(${dataColor.rgba.join(", ")})`}
                            </p>
                        </div>
                    </div>

                    <div className={styles.pickupUploadTop}>
                        <button
                            onClick={() => inputFileRef.current?.click()}
                            className={styles.pickupUploadTopBtn}
                        >
                            Загрузить
                        </button>

                        <div
                            className={styles.pickupTooltip}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <button className={styles.pickupTooltipIcon}>i</button>
                            {hover && (
                                <div className={styles.pickupInfo}>
                                    <ul className={styles.pickupInfoList}>
                                        <li className={styles.pickupInfoItem}>Клик — выбрать цвет</li>
                                        <li className={styles.pickupInfoItem}>Перетаскивание — двигать</li>
                                        <li className={styles.pickupInfoItem}>Колесо — зум</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            {isDraggingFile && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 18,
                        pointerEvents: "none",
                    }}
                >
                    Отпустите изображение
                </div>
            )}


            {!isDraggingFile && !imageLoaded && (
                <div className={styles.pickupUploadWrapper}>
                    <div
                        className={styles.pickupUploadBtn}
                        onClick={() => inputFileRef.current?.click()}
                    >
                        <Img className={styles.pickupUploadIcon} src={UploadIcon2} alt="upload" />
                        <p className={styles.pickupUploadDesc}>Загрузить изображение</p>
                    </div>
                    <p className={styles.pickupUploadInfo}>Мы не храним ваши изображения и никуда их не передаём.</p>
                </div>
            )}

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