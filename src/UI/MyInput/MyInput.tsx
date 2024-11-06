import React, { FC } from 'react';
import styles from './MyInput.module.css';

interface MyInputProps {
    value: string;
    setValue: (value: string) => void;
    className?: string;
    placeholder: string;
    type?: 'email' | 'password' | 'text';
}

const MyInput: FC<MyInputProps> = (props) => {
  // Определяем атрибут autocomplete в зависимости от типа
  const autocomplete = props.type === 'email' 
    ? 'username' 
    : props.type === 'password' 
    ? 'current-password' 
    : undefined;

  return (
    <input 
      type={props.type || 'text'} // Задаем тип как email, password или text
      placeholder={props.placeholder}
      className={`${props.className ? props.className : ''} ${styles.input}`}
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
      autoComplete={autocomplete} // Задаем autocomplete
    />
  );
};

export default MyInput;
