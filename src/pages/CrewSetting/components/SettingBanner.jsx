import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useState } from "react";
import { crewAPI } from "../../../api";
import { useParams } from "react-router-dom";

const SettingBanner = ({ crewData, onClose }) => {
    const { crewId } = useParams();
    const [updatedName, setUpdatedName] = useState(crewData?.name);
    const [bgImg, setBgImg] = useState();
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleCrewName = (e) => {
        setUpdatedName(e.target.value);
    }
    const handleSubmit = async() => {
        const submitData = {}
        if(updatedName !== crewData.name){
            console.log(updatedName, crewData.name);
            submitData.name = updatedName;
        }
        const formData = new FormData();
        formData.append("crewReqDto", new Blob([JSON.stringify(submitData)], { type: "multipart/form-data" }));
        try {
            console.log("submitData: ", submitData);
            const response = await crewAPI.updateCrewData(crewId, formData);
            console.log(response.data);
        } catch (error) {
            console.log("변경 실패", error);
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
                        value={updatedName}
                        placeholder="크루명을 입력해주세요"
                        onChange={handleCrewName}
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
                                            setBgImg(reader.result);
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
                                    display: "block",
                                    backgroundImage: `url(${bgImg})`
                                }}
                            >
                            </label>
                        </S.BannerImage>
                    </S.BannerImageContainer>
                </S.SettingContainer>
                <S.ButtonContainer>
                    <S.CompletionButton onClick={() => handleSubmit()}>
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