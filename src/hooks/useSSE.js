import { useState, useEffect, useRef } from 'react';
import { sseAPI } from '../api';

export const useSSE = () => {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);

  // 컴포넌트 마운트 시 SSE 연결
  useEffect(() => {
    // 연결 시작
    connectToSSE();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (eventSourceRef.current) {
        sseAPI.closeConnection(eventSourceRef.current);
        eventSourceRef.current = null;
      }
    };
  }, []);

  // SSE 연결 시작
  const connectToSSE = () => {
    // 기존 연결이 있으면 닫기
    if (eventSourceRef.current) {
      sseAPI.closeConnection(eventSourceRef.current);
      eventSourceRef.current = null;
    }

    // SSE 연결 생성
    const eventSource = sseAPI.subscribe();
    
    if (!eventSource) {
      setError('알림 서비스 연결에 실패했습니다.');
      return;
    }

    eventSourceRef.current = eventSource;

    // 연결 성공 시
    eventSource.onopen = () => {
      console.log('SSE 연결 성공');
      setConnected(true);
      setError(null);
    };

    // 이벤트 리스너 등록 (기존 리스너 외에 알림 처리 리스너 추가)
    eventSource.addEventListener('review', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('리뷰 알림 수신:', data);
        
        // 새 알림 추가
        setNotifications(prev => [
          {
            id: Date.now(),
            type: 'review',
            content: `${data.crewName} 모임의 ${new Date(data.scheduleDate).toLocaleDateString()} 일정에 대한 평가를 작성해주세요!`,
            createdAt: new Date(),
            data: data
          },
          ...prev
        ]);
      } catch (err) {
        console.error('리뷰 이벤트 처리 오류:', err);
      }
    });

    // 하트비트 이벤트 리스너 (서버 연결 확인용)
    eventSource.addEventListener('heartbeat', (event) => {
      console.log('하트비트 수신:', event.data);
      // 연결 상태 업데이트
      setConnected(true);
    });

    // 오류 처리
    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      setConnected(false);
      setError('알림 서비스 연결에 문제가 발생했습니다.');
      
      // 연결 종료 후 재연결 시도
      if (eventSourceRef.current) {
        sseAPI.closeConnection(eventSourceRef.current);
        eventSourceRef.current = null;
      }
      
      // 5초 후 재연결 시도
      setTimeout(connectToSSE, 5000);
    };
  };

  // 알림 삭제 함수
  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // 모든 알림 삭제 함수
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    connected,
    error,
    removeNotification,
    clearAllNotifications,
    reconnect: connectToSSE
  };
};