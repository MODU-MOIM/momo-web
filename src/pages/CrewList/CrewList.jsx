import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { crewAPI } from "../../api";
import * as S from "./Styles/CrewList.styles";
import Search from "../shared/Search";

const CrewList = () => {
    const navigate = useNavigate();
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);
    const SearchRef = useRef(null);


    // 컴포넌트 마운트시 모든 크루 목록 조회
    useEffect(() => {
        fetchCrews();
    }, []);

    // 크루 목록 조회
    const fetchCrews = async () => {
        try {
            const response = await crewAPI.getCrewList();
            // console.log('Response:', response.data.data); // 데이터 확인용
            setCrews(response.data.data || response.data);
        } catch (error) {
            console.error('크루 목록 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleSearch = async (SearchParams) => {
        setLoading(true);
        try {
            const apiParams = {
                name: SearchParams.name,
                category: SearchParams.category,
                ageGroup: SearchParams.ageGroup,
                region: SearchParams.region,
            };

            const response = await crewAPI.searchCrews(apiParams);
            const searchResult = response.data.data || response.data;

            if(searchResult.length === 0) {
                alert('검색 결과가 없습니다.');
               
                //
                fetchCrews();
            } else {
                setCrews(searchResult);
            }
        } catch (error) {
            console.error('크루 검색 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 검색 초기화
    const handleReset = () => {
        fetchCrews();
    }

    if (loading) return <S.Container>로딩 중...</S.Container>;

    const linktoCrewHome = (crewId) => {
        navigate(`/crews/${crewId}/crewHome`);
    }

    return (
        <S.Container>
            <Search onSearch={handleSearch} onReset={handleReset} ref={SearchRef} />
            {crews.map((crew) => (
                <S.CrewCard 
                    key={crew.crewId}
                    onClick={()=>linktoCrewHome(crew.crewId)}
                >
                    <S.CrewImageWrapper>
                        <S.CrewImage src={crew.bannerImage} />
                    </S.CrewImageWrapper>
                    <S.CrewInfo>
                        <S.CrewName>{crew.name}</S.CrewName>
                        <S.CrewCategory>{crew.category}</S.CrewCategory>
                        <S.CrewMemberCount>멤버 {crew.memberCount}명</S.CrewMemberCount>
                    </S.CrewInfo>
                </S.CrewCard>
            ))}
        </S.Container>
    );
};


export default CrewList;