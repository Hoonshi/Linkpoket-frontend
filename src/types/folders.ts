export type CreateFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderName: string;
  parentFolderId: number;
};

export type TransferFolderData = {
  baseRequest: {
    pageId: number;
    commandType: 'DIRECTORY_TRANSMISSION';
  };
  receiverEmail: string;
  folderId: number;
};

export type TransferFolderResponse = {
  data: {
    receiverEmail: string;
    senderEmail: string;
    folderName: string;
    folderTransmissionId: string;
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
    pageId: number;
    commandType: string;
  };
  folderName: string;
  folderId: number;
  folderDescription?: string;
};

export type DeleteFolderData = {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  folderId: number;
};

export interface FetchFolderDetailsProps {
  pageId: number;
  commandType: string;
  folderId: number;
  sortType: string;
}

export interface UpdateDragandDropProps {
  baseRequest: {
    pageId: number;
    commandType: string;
  };
  targetId: string;
  itemType: string;
  newOrderIndex: number;
  fromFolderId: number;
  toFolderId: number;
}
