import { recommendAPI, crewAPI } from "../../api";
import { useEffect, useState, useRef } from "react";
import * as S from "./Styles/PopularCrews.styles";
import { useLocation } from "react-router-dom";

export default function PopularCrewsPage() {
    const location = useLocation();
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // API 호출 추적을 위한 ref 추가
    const apiCalledRef = useRef(false);
    
    // 인기 크루 ID는 location state에서 가져오기
    const popularCrewIds = location.state?.crewIds || [];

    useEffect(() => {
        // 이미 API를 호출했다면 중복 호출 방지
        if (apiCalledRef.current) return;
        
        // API 호출 상태 표시
        apiCalledRef.current = true;
        
        const fetchPopularCrews = async () => {
            setLoading(true);
            try {
                // 크루 데이터를 저장할 배열
                let crewsData = [];
                
                if (popularCrewIds.length > 0) {
                    // ID 목록이 있으면 각 크루 상세 정보 불러오기
                    const crewPromises = popularCrewIds.map(crewId => 
                        crewAPI.getCrewData(crewId)
                    );
                    
                    const responses = await Promise.all(crewPromises);
                    crewsData = responses
                        .filter(response => response && response.data && response.data.data)
                        .map(response => response.data.data);
                } else {
                    // ID 목록이 없으면 인기 크루 추천 API 호출
                    const response = await recommendAPI.getPopularCrews();
                    
                    if (response.data && response.data.status === 200) {
                        const crewIds = response.data.data;
                        
                        if (crewIds && crewIds.length > 0) {
                            const crewPromises = crewIds.map(crewId => 
                                crewAPI.getCrewData(crewId)
                            );
                            
                            const crewResponses = await Promise.all(crewPromises);
                            crewsData = crewResponses
                                .filter(response => response && response.data && response.data.data)
                                .map(response => response.data.data);
                        }
                    }
                }
                
                // 한 번에 상태 업데이트
                setCrews(crewsData);
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

    if (loading) {
        return <S.Loading>인기 크루 정보를 불러오는 중...</S.Loading>;
    }

    // 크루 데이터가 없거나 비어있는 경우 처리
    if (!crews || crews.length === 0) {
        return (
            <S.Container>
                <S.EmptyMessage>
                    {error || "표시할 인기 크루가 없습니다."}
                </S.EmptyMessage>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>인기 크루</S.Title>
                <S.Subtitle>이달의 가장 활발한 크루들을 만나보세요!</S.Subtitle>
            </S.Header>
            <S.CrewList>
                {crews.map((crew, index) => (
                    <S.CrewItem key={crew.crewId || index}>
                        <S.Rank index={index}>{index + 1}위</S.Rank>
                        <S.CrewImage 
                            src={crew.profileImage} 
                            alt={crew.name} 
                            onError={(e) => {
                                e.target.onerror = null;
                            }}
                        />
                        <S.CrewInfo>
                            <S.CrewName>{crew.name}</S.CrewName>
                            {crew.category && <S.CrewCategory>{crew.category}</S.CrewCategory>}
                            <S.CrewMembers>멤버 {crew.memberCount || 0}/{crew.maxMembers || 0}</S.CrewMembers>
                            {crew.description && (
                                <S.CrewDescription dangerouslySetInnerHTML={{ __html: crew.description }} />
                            )}
                        </S.CrewInfo>
                    </S.CrewItem>
                ))}
            </S.CrewList>
        </S.Container>
    );
}