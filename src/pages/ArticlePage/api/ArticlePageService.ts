import $api from "../../../app/api/http";
import { AxiosResponse } from "axios";
import { IArticle } from "../../../models/IArticle";

interface ArticleData {
    ArticleId: string;
    ChapterName: string;
    Text: string;
}

interface ChapterData {
    ChapterId: string;
    Name: string;
}

interface DirectoryData {
    DirectoryId: string;
    DirectoryName: string;
    Articles: { ArticleId: string; ChapterName: string }[];
}

export default class ArticlePageService {
    static async getArticle(articleId: string): Promise<AxiosResponse<IArticle>> {
        return await $api.get<IArticle>(`/directory/get-article/${articleId}`);

    }
    /* 
        static async getChapters(directoryId: string): Promise<ChapterData[]> {
            const response: AxiosResponse<ChapterData[]> = await $api.get(`/directory/get-all-chapter-name/${directoryId}`);
            return response.data;
        }
    
        static async getDirectory(directoryId: string): Promise<DirectoryData> {
            const response: AxiosResponse<DirectoryData> = await $api.get(`/directory/get-directory/${directoryId}`);
            return response.data;
        } */
}
