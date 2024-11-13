import { create } from "zustand";
import { ITag } from "../../../models/ITag";
import { TagManagerService } from "../api/TagManagerService";
import TagsService from "../../../api/tags/TagsService";

interface TagsState {
  tagName: string;
  setTagName: (tagName: string) => void;
  

  
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  tags: ITag[];
  fetchTags: () => void;
  
  createTag: () => void;
  
  clearTagFields: () => void;
  
  deleteTag: (id: string) => void;

  
  editTag: () => void;
  
  editTagId: string;
  setEditTagId: (editTagId: string) => void;
}

const useTagStore = create<TagsState>((set, get) => ({
  tagName: '',
  setTagName: (tagName: string) => set({ tagName }),

  editMode: false,
  setEditMode: (editMode: boolean) => set({ editMode }),

  tags: [],
  fetchTags: async () => {
    try{
      const {data} =await TagsService.getAllTags()
      set({tags: data})
    }catch(error){
      console.error(error)
    }
  },

 

  createTag: async () => {
    const { tagName, fetchTags, clearTagFields } = get();
    try {
      await TagManagerService.createTag(tagName)
      await fetchTags();
      clearTagFields();
    } catch (error) {
      console.log(error);
    }
  },

  clearTagFields: () => {
    set({ tagName: ''});
  },

  deleteTag: async (id: string) => {
    const { fetchTags } = get();
    try {
      await TagManagerService.deleteTag(id)
      await fetchTags();
    } catch (error) {
      console.log(error);
    }
  },

  editTag: async () => {
    const { tagName, fetchTags, editTagId } = get();
    try {
      await TagManagerService.editTag(editTagId,tagName )

      await fetchTags();
    } catch (error) {
      console.log(error);
    }
  },
  editTagId: '',
  setEditTagId: (editTagId: string) => set({ editTagId }),
}));

export default useTagStore;
