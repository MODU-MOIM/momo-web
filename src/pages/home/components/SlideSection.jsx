import React, { useState, useEffect, useRef } from "react";
import * as S from "../Styles/Home.styles";
import { recommendAPI, crewAPI } from "../../../api";

const SlideSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredCrewIndex, setHoveredCrewIndex] = useState(null);
    const totalSlides = 5;
    
    // API 호출 추적을 위한 ref 추가
    const apiCalledRef = useRef(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            if(prev === crews.length - 2) return 0;
            return prev + 1;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            if(prev === 0) return crews.length - 2;
            return prev - 1;
        });
    };

    useEffect(() => {
        // 이미 API를 호출했다면 중복 호출 방지
        if (apiCalledRef.current) return;
        
        // API 호출 상태 표시
        apiCalledRef.current = true;
        
        const fetchPopularCrews = async () => {
            setLoading(true);
            try {
                // 인기 크루 추천 API 호출
                const response = await recommendAPI.getPopularCrews();
                
                if (response.data && response.data.status === 200) {
                    const crewIds = response.data.data;
                    
                    if (crewIds && crewIds.length > 0) {
                        // 최대 5개까지만 가져오기
                        const limitedCrewIds = crewIds.slice(0, totalSlides);
                        
                        const crewPromises = limitedCrewIds.map(crewId => 
                            crewAPI.getCrewData(crewId)
                        );
                        
                        const crewResponses = await Promise.all(crewPromises);
                        const crewsData = crewResponses
                            .filter(response => response && response.data && response.data.data)
                            .map(response => response.data.data);
                        
                        // 한 번에 상태 업데이트
                        setCrews(crewsData);
                    }
                }
            } catch (error) {
                console.error("인기 크루 데이터 가져오기 실패:", error);
                setError("인기 크루 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPopularCrews();
        
        // 컴포넌트 언마운트 시 정리
        return () => {
            apiCalledRef.current = false;
        };
    }, []);

    // 더보기 링크 클릭 핸들러
    const handleMoreClick = (e) => {
        e.preventDefault();
        // 인기 크루 페이지로 이동 (routes 설정에 따라 수정 필요)
        window.location.href = "/popularCrews";
    };

    // 호버 이벤트 처리 함수
    const handleMouseEnter = (index) => {
        setHoveredCrewIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredCrewIndex(null);
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
                                {crews.map((crew, index) => (
                                <S.SlideItem 
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <S.SlideItemContent>
                                        <S.CrewCard>
                                            <S.CrewImage 
                                                src={crew.profileImage} 
                                                alt={crew.name} 
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/assets/images/default-crew.jpg';
                                                }}
                                            />
                                            <S.CrewInfo>
                                                {/* 호버 시 보여줄 추가 정보 */}
                                                {hoveredCrewIndex === index && (
                                                    <S.CrewHoverInfo>
                                                        <S.CrewName>{crew.name}</S.CrewName>
                                                        {crew.description && (
                                                            <S.CrewDescription dangerouslySetInnerHTML={{ __html: crew.description }} />
                                                        )}
                                                        <S.CrewJoinButton href={`/crews/${crew.crewId}/crewHome`}>
                                                            크루 방문하기
                                                        </S.CrewJoinButton>
                                                    </S.CrewHoverInfo>
                                                )}
                                            </S.CrewInfo>
                                        </S.CrewCard>
                                    </S.SlideItemContent>
                                </S.SlideItem>
                                ))}
                            </S.SlideTrack>
                        </S.SliderWrapper>
                    </S.Slides>
                    <S.MoreWrapper>
                        <S.MoreLink href="/popularCrews" onClick={handleMoreClick}>더보기 +</S.MoreLink>
                    </S.MoreWrapper>
                </S.SlideWrapper>
            </S.Section>
        </>
    );
};

export default SlideSection;