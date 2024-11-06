import axios, { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { LoginResponse } from "../../../app/api/service/AppService";

interface ILoginDto{
    email:string,
    password: string
}



export default class LoginService {
    static async login(data:ILoginDto) :Promise<AxiosResponse>{
        return await $api.post('login',data)
    }
   /*  static async loginGoogle(params:ILoginGoogleDto) :Promise<AxiosResponse<LoginResponse>>{
        return await $api.post('auth/login-with-google', params)
    } */
   /*  static async getGitAccess(code: string): Promise<AxiosResponse> {
        return await axios.post(
           "http://localhost:5000/applications/code?code="+code
        );
    } */

}