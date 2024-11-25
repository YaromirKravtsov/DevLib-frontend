export interface ICommentItem {
    commentId: string;
    userId: string;
    text: string;
    postId: string;
    dateTime: string;
    comments: ICommentItem[];
    authorName:string
}