export type CreateFolderData = {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  folderName: string;
  parentFolderId: string;
};

export type TransferFolderData = {
  baseRequest: {
    pageId: number;
    commandType: 'DIRECTORY_TRANSMISSION';
  };
  receiverEmail: string;
  directoryId: number;
};

export type TransferFolderResponse = {
  data: {
    receiverEmail: string;
    senderEmail: string;
    directoryName: string;
    directoryTransmissionId: number;
  };
};

export type FolderDetail = {
  folderId: number;
  folderName: string;
  isFavorite: boolean;
  orderIndex: number;
  createdDate: string;
};

export type FolderDetailResponse = Array<FolderDetail>;

export type UpdateFolderData = {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  folderName: string;
  folderId: string;
  folderDescription?: string;
};

export type DeleteFolderData = {
  baseRequest: {
    pageId: string;
    commandType: string;
  };
  folderId: string;
};

export interface FetchFolderDetailsProps {
  pageId: string;
  commandType: string;
  folderId: string;
  sortType: string;
}
