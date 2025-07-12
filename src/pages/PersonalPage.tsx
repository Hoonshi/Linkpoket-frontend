import { useEffect } from 'react';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PersonalPageContentSection from '@/components/page-layout-ui/PersonalPageContentSection';
import { useFetchPersonalPage } from '@/hooks/queries/useFetchPersonalPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';

export default function PersonalPage() {
  const { data } = useFetchPersonalPage();
  console.log('pageDetails', data);
  console.log('pageDetails', data);
  const refinedData = data?.data.pageDetails;
  const pageTitle = refinedData?.pageTitle;
  const rootFolderId = refinedData?.rootFolderId;
  const folderDataLength = refinedData?.directoryDetailRespons.length;
  const linkDataLength = refinedData?.siteDetailResponses.length;

  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  useEffect(() => {
    setPageInfo(data?.data.pageId as string);
    setParentsFolderId(rootFolderId);
  }, [data?.data.pageId, setPageInfo, setParentsFolderId, rootFolderId]);

  return (
    <div className="flex h-screen min-w-[328px] flex-col px-[64px] py-[56px] xl:px-[102px]">
      <PageHeaderSection pageTitle={pageTitle} />
      <PageControllerSection
        folderDataLength={folderDataLength}
        linkDataLength={linkDataLength}
      />
      <PersonalPageContentSection />
    </div>
  );
}
