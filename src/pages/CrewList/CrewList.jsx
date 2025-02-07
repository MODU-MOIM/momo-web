import { useEffect, useState } from "react";
import { crewAPI } from "../../api";
import * as S from "./Styles/CrewList.styles";
import { useNavigate } from "react-router-dom";

const CrewList = () => {
    const navigate = useNavigate();
    const [crews, setCrews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCrews = async () => {
            try {
                const response = await crewAPI.getCrewList();
                // console.log('Response:', response.data.data); // 데이터 확인용
                setCrews(response.data.data);
            } catch (error) {
                console.error('크루 목록 조회 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrews();
    }, []);

    if (loading) return <S.Container>로딩 중...</S.Container>;

    const linktoCrewHome = (crewId) => {
        navigate(`/crews/${crewId}/crewHome`);
    }

    return (
        <S.Container>
            <S.FilterSection>
                <S.SearchInput
                    type="text"
                    placeholder="크루 검색"
                />
                {/* 생성일 오름차 내림차 정렬 버튼 */}
            </S.FilterSection>
            <S.FilterSection>
                <S.FilterButton>생성일</S.FilterButton>
            </S.FilterSection>
            {crews.map((crew) => (
                <S.CrewCard 
                    key={crew.crewId}
                    onClick={()=>linktoCrewHome(crew.crewId)}
                >
                    <S.CrewImage />
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