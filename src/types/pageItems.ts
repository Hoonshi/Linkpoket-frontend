export type ViewType = 'grid' | 'list';

export interface ContentData {
  folders?: Array<{
    id: number;
    title: string;
  }>;
  links?: Array<{
    id: number;
    title: string;
    linkUrl?: string;
  }>;
}

export interface PageItemProps {
  item: {
    id: number;
    title: string;
    linkUrl?: string;
  };
  isBookmark: boolean;
  setIsBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  view: ViewType;
  pageDescription?: string;
}

export interface PageContentSectionProps {
  view: ViewType;
  contentData?: any;
  pageDescription?: string;
}

export interface PageControllerSectionProps extends PageContentSectionProps {
  setView: React.Dispatch<React.SetStateAction<'list' | 'grid'>>;
}
