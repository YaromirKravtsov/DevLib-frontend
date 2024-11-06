import create from 'zustand';
import $api from '../../../app/api/http';
import { devtools } from 'zustand/middleware';

export type THeaderVersion = 'normal' | 'small' | 'minimized';

interface HeaderState {
  value: string,
  headerVersion: THeaderVersion; //note версия шапки - маленькая или большая
  requestUrl: string, //note url для запроса, который отправляется при нажатии кнопки поиска в инпуте  
  response: any[], //note ответ который приходит от сервера после отработки запроса поска 
  requestIsLoading: boolean,
  setRequestIsLoading: (value: boolean) => void
  filerValue: string,
  setValue: (value: string) => void;
  setRequestUrl: (value: string) => void;
  getData: () => void,
  setFilterValue: (value: string) => void,
  setHeaderVersion: (value: THeaderVersion) => void //note установление значения версии шапки - маленькая или большая

}
export const useHeaderStore = create<HeaderState>()(

  (set, get) => ({
    value: '',
    headerVersion: 'normal',
    filerValue: 'Книги',
    requestUrl: '',
    response: [],
    requestIsLoading: false,
    setValue: (value: string) => {
      set({ value });
    },

   getData: async () => {
    set({ requestIsLoading: true });
    try {
      const { value, requestUrl } = get();
      const searchUrl = `${requestUrl}${value || ''}`;
      const { data } = await $api.get(searchUrl);
      set({ response: data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ requestIsLoading: false });
    }
  },
    setFilterValue: (value: string) => {
      set({ filerValue: value });
    },
    setHeaderVersion: (value: THeaderVersion) => {
      set({ headerVersion: value });
    },
    setRequestIsLoading: (value: boolean) => {
      set({ requestIsLoading: value });
    },
    setRequestUrl(value: string) {
      set({ requestUrl: value });
    },
  })


);