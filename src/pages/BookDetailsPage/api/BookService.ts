import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IBookDetails } from "../../../models/IBookDetails";
import { ITag } from "../../../models/ITag";

export interface setRatingDto {
    userId: string;
    bookId: string;
    rate: number;
}

export interface AddBookmarkDto {
    userId: string;
    bookId: string;
}

export interface AddReviewDto{
    userId: string;
    bookId: string;
    content: string
}
export default class BookService {
    // Отримуємо деталі книги
    static async getBookDetails(bookId: string): Promise<IBookDetails> {
        const response: AxiosResponse<IBookDetails> = await $api.get(`book/get-book/${bookId}`);
        console.log(response.data);
        return response.data;
    }

    // Отримуємо теги для книги
    static async getTags(bookId: string): Promise<AxiosResponse<ITag[]>> {
        return await $api.get(`tag/get-tags/${bookId}`);
    }

    // Встановлюємо рейтинг книги
    static async setRating(dto: setRatingDto): Promise<AxiosResponse<ITag[]>> {
        return await $api.post(`/raiting/add-rating/`, dto);
    }

    // Додаємо книгу до закладок
    static async addBookmark(dto: AddBookmarkDto): Promise<void> {
        return await $api.post(`/bookmark/add-bookmark`, dto);
    }

    static async addReview(dto:AddReviewDto): Promise<void> {
        return await $api.post(`/comment/add-review`, dto);
    }

}
