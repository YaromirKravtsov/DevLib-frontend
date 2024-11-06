import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BookManager from '../../module/BookManager/BookManager'
import styles from './EditBook.module.css';
import IBook from '../../models/IBook';

const EditBook = () => {
  const { bookId } = useParams();

  return (
    <div className={styles.editBook}>
      <BookManager action='edit' bookId = {bookId}/>
    </div>
  )
}

export default EditBook
