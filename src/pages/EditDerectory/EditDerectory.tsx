import React from 'react';
import DirectoryManeger from '../../module/DirectoryManeger/DirectoryManeger';
import { useParams } from 'react-router-dom';
import styles from './EditDerectory.module.css';

const EditDerectory = () => {
  const {directoryId} = useParams();
  
  return (
    <div className={styles.page}>
     { <DirectoryManeger action='edit' directoryId = {directoryId}/>}
    </div>
  )
}

export default EditDerectory
