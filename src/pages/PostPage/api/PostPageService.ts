import { AxiosResponse } from 'axios';
import { IPostItem } from '../models/IPostItem';
import { ICommentItem } from '../../../app/models/ICommentItem';
import $api from '../../../app/api/http';

interface CreateCommentDto {
    userId: string;
    text: string;
    postId: string;
}

interface CreateReplyCommentDto {
    userId: string;
    text: string;
    commentId: string;
}

interface UpdateCommentDto {
    comment_id: string;  
    text: string;
    userId: string;
}

export default class PostPageService {
    static async getPost(postId: string): Promise<AxiosResponse<IPostItem>> {
        return $api.get(`/post/${postId}`);
    }

    static async deletePost(postId: string): Promise<AxiosResponse<IPostItem>> {
        return $api.delete(`/post/${postId}`);
    }

    static async createComment(dto: CreateCommentDto): Promise<AxiosResponse> {
        return $api.post(`/comment`, dto);
    }

    static async createReplyComment(dto: CreateReplyCommentDto): Promise<AxiosResponse> {
        return $api.post(`/comment/reply`, dto);
    }

    static async updateComment(dto: UpdateCommentDto): Promise<AxiosResponse> {
            const response = await $api.put('/comment/update-coments', dto);
            return response; 
    }
    static async deleteComment(commentId: string): Promise<AxiosResponse> {
        try {
          return await $api.delete(`/comment/${commentId}`);
        } catch (error: any) {
          throw error;
        }
      }
      
}
