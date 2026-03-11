import styles from './Input.module.css'
import React from "react";
interface IInput {
    className?: string;
    type?: string
    placeholder?: string
    value: string
    setValue: (v: string) => void
    onBlur?: () => void;
    id?: string;
    name?: string
}

export const Input = ({ className, type, placeholder, value, setValue, name, id, onBlur }: IInput) => {
    return (
        <>
            <input
                onBlur={onBlur}
                className={`${styles.input} ${className ? className : ''}`}
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
