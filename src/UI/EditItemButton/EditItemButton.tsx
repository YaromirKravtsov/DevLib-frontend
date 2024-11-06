import React, { FC, MouseEvent } from 'react'
import styles from './EditItemButton.module.css';

interface EditItemButtonProps {
    onClick: () => void;
    className?:string
}

const EditItemButton: FC<EditItemButtonProps> = ({ onClick,className}) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) =>{
        event.stopPropagation(); 
        onClick()
    }
    return (
        <button className={`${styles.button} ${className}`} onClick={handleClick}>
         
            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9997 21.3333V26.6667C22.9997 27.0203 22.8592 27.3594 22.6092 27.6095C22.3591 27.8595 22.02 28 21.6663 28H5.66634C5.31272 28 4.97358 27.8595 4.72353 27.6095C4.47348 27.3594 4.33301 27.0203 4.33301 26.6667V9.33333C4.33301 8.97971 4.47348 8.64057 4.72353 8.39052C4.97358 8.14048 5.31272 8 5.66634 8H9.66634" stroke="#6FC3FF" stroke-opacity="0.941176" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M17.6665 8H21.6665C22.0201 8 22.3593 8.14048 22.6093 8.39052C22.8594 8.64057 22.9998 8.97971 22.9998 9.33333V13.3333" stroke="#6FC3FF" stroke-opacity="0.941176" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.3332 6.66667C16.3332 5.95942 16.0522 5.28115 15.5521 4.78105C15.052 4.28095 14.3737 4 13.6665 4C12.9593 4 12.281 4.28095 11.7809 4.78105C11.2808 5.28115 10.9998 5.95942 10.9998 6.66667C10.6462 6.66667 10.3071 6.80714 10.057 7.05719C9.80698 7.30724 9.6665 7.64638 9.6665 8V10.6667H17.6665V8C17.6665 7.64638 17.526 7.30724 17.276 7.05719C17.0259 6.80714 16.6868 6.66667 16.3332 6.66667ZM27.9465 14.2533L26.0798 12.3867C25.8306 12.1424 25.4955 12.0055 25.1465 12.0055C24.7975 12.0055 24.4624 12.1424 24.2132 12.3867L17.6665 18.9333V22.6667H21.3998L27.9465 16.12C28.1908 15.8708 28.3276 15.5357 28.3276 15.1867C28.3276 14.8377 28.1908 14.5026 27.9465 14.2533Z" stroke="#6FC3FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </button>
    )
}

export default EditItemButton
