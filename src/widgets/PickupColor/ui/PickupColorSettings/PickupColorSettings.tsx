"use client";

import Img from "next/image";
import React, {useState} from "react";
import {HexColorPicker} from "react-colorful";
import {BigDropdownIcon} from "@/shared/assets";
import type {PickedColor} from "@/widgets/PickupColor/ui/PickupColorWindow/PickupColorWindow";
import styles from "./PickupColorSettings.module.css";

interface Props {
    onClose: () => void;
    color: PickedColor;
    setColor: (color: PickedColor) => void;
}

const hexToRgba = (hex: string): PickedColor["rgba"] => {
    const normalized = hex.replace("#", "");
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);

    return [String(r), String(g), String(b), "1"];
};

export const PickupColorSettings = ({onClose, color, setColor}: Props) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const onClickOption = (type: PickedColor["type"]) => {
        setOpenDropdown(false);
        setColor({...color, type});
    };

    return (
        <div className={styles.pickupSettings} onClick={(e) => e.stopPropagation()}>
            <div className={styles.pickupSettingsTop}>
                <h2 className={styles.pickupSettingsTitle}>Настройки цвета</h2>
                <button
                    onClick={onClose}
                    className={styles.pickupSettingsClose}
                    type="button"
                    aria-label="Закрыть настройки"
                />
            </div>

            <div className={styles.pickupSettingsContent}>
                <div className={styles.pickupSettingsCurrent}>
                    <p className={styles.pickupSettingsCurrentDesc}>
                        {color.type === "HEX"
                            ? color.hex
                            : `rgba(${color.rgba.join(", ")})`}
                    </p>
                    <div
                        className={styles.pickupSettingsCurrentColor}
                        style={{background: color.hex}}
                    />
                </div>

                <HexColorPicker
                    color={color.hex}
                    onChange={(hex) =>
                        setColor({
                            ...color,
                            hex,
                            rgba: hexToRgba(hex),
                        })
                    }
                />

                <fieldset className={styles.fieldSet}>
                    <legend className={styles.legend}>Формат</legend>
                    <button
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className={styles.selected}
                        type="button"
                    >
                        {color.type}
                        <Img className={styles.dropdown} src={BigDropdownIcon} alt="" />
                    </button>
                    {openDropdown && (
                        <ul className={styles.options}>
                            <li>
                                <button className={styles.option} onClick={() => onClickOption("HEX")} type="button">
                                    HEX
                                </button>
                            </li>
                            <li>
                                <button className={styles.option} onClick={() => onClickOption("RGBA")} type="button">
                                    RGBA
                                </button>
                            </li>
                        </ul>
                    )}
                </fieldset>
            </div>
        </div>
    );
};
