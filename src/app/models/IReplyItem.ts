export interface IReplyItem {
    commentId: string;
    userId: string;
    text: string;
    postId: string;
    dateTime?: string;
    replies?: IReplyItem[];
}