import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { IForumPost } from "../../../app/models/IForumPage";

export default class ForumPageService {
  static async getPosts(): Promise<IForumPost[]> {
    const response: AxiosResponse<IForumPost[]> = await $api.get('post'); 
    console.log(response.data);
    return response.data;
  }
}
