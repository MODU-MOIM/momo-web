import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const CrewSchedule = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: "560px",
                    height: "430px",
                    right: "35%",
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 일정 관리
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle>일정 등록 권한</S.SettingTitle>
                    <S.RuleContainer>
                        <S.Select>
                            <option value="leader">리더</option>
                            <option value="manager">리더와 관리자</option>
                            <option value="all">모두</option>
                        </S.Select>
                    </S.RuleContainer>
                    <S.SettingTitle>일정 수정 권한</S.SettingTitle>
                    <S.RuleContainer style={{ marginTop: "20px" }}>
                        <S.Select>
                            <option value="leader">리더</option>
                            <option value="manager">리더와 관리자</option>
                            <option value="all">모두</option>
                        </S.Select>
                    </S.RuleContainer>
                </S.SettingContainer>
                <S.ButtonContainer>
                    <S.CompletionButton>
                        수정완료
                    </S.CompletionButton>
                    <S.CancelButton onClick={onClose}>
                        취소
                    </S.CancelButton>
                </S.ButtonContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default CrewSchedule;