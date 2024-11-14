import { AxiosResponse } from "axios";
import $api from "../../app/api/http";
import { ICommentItem } from "../../app/models/ICommentItem";
import { IReplyItem } from "../../app/models/IReplyItem";

export default class CommentService {
static async addComment(newComment: ICommentItem): Promise<AxiosResponse<ICommentItem>> {
    console.log("here", newComment)
     return $api.post(`/comment`, newComment);
 }

 static async addReply(newReply: IReplyItem): Promise<AxiosResponse<IReplyItem>> {
     return $api.post(`/comment/reply`, newReply);
 }
 
 static async deleteComment(commentId: string): Promise<AxiosResponse<void>> {
     return $api.delete(`/comment/${commentId}`);
 }
}