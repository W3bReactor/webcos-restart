'use client'

import {useState} from 'react'
import {HexColorPicker} from 'react-colorful'
import {colord} from 'colord'
import styles from './ColorPopover.module.css'
import {LegendSelect, RoundedInput} from '@/shared/ui'
import {MenuButton} from "@/shared/ui/Editor/MenuButton/MenuButton";

type RGBA = {
    r: number
    g: number
    b: number
    a: number
}

const isRGBA = (color: unknown): color is RGBA => {
    return color !== null && typeof color === 'object' && 'r' in color;
}

const selectColorFormats = [
    {id: 'hex', label: 'HEX'},
    {id: 'rgba', label: 'RGBA'},
]

interface IColorPopover {
    value: string
    onChange: (color: string) => void
    unset?: () => void
}

export function ColorPopover({
                                 value,
                                 onChange,
                                 unset
                             }: IColorPopover) {

    const [mode, setMode] = useState<'hex' | 'rgba'>('hex')

    const [colorSettings, setColorSettings] = useState({
        hex: colord(value).toHex(),
        rgba: colord(value).toRgb(),
    })


    const updateAll = (color: string | RGBA) => {
        if(typeof color === 'string') {
            setColorSettings({
                hex: color,
                rgba: colord(color).toRgb()
            })
        } else if ( isRGBA(color)) {
            setColorSettings({
                hex: colord(color).toHex(),
                rgba: color
            })
        }
        if(colord(color).isValid()) {
            onChange(colord(color).toRgbString())
        }
    }


    const updateRGBA = (
        key: keyof RGBA,
        value: string,
    ) => {
        const cleanValue = value.replace(/[^0-9.]/g, '');

        if (cleanValue.endsWith('.') || cleanValue.endsWith('.0')) {
            updateAll({
                ...colorSettings.rgba,
                [key]: cleanValue,
            })
            return;
        }
        let number = Number(cleanValue);

        if (Number.isNaN(number)) {
            number = 0;
        }

        if (key === 'a') {
            number = Math.max(0, Math.min(1, number));
        } else {
            number = Math.round(Math.max(0, Math.min(255, number))); // Округляем RGB до целых
        }

        const next = {
            ...colorSettings.rgba,
            [key]: number,
        }

        updateAll(next)
    }


    return (
        <>
            <div className={styles.inputSetItems}>
                <div className={styles.inputGroup}>
                    <LegendSelect
                        legend="Формат"
                        value={mode}
                        content={selectColorFormats}
                        onChange={(v) => setMode(v as 'hex' | 'rgba')}
                        className={styles.inputSetLegendSelect}
                    />
                    {unset &&
                        <MenuButton className={styles.colorUnset} onClick={unset}>
                            сбросить
                        </MenuButton>
                    }
                </div>


                <HexColorPicker
                    color={colorSettings.hex}
                    onChange={(nextHex) => {
                        updateAll(nextHex)
                    }}
                />
            </div>

            {mode === 'hex' && (
                <RoundedInput
                    value={colorSettings.hex}
                    placeholder={"#ffffff"}
                    className={styles.inputSetColor}
                    setValue={updateAll}
                />
            )}

            {mode === 'rgba' && (
                <div className={styles.rgbaRow}>

                    <RoundedInput
                        className={styles.inputSetColorRgba}
                        placeholder={"255"}
                        value={String(colorSettings.rgba.r)}
                        setValue={(v) => updateRGBA('r', v)}
                    />

                    <RoundedInput
                        className={styles.inputSetColorRgba}
                        placeholder={"255"}
                        value={String(colorSettings.rgba.g)}
                        setValue={(v) => updateRGBA('g', v)}
                    />

                    <RoundedInput
                        className={styles.inputSetColorRgba}
                        placeholder={"255"}
                        value={String(colorSettings.rgba.b)}
                        setValue={(v) => updateRGBA('b', v)}
                    />

                    <RoundedInput
                        className={styles.inputSetColorRgba}
                        placeholder={"1"}
                        value={String(colorSettings.rgba.a)}
                        setValue={(v) => updateRGBA('a', v)}
                    />

                </div>
            )}
        </>
    )
}