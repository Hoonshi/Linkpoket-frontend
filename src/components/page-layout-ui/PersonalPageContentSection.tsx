import { useState, useEffect } from 'react';
import FolderItem from './FolderItem';
import LinkItem from './LinkItem';
import { ContextMenu } from '../common-ui/ContextMenu';
import { PageContentSectionProps } from '@/types/pageItems';
import { useParams } from 'react-router-dom';
import { useFetchSelectedPage } from '@/hooks/queries/useFetchSelectedPage';
import { usePageStore } from '@/stores/pageStore';

export default function PersonalPageContentSection({
  view,
}: PageContentSectionProps) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  //만약 path param이 없다면 1로 간주하고, 있다면 그대로 꺼내와서 사용.
  const { pageId } = useParams();

  let resolvedPageId = 1;
  if (pageId) {
    resolvedPageId = parseInt(pageId);
  }

  // 클릭해서 들어간 페이지 정보 전역 변수로사 저장
  const { setPageInfo } = usePageStore();

  useEffect(() => {
    setPageInfo(resolvedPageId, 'VIEW');
  }, [resolvedPageId, setPageInfo]);

  const selectedPageQuery = useFetchSelectedPage({
    pageId: resolvedPageId,
    commandType: 'VIEW',
  });

  // 실제 사용할 데이터
  console.log('선택한 페이지 데이터', selectedPageQuery.data);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto px-[104px] text-3xl font-bold`}
    >
      <div
        className={`w-full max-w-[1180px] min-w-[328px] ${
          view === 'grid'
            ? 'grid-cols-custom grid gap-4'
            : 'flex flex-col gap-4'
        }`}
      >
        <FolderItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '폴더 이름' }}
          view={view}
        />
        <LinkItem
          isBookmark={isBookmark}
          setIsBookmark={setIsBookmark}
          item={{ id: '1', title: '링크 이름' }}
          view={view}
        />

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </div>
    </div>
  );
}
