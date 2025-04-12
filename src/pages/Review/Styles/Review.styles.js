import styled from 'styled-components';

export const ReviewContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 24px 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
`;

export const ToggleButton = styled.button`
  padding: 12px 24px;
  background-color: ${(props) => (props.$active ? '#4B44B6' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#666')};
  border: 1px solid ${(props) => (props.$active ? '#4B44B6' : '#e0e0e0')};
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${(props) => (props.$active ? '#3D3799' : '#f5f5f5')};
  }
`;

export const ReviewContent = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  min-height: 500px;
`;