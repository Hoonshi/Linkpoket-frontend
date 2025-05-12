import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '@/apis/axiosInstance';

export default function ReissuePage() {
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axiosInstance.get('/api/jwt/access-token');
        console.log(response);
        if (response?.headers['redirect-url']) {
          window.location.href = response.headers['redirect-url'];
        }

        const accessToken = response.data.data;

        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
        } else {
          console.error('응답에 토큰이 없습니다:', response.data);
        }
      } catch (error) {
        console.error('액세스 토큰 요청 중 오류 발생:', error);

        if (axios.isAxiosError(error)) {
          console.log('오류 응답 데이터:', error.response?.data);
          console.log('오류 응답 상태:', error.response?.status);
          console.log('오류 메시지:', error.message);
        } else {
          console.log('알 수 없는 오류 발생', error);
        }
      }
    };

    fetchAccessToken();
  }, []);

  // TODO: 로딩스피너 넣는게 좋을듯
  return <p>Reissuing access token... Please wait.</p>;
}
