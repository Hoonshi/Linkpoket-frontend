import { SelectedPageData } from '@/types/pages';
import { useQuery } from '@tanstack/react-query';
import { fetchSharedPageMember } from '@/apis/page-apis/fetchSharedPageMember';

export default function useFetchSharedPageMember(
  data: SelectedPageData & { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['sharedPageMember', data],
    queryFn: () => fetchSharedPageMember(data),
    enabled: !!data.pageId && !!data.commandType && !!data.enabled,
  });
}
