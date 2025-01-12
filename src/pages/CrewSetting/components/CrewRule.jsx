import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const CrewRule = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: '656px',
                    height: '410px',
                    right: '33%',
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        가입 조건 설정
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle>
                        성별
                    </S.SettingTitle>
                    <S.RuleContainer>
                        <S.Select
                            style={{
                                marginBottom: '0',
                            }}
                            onChange={(e) => {
                                // API 호출을 위한 상태 업데이트 로직 추가 예정
                                console.log('선택된 값:', e.target.value);
                            }}
                        >
                            <option value="male">남자만</option>
                            <option value="female">여자만</option>
                            <option value="none">제한없음</option>
                        </S.Select>
                    </S.RuleContainer>
                    <S.SettingTitle style={{marginTop: '40px'}}>
                        나이
                    </S.SettingTitle>
                    <S.NumberSetting>
                        <S.TextItem>최소</S.TextItem>
                        <S.SetNumber/>
                        <S.TextItem>~</S.TextItem>
                        <S.TextItem>최대</S.TextItem>
                        <S.SetNumber/>
                    </S.NumberSetting>
                    <S.ButtonContainer style={{ marginTop: '40px' }}>
                        <S.CompletionButton>
                            수정완료
                        </S.CompletionButton>
                        <S.CancelButton onClick={onClose}>
                            취소
                        </S.CancelButton>
                    </S.ButtonContainer>
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default CrewRule;