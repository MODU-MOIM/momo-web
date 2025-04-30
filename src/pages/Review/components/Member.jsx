import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";
import * as S from "../Styles/Review.styles";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function Member() {
    const { crewId } = useParams();
    const [members, setMembers] = useState();
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({});

    const handleTextReview = (e, memberId) => {
        setReviews(prev => ({
            ...prev,
            // memberId를 키값으로 설정해서 각 멤버들의 리뷰를 따로 저장
            [memberId]: e.target.value
        }));
    }

    const fetchMembers = async() => {
        try {
            const response = await crewMembersAPI.getMemberList(crewId);
            setMembers(response.data.data);
        } catch (error) {
            console.error("크루 멤버 읽기 실패", error);
        }
    }

    const submitReview = async(memberId) => {
        const review = {
            comment: reviews[memberId] || '',
            rating: ratings[memberId] || 0,
        }
        try{
            console.log(memberId);
            console.log(review);
            const response = await crewMembersAPI.postMemberReview(crewId, memberId, review);
            console.log(response);
        } catch (error) {
            if(error.status === 409){
                getMemReviewExist(memberId, review);
            }
            else{
                console.error("멤버 리뷰 실패", error);
            }
        }
    }
    const reMemReview = async(memberId, reviewId, review) => {
        // 이미 리뷰 작성한 멤버 재평가 할 때
        try {
            const putReviewRes = await crewMembersAPI.putMemReview(crewId, memberId, reviewId, review);
            console.log(putReviewRes);
        } catch (error) {
            console.error("멤버 재평가 실패", error);
        }
    }

    const getMemReviewExist = async(memberId, review) => {
        try {
            const isWrittenRes = await crewMembersAPI.getMemberReview(crewId, memberId);
            const memReviewRes = await crewMembersAPI.getCrewMemReview(crewId, memberId);
            console.log(isWrittenRes.data.data.written);
            console.log(memReviewRes.data.data[0].reviewId);
            const reviewId = memReviewRes.data.data[0].reviewId;
            if(isWrittenRes.data.data.written){
                reMemReview(memberId, reviewId, review);
            }
        } catch (error) {
            console.log("조회 실패", error);
        }
    }

    useEffect(() => {
        fetchMembers();
    },[]);

    return (
        <S.Wrapper>
            {members?.map(mem => (
                <S.MemReviewItem key={mem.memberId}>
                    <S.MemProfile src={mem.profileImage}/>
                    <S.ContainerWrapper>
                        {/* 위쪽 컨테이너 */}
                        <S.MRTopContainer>
                            <S.MemName>{mem.nickname}</S.MemName>
                            {/* rating */}
                            <StarRating
                                score={ratings[mem.memberId] || 0}
                                setScore={(score) => setRatings(prev => ({
                                    ...prev, [mem.memberId]: score}))
                                }
                            />
                        </S.MRTopContainer>
                        {/* 아래쪽 컨테이너 */}
                        <S.MRBottomContainer>
                            <S.SingleLineReview
                                placeholder="한 줄 평가"
                                // 속성(키) 이름이 변수이므로 대괄호 표기법 사용
                                value={reviews[mem.memberId]}
                                onChange={(e) => handleTextReview(e, mem.memberId)}
                            />
                            <S.SubmitButton
                                onClick={() => submitReview(mem.memberId)}
                            >
                                저장
                            </S.SubmitButton>
                        </S.MRBottomContainer>
                    </S.ContainerWrapper>
                </S.MemReviewItem>
            ))}
        </S.Wrapper>
    );
}
