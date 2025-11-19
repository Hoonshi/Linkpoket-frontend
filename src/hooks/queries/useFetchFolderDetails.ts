import fetchFolderDetails from '@/apis/folder-apis/fetchFolderDetails';
import { FetchFolderDetailsProps } from '@/types/folders';
import { useQuery } from '@tanstack/react-query';

export default function useFetchFolderDetails(
  data: FetchFolderDetailsProps,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['folderDetails', data.pageId, data.folderId],
    queryFn: () => fetchFolderDetails(data),
    enabled: enabled && !!data.folderId && !!data.pageId, // enabled가 true이고 필수 데이터 있을 때만 실행
    retry: false, // 500 에러는 재시도 안함
    throwOnError: false, // 에러 발생해도 컴포넌트 크래시 방지
    placeholderData: (prev) => prev,
  });
}
