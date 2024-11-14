import { ITag } from "../../../models/ITag";
import { SelectOption } from "../../../UI/MySelect/MySelect";

export const tagsToSelectItems = (tags: ITag[]):SelectOption[] =>{
    return tags.map(tag=> {
        return {
            value: tag.tagId,
            label: tag.tagText
        }
    })
}