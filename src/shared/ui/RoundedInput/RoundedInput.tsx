import styles from './RoundedInput.module.css'
import React from "react";
interface IRoundedInput {
    className?: string;
    type?: string
    placeholder?: string
    value: string
    setValue: (v: string) => void
    onBlur?: () => void;
    id?: string;
    name?: string
}

export const RoundedInput = ({ className, type, placeholder, value, setValue, name, id, onBlur }: IRoundedInput) => {
    return (
        <>
            <input
                onBlur={onBlur}
                className={`${styles.roundedInput} ${className ? className : ''}`}
                value={value}
                placeholder={placeholder ? placeholder : ''}
                onChange={(e) => setValue(e.currentTarget.value)}
                type={type ? type : 'text'}
                id={id}
                name={name}
            />
        </>
    );
}
