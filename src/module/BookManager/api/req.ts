export interface AddBookReq{
    BookName: string;
    Author: string;
    BookImg: File;
    BookPdf: File;
    tags: string[]
}