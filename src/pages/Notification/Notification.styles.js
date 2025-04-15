import styled from 'styled-components';

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 320px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  cursor: pointer;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const NotificationContent = styled.div`
  margin-right: 20px;
  font-size: 14px;
  color: #212529;
`;

export const NotificationTime = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 6px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  color: #6c757d;
  cursor: pointer;
  
  &:hover {
    color: #343a40;
  }
`;

export const NotificationsContainer = styled.div`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #6c757d;
  cursor: pointer;
  
  &:hover {
    color: #343a40;
    text-decoration: underline;
  }
`;

export const NotificationItems = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  position: relative;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const NoNotifications = styled.div`
  padding: 24px 16px;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
`;