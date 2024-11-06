import React, { FC, ReactNode } from 'react';
import styles from './BlueButton.module.css'
interface BlueButtonPtops{
    children: ReactNode,
    onClick: ()=> void
}
const BlueButton:FC<BlueButtonPtops> = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default BlueButton
