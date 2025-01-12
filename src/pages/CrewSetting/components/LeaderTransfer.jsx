import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const LeaderTransfer = ({ onClose }) => {
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
                    right: "35%",
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        리더 위임
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.Attached>
                        현재 리더는 김루피 입니다. <br/>
                        리더를 위임하면 자신은 멤버로 강등됩니다.
                    </S.Attached>
                    <S.MemberSection>
                        <S.ProfileImage />
                        <S.Name>
                            김멤버
                        </S.Name>
                        <S.Role>
                            관리자
                        </S.Role>
                        <S.AdminButton>
                            리더 위임
                        </S.AdminButton>
                    </S.MemberSection>
                    <S.MemberSection>
                        <S.ProfileImage />
                        <S.Name>
                            김멤버
                        </S.Name>
                        <S.Role>
                            관리자
                        </S.Role>
                        <S.AdminButton>
                            리더 위임
                        </S.AdminButton>
                    </S.MemberSection>
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default LeaderTransfer;