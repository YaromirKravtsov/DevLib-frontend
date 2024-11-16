import create from 'zustand';
import { devtools } from 'zustand/middleware';

import axios from 'axios';
import AppService from '../api/service/AppService';
import { jwtDecode } from 'jwt-decode';
import $api from '../api/http';

export interface IGoogleRes {
  clientId: string;
  credential: string;
  select_by: string;
}
interface BearState {
  userId: string;
  loggedIn: boolean;
  role: string;
  isLoading: boolean;
  setUserId: (userId: string) => void;
  setLoggedIn: (value: boolean) => void;
  setRole: (role: string) => void;
  setIsLoading: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => void;
  loginWithGoogle: (dto: IGoogleRes) => void,
  loginWithGithub: (code: string) => void
}
export const useAuthStore = create<BearState>()(
  devtools((set) => ({
    userId: '',
    loggedIn: false,
    setUserId: (userId: string) => set(() => ({ userId })),
    setLoggedIn: (value: boolean) => set(() => ({ loggedIn: value })),
    role: '',
    setRole: (role: string) => set(() => ({ role })),
    isLoading: true,
    setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
    login: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const { data } = await AppService.login(email, password);
        const decodedToken: any = jwtDecode(data.token);
        set({
          loggedIn: true,
          role: (decodedToken.role == 'Client') ? 'user' : (decodedToken.role == 'Admin') ? 'admin' : '',
          isLoading: false,
          setUserId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        });

        localStorage.setItem('token', data.token);
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false });
      }
    },
    loginWithGoogle: async (dto: IGoogleRes) => {
      set({ isLoading: true });
      try {
        const { data } = await AppService.loginGoogle({ userId: dto.clientId, token: dto.credential });
        const decodedToken: any = jwtDecode(data.token);
        set({
          loggedIn: true,
          role: (decodedToken.role == 'Client') ? 'user' : (decodedToken.role == 'Admin') ? 'admin' : '',
          isLoading: false,
          userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        });

        localStorage.setItem('token', data.token);
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false });
      }
    },
    loginWithGithub: async (code: string) => {
      set({ isLoading: true });
      try {
        const { data } = await AppService.loginGitHub(code);
        const decodedToken: any = jwtDecode(data.token);
        set({
          loggedIn: true,
          role: (decodedToken.role == 'Client') ? 'user' : (decodedToken.role == 'Admin') ? 'admin' : '',
          isLoading: false,
          userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        });

        localStorage.setItem('token', data.token);
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false });
      }
    },
    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const decodedToken: any = jwtDecode(localStorage.getItem('token') as string);
        set({
          loggedIn: true,
          role: (decodedToken.role == 'Client') ? 'user' : (decodedToken.role == 'Admin') ? 'admin' : '',
          isLoading: false
        });
      } catch (error: any) {
        console.error(error.response?.data?.message);
        set({ isLoading: false, loggedIn: false });  // Обязательно сбрасываем isLoading и loggedIn в случае ошибки
      }
    },
    logout: () => {
      set({ loggedIn: false, role: '', isLoading: false });
      localStorage.removeItem('token');

    }
  }))
);
