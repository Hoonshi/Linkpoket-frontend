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
import { Spinner } from '@/components/common-ui/Spinner';
import { ErrorState } from '@/components/common-ui/ErrorState';

const SharedPageFolderContentSection = lazy(
  () => import('@/components/page-layout-ui/SharedPageFolderContentSection')
);

export default function SharedPage() {
  const { pageId: pageIdParam } = useParams();
  const pageId = pageIdParam ?? '';
  const { data, isLoading, isError } = useFetchSharedPage(pageId);

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

  if (isError) {
    return <ErrorState message="공유 페이지를 불러올 수 없습니다." />;
  }

  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <Spinner display={true} position="center" />
      </div>
    );
  }

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
