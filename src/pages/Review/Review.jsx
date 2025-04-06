import * as S from "./Styles/Review.styles";
import Member from "./components/Member";
import Crew from "./components/Crew";
import { useState } from "react";

export default function Review() {
    const [activeTab, setActiveTab] = useState("member");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                {activeTab === "crew" && <Crew />}
            </S.ReviewContent>
        </S.ReviewContainer>
    );
}
