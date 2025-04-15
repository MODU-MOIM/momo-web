import styled from 'styled-components';

// 크루 평가 화면 스타일
export const CrewReviewContainer = styled.div`
  margin: 0 auto;
  padding: 24px 16px;
  width: 100%;
`;

export const ReviewHeader = styled.div`
  margin-bottom: 24px;
`;

export const ReviewForm = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
  width: 100%;
`;

export const ReviewFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ReviewerAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  border: 1px solid #eee;
`;

export const ReviewerName = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const StarSelector = styled.div`
  display: flex;
`;

export const StarOption = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-left: 4px;
  color: ${props => props.$selected ? '#FFD700' : '#e0e0e0'};
`;

export const KeywordSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

export const KeywordOption = styled.div`
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 13px;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => {
    if (props.$selected) return '#4B44B6';
    return props.$disabled ? '#f5f5f5' : 'white';
  }};
  color: ${props => {
    if (props.$selected) return 'white';
    return props.$disabled ? '#aaa' : '#333';
  }};
  border: 1px solid ${props => {
    if (props.$selected) return '#4B44B6';
    return '#e0e0e0';
  }};
  opacity: ${props => props.$disabled ? 0.7 : 1};
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4B44B6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3D3799;
  }
  
  &:disabled {
    background-color: #9E9CD0;
    cursor: not-allowed;
  }
`;

export const ReviewListContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`;

export const ReviewListHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

export const ReviewItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:30px;
  margin: 10px 0;
  padding-left: 55px;
`;

export const ReviewDate = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 20px 0;
  height: 30px;
`;

export const KeywordTag = styled.div`
  background-color: #F0F0FF;
  color: #4B44B6;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReviewContent = styled.div`
  margin:20px 5px;
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  border: 1px solid #4B44B6;
  border-radius: 10px;
  height: 100px;
`;

export const StarRating = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  pointer-events: none;
`;

export const Star = styled.span`
  color: ${props => props.$filled ? '#FFD700' : '#e0e0e0'};
  font-size: 16px;
`;

export const RatingText = styled.span`
  margin-left: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: flex-end;
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #666;
`;

export const EmptyReview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 14px;
  color: #888;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

export const ReviewSchedule = styled.div`
  font-size: 13px;
  color: #666;
  margin: 4px 0 8px;
  padding-left: 4px;
  font-style: italic;
`;

export const NoReviewMessage = styled.div`
  margin-bottom: 32px; // 일관성을 위해 ReviewForm과 동일한 마진 적용
  padding: 24px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  border: 1px dashed #ddd;
  width: 100%;
`;


export const DeleteButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height:30px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  color: #4B44B6;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
`;