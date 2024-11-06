import create from "zustand";
import DirectoryManagerService from "../api/DirectoryManagerService";

export interface IArticle {
  articleName: string;
  articleContent: string;
  directoryId?: string;
  articleId: string
}
type Page = 'directory' | 'article'
interface DirectoryManagerState {
  articles: IArticle[];
  directoryName: string;
  file: File | null;
  directoryId: string;
  currentArticleId: string;
  page: Page;
  firstArticles:IArticle[];
  isFirstLoad:boolean, 
  setIsFirstLoad: (value: boolean) => void;
  setFirstArticles:  (firstArticles: IArticle[]) => void;
  setPage: (page: Page) => void
  setArticles: (articles: IArticle[]) => void;
  setDirectoryName: (name: string) => void;
  setFile: (file: File | null) => void;
  setDirectoryId: (id: string) => void;
  addArticle: (article: IArticle) => void;
  removeArticle: (id:string) => void;
  setCurrentArticleId: (value: string) => void;
  addDirectory: () => void;
  resetState: ()=> void
}

const useDirectoryManagerStore = create<DirectoryManagerState>((set, get) => ({
  articles: [],
  directoryName: '',
  file: null,
  directoryId: '',
  currentArticleId: '',
  page: 'directory',
  firstArticles: [],
  isFirstLoad:true, 
  setIsFirstLoad: (isFirstLoad: boolean) => set({isFirstLoad}),
  setFirstArticles:  (firstArticles: IArticle[]) => set({firstArticles}),
  setPage: (page: Page) => set({page}),
  addArticle: (article: IArticle) => set((state) => ({ articles: [...state.articles, article] })),
  setCurrentArticleId: (currentArticleId) => set({currentArticleId}),
  setArticles: (articles) => set({articles}),
  setDirectoryName: (name) => set({ directoryName: name }),
  setFile: (file) => set({ file }),
  setDirectoryId: (id) => set({ directoryId: id }),
  removeArticle: (id: string) => {
    set((state) => ({
      articles: state.articles.filter((item) => item.articleId !== id)
    }));
  },
  addDirectory: async () => {
    const currentArticles = get().articles; 
    const file = get().file; 
    const directoryName = get().directoryName; 
    console.log(directoryName, file,currentArticles)
    try{
        const {data} = await DirectoryManagerService.addDirectory({DirectoryName : directoryName, File: file as File});
        currentArticles.forEach(async (article) => {
            await DirectoryManagerService.addArticle({
                articleContent: article.articleContent,
                articleName: article.articleName,
                directoryId: data
            })
        })
    }catch(e){
        console.log(e);
    }
  },
  resetState: () => set({
    articles: [],
    directoryName: '',
    file: null,
    directoryId: '',
    currentArticleId: '',
    page: 'directory',
    firstArticles: [],
    isFirstLoad: true
  })


}));

export default useDirectoryManagerStore;
