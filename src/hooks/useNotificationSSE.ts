import { useEffect } from 'react';
import { useNotificationStore } from '@/stores/notification';

export function useNotificationSSE(isLoggedIn: boolean) {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  useEffect(() => {
    if (!isLoggedIn) return;

    const sseToken = localStorage.getItem('sse_token');
    if (!sseToken) return;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const eventSource = new EventSource(
      `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(sseToken)}`,
      {
        withCredentials: true,
      }
    );

    eventSource.onopen = (event) => {
      console.log('✅ SSE 연결 성공', event);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('🔔 알림 수신:', data);
        setUnreadCount(data.countUnreadNotifications);
      } catch (e) {
        console.error('🔍 알림 데이터 파싱 실패:', e, event.data);
      }
    };

    eventSource.onerror = async (event) => {
      console.error('❌ SSE 연결 오류 발생:', event);
      eventSource.close(); // 에러 발생 시 연결 끊기

      // ⏳ 3초 안에 fetch 실패하면 중단
      const ac = new AbortController();
      const timeoutId = setTimeout(() => ac.abort(), 3000);

      try {
        await fetch(
          `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(sseToken)}`,
          { signal: ac.signal }
        );
      } catch (err) {
        console.error('🔍 헬스체크 실패:', err);
      } finally {
        clearTimeout(timeoutId);
      }

      // ⏱️ 5초 뒤 재시도 (지금은 window.location.reload로 간단히)
      setTimeout(() => {
        console.log('🔄 SSE 재연결 시도');
        window.location.reload(); // 일단은 전체 새로고침으로 대체
      }, 5000);
    };

    return () => {
      console.log('🧹 SSE 연결 종료');
      eventSource.close();
    };
  }, [isLoggedIn]);
}
