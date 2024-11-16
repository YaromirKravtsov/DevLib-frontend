import React, { FC, ReactNode } from 'react';
import styles from './BlueButton.module.css'
interface BlueButtonPtops{
    children: ReactNode,
    onClick: ()=> void;
    className?:string
}
const BlueButton:FC<BlueButtonPtops> = (props) => {
  return (
    <button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default BlueButton
