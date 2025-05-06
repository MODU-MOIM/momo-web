import styled from 'styled-components';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { BsCheckCircleFill } from "react-icons/bs";

export const ReviewContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Member.jsx
export const Wrapper = styled.div`
    margin: 50px 0px;
`;

export const OneWrapper = styled.div``;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubContainer = styled.div`
  margin: 0 0 10px 20px;
`;

export const MyReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 10px 0px;
`;

export const MyReviewContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const Comment = styled.div`
  margin: 0 20px;
  width: 60%;
`;

export const ShowMyReview = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 12px;
  line-height: 1.6;
  border: 1px solid #ddd;
  width: 11%;
  cursor: pointer;

  &:hover{
    color: #ffffff;
    background-color:rgb(209, 209, 209);
  }
`;

export const MemReviewItem = styled.div`
    width: 650px;
    height: 100px;
    margin-bottom: 15px;

    border: 1px solid #DEDFE7;
    border-radius: 15px;
    background-color: #fff;
    display: flex;
`;

export const MemProfile = styled.img`
    width: 45px;
    height: 45px;
    margin: 30px;
    border: 1px solid #DEDFE7;
    border-radius: 50%;
`;

export const ContainerWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

// MR(MemberReview)의 위쪽 배치에 사용할 Container
export const MRTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
`;

export const MemName = styled.div`
    font-size: 15px;
    font-weight: 600;
`;

export const StarReview = styled.div`
`;

// MR(MemberReview)의 아래쪽 배치에 사용할 Container
export const MRBottomContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SingleLineReview = styled.input`
    width: 445px;
    height: 25px;
    padding: 10px;
    border: 1px solid #DEDFE7;
    border-radius: 15px;

    &::placeholder{
        color:rgb(193, 194, 206);
    }
`;

export const SubmitButton = styled.div`
    width: 50px;
    height: 25px;
    padding: 5px 15px;
    color: #fff;
    background-color: #352EAE;
    border-radius: 15px;
    font-size: 10px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledCheck = styled(BsCheckCircleFill)`
  color: darkseagreen;
  margin-top: 3px;
`

// StarRating.jsx
export const StarWrapper = styled.div`
    width: 100px;
    display: flex;
`;

export const RatingContainer = styled.div`
    cursor: pointer;
`;

export const LeftHalfStar = styled.div`
  width: 10px;
  overflow: hidden;
  display: inline-block;
`;

export const RightHalfStar = styled.div`
  width: 10px;
  overflow: hidden;
  display: inline-block;
`;

export const FullStar = styled(FaStar)`
    font-size: 20px;
	color: orange;
    opacity: ${props => props.$ishovered ? '0.5' : '1'};
    position: relative;
    left: ${props => props.$right ? '-10px' : '0'};
    transition: 0.2s;
`;
export const EmptyStar = styled(FaRegStar)`
    font-size: 20px;
	color: orange;
    position: relative;
    left: ${props => props.$right ? '-10px' : '0'};
    transition: 0.2s;
`;