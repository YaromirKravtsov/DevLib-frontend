import { AxiosResponse } from "axios";
import $api from "../../../app/api/http";
import { Note } from "../ReadingPage";
export interface createNoteDto{
    userId: string;
    bookId: string;
    text: string;
}
export default class ReadingPageServce {
    static async getNotes(bookId: string, userId:string):Promise<AxiosResponse<Note[]>>{
        return $api.get('note/get-notes/'+bookId+'/' + userId)
    }

    static async createNote(dto: createNoteDto):Promise<AxiosResponse<Note[]>>{
        return $api.post('note/add-note/',dto )
    }

    static async deleteNote(id:string):Promise<AxiosResponse>{
        return $api.delete('note/delete-note/'+ id)
    }
    
}