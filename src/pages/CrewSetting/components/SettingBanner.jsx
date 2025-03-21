import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useEffect, useState } from "react";
import { crewAPI } from "../../../api";
import { useParams } from "react-router-dom";

const SettingBanner = ({ crewData, onClose }) => {
    const { crewId } = useParams();
    const [updatedName, setUpdatedName] = useState(crewData?.name);
    const [bgImg, setBgImg] = useState();
    const [imgURL, setImgURL] = useState(crewData?.bannerImage);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleCrewName = (e) => {
        setUpdatedName(e.target.value);
    }
    // 변경된 필드만 submit
    const handleSubmit = async() => {
        const submitData = {
            name: updatedName
        };
        const formData = new FormData();
        formData.append("crewNameReqDto", new Blob([JSON.stringify(submitData)], { type: "application/json" }));
        formData.append("bannerImage", bgImg);
        
        try {
            const response = await crewAPI.updateCrewBasicData(crewId, formData);
            if (response.data.status === 200) {
                // 성공하면 새로고침
                window.location.reload();
            }
        } catch (error) {
            console.error("변경 실패", error);
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
                                        setBgImg(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            // url 저장
                                            setImgURL(reader.result);
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
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            >
                                <img 
                                    src={imgURL || crewData?.bannerImage}
                                    backgroundSize="cover"
                                    backgroundPosition="center"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                />
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