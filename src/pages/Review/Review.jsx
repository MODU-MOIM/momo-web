import * as S from "./Styles/Review.styles";
import Member from "./components/Member";
import Crew from "./components/Crew";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Review() {
    const location = useLocation();
    
    // URL에서 파라미터 읽기
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    const crewId = searchParams.get('crewId');
    const scheduleId = searchParams.get('scheduleId');
    
    // 기본 탭 설정 (URL에 tab 파라미터가 있으면 해당 값 사용, 없으면 'member')
    const [activeTab, setActiveTab] = useState(tabParam === 'crew' ? 'crew' : 'member');
    
    // URL 변경 시 탭 상태 업데이트
    useEffect(() => {
        if (tabParam === 'crew' || tabParam === 'member') {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // URL 파라미터에서 notificationData 생성
    const createNotificationDataFromUrl = () => {
        if (crewId && scheduleId) {
            return {
                crewId: parseInt(crewId),
                scheduleId: parseInt(scheduleId),
                scheduleDate: new Date().toISOString().split('T')[0] // 현재 날짜 사용
            };
        }
        return undefined;
    };

    return (
        <S.ReviewContainer>
            <S.ButtonContainer>
                <S.ToggleButton
                    onClick={() => handleTabChange("member")}
                    $active={activeTab === "member"}
                >
                    크루 멤버 평가
                </S.ToggleButton>
                <S.ToggleButton 
                    onClick={() => handleTabChange("crew")}
                    $active={activeTab === "crew"}
                >
                    크루 평가
                </S.ToggleButton>
            </S.ButtonContainer>
            <S.ReviewContent>
                {activeTab === "member" && <Member />}
                {activeTab === "crew" && <Crew 
                    crewIdFromUrl={crewId}
                    scheduleIdFromUrl={scheduleId}
                    notificationData={location.state?.notificationData || createNotificationDataFromUrl()}
                />}
            </S.ReviewContent>
        </S.ReviewContainer>
    );
}