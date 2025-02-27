import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";


const LeaderTransfer = ({ onClose }) => {
    const { crewId } = useParams();
    const [members, setMembers] = useState([]);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleDelegate = async(memberId) => {
        try {
            const response = crewMembersAPI.delegateLeader(crewId, memberId);
        } catch (error) {
            console.error("리더 위임 실패", error);
        }
    }

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await crewMembersAPI.getMemberList(crewId);
                setMembers(response.data.data);
            } catch (error) {
                console.error("크루 멤버 읽기 실패", error);
            }
        }
        fetchMembers();
    },[]);

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
                        현재 리더는 "{members.filter(member => member.role == "LEADER")
                            .map(data => data.nickname)}" 입니다.
                        <br/>리더를 위임하면 자신은 멤버로 강등됩니다.
                    </S.Attached>
                    {members.some(member => member.role == "ADMIN") ? (
                        members.map(member => 
                            member.role == "ADMIN" && (
                            <S.MemberSection>
                                <S.ProfileImage src={member.profileImage}/>
                                <S.Name>
                                    {member.nickname}
                                </S.Name>
                                <S.Role>
                                    {member.role}
                                </S.Role>
                                <S.AdminButton onClick={() => handleDelegate(member.memberId)}>
                                    리더 위임
                                </S.AdminButton>
                            </S.MemberSection>
                        ))
                    ):(
                        <div style={{margin: "10px"}}>현재 크루에 관리자가 없습니다.</div>
                    )
                    }
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default LeaderTransfer;