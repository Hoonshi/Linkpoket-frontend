import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import deleteFolder from '@/apis/folder-apis/deleteFolder';
import { DeleteFolderData } from '@/types/folders';
import { useLocation } from 'react-router-dom';

export default function useDeleteFolder(
  pageId: string,
  options?: UseMutationOptions<any, unknown, DeleteFolderData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    ...options,
    mutationFn: deleteFolder,
    onSuccess: (response, variables, context) => {
      // 현재 페이지의 모든 관련 쿼리 무효화

      // 일반 페이지 쿼리 무효화
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', pageId],
          refetchType: 'active',
        });
      }
      // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', pageId],
          refetchType: 'active',
        });
      }

      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderList', pageId],
          refetchType: 'active',
        });
      }
      // 메인 페이지에서만 personalPage 캐시 무효화
      if (isMainPage) {
        queryClient.invalidateQueries({
          queryKey: ['personalPage'],
          refetchType: 'active',
        });
      }
      if (options?.onSuccess) {
        options.onSuccess(response, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('폴더 삭제 에러:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
