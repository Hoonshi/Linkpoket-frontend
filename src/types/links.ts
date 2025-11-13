export type CommandType = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';

export type BaseRequest = {
  pageId: number;
  commandType: CommandType;
};

export interface LinkDetail {
  linkId: number;
  linkName: string;
  linkUrl: string;
  isFavorite: boolean;
  faviconUrl: string;
  representImageUrl: string;
  providerName: string;
  orderIndex: number;
  createdDate: string | number;
}

export type CreateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  folderId: number;
  description: string;
};

export type DeleteLinkData = {
  baseRequest: BaseRequest;
  linkId: number;
};

export type UpdateLinkData = {
  baseRequest: BaseRequest;
  linkName: string;
  linkUrl: string;
  linkId: number;
};

export type PreviewLinkData = {
  baseRequest: BaseRequest;
  linkUrl: string;
};

export type CommonApiResponse = {
  status: number;
  message: string;
  data: string;
};

export type CreateLinkResponse = CommonApiResponse;
export type UpdateLinkResponse = CommonApiResponse;
export type DeleteLinkResponse = CommonApiResponse;
export type PreviewLinkResponse = CommonApiResponse;
