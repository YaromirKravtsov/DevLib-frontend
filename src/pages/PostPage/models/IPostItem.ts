import { ICommentItem } from "../../../app/models/ICommentItem";

export interface IPostItem {
    PostId: string;
    UserId: string;
    IsArticle: boolean;
    Title: string;
    Text: string;
    comments?: ICommentItem[];
    DateTime: string;
}