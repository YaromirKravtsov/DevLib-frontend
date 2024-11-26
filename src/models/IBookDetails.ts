import { ITag } from "./ITag";

export interface IRewiew {
    userImg: string,
    /*     rate: , */
    userName: string
    creationDate: string,
    text: string
}

export interface IBookDetails {
    bookName: string;
    bookId: string;
    author: string;
    reviews: IRewiew[];
    pdf: string;
    bookImg: string; 
    photoBook: string;
    averageRating: number; 
    tags: ITag[]
    
}
