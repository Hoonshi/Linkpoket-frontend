import { axiosInstance } from '../axiosInstance';

export const patchShareInvitationStatus = async (data: {
  dispatchRequestId: string;
  requestStatus: 'ACCEPTED' | 'REJECTED';
  notificationType: 'INVITE_PAGE';
}) => {
  const response = await axiosInstance.patch(
    '/api/dispatch/share-page-invitations/status',
    data
  );
  return response.data;
};
