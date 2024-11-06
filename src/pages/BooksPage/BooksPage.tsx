import React, { useEffect, useState } from 'react';
import BooksPageService from './api/BooksPageService';
import AllBooksList from './components/AllBooksList';
import styles from './BooksPage.module.css';

import { useHeaderStore } from '../../layouts/Header/store/header';
import { IBookItem } from '../../models/IBookItem';

const BooksPage: React.FC = () => {
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const [books, setBooks] = useState<IBookItem[]>([]);
    const setRequestUrl = useHeaderStore((store) => store.setRequestUrl);
    const requestIsLoading = useHeaderStore(store => store.requestIsLoading);
    const response = useHeaderStore(store => store.response);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const {data} = await BooksPageService.getAllBooks();
                setBooks(data);
                console.log(data);
            } catch (error) {
                console.error("Ошибка при загрузке книг:", error);
            }
        };
        
        fetchBooks();
        setRequestUrl("/book/search-books?bookName=")
        setHeaderVersion('normal'); 
    }, []);

    useEffect(()=>{
        setBooks(response);
    },[response])
    
    return (
        <div className={`${styles.booksPage} container`}>
            <AllBooksList books={books} />
        </div>
    );
};

export default BooksPage;
