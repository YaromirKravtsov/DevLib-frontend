import { AxiosResponse } from 'axios';
import { IPostItem } from '../models/IPostItem';
import $api from '../../../app/api/http';

export default class PostPageService {
    static async getPost(postId: string): Promise<AxiosResponse<IPostItem>> {
        return $api.get(`/post/${postId}`);
    }

    static async deletePost(postId: string): Promise<AxiosResponse<IPostItem>> {
        return $api.delete(`/post/${postId}`);
    }

    // static async getComments(postId: string): Promise<AxiosResponse<ICommentItem[]>> {
    //     return $api.get(`/comment`, { params: { postId } });
    // }

    // static async getReplies(commentId: string): Promise<AxiosResponse<ICommentItem[]>> {
    //     return $api.get(`/comment/reply`, { params: { commentId } });
    // }

}
