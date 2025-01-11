import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";

const CrewMember = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: '560px',
                    height: '350px',
                    right: '35%',
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 멤버수
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle>
                        크루 멤버
                    </S.SettingTitle>
                    <S.NumberSetting>
                        <S.NumberContainer>
                            {/*멤버수 값 받아야 합니다. */}
                            <S.TextItem>최소</S.TextItem>
                            <S.SetNumber type="number"/>
                            <S.TextItem>명</S.TextItem>
                        </S.NumberContainer>
                        <S.TextItem>~</S.TextItem>
                        <S.NumberContainer>
                            <S.TextItem>최대</S.TextItem>
                            <S.SetNumber type="number"/>
                            <S.TextItem>명</S.TextItem>
                        </S.NumberContainer>
                    </S.NumberSetting>
                </S.SettingContainer>
                <S.ButtonContainer style={{ marginTop: '40px' }}>
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

export default CrewMember;