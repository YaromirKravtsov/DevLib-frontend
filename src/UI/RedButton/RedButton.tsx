import React, { FC, ReactNode } from 'react';
import styles from './RedButton.module.css'
interface RedButtonPtops{
    children: ReactNode,
    onClick: ()=> void;
    className?:string
}
const RedButton: FC<RedButtonPtops> = (props) => {
  return (
    <button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default RedButton
