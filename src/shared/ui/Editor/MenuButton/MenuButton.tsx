'use client';
import styles from './MenuButton.module.css'

interface IMenuButton {
    active?: boolean
    className?: string
    onClick?: () => void;
    children: React.ReactNode
}

export function MenuButton({className, onClick, children, active}:IMenuButton){
    return(

            <button
                onClick={onClick}
                className={ `${styles.menuButton} ${active ? styles.active : ''} ${className ? className : ''}`}
            >
                {children}
            </button>
    )

}