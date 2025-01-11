import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const Delete = ({ onClose }) => {
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
                    height: "350px",
                    right: "35%",
                }}
            >
                <S.DeleteContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle style={{ color: "red" }}>
                        크루 삭제하기
                    </S.SettingTitle>
                    <S.Warning>
                        크루를 삭제하면 크루원들은 크루에서 탈퇴됩니다.
                    </S.Warning>
                    <S.ButtonContainer>
                        <S.DeleteButton>
                            크루 삭제
                        </S.DeleteButton>
                        <S.CancelButton onClick={onClose}>
                            취소
                        </S.CancelButton>
                    </S.ButtonContainer>
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default Delete;