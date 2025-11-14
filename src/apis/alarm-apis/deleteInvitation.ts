import { axiosInstance } from '../axiosInstance';

export const deleteInvitation = async (data: { dispatchRequestId: string }) => {
  const response = await axiosInstance.delete(
    '/api/dispatch/share-page-invitations',
    { data }
  );
  return response.data;
};
