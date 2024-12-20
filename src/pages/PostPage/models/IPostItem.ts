import { ICommentItem } from "../../../app/models/ICommentItem";

export interface IPostItem {
    postId: string;
    userId: string;
    postName: string;
    text: string;
    comments: ICommentItem[];
    dateTime: string;
    authorName: string;
    authorImg: string;
    commentsQuantity: [];
    imgLink:string;
}