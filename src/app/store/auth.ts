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
  isBanned: boolean; 
  setIsBanned: (value: boolean) => void;
}
export const useAuthStore = create<BearState>()(
  devtools((set) => ({
    userId: '',
    loggedIn: false,
    role: '',
    isLoading: true,
    isBanned: false,

    setUserId: (userId: string) => set(() => ({ userId })),
    setLoggedIn: (value: boolean) => set(() => ({ loggedIn: value })),
    setRole: (role: string) => set(() => ({ role })),
    setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),
    setIsBanned: (value: boolean) => set(() => ({ isBanned: value })),

    login: async (email: string, password: string) => {
      set({ isLoading: true });
      try {
        const { data } = await AppService.login(email, password);
        const decodedToken: any = jwtDecode(data.token);

        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        set({
          loggedIn: true,
          role: decodedToken.role === 'Client' ? 'user' : decodedToken.role === 'Admin' ? 'admin' : '',
          isLoading: false,
          userId,
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', userId); // Додаємо збереження userId
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false });
        if (error.response?.data === "User is banned.") {
          set({ isBanned: true });
        }
      }
    },

    loginWithGoogle: async (dto: IGoogleRes) => {
      set({ isLoading: true });
      try {
        const { data } = await AppService.loginGoogle({ userId: dto.clientId, token: dto.credential });
        const decodedToken: any = jwtDecode(data.token);

        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        set({
          loggedIn: true,
          role: decodedToken.role === 'Client' ? 'user' : decodedToken.role === 'Admin' ? 'admin' : '',
          isLoading: false,
          userId,
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', userId); // Зберігаємо userId
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

        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        set({
          loggedIn: true,
          role: decodedToken.role === 'Client' ? 'user' : decodedToken.role === 'Admin' ? 'admin' : '',
          isLoading: false,
          userId,
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', userId); // Зберігаємо userId
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const decodedToken: any = jwtDecode(token);

        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        set({
          loggedIn: true,
          role: decodedToken.role === 'Client' ? 'user' : decodedToken.role === 'Admin' ? 'admin' : '',
          isLoading: false,
          userId,
        });

        localStorage.setItem('userId', userId); // Додаємо збереження userId у checkAuth
      } catch (error: any) {
        console.error(error);
        set({ isLoading: false, loggedIn: false });
      }
    },

    logout: () => {
      set({ loggedIn: false, role: '', isLoading: false, userId: '' }); // Скидаємо userId при виході
      localStorage.removeItem('token');
      localStorage.removeItem('userId'); // Видаляємо userId
    },
  }))
);

