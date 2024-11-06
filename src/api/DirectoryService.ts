import { AxiosResponse } from "axios";
import { IDirectoryItem } from "../models/IDirectoryItem";
import $api from "../app/api/http";
import { IDirectory } from "../models/IDirectory";



export default class DirecoryService {
    static async getDirectory(directoryId: string): Promise<AxiosResponse<IDirectory>> {
        return $api.get(`/directory/get-directory/${directoryId}`);
    }
}