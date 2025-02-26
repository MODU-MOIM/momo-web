import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useState } from "react";
import { crewAPI } from "../../../api";
import { useParams } from "react-router-dom";

const CrewMember = ({ crewData, onClose }) => {
    const { crewId } = useParams();
    const [minNumber, setMinNumber] = useState(crewData?.minMembers);
    const [maxNumber, setMaxNumber] = useState(crewData?.maxMembers);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }
    
    const handleMinNumber = (e) => setMinNumber(e.target.value);
    const handleMaxNumber = (e) => setMaxNumber(e.target.value);

    const handleSubmit = async() => {
        const submitData = {
            minMembers: Number(minNumber),
            maxMembers: Number(maxNumber)
        };
        try {
            const response = await crewAPI.updateCrewHeadCount(crewId, submitData);
        } catch (error) {
            console.error("변경 실패", error);
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
                            <S.SetNumber 
                                type="number"
                                min={2}
                                value={minNumber}
                                onChange={handleMinNumber}
                            />
                            <S.TextItem>명</S.TextItem>
                        </S.NumberContainer>
                        <S.TextItem>~</S.TextItem>
                        <S.NumberContainer>
                            <S.TextItem>최대</S.TextItem>
                            <S.SetNumber
                                type="number"
                                max={30}
                                value={maxNumber}
                                onChange={handleMaxNumber}
                            />
                            <S.TextItem>명</S.TextItem>
                        </S.NumberContainer>
                    </S.NumberSetting>
                    {/* 도움 메시지 */}
                    <S.HelpMsg style={{ padding: '0px 0px 0px 10px', }}>
                        * 크루 수용 최대 멤버는 30명입니다.
                    </S.HelpMsg>
                    <S.HelpMsg style={{ padding: '0px 0px 0px 10px' }}>
                        * 제한을 두고 싶지 않은 경우는 숫자를 지워주세요.
                    </S.HelpMsg>
                </S.SettingContainer>
                <S.ButtonContainer style={{ marginTop: '10px' }}>
                        <S.CompletionButton onClick={handleSubmit}>
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