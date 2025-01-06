import React, { useState } from "react";
import * as S from "../Styles/Home.styles";

const SlideSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5;

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            if(prev === totalSlides - 2) return 0;
            return prev + 1;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            if(prev === 0) return totalSlides - 2;
            return prev - 1;
        });
    };

    return(
        <>
            <S.Section>
                <S.SlideWrapper>
                    <S.Slides>
                        <S.SlideTextSection>
                            <S.SlideTitle>이번 달<br />인기 크루를 소개합니다!</S.SlideTitle>
                            <S.SlideSubtitle>인기 크루는 한달간의 활동기록으로 선정됩니다.</S.SlideSubtitle>
                            <S.ButtonWrapper>
                            <S.SlideButton onClick={prevSlide}>&lt;</S.SlideButton>
                            <S.SlideButton onClick={nextSlide}>&gt;</S.SlideButton>
                            </S.ButtonWrapper>
                        </S.SlideTextSection>
                        
                        <S.SliderWrapper>
                            <S.SlideTrack $currentSlide={currentSlide}>
                            {[...Array(totalSlides)].map((_, index) => (
                                <S.SlideItem key={index}>
                                    <S.SlideItemContent />
                                </S.SlideItem>
                            ))}
                            </S.SlideTrack>
                        </S.SliderWrapper>
                    </S.Slides>
                    <S.MoreWrapper>
                        <S.MoreLink href="#">더보기 +</S.MoreLink>
                    </S.MoreWrapper>
                </S.SlideWrapper>
            </S.Section>
        </>
    )
}

export default SlideSection;