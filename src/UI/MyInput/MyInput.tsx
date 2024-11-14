import React, { FC } from 'react';
import styles from './MyInput.module.css';

interface MyInputProps {
    value: string;
    setValue: (value: string) => void;
    className?: string;
    placeholder: string;
    type?: 'email' | 'password' | 'text';
    hasError?: boolean; // Новый проп для ошибки
    errorText?: string; // Дополнительный текст ошибки
}

const MyInput: FC<MyInputProps> = (props) => {
    const autocomplete = props.type === 'email' 
        ? 'username' 
        : props.type === 'password' 
        ? 'current-password' 
        : undefined;

    return (
        <div className={`${styles.inputContainer} ${props.className || ''}`}>
            <input 
                type={props.type || 'text'}
                placeholder={props.placeholder}
                className={`${styles.input} ${props.hasError ? styles.errorBorder : ''}`}
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
                autoComplete={autocomplete}
            />
            {props.hasError && props.errorText && (
                <span className={styles.errorText}>{props.errorText}</span>
            )}
        </div>
    );
};

export default MyInput;
