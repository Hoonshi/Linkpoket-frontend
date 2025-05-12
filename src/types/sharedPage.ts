export interface CreateSharedPageData {
  pageTitle: string;
  pageDescription?: string;
  pageType: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
