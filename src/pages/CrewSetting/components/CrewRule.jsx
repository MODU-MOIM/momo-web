import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useEffect, useState } from "react";
import { crewAPI } from "../../../api";
import { useParams } from "react-router-dom";


const CrewRule = ({ crewData, onClose }) => {
    const { crewId } = useParams();
    const [initialGender, setInitialGender] = useState("");
    const [gender, setGender] = useState("");
    const [minAge, setMinAge] = useState(crewData?.minAge);
    const [maxAge, setMaxAge] = useState(crewData?.maxAge);
   
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleGender = (e) => setGender(e.target.value);
    const handleMinAge = (e) => setMinAge(e.target.value);
    const handleMaxAge = (e) => setMaxAge(e.target.value);

    const handleSubmit = async() => {
        const submitData = {};
        // 성별 제한 필드
        if(gender !== "none"){
            submitData.genderRestriction = gender;
        }else{
            submitData.genderRestriction = null;  // 제한없음인 경우 null 값 전달
        }
        //최소 나이 필드
        if(minAge !== ''){
            submitData.minAge = Number(minAge);
        }else{
            submitData.minAge = null;  // 제한없음인 경우 null 값 전달
        }
        // 최대 나이 필드
        if(maxAge !== ''){
            submitData.maxAge = Number(maxAge);
        }else{
            submitData.maxAge = null;  // 제한없음인 경우 null 값 전달
        }
        try {
            const response = await crewAPI.updateCrewRestriction(crewId, submitData);
        } catch (error) {
            console.log("변경 실패", error);
        }
    }

    // 기존 크루 성별제한 확인
    useEffect(()=>{
        if(crewData.genderRestriction == null){
            setInitialGender("none");
        }else{
            setInitialGender(crewData.genderRestriction);
        }
        setGender(initialGender=> initialGender);
    },[]);

    useEffect(()=>{
        setGender(initialGender);
    },[initialGender]);

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
                            value={gender}
                            onChange={handleGender}
                        >
                            <option value="M">남자만</option>
                            <option value="F">여자만</option>
                            <option value="none">제한없음</option>
                        </S.Select>
                    </S.RuleContainer>
                    <S.SettingTitle style={{marginTop: '40px'}}>
                        나이
                    </S.SettingTitle>
                    <S.NumberSetting>
                        <S.TextItem>최소</S.TextItem>
                        <S.SetNumber
                            type="number"
                            min={0}
                            max={maxAge}
                            value={minAge}
                            onChange={handleMinAge}
                        />
                        <S.TextItem>~</S.TextItem>
                        <S.TextItem>최대</S.TextItem>
                        <S.SetNumber
                            type="number"
                            min={minAge}
                            max={100}
                            value={maxAge}
                            onChange={handleMaxAge}
                        />
                    </S.NumberSetting>
                    {/* 도움 메시지 */}
                    <S.HelpMsg>* 제한을 두고 싶지 않은 경우는 숫자를 지워주세요.</S.HelpMsg>
                    <S.ButtonContainer style={{ marginTop: '10px' }}>
                        <S.CompletionButton onClick={handleSubmit}>
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