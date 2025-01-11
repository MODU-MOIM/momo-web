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
            <S.MyPage onClick={(e) => e.stopPropagation()}>
                <S.BannerContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                    <h2>가입 조건</h2>
                </S.BannerContainer>
            </S.MyPage>
        </S.Panel>
    );
};

export default CrewRule;