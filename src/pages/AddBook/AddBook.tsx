import React, { useEffect, useState } from 'react'
import RecordType from '../../components/RecordType/RecordType';
import styles from './AddBook.module.css'
import AddRecordInputRow from '../../components/AddRecordInputRow/AddRecordInputRow';
import FileUpload from '../../components/FileUpload/FileUpload';
import ListEditor, { IListItem } from '../../components/ListEditor/ListEditor';
import BlueButton from '../../UI/BlueButton/BlueButton';
import { checkServerIdentity } from 'tls';
import { validateStringFields } from '../../helpers/checkStringFields';
import BookManager from '../../module/BookManager/BookManager';
const AddBook = () => {

  return (
    <BookManager action='create'/>
  )
}

export default AddBook
