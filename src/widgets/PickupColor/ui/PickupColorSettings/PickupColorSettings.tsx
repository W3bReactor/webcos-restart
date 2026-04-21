


"use client"
import styles from './PickupColorSettings.module.css'
import React, {useState} from "react";
import { HexColorPicker } from "react-colorful";
import {BigDropdownIcon} from "@/shared/assets";
import Img from "next/image";

interface Color {
    hex: string;
    rgba: string[];
    type: string;

}

interface Props {
    onClose: () => void;
    color: Color;
    setColor: (c: Color) => void;
}

export const PickupColorSettings = ({onClose, color, setColor}: Props) => {

    const [selected, setSelected] = useState('HEX')
    const [openDropdown, setOpenDropdown] = useState(false)


    const onClickOption = (e: React.MouseEvent<HTMLElement>) => {
        setSelected(e.currentTarget.innerText)
        setOpenDropdown(false)
        setColor({...color, type: e.currentTarget.innerText})
    }


    return (
        <div className={styles.pickupSettings} onClick={(e) => e.stopPropagation()}>
            <div className={styles.pickupSettingsTop}>
                <h2>Настройки цвета</h2>
                <button onClick={onClose} className={styles.pickupSettingsClose}></button>
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
                            hex
                        })
                    }
                />

                <fieldset className={styles.fieldSet}>
                    <legend className={styles.legend}>Формат</legend>
                    <div onClick={() => setOpenDropdown(!openDropdown)} className={styles.selected}>{selected}
                        <Img className={styles.dropdown} src={BigDropdownIcon} alt={'Ещё'}/>
                    </div>
                    {openDropdown &&
                        <ul className={styles.options}>
                            <li className={styles.option} onClick={onClickOption}>HEX</li>
                            <li className={styles.option} onClick={onClickOption}>RGBA</li>
                        </ul>
                    }
                </fieldset>

            </div>
        </div>
    );
};