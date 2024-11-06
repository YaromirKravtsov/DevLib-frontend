import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IDirectoryItem } from "../../../models/IDirectoryItem";

//import directoriesList from '../../../api/directories/list.json';
//import { IDirectoryItem } from "../../../app/models/IDirectoryItem";



export default class DirectoriesPageService {
    static async getDirectories(directoryName: string = ""): Promise<IDirectoryItem[]> {
        const response: AxiosResponse<IDirectoryItem[]> = await $api.get(`directory/search-directories/${directoryName}`);
        return response.data;
    }
}
