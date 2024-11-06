import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './AddRecordInputRow.module.css'
import FileUpload from '../FileUpload/FileUpload';
import clipIcon from '../../assets/images/icons/Clip Icon.png'
interface AddRecordInputRow {
  title: string,
  value?: string,
  setValue?: (value: string) => void,
  placeholder?: string,
  type: 'normal' | 'file' | 'custom';
  onFileChange?: (file: File | null) => void;
  children?: ReactNode;
  file?: File | null 
}

const AddRecordInputRow: FC<AddRecordInputRow> = (props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    if (props.onFileChange) props.onFileChange(file)
      setFile(file)
  }
  function formatFileSize(size:number) {
    const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
  function truncateText(text:string, maxLength = 20) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
  useEffect(()=>{
    if(props.file)
      setFile(props.file);
},[props.file])
  return (
    <div className={styles.main}>
      <div className={styles.title}>{props.title}</div>
      {props.type == 'normal' &&
        <input type="text" className={styles.input} placeholder={props.placeholder}
          value={props.value} onChange={e => props.setValue && props.setValue(e.target.value)}
        />
      }
      {props.type == 'file' &&
        <div className={`${styles.input} ${styles.file}`}>
          <FileUpload onFileChange={handleFileChange} className={styles.file}   {...(file && props.type == 'file' ? { file: file as File } : {})}>
            <img src={clipIcon} alt="" />
            <div className={styles.fileText}> {file?.name  ?<span>{truncateText(file.name,30)} <span className={styles.size}> {formatFileSize(file.size)}</span> </span>:  props.placeholder} </div>
          </FileUpload>
        </div>
      }
      {props.type == 'custom' &&
        props.children
      }
    </div>
  )
}

export default AddRecordInputRow
