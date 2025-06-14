import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMobile } from '@/hooks/useMobile';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSharedPage';
import { usePageStore, useParentsFolderIdStore } from '@/stores/pageStore';
import SharedPageContentSection from '@/components/page-layout-ui/SharedPageContentSection';
import PageHeaderSection from '@/components/page-layout-ui/PageHeaderSection';
import PageControllerSection from '@/components/page-layout-ui/PageControllerSection';
import useFetchSharedPageDashboard from '@/hooks/queries/useFetchSharedPageDashboard';
import useFetchSharedPageMember from '@/hooks/queries/useFetchSharedPageMember';
import { usePageSearch } from '@/hooks/usePageSearch';
import { useBreadcrumbStore } from '@/stores/breadcrumb';
export default function SharedPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      setView('list');
    }
  }, [isMobile]);

  //만약 path param이 없다면 1로 간주하고, 있다면 그대로 꺼내와서 사용.
  const { pageId } = useParams();

  // 개인 페이지는 pageId가 URL에 없으므로 기본값 1 사용
  // 공유 페이지는 /shared/:pageId 형식으로 들어오므로 param에서 추출
  const resolvedPageId = pageId ? parseInt(pageId) : 1;

  const { searchKeyword, setSearchKeyword, searchResult } = usePageSearch(
    resolvedPageId,
    'TITLE'
  );

  // 클릭해서 들어간 페이지 정보 전역 변수로tj 저장
  const { setPageInfo } = usePageStore();
  const { setParentsFolderId } = useParentsFolderIdStore();

  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  useEffect(() => {
    const rootFolderId = selectedPageQuery.data?.data?.rootFolderId;

    if (rootFolderId) {
      setPageInfo(resolvedPageId, 'VIEW');
      setParentsFolderId(rootFolderId);
    }
  }, [resolvedPageId, selectedPageQuery.data?.data?.rootFolderId]); // rootFolderId만 감시해 불필요한 실행 방지

  //TODO: 해당 값을 통해서 현재 공유페이지의 정보 리스팅
  const sharedPageDashboardQuery = useFetchSharedPageDashboard({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  const sharedPageMemberQuery = useFetchSharedPageMember({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  console.log('페이지 대쉬보드 정보', sharedPageDashboardQuery.data);
  console.log('페이지 멤버 정보', sharedPageMemberQuery.data);

  //BreadCrumb용 공유페이지 정보 추가
  const { addCrumb } = useBreadcrumbStore();

  const selectedPage = selectedPageQuery.data?.data;

  useEffect(() => {
    if (selectedPage) {
      addCrumb({
        id: selectedPage.pageId.toString(),
        title: selectedPage.pageTitle,
        type: 'shared',
      });
    }
  }, [selectedPage, addCrumb]);

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER SECTION*/}
      {selectedPage && (
        <>
          <PageHeaderSection
            pageTitle={selectedPage.pageTitle}
            pageDescription={selectedPage.pageDescription}
            folderId={selectedPage.rootFolderId}
          />
          {/* Boundary line */}
          <div className="border-b-gray-30 mb-[40px] w-full border-b" />
        </>
      )}

      {/* CONTROLLER SECTION*/}
      <PageControllerSection
        view={view}
        setView={setView}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      {/*CONTENT SECTION*/}
      <SharedPageContentSection
        view={view}
        contentData={selectedPage}
        searchResult={searchResult}
      />
    </div>
  );
}
