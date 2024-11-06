import React, { FC } from 'react'

import styles from './DirectoriesList.module.css'
import img from '../../../../assets/images/api/puthon1.png'
import DirectorItem from '../../../../components/DirectorItem/DirectorItem';
import { IDirectoryItem } from '../../../../models/IDirectoryItem';
interface DirectoriesListProps{
    directories: IDirectoryItem[]
}
const DirectoriesList:FC<DirectoriesListProps> = (props) => {
  return (
    <div className={styles.list}>
        {props.directories.map(directory =>
            <DirectorItem directory= {directory} key = {directory.directoryId}/> 
        )}
    </div>
  )
}

export default DirectoriesList
