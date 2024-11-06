import { AxiosResponse } from "axios";
import $api from "../http";

export interface LoginResponse {
    token: string
}
  interface BookDetails {
    title: string;
    author: string;
    tags: string[];
    reviewsCount: number;
    averageRating: number;
    bookmarksCount: number;
}
interface ICommentDto {
    userId: string;
    content: string;
    dateTime: string; 
    bookId: string;
}
interface ILoginGoogleDto{
    userId:string,
    token: string
}
export default class AppService {
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post('/auth/login', {
            email,
            password
        })
    }
    static async getBookDetails(bookId: string): Promise<AxiosResponse<BookDetails>> {
        return $api.get(`/api/book/get-book/${bookId}`); 
    }
    
    static async loginGoogle(params:ILoginGoogleDto) :Promise<AxiosResponse<LoginResponse>>{
        return await $api.post('auth/login-with-google', params)
    }

    static async loginGitHub(code: string) :Promise<AxiosResponse<LoginResponse>>{
        return await $api.post('auth/login-with-github?code='+ code)
    }
 /*    static async getDirectory(directoryId: string): Promise<AxiosResponse<DirectoryResponse>> {
        return $api.get(`/get_directory/${directoryId}`);
    } */
}

