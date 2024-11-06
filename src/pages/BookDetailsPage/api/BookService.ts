import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IBookDetails } from "../../../models/IBookDetails";
import { ITag } from "../../../models/ITag";
export interface setRatingDto{
    userId: string;
    bookId: string;
    rate: number
}
export default class BookService {
    static async getBookDetails(bookId: string): Promise<IBookDetails> {
        const response: AxiosResponse<IBookDetails> = await $api.get(`book/get-book/${bookId}`);
        console.log(response.data);
        return response.data;
         
    }

    static async getTags(bookId: string): Promise<AxiosResponse<ITag[]>> {
        return  await $api.get(`tag/get-tags/${bookId}`);
    }

    static async setRating(dto: setRatingDto): Promise<AxiosResponse<ITag[]>> {
        return await $api.post(`/raiting/add-rating/`, dto);
    }

}

