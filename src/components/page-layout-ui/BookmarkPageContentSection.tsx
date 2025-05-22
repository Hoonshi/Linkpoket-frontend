import { PageContentSectionProps } from '@/types/pageItems';
import useFetchFavorite from '@/hooks/queries/useFetchFavorite';
export default function BookmarkPageContentSection({
  view,
}: PageContentSectionProps) {
  const favoriteQuery = useFetchFavorite();

  // 실제 사용할 데이터
  const data = favoriteQuery.favorite;

  console.log(data);

  return (
    <div
      className={`mx-auto mt-[40px] w-full max-w-[1180px] flex-1 overflow-y-auto px-[104px] text-3xl font-bold`}
    >
      <div
        className={`w-full max-w-[1180px] min-w-[328px] ${
          view === 'grid'
            ? 'grid-cols-custom grid gap-4'
            : 'flex flex-col gap-4'
        }`}
      ></div>
    </div>
  );
}
