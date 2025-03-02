import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { crewAPI, crewMembersAPI } from "../../api";
import Search from "../shared/Search";
import * as S from "./Styles/CrewList.styles";

const CrewList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchRef = useRef(null);

    // 컴포넌트 마운트 시 검색 파라미터 확인 및 크루 목록 조회
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const name = queryParams.get('name') || '';
        const category = queryParams.get('category') || '';
        const ageGroup = queryParams.get('age-group') || '';
        const region = queryParams.get('region') || '';
        
        if (name || category || ageGroup || region) {
            handleSearch({
                name,
                category,
                ageGroup,
                region,
            });

            // Search 컴포넌트의 폼 값 설정
            if (searchRef.current) {
                searchRef.current.setFormValues({
                    name,
                    category,
                    ageGroup,
                    region,
                });
            }
        } else {
            fetchCrews();
        }
    }, [location.search]);

    // 모든 크루 목록 조회
    const fetchCrews = async () => {
        setLoading(true);
        try {
            const response = await crewAPI.getCrewList();
            const crewList = response.data.data || response.data;

            const crewsWithMemberCount = await Promise.all(
                crewList.map(async (crew) => {
                    try{
                    const memberCount = await crewMembersAPI.getMemberList(crew.crewId);
                    const members = memberCount.data.data || memberCount.data;

                    return { ...crew, memberCount: members.length };
                    } catch (error) {
                        console.error('크루 멤버 수 조회 실패:', error);
                        return crew;
                    }
                })
            );

            setCrews(crewsWithMemberCount);
        } catch (error) {
            console.error('크루 목록 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 검색 처리 핸들러
    const handleSearch = async (searchParams) => {
        setLoading(true);

        // URL 업데이트
        const queryParams = new URLSearchParams();
        if (searchParams.name) queryParams.set('name', searchParams.name);
        if (searchParams.category) queryParams.set('category', searchParams.category);
        if (searchParams.ageGroup) queryParams.set('age-group', searchParams.ageGroup);
        if (searchParams.region) queryParams.set('region', searchParams.region);
        
        // 현재 경로 유지하면서 검색 파라미터만 업데이트
        navigate({
            pathname: location.pathname,
            search: queryParams.toString()
        }, { replace: true });

        try {
            // API 호출에 사용할 파라미터
            const apiParams = {
                name: searchParams.name,
                category: searchParams.category,
                ageGroup: searchParams.ageGroup,
                region: searchParams.region,
            };

            const response = await crewAPI.searchCrews(apiParams);
            const searchResult = response.data.data || response.data;

            if (searchResult.length === 0) {
                alert('검색 결과가 없습니다.');
                // URL에서 검색 파라미터 제거
                navigate(location.pathname, { replace: true });
                // 전체 크루 목록으로 돌아가기
                fetchCrews();
            } else {
                setCrews(searchResult);
            }
        } catch (error) {
            console.error('크루 검색 실패:', error);
            alert('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 크루 상세 페이지로 이동
    const linktoCrewHome = (crewId) => {
        navigate(`/crews/${crewId}/crewHome`);
    };

    if (loading) return <S.Container>로딩 중...</S.Container>;

    return (
        <S.Container>
            <Search
                onSearch={handleSearch}
                ref={searchRef}
            />
            <S.CrewListContainer>
                {crews.map((crew) => (
                    <S.CrewCard
                        key={crew.crewId}
                        onClick={() => linktoCrewHome(crew.crewId)}
                    >
                        <S.CrewImageWrapper>
                            <S.CrewImage src={crew.bannerImage} alt={crew.name} />
                        </S.CrewImageWrapper>
                        <S.CrewInfo>
                            <S.CrewName>{crew.name}</S.CrewName>
                            <S.CrewCategory>{crew.category}</S.CrewCategory>
                            <S.CrewMemberCount>
                                멤버 {crew.memberCount || '?'}명
                            </S.CrewMemberCount>
                        </S.CrewInfo>
                    </S.CrewCard>
                ))}
            </S.CrewListContainer>
        </S.Container>
    );
};

export default CrewList;