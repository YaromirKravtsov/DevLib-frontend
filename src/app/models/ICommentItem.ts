import { IReplyItem } from "./IReplyItem";
export interface ICommentItem {
    commentId: string;
    userId: string;
    text: string;
    postId: string;
    dateTime?: string;
    replies: IReplyItem[];
}