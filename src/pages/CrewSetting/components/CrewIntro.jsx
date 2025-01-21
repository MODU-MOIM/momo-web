import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const CrewIntro = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: '1024px',
                    right: '23%',
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 소개 설정
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default CrewIntro;