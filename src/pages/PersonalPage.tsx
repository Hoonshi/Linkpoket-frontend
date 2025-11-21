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
import { BackButton } from '@/components/common-ui/BackButton';
import { CopyLinkButton } from '@/components/common-ui/CopyLinkButton';
import { Spinner } from '@/components/common-ui/Spinner';

const PersonalPageContentSection = lazy(
  () => import('@/components/page-layout-ui/PersonalPageContentSection')
);

export default function PersonalPage() {
  const { data, isLoading } = useFetchPersonalPage();

  const { setUser } = useUserStore();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const { sortType, handleSort } = usePageLayout();

  const folderData = data?.data.folderDetailResponses ?? [];
  const linkData = data?.data.linkDetailResponses ?? [];
  const { folderDataLength, linkDataLength } = getPageDataLength(
    folderData,
    linkData
  );

  const pageId = data?.data.pageId ?? '';
  const rootFolderId = data?.data.rootFolderId ?? '';
  const pageTitle = data?.data.pageTitle ?? '';

  useEffect(() => {
    if (!pageId) return;

    setPageInfo(pageId);

    if (rootFolderId) {
      setParentsFolderId(rootFolderId);
    }

    if (data?.data) {
      localStorage.setItem(
        'personalPageData',
        JSON.stringify({
          data,
          lastUpdated: new Date().toISOString(),
        })
      );
    }
  }, [pageId, rootFolderId, data, setPageInfo, setParentsFolderId, setUser]);

  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <Spinner display={true} position="center" />
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <CopyLinkButton />
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
