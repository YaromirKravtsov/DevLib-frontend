import { AxiosResponse } from "axios"
import $api from "../../../app/api/http"

export interface CreatePostDto {
    postName: string,
    text:string,
    userId: string
}

export class CreatePostServoce{
    static async createPost(dto: CreatePostDto):Promise<AxiosResponse<string>>{
        return $api.post('/post',dto)
    }
}