import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookItem.module.css';
import { IBookItem } from '../../models/IBookItem';
import EditItemButton from '../../UI/EditItemButton/EditItemButton';
import { useAuthStore } from '../../app/store/auth';
import { Link } from 'react-router-dom';


interface BookItemProps {
  book: IBookItem;
}

const BookItem: FC<BookItemProps> = ({ book }) => {
  const navigate = useNavigate();
  const role = useAuthStore(store => store.role)

  const bookImg = process.env.STATIC_URL || 'http://localhost:3200';
  const handleEdit = () => {
    navigate(`/edit-book/${book.bookId}`);
  }


  return (
    <Link to = {`/books/${book.bookId}`} className={styles.item} >
      {role == 'admin' && <EditItemButton onClick={handleEdit} className={styles.editButton} />}
      <img src={bookImg + (book.photoBook ?? book.bookImg)} alt={book.bookName} />
      <div className={styles.title}>{book.bookName}</div>
    </Link>
  );
};

export default BookItem;
