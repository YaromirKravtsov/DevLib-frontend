import { AxiosResponse } from "axios";
import { AddBookReq } from "./req";
import $api from "../../../app/api/http";
import IBook from "../../../models/IBook";
import { ITag } from "../../../models/ITag";
import { IBookDetails } from "../../../models/IBookDetails";
export interface deleteTagDto{
    bookId: string;
    tagId: string

}
export interface createTagDto{
    bookId: string;
    tagText: string;
}
export default class BookManagerService {
    static async addBook(dto: AddBookReq): Promise<AxiosResponse> {
        const formData = new FormData();
        formData.append('BookName', dto.BookName)
        formData.append('Author', dto.Author)
        formData.append('BookPdf', dto.BookPdf)
        formData.append('BookImg', dto.BookImg)
        formData.append('Tag', dto.Tag)
        return $api.post('/book/add-book', formData);
    }
    static async getBook(id: string): Promise<AxiosResponse<IBookDetails>> {
        return $api.get('/book/get-book/' + id)
    }
    static async getTags(id: string): Promise<AxiosResponse<ITag[]>> {
        return $api.get('/tag/get-tags/' + id)
    }
    static async createTag(dto: createTagDto): Promise<AxiosResponse<ITag[]>> {
        return $api.post('/tag/add-tag',dto)
    }

    static async editBook(formData: FormData): Promise<AxiosResponse<ITag[]>> {
        return $api.put('/book/update-book/', formData)
    }
    static async deleteTag(dto: deleteTagDto): Promise<AxiosResponse> {
        return $api.delete('/book/remove-tag/',  {
            data: dto,
        });
    }
    
    
}