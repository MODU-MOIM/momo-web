import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";
import * as S from "../Styles/Review.styles";
import { useEffect, useState } from "react";

export default function Member() {
    const { crewId } = useParams();
    const [members, setMembers] = useState();

    const fetchMembers = async() => {
        try {
            const response = await crewMembersAPI.getMemberList(crewId);
            setMembers(response.data.data);
        } catch (error) {
            console.error("크루 멤버 읽기 실패", error);
        }
    }

    useEffect(() => {
        fetchMembers();
    },[]);

    return (
        <S.Wrapper>
            {members?.map(mem => (
                <S.MemReviewItem>
                    <S.MemProfile src={mem.profileImage}/>
                    <S.ContainerWrapper>
                        {/* 위쪽 컨테이너 */}
                        <S.MRTopContainer>
                            <S.MemName>{mem.nickname}</S.MemName>
                            <S.StarReview>12345</S.StarReview>
                        </S.MRTopContainer>
                        {/* 아래쪽 컨테이너 */}
                        <S.MRBottomContainer>
                            <S.SingleLineReview
                                placeholder="한 줄 평가"
                            />
                            <S.SubmitButton>저장</S.SubmitButton>
                        </S.MRBottomContainer>
                    </S.ContainerWrapper>
                </S.MemReviewItem>
            ))}
        </S.Wrapper>
    );
}
