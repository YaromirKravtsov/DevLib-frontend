import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
export interface IUserInfo {
    email: string,
    comments: [],
    photo: string,
    posts: [],
    username: string
}
export interface EditUserInfoDto {
    UserId: string,
    Email: string,
    UserName:string,
}
export class EditProfilePageService {
    static async getUserInfo(userId: string):Promise<AxiosResponse<IUserInfo>> {
        return await $api.get<IUserInfo>('/user/'+userId)
    }

    static async editUserInfo(dto: FormData):Promise<AxiosResponse> {
        return await $api.put('/user/edit-profile',dto)
    }
}