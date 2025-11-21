import { lazy, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchSharedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';
import { Spinner } from '@/components/common-ui/Spinner';

const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function SharedPage() {
  const { pageId: pageIdParam } = useParams();
  const pageId = pageIdParam ?? '';
  const { data, isLoading } = useFetchSharedPage(pageId);

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  useEffect(() => {
    if (!pageId || !data) return;

    const rootFolderId = data.data.rootFolderId;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }
  }, [pageId, data, setPageInfo, setParentsFolderId]);

  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <Spinner display={true} position="center" />
      </div>
    );
  }

  // data가 없으면 렌더링하지 않음 (Zod 검증 실패 또는 에러 상태)
  if (!data) {
    return null;
  }

  const folderData = data.data.folderDetailResponses;
  const linkData = data.data.linkDetailResponses;
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const pageTitle = data.data.pageTitle;

  return (
    <>
      <BackButton />
      <CopyLinkButton />
      <PageLayout>
        <PageHeaderSection pageTitle={pageTitle} pageId={pageId} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
        />
        <SharedPageFolderContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
        />
        <ScrollToTopButton />
      </PageLayout>
    </>
  );
}
