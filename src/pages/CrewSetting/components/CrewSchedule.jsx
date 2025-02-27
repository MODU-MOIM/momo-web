import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { crewMembersAPI } from "../../../api";
import { useParams } from "react-router-dom";
import { useState } from "react";


const CrewSchedule = ({ onClose }) => {
    const { crewId } = useParams();
    const [createRole, setCreateRole] = useState();
    const [updateRole, setUpdateRole] = useState();
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }
    
    const handleCreateRole = (e) => setCreateRole(e.target.value);
    const handleUpdateRole = (e) => setUpdateRole(e.target.value);

    const handleSubmit = async() => {
        const SubmitData = {
            createPermission: createRole,
            updatePermission: updateRole
        }
        try {
            const response = await crewMembersAPI.manageSchPermission(crewId, SubmitData);
        } catch (error) {
            console.error("권한 변경 실패", error);
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: "560px",
                    height: "430px",
                    right: "35%",
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 일정 관리
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle>일정 등록 권한</S.SettingTitle>
                    <S.RuleContainer>
                        <S.Select value={createRole} onChange={handleCreateRole}>
                            <option selected disabled>등록 권한 설정</option>/
                            <option value="LEADER">리더</option>
                            <option value="ADMIN">리더와 관리자</option>
                            <option value="MEMBER">모두</option>
                        </S.Select>
                    </S.RuleContainer>
                    <S.SettingTitle>일정 수정 권한</S.SettingTitle>
                    <S.RuleContainer style={{ marginTop: "20px" }}>
                        <S.Select value={updateRole} onChange={handleUpdateRole}>
                            <option selected disabled>수정 권한 설정</option>/
                            <option value="LEADER">리더</option>
                            <option value="ADMIN">리더와 관리자</option>
                            <option value="MEMBER">모두</option>
                        </S.Select>
                    </S.RuleContainer>
                </S.SettingContainer>
                <S.ButtonContainer>
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

export default CrewSchedule;