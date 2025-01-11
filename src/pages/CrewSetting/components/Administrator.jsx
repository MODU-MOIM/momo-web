import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const Administrator = ({ onClose }) => {
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
                    <h2>크루 관리자 관리</h2>
                </S.BannerContainer>
            </S.MyPage>
        </S.Panel>
    );
};

export default Administrator;