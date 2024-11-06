import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { GetLastBooksRes } from "./res";
import { IDirectoryItem } from "../../../models/IDirectoryItem";

export default class MainPageService {
   
    static async get8Directories(): Promise<AxiosResponse<IDirectoryItem[]>> {
        return $api.get('/directory/get-last-directory')
    }

       
    static async getLastBooks(): Promise<AxiosResponse<GetLastBooksRes[]>> {
        return $api.get('/book/last-published-books')
    }
}

