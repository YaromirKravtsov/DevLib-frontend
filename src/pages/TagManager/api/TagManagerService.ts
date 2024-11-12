import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { ITag } from "../../../models/ITag";

export class TagManagerService {

    static async createTag(tagName: string): Promise<AxiosResponse> {
        return $api.post('/tag/add-tag',{tagText: tagName})
    }
    static async deleteTag(tagId: string): Promise<AxiosResponse> {
        return $api.delete('/tag/' + tagId)
    }

    static async editTag(tagId: string, name: string): Promise<AxiosResponse> {
        return $api.put('/tag/edit-tag', {
            tagId, name
        })
    }
}