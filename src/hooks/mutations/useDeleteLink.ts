import { deleteLink } from '@/apis/link-apis/deleteLink';
import { DeleteLinkData, DeleteLinkResponse } from '@/types/links';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

export function useDeleteLink(
  options?: UseMutationOptions<DeleteLinkResponse, unknown, DeleteLinkData>
) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const locationSplit = location.pathname.split('/');
  const isMainPage = location.pathname === '/';
  const isSharedPage = locationSplit.includes('shared');
  const isFolderPage = locationSplit.includes('folder');

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: (response, variables, context) => {
      // 현재 페이지의 모든 관련 쿼리 무효화

      // 일반 페이지 쿼리 무효화
      if (isSharedPage) {
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      // 폴더 상세 페이지 쿼리 무효화 (모든 폴더 ID에 대해)
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderDetails', variables.baseRequest.pageId],
          refetchType: 'active',
        });
      }
      if (isFolderPage) {
        queryClient.invalidateQueries({
          queryKey: ['folderList', variables.baseRequest.pageId],
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
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
