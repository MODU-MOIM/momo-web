import React from "react";
import Fire from "../../../assets/Fire.png";
import * as S from "../Styles/Home.styles";

const PopularSection = () => {
    return (
        <S.PopularSection>
            <S.PopularItem>
                <S.PopularTitle>
                    <S.Fire src={Fire} alt="fire" />
                    인기크루
                </S.PopularTitle>
                <S.PopularContent>이달의 인기 크루</S.PopularContent>
            </S.PopularItem>
            <S.PopularItem>
                <S.PopularTitle>
                    <S.Fire src={Fire} alt="fire" />
                    인기피드
                </S.PopularTitle>
                <S.PopularContent>인기 피드를 보고 소통해봐요</S.PopularContent>
            </S.PopularItem>
            <S.PopularItem>
                <S.PopularTitle>
                    <S.Fire src={Fire} alt="fire" />
                    챌린지
                </S.PopularTitle>
                <S.PopularContent>크루원들과 함께 도전해봐요</S.PopularContent>
            </S.PopularItem>
            <S.PopularItem>
                <S.PopularTitle>
                    <S.Fire src={Fire} alt="fire" />
                    핫플레이스
                </S.PopularTitle>
                <S.PopularContent>핫플레이스를 소개해드려요</S.PopularContent>
            </S.PopularItem>
        </S.PopularSection>
    );
};

export default PopularSection;