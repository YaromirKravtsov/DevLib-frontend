import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";

interface IRegiserDto{
    userName: string,
    email:string,
    password: string
}

export default class RegiserService {
    static async register(data:IRegiserDto) :Promise<AxiosResponse>{
        return await $api.post('/auth/register',data)
    }
}