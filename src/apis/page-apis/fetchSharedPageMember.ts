import { axiosInstance } from '../axiosInstance';
import { SelectedPageData } from '@/types/pages';

export async function fetchSharedPageMember(data: SelectedPageData) {
  try {
    const response = await axiosInstance.get('/api/page/members', {
      params: {
        pageId: data.pageId,
        commandType: data.commandType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching shared page member:', error);
    throw error;
  }
}
