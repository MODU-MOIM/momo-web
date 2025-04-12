import styled from 'styled-components';

// 크루 평가 화면 스타일
export const CrewReviewContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 24px 16px;
`;

export const ReviewHeader = styled.div`
  margin-bottom: 24px;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

export const Tab = styled.div`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.$active ? '#4B44B6' : 'transparent'};
  color: ${props => props.$active ? '#4B44B6' : '#666'};
`;

export const ReviewForm = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 32px;
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

export const ScheduleSelector = styled.div`
  margin: 16px 0;
  width: 100%;
`;

export const ScheduleLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const ScheduleSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  
  &:focus {
    outline: none;
    border-color: #2196F3;
  }
  
  option {
    padding: 8px;
  }
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
`;

export const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ReviewDate = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
`;

export const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
`;

export const KeywordTag = styled.div`
  background-color: #F0F0FF;
  color: #4B44B6;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
`;

export const ReviewContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
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
`;

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 16px;
  color: #ff3838;
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

export const NoSchedulesMessage = styled.div`
  width: 100%;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  border: 1px dashed #ddd;
`;

export const NoReviewMessage = styled.div`
  margin: 32px auto;
  padding: 40px 24px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  border: 1px dashed #ddd;
  max-width: 500px;
`;

export const AlreadyReviewedMessage = styled.div`
  margin: 32px auto;
  padding: 24px;
  text-align: center;
  background-color: #f0f4ff;
  border-radius: 8px;
  color: #4B44B6;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d0d4ff;
  max-width: 500px;
`;

export const ScheduleInfoBox = styled.div`
  margin: 16px 0 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: #f5f5ff;
  border: 1px solid #e0e0ff;
`;

export const ScheduleInfoTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #4B44B6;
  margin-bottom: 12px;
`;

export const ScheduleInfoItem = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  
  span {
    font-weight: 600;
    margin-right: 8px;
    color: #555;
  }
`;


export const NoCrewSelectedMessage = styled.div`
  margin: 32px auto;
  padding: 32px 24px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  color: #555;
  font-size: 18px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 600px;
`;

// 크루 선택 컨테이너
export const CrewSelectContainer = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;

export const CrewSelectTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

export const CrewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

export const CrewItem = styled.div`
  width: 120px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export const CrewItemImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 8px;
  border: 1px solid #eee;
`;

export const CrewItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoCrewsMessage = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #888;
`;