import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  nickname: string;
  email: string;
  colorCode: string;
  setUser: (nickname: string, email: string, colorCode: string) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: '',
      email: '',
      colorCode: '',
      setUser: (nickname: string, email: string, colorCode: string) =>
        set({ nickname, email, colorCode }),
    }),
    {
      name: 'user-store',
    }
  )
);
