import { IArticleItem } from "../pages/ReferencePage/models/article";


export interface IDirectory {
    directoryId: string;
    directoryName: string;
    imgLink: string;
    articles: IArticleItem[];
}