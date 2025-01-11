import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";

const SettingBanner = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}>
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 이름 및 배너사진 설정
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle>크루명</S.SettingTitle>
                    {/* 크루명 변경 기능 */}
                    <S.CrewNameInput
                        type="text"
                        placeholder="크루명을 입력해주세요"
                    />
                    <S.BannerImageContainer>
                        {/* 배너 이미지 변경 기능 */}
                        <S.BannerImage>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if(file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            console.log("이미지가 선택되었습니다:", reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                style={{display: 'none'}}
                                id="bannerImageInput"
                            />
                            <label
                                htmlFor="bannerImageInput"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                    display: "block"
                                }}
                            >
                            </label>
                        </S.BannerImage>
                    </S.BannerImageContainer>
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

export default SettingBanner;