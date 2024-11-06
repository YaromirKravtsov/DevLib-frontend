import React, { FC } from 'react'
import styles from './RecordType.module.css'
import { Link } from 'react-router-dom'
import { RouteNames } from '../../app/router'
type recordType = 'book' | 'directory'
interface RecordType {
    recordType: recordType,
  /*   setRecordType: (value: recordType) => void */
}
const RecordType: FC<RecordType> = (props) => {

    return (
        <div className={styles.recordType}>
            <div className={styles.text}>Тип матеріалу</div>
            <div className={styles.buttonRow}>
                <Link to = {RouteNames.ADD_BOOK} className={`${styles.button} ${props.recordType == 'book' && styles.active}`}>
                    Книга
                </Link>
                <Link to = {RouteNames.ADD_DIRECTORY} className={`${styles.button} ${props.recordType == 'directory' && styles.active}`}>
                    Довідник
                </Link>
            </div>
          
        </div>
    )
}

export default RecordType
