// src/pages/BookMarksPage/api/BookMarksPageService.ts

import { AxiosResponse } from 'axios';
import $api from '../../../app/api/http';
import { IBookItem } from '../../../app/models/IBookItem';
import { IBookMark } from '../../../models/IBookMark';

export default class BookMarksPageService {
    // Отримуємо список закладок для користувача
    static async getBooks(userId: string): Promise<string[]> {  // Повертається масив з bookId
        const response: AxiosResponse<string[]> = await $api.get(`/bookmark/${userId}`);
        return response.data;
    }

    // Отримати деталі книги за її ID
    static async getBookDetails(bookId: string): Promise<IBookItem> {
        const response: AxiosResponse<IBookItem> = await $api.get(`/book/get-book/${bookId}`);
        return response.data;
    }

    // Видалити закладку
    static async removeBook(bookmarkId: string): Promise<void> {
        if (!bookmarkId) {
            throw new Error('bookmarkId is required');
        }
        console.log('Sending DELETE request for bookmark ID:', bookmarkId);
        // Використовуємо DELETE метод для видалення закладки
        await $api.delete(`/bookmark/add-bookmark/${bookmarkId}`);
    }
}
