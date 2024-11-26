import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IBookItem } from "../../../models/IBookItem";


export default class BooksPageService {
    static async searchBooks(bookName: string, tag: string): Promise<AxiosResponse<IBookItem[]>> {
        return await $api.get<IBookItem[]>('/book/search', {params: {
            tag,bookName
        }});
    }
    static async getAllBooks(): Promise<AxiosResponse<IBookItem[]>> {
        return $api.get('/book/search'); 
    }
}
