import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IArticle } from "../../../models/IArticle";


interface addDirectoryDto {
    DirectoryName: string, File: File
}
interface addArticleDto {
    articleName: string,
    articleContent: string,
    directoryId: string
}
export interface EditDirectoryDto {
    DirectoryId: string;
    DirectoryName: string;
    File: File
}
export default class DirectoryManagerService {
    static async addDirectory(dto: addDirectoryDto): Promise<AxiosResponse<string>> {
        const formData = new FormData();
        formData.append('DirectoryName', dto.DirectoryName) 
        formData.append('File', dto.File) 

        return $api.post('directory/add-directory', formData)
    }

    static async addArticle(dto: addArticleDto): Promise<AxiosResponse> {
        return $api.post('directory/add-article', dto)
    }

    static async getArticle(id: string): Promise<AxiosResponse<IArticle>> {
        return $api.get('directory/get-article/' + id)
    }

    static async editDirectory(dto: FormData): Promise<AxiosResponse> {
        return $api.put('directory/edit-directory/', dto)
    }

    static async deleteArticle(id: string): Promise<AxiosResponse> {
        return $api.delete('directory/delete-article/' + id)
    }

  

}