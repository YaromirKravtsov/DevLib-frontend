import  { FC } from 'react'
import style from './Loader.module.css'

type Size = 'small' | 'large'
interface Props{
  size?:Size
}
const Loader:FC<Props> = ({size = 'large'}) => {
  return (
    <div className={`${style.loader} ${size == 'small'&& style.loaderSmal}`}>
        <img alt='' src ={''} className={style.LoaderIcon}/>
    </div>
  )
}

export default Loader
