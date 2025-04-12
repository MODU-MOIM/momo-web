import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSSE } from '../../hooks/useSSE';
import * as S from './NotificationCenter.styles';

const NotificationCenter = ({ onNewNotification }) => {
  const navigate = useNavigate();
  const {
    notifications,
    connected,
    error,
    removeNotification,
    clearAllNotifications,
    reconnect
  } = useSSE();

  // 알림이 있을 때 부모 컴포넌트에 알림
  useEffect(() => {
    if (notifications.length > 0 && onNewNotification) {
      onNewNotification();
    }
  }, [notifications.length, onNewNotification]);

  // 알림 클릭 처리 함수
  const handleNotificationClick = (notification) => {
    // 리뷰 유형의 알림인 경우
    if (notification.type === 'review' && notification.data) {
      const { crewId, scheduleId, crewName, scheduleDate, scheduleTitle } = notification.data;
      
      // 디버깅 로그
      console.log("알림 클릭 - 전달할 데이터:", notification.data);
      
      // 크루 평가 페이지로 이동하면서 일정 정보 전달
      navigate(`crews/${crewId}/review?tab=crew&crewId=${crewId}&scheduleId=${scheduleId}`, {
        state: {
          notificationData: notification.data,
        }
      });
      
      // 확인한 알림 삭제
      removeNotification(notification.id);
    }
  };

  return (
    <S.NotificationContainer>
      <S.NotificationHeader>
        <h3>알림</h3>
        <S.NotificationHeaderButtonContainer>
          {notifications.length > 0 && (
            <S.NotificationHeaderButton onClick={clearAllNotifications}>모두 지우기</S.NotificationHeaderButton>
          )}
          {!connected && (
            <S.NotificationHeaderButton onClick={reconnect}>재연결</S.NotificationHeaderButton>
          )}
        </S.NotificationHeaderButtonContainer>
      </S.NotificationHeader>
      
      {error && <S.NotificationError>{error}</S.NotificationError>}
      
      {notifications.length === 0 ? (
        <S.NoNotifications>새로운 알림이 없습니다</S.NoNotifications>
      ) : (
        <S.NotificationsList>
          {notifications.map((notification) => (
            <S.NotificationItem 
              key={notification.id} 
              className={`notification-item notification-${notification.type}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <S.NotificationContent>{notification.content}</S.NotificationContent>
              <S.NotificationTime>
                {new Date(notification.createdAt).toLocaleTimeString()}
              </S.NotificationTime>
              <S.NotificationCloseButton 
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                &times;
              </S.NotificationCloseButton>
            </S.NotificationItem>
          ))}
        </S.NotificationsList>
      )}
    </S.NotificationContainer>
  );
};

export default NotificationCenter;