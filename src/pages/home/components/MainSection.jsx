import React from "react";
import Main from "../../../assets/MainImage.png";
import * as S from "../Styles/Home.styles";

const MainSection = () => {
    return (
        <>
            <S.Section>
                <S.MainImage src={Main} alt="" />
            </S.Section>
            <S.SectionTitle>
                신뢰할 수 있는 모임환경 <br />
                안전한 모임선택 매칭 플랫폼
            </S.SectionTitle>
            <S.SectionSubtitle>
                모임에 참여한 사용자들이 서로를 평가하고 <br />
                평가 내역을 통해 모임의 신뢰도를 확인하고, 안전한 모임을 선택하세요.
            </S.SectionSubtitle>
        </>
    );
}

export default MainSection;