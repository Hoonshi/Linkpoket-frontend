import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PageStoreState {
  pageId: number;
  setPageInfo: (pageId: number) => void;
}

interface ParentsFolderIdStoreState {
  parentsFolderId: number | null;
  setParentsFolderId: (parentsFolderId: number) => void;
}

export const usePageStore = create<PageStoreState>()(
  persist(
    (set) => ({
      pageId: 0,
      setPageInfo: (pageId: number) => set({ pageId }),
    }),
    {
      name: 'page-store', // localStorage에 저장될 키 이름
    }
  )
);

export const useParentsFolderIdStore = create<ParentsFolderIdStoreState>()(
  persist(
    (set) => ({
      parentsFolderId: null,
      setParentsFolderId: (parentsFolderId: number) => set({ parentsFolderId }),
    }),
    {
      name: 'parents-folder-store', // localStorage에 저장될 키 이름
    }
  )
);
