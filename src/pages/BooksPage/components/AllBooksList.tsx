import React, { FC } from 'react';
import { IBookItem } from '../../../models/IBookItem';
import BookItem from '../../../components/BookItem/BookItem';
import styles from './AllBooksList.module.css';

interface AllBooksListProps {
    books: IBookItem[];
}

const AllBooksList: FC<AllBooksListProps> = ({ books }) => {
    return (
        <div className={styles.allBooksList}>
            {books.map((book) => (
               <div className={styles.item} key={book.bookId}>
               <BookItem book={book} />
           </div>
            ))}
        </div>
    );
};

export default AllBooksList;
