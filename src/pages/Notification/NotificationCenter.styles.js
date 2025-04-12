import styled from 'styled-components';

export const NotificationContainer = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  overflow: hidden;
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

export const NotificationHeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const NotificationHeaderButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const NotificationHeaderButton = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: #6c757d;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #343a40;
    text-decoration: underline;
  }
`;

export const NotificationsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
`;

export const NotificationItem = styled.li`
  position: relative;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const NotificationContent = styled.div`
  margin-right: 24px;
  font-size: 14px;
  color: #212529;
`;

export const NotificationTime = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
`;

export const NotificationClose = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  color: #6c757d;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const NotificationError = styled.div`
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #721c24;
  font-size: 14px;
  text-align: center;
`;

export const NoNotifications = styled.div`
  padding: 24px 16px;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
`;

export const NotificationReview = styled.div`
  border-left: 4px solid #4dabf7;
`;

export const NotificationCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #6c757d;
`;