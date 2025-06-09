import { useMutation } from '@tanstack/react-query';
import { logout } from '@/apis/auth-apis/auth.api';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import { useProfileModalStore } from '@/stores/profileModalStore';

export const useLogoutMutation = () => {
  const { closeProfileModal } = useProfileModalStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('access_token');
      useUserStore.getState().clearUser();

      closeProfileModal();
      navigate('/login');
    },
    onError: (error) => {
      console.error('로그아웃 실패', error);
    },
  });
};
