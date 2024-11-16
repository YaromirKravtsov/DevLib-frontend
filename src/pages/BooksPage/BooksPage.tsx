import React, { useEffect, useState } from 'react';
import BooksPageService from './api/BooksPageService';
import AllBooksList from './components/AllBooksList';
import styles from './BooksPage.module.css';

import { useHeaderStore } from '../../layouts/Header/store/header';
import { IBookItem } from '../../models/IBookItem';
import MySelect from '../../UI/MySelect/MySelect';
import { ITag } from '../../models/ITag';
import { tagsToSelectItems } from './helpers/tagsToSelectItems';
import TagsService from '../../api/tags/TagsService';

const BooksPage: React.FC = () => {
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const [books, setBooks] = useState<IBookItem[]>([]);
    const setRequestUrl = useHeaderStore((store) => store.setRequestUrl);
    const response = useHeaderStore(store => store.response);
    const [tags, setTags] = useState<ITag[]>([])

    const selectTag = (value: string) => {
        //TODO Фильтрация по id тега
        alert(value)
    }
    const fetchBooks = async () => {
        try {
            const { data } = await BooksPageService.getAllBooks();
            setBooks(data);
            console.log(data);
        } catch (error) {
            console.error("Ошибка при загрузке книг:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const { data } = await TagsService.getAllTags();
            setTags(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchBooks();
        fetchTags()
        //setRequestUrl("/book/search-books?bookName=")
        setHeaderVersion('normal');
    }, []);

    useEffect(() => {
        setBooks(response);
    }, [response])

    return (
        <div className={`${styles.booksPage} container`}>
            <div className={styles.filterBar}>
                <div className={styles.filerText}>Фільтрація:</div>
                <MySelect
                    onChange={selectTag}
                    options={tagsToSelectItems(tags)}
                    placeholder='Оберіть тег'
                />
            </div>
            <AllBooksList books={books} />
        </div>
    );
};

export default BooksPage;
