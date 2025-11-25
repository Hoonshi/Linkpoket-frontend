import { lazy, useEffect } from 'react';

import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { usePageLayout } from '@/hooks/usePageLayout';
import { getPageDataLength } from '@/utils/pageData';
import { PageLayout } from '@/components/common-ui/PageLayout';
import ScrollToTopButton from '@/components/common-ui/ScrollToTopButton';
import { Spinner } from '@/components/common-ui/Spinner';
import { ErrorState } from '@/components/common-ui/ErrorState';

const PersonalPageContentSection = lazy(
  () => import('@/components/page-layout-ui/PersonalPageContentSection')
);

export default function PersonalPage() {
  const { data, isLoading, isError } = useFetchPersonalPage();

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  useEffect(() => {
    if (!data) return;

    const pageId = data.data.pageId;
    const rootFolderId = data.data.rootFolderId;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    localStorage.setItem(
      'personalPageData',
      JSON.stringify({
        data,
        lastUpdated: new Date().toISOString(),
      })
    );
  }, [data, setPageInfo, setParentsFolderId, setUser]);

  if (isError) {
    return <ErrorState message="개인 페이지를 불러올 수 없습니다." />;
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
        <PageHeaderSection pageTitle={pageTitle} />
        <PageControllerSection
          folderDataLength={folderDataLength}
          linkDataLength={linkDataLength}
          onSortChange={handleSort}
        />
        <PersonalPageContentSection
          folderData={folderData}
          linkData={linkData}
          sortType={sortType}
        />
        <ScrollToTopButton />
      </PageLayout>
    </>
  );
}
