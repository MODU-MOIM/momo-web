import * as S from "./Styles/Activities.styles";

const Activities = () => {
    const truncateTitle = (title) => {
        return title.length > 18 ? `${title.substring(0, 18)} ··· ` : title;
    };

    return(
        <S.Container>
            {/* 모임활동 글 api로 불러와서 무한스크롤 적용 */}
            {[...Array(6)].map((_, index) => (
                <S.ActivityCard key={index}>
                    <S.ActivityImage/>
                    <S.Title to={`/Activities/${index}`}>{truncateTitle(`오늘은 자유 달리기 1회차 진행했습니다.${index}`)}[11]</S.Title>
                    <S.Date>2023-10-01</S.Date>
                </S.ActivityCard>
            ))}
        </S.Container>
    )
}

export default  Activities;