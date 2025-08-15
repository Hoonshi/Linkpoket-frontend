import updateDragandDrop from '@/apis/folder-apis/updateDragandDrop';
import { UpdateDragandDropProps } from '@/types/folders';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateDragandDrop(data: UpdateDragandDropProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDragandDropProps) => updateDragandDrop(data),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['favorite'] }),
        queryClient.invalidateQueries({
          queryKey: ['sharedPage', data.baseRequest.pageId],
        }),
        queryClient.invalidateQueries({ queryKey: ['personalPage'] }),
      ]);
    },
  });
}
