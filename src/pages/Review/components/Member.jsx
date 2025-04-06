import * as S from "../Styles/Review.styles";

const profile = "https://yu-momo-bucket.s3.ap-northeast-2.amazonaws.com/profile/94b9c947-9324-4575-9980-ba2b15aa1124_testimg.png"
const members = [
    {id: 1, nickname: "짱구런", role: "리더", profileImage: profile},
    {id: 2, nickname: "초보러닝", role: "멤버", profileImage: profile},
    {id: 3, nickname: "루피피러닝", role: "관리자", profileImage: profile},
    {id: 4, nickname: "헬로우", role: "멤버", profileImage: profile},
    {id: 5, nickname: "짱구런", role: "리더", profileImage: profile},
    {id: 6, nickname: "초보러닝", role: "멤버", profileImage: profile},
    {id: 7, nickname: "루피피러닝", role: "관리자", profileImage: profile},
    {id: 8, nickname: "헬로우", role: "멤버", profileImage: profile},
];

export default function Member() {
    return (
        <S.Wrapper>
            {members.map(mem => (
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
