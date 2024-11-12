export interface ICommentItem {
    CommentId: string;
    UserId: string;
    Content: string;
    PostId: string;
    DateTime: string;
    Replies: ICommentItem[];
}