import React, { useEffect, useState } from 'react';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './BookMarksPage.module.css';
import BookMarksPageService from './api/BookMarksPageService';
import { IBookItem } from '../../app/models/IBookItem';
import { useAuthStore } from '../../app/store/auth';
import AllBooksList from '../BooksPage/components/AllBooksList'; // Імпортуємо AllBooksList

const BookMarksPage: React.FC = () => {
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const [books, setBooks] = useState<IBookItem[]>([]);
    const [activeCategory, setActiveCategory] = useState('books');
    const userId = useAuthStore((state) => state.userId);

    useEffect(() => {
        setHeaderVersion('minimized');
    }, [setHeaderVersion]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Отримуємо список ID закладок
                const fetchedBooksIds = await BookMarksPageService.getBooks(userId);
                console.log(fetchedBooksIds);  // Перевірте отримані ID
                
                // Для кожного ID отримуємо детальну інформацію про книгу
                const fetchedBooks = await Promise.all(
                    fetchedBooksIds.map(async (bookId) => {
                        const bookDetails = await BookMarksPageService.getBookDetails(bookId);
                        return bookDetails;
                    })
                );
                setBooks(fetchedBooks); // Оновлюємо стан з детальними книгами
            } catch (error) {
                console.error('Помилка при завантаженні книг:', error);
            }
        };

        if (userId) {
            fetchBooks();
        }
    }, [userId]);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    // Функція для видалення книги
    const handleRemoveBook = async (bookmarkId: string) => {
        try {
            await BookMarksPageService.removeBook(bookmarkId); // Викликаємо метод видалення
            // Оновлюємо стан, щоб видалити книгу з UI
            setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookmarkId));
        } catch (error) {
            console.error('Помилка при видаленні книги:', error);
        }
    };

    return (
        <div className={styles.bookmarksContainer}>
            <h1 className={styles.title}>Вибране</h1>
            <div className={styles.topButtons}>
                <button
                    className={`${styles.categoryButton} ${activeCategory === 'forum' ? styles.activeButton : ''}`}
                    onClick={() => handleCategoryClick('forum')}
                >
                    Форум
                </button>
                <button
                    className={`${styles.categoryButton} ${activeCategory === 'books' ? styles.activeButton : ''}`}
                    onClick={() => handleCategoryClick('books')}
                >
                    Книги
                </button>
            </div>

            {/* Використовуємо компонент AllBooksList для відображення списку закладок */}
            <div className={styles.booksGrid}>
                {books.map((book) => (
                    <div key={book.bookId} className={styles.bookItem}>
                        <AllBooksList books={[book]} />
                        {/* Кнопка для видалення закладки */}
                        <button 
                            className={styles.removeButton} 
                            onClick={() => handleRemoveBook(book.bookId)}  // Викликаємо видалення книги при натисканні
                        >
                            ×
                        </button> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookMarksPage;
