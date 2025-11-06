export type PageItemSearchRequest = {
  pageId: number;
  keyword: string;
  searchType: 'TITLE' | 'CONTENT';
};

export type PageItemSearchResponse = {
  directorySimpleResponses: Array<{
    folderId: number;
    folderName: string;
    isFavorite: boolean;
  }>;
  siteSimpleResponses: Array<{
    linkId: string;
    linkName: string;
    linkUrl: string;
    isFavorite: boolean;
    faviconUrl: string;
  }>;
};
