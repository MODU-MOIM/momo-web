import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";
import * as S from "../Styles/Review.styles";
import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function Member() {
    const { crewId } = useParams();
    const [members, setMembers] = useState();
    const [reviews, setReveiws] = useState({});
    const [ratings, setRatings] = useState({});

    const handleTextReview = (e, memberId) => {
        setReveiws(prev => ({
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

    const SubmitReview = async(memberId) => {
        try{
            const review = {
                comment: reviews[memberId],
                rating: ratings[memberId],
            }
            const resoponse = await crewMembersAPI.postMemberReview(crewId, memberId, review);
            console.log(resoponse);
        } catch (error) {
            console.error("멤버 리뷰 실패", error);
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
                                onClick={() => SubmitReview(mem.memberId)}
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
