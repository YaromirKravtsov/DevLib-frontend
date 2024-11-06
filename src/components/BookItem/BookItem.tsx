import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookItem.module.css';
import { IBookItem } from '../../models/IBookItem';
import EditItemButton from '../../UI/EditItemButton/EditItemButton';
import { useAuthStore } from '../../app/store/auth';


interface BookItemProps {
  book: IBookItem;
}

const BookItem: FC<BookItemProps> = ({ book }) => {
  const navigate = useNavigate();
  const role = useAuthStore(store => store.role)
  const handleClick = () => {
    navigate(`/books/${book.bookId}`);
  };
  const bookImg = process.env.STATIC_URL || 'http://localhost:3200';
  const handleEdit = () =>{
    navigate(`/edit-book/${book.bookId}`);
  }
  console.log(bookImg + (book.photoBook??book.bookImg))
/*   const fetchbookImg = async () =>{
    const res = await fetch(bookImg + (book.photoBook??book.bookImg))
    console.log(res)
  }
  useEffect(()=>{
    fetchbookImg()
  },[]) */
  return (
    <div className={styles.item} onClick={handleClick}>
      {role == 'admin' && <EditItemButton onClick={handleEdit} className={styles.editButton}/>}
      <img src={bookImg + (book.photoBook??book.bookImg)} alt={book.bookName} />
      <div className={styles.title}>{book.bookName}</div>
    </div>
  );
};

export default BookItem;
