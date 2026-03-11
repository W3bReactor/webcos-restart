'use client'
import styles from './Planet.module.css'
import React, { useEffect, useRef, useState} from "react";
import {useTheme} from "next-themes";
import {OrbitBlackImage, OrbitImage} from "@/widgets/Intro";
let down = false

interface ICircle {
    width: number
    height: number
    planet: string
    speed: number
    planetHeight: number
    planetWidth: number
    marginRight: number
    direction: 'right' | 'left'
}

export default function  Planet ({height,width, speed, planet, planetWidth,planetHeight, marginRight, direction} : ICircle) {
    const picker = useRef<HTMLDivElement | null>(null)
    const circle = useRef<HTMLDivElement | null>(null)
    const [adaptiveSize, setAdaptiveSize] = useState({
        planetWidth: planetWidth,
        planetHeight: planetHeight,
        width: width,
        height: height,
        marginRight: marginRight
    })
    const mount = useRef<boolean>(false)
    const rotate = function(x: number, y: number){
        if(circle.current) {
            const rect = circle.current.getBoundingClientRect()
            const center = {
                x: rect.left + window.pageXOffset + rect.width / 2,
                y: rect.top + window.pageYOffset + rect.height / 2
            }
            const deltaX = x - center.x
            const deltaY = y - center.y
            const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
            return angle

        }
    }

    useEffect(() => {
        if(picker.current) {
            picker.current.style['transform'] = 'rotate(' + Math.random() * 1000 + 'deg)'

        }

    }, [])

    const onMouseDown = (e: React.MouseEvent) => {
        down = true
        e.preventDefault()
        document.body.style.cursor = 'move'
        document.addEventListener('mousemove', onMouseMove as () => void)
        document.addEventListener('mouseup', onMouseUp)
    }
    const onMouseMove = (e: React.MouseEvent) => {
        if(down && picker.current) {
            picker.current.style['transform'] = 'rotate(' + rotate(e.pageX, e.pageY) + 'deg)'
            picker.current.style['transition'] = 'none'

        }
    }
    useEffect(() => {
        let interval: NodeJS.Timeout | string | number | undefined
        //Implementing the setInterval method
        if(window.innerWidth >= 1230) {
            interval = setInterval(() => {
                if (direction === 'left' && picker.current) {
                    picker.current.style['transform'] = 'rotate(' + String(Number(picker.current.style.transform.replace('rotate(', '').replace('deg)', '')) + 0.1) + 'deg)'

                } else if (picker.current) {
                    picker.current.style['transform'] = 'rotate(' + String(Number(picker.current.style.transform.replace('rotate(', '').replace('deg)', '')) - 0.1) + 'deg)'

                }
            }, speed);
        }
        //Clearing the interval
        return () => clearInterval(interval);
    }, [direction, speed]);
    useEffect(() => {
        if(!mount.current) {
            if (window.innerWidth < 930) {
                setAdaptiveSize( (prev) =>
                    ({
                        ...prev,
                        width: adaptiveSize.width / 4,
                        height: adaptiveSize.width / 4,
                        planetHeight: adaptiveSize.planetHeight / 4,
                        planetWidth: adaptiveSize.planetWidth / 4,
                        marginRight: adaptiveSize.marginRight * 0.5
                    })
                )

            } else if(window.innerWidth < 1230) {
                setAdaptiveSize( prev =>
                    ({
                        ...prev,
                        width: adaptiveSize.width / 2,
                        height: adaptiveSize.width / 2,
                        planetHeight: adaptiveSize.planetHeight / 2,
                        planetWidth: adaptiveSize.planetWidth / 2,
                        marginRight: adaptiveSize.marginRight / 1.5
                    })
                )
            }

        }
        mount.current = true

    }, [adaptiveSize.width, adaptiveSize.height, adaptiveSize.planetHeight, adaptiveSize.planetWidth, adaptiveSize.marginRight])


    const onMouseUp = () => {
        document.body.style.cursor = '';
        down = false
        if(picker.current) {
            picker.current.style['transition'] = 'all 0.3s'

        }

        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('mousemove', onMouseMove as () => void)

    }
    const { resolvedTheme } = useTheme()
    let src

    switch (resolvedTheme) {
        case 'light':
            src = OrbitBlackImage.src
            break
        case 'dark':
            src = OrbitImage.src
            break
        default:
            src = OrbitImage.src
            break
    }
    return (
        <div style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: `${adaptiveSize.width}px`,
            height: `${adaptiveSize.height}px`,
        } }    ref={circle} className={styles.orbitInner}>
            <div  style={{height: planetHeight, marginTop: `${adaptiveSize.marginRight}px`}}  onMouseDown={onMouseDown} ref={picker} className={styles.picker}>
                <div style={{
                    background: `url(${planet}) no-repeat`,
                    backgroundSize: 'cover',
                    width: `${adaptiveSize.planetWidth}px`,
                    height: `${adaptiveSize.planetHeight}px`,
                    marginRight: `${adaptiveSize.marginRight}px`,

                }}  onMouseUp={onMouseUp} onMouseDown={onMouseDown}  className={styles.innerOrbitCircle}></div>
            </div>
        </div>

    );
}
