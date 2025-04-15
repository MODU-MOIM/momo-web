import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import * as S from './Notification.styles';

// 자동 표시되는 알림 컴포넌트
const AutoNotification = () => {
  const navigate = useNavigate();
  const { activeNotification, closeNotification, handleNotificationClick } = useAuth();

  // 알림 클릭 처리
  const onNotificationClick = useCallback(() => {
    if (!activeNotification) return;
    
    const navigationData = handleNotificationClick(activeNotification);
    if (navigationData) {
      navigate(navigationData.path, { state: navigationData.state });
    }
  }, [activeNotification, handleNotificationClick, navigate]);

  // 알림이 없으면 렌더링하지 않음
  if (!activeNotification) return null;

  return (
    <S.NotificationWrapper onClick={onNotificationClick}>
      <S.NotificationContent>
        {activeNotification.content}
      </S.NotificationContent>
      <S.NotificationTime>
        {new Date(activeNotification.createdAt).toLocaleTimeString()}
      </S.NotificationTime>
      <S.CloseButton onClick={(e) => {
        e.stopPropagation();
        closeNotification();
      }}>
        &times;
      </S.CloseButton>
    </S.NotificationWrapper>
  );
};

// 알림 목록 컴포넌트 (전체 알림 확인용)
const NotificationList = () => {
  const navigate = useNavigate();
  const { notifications, removeNotification, clearAllNotifications, handleNotificationClick } = useAuth();

  const onNotificationClick = useCallback((notification) => {
    const navigationData = handleNotificationClick(notification);
    if (navigationData) {
      navigate(navigationData.path, { state: navigationData.state });
    }
  }, [handleNotificationClick, navigate]);

  if (notifications.length === 0) {
    return <S.NoNotifications>새로운 알림이 없습니다</S.NoNotifications>;
  }

  return (
    <S.NotificationsContainer>
      <S.NotificationHeader>
        <h3>알림</h3>
        <S.HeaderButton onClick={clearAllNotifications}>모두 지우기</S.HeaderButton>
      </S.NotificationHeader>
      <S.NotificationItems>
        {notifications.map((notification) => (
          <S.NotificationItem 
            key={notification.id} 
            onClick={() => onNotificationClick(notification)}
          >
            <S.NotificationContent>{notification.content}</S.NotificationContent>
            <S.NotificationTime>
              {new Date(notification.createdAt).toLocaleTimeString()}
            </S.NotificationTime>
            <S.CloseButton 
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
            >
              &times;
            </S.CloseButton>
          </S.NotificationItem>
        ))}
      </S.NotificationItems>
    </S.NotificationsContainer>
  );
};


export { AutoNotification, NotificationList };