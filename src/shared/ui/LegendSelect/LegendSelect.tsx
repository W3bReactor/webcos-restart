'use client';

import styles from './LegendSelect.module.css'
import React, {useState} from "react";
import {BigDropdownIcon} from "@/shared/assets";
import Image from "next/image";



export interface SelectItem {
    id: string
    label: string
}

interface ILegendSelect {
    className?: string
    value: string
    content: SelectItem[]
    onChange: (id: string) => void;
    legend: string;
}




export const LegendSelect = ({ value, content, onChange, className, legend}: ILegendSelect) => {
    const [openDropdown, setOpenDropdown] = useState(false)

    const selected =
        content.find(item => item.id === value)?.label ?? ''

    return (
        <fieldset className={`${styles.legendSelectFieldSet} ${className ?? ''}`}>

            <legend className={styles.legendSelectLegend}>
                {legend}
            </legend>

            <div
                className={styles.legendSelectSelected}
                onClick={() => setOpenDropdown(v => !v)}
            >
                {selected}

                <Image
                    className={styles.legendSelectDropdown}
                    src={BigDropdownIcon}
                    alt="Ещё"
                />
            </div>

            {openDropdown && (
                <ul className={styles.legendSelectOptions}>
                    {content.map(item => (
                        <li
                            key={item.id}
                            className={styles.legendSelectOption}
                            onClick={() => {
                                onChange(item.id)
                                setOpenDropdown(false)
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}

        </fieldset>
    );
}





