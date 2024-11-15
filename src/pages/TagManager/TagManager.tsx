import React, { useEffect } from 'react'
import styles from './TagManager.module.css'
import TagMenu from './components/SearchMenu/TagMenu'
import TagList from './components/LocationsList/TagList'
import { useHeaderStore } from '../../layouts/Header/store/header'
const TagManager = () => {

  const setHeaderVersion = useHeaderStore(store=> store.setHeaderVersion)

  useEffect(()=>{
    setHeaderVersion('minimized')
  },[])
  return (

    <div className={styles.main}>
      <TagMenu />
      <TagList/>
    </div>

  )
}

export default TagManager
