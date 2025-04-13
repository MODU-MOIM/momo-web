import styled from "styled-components";
import { FaRegStar, FaStar } from 'react-icons/fa';

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
`;

export const ButtonContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ToggleButton = styled.button`
    width: 50%;
    border-radius: 20px;
    background-color: #fff;
    border:none;
    padding: 10px;
    cursor: pointer;
    font-weight: 500;
    ${({ $active }) => $active && `
        background-color: #352EAE;
        color: #fff;
    `}
    margin: 5px;
`;

export const ReviewContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Member.jsx

export const Wrapper = styled.div`
    margin: 50px 0px;
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

    display: flex;
    justify-content: center;
    align-items: center;
`;

// StarRating.jsx
// export const RatingContainer = styled.div`
//     width: 100px;
//     /* display: flex; */

// `;

// export const halfStarLabel = styled.label``;
// export const halfStarInput = styled.input``;
// export const fullStarLabel = styled.label``;
// export const fullStarInput = styled.input``;


export const EmptyStar = styled(FaRegStar)`
	color: orange;

	&:hover{
		opacity: 50%;
	}
`;
export const FullStar = styled(FaStar)`
	color: orange;

	&:hover{
		opacity: 50%;
	}
`;