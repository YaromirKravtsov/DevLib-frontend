import { AxiosResponse } from "axios";
import { ITag } from "../../models/ITag";
import $api from "../../app/api/http";

export default class TagsService{
    static async getAllTags():Promise<AxiosResponse<ITag[]>>{
        return $api.get('/tag/get-tags');
    }
}