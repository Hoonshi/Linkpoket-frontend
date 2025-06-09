import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/apis/auth-apis/auth.api';
import { useProfileModalStore } from '@/stores/profileModalStore';
import { useUserStore } from '@/stores/userStore';

export const useDeleteAccountMutation = () => {
  const { closeProfileModal } = useProfileModalStore();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      console.log('회원 탈퇴 성공');

      localStorage.removeItem('access_token');
      useUserStore.getState().clearUser();

      closeProfileModal();

      window.location.href = '/login';
    },
    onError: (error) => {
      console.log('회원 탈퇴 실패', error);
    },
  });
};
