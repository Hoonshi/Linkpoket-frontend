import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { useMobile } from '@/hooks/useMobile';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState } from 'react';

export default function PersonalPage() {
  const { member, pageDetails, isLoading, error } = useFetchPersonalPage();
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();
  const setUser = useUserStore((state) => state.setUser);

  const resolvedPageId = pageDetails?.pageId;

  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  useEffect(() => {
    if (member?.nickName && member?.email && member?.colorCode) {
      const { nickName, email, colorCode } = member;
      setUser(nickName, email, colorCode);
    }
  }, [member, setUser]);

  useEffect(() => {
    if (pageDetails?.pageId && pageDetails?.rootFolderId) {
      setPageInfo(pageDetails.pageId, 'VIEW');
      setParentsFolderId(pageDetails.rootFolderId);
    }
  }, [pageDetails, setPageInfo, setParentsFolderId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!pageDetails) return <div>No page data</div>;

  return (
    <div className="flex h-screen flex-col px-[102px] py-[56px]">
      {/* HEADER SECTION*/}
      {pageDetails && (
        <>
          <PageHeaderSection
            pageTitle={pageDetails.pageTitle}
            folderId={pageDetails.rootFolderId}
          />
          {/* Boundary line */}
          <div className="border-b-gray-30 mb-[40px] w-full border-b" />
        </>
      )}

      {/* CONTROLLER SECTION*/}
      <PageControllerSection />

      {/*CONTENT SECTION*/}
      <PersonalPageContentSection view={view} pageDetails={pageDetails} />
    </div>
  );
}
