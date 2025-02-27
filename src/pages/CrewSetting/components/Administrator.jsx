import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";

const Administrator = ({ onClose }) => {
    const { crewId } = useParams();
    const [members, setMembers] = useState([]);
    const [visibleMembers, setVisibleMembers] = useState(3);
    const observerRef = useRef();
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleRole = async(memberId, role) => {
        try {
            const submitdata = {
                role: role
            }
            const response = crewMembersAPI.manageMemberRole(crewId, memberId, submitdata);
        } catch (error) {
            console.error("변경 실패",error);
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
    },[members]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting && visibleMembers < members.length){
                    setVisibleMembers(prev => prev + 3);
                }
            },
            { threshold: 0.5 }
        );

        if(observerRef.current){
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [visibleMembers, members.length]);

    // 멤버 정렬 함수
    const sortMembers = (members) => {
        const roleOrder = { 'LEADER': 0, 'ADMIN': 1, 'MEMBER': 2 };
        return [...members].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
    };

    const sortedMembers = sortMembers(members);

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
                        공동 관리자 관리
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer
                    style={{
                        maxHeight: "380px",
                        overflow: "auto",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                        margin: "20px 0",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >
                    {sortedMembers.slice(0, visibleMembers).map((member, index) => (
                        <S.MemberSection key={index}>
                            <S.ProfileImage src={member.profileImage}/>
                            <S.Name>
                                {member.nickname}
                            </S.Name>
                            <S.Role>{member.role}</S.Role>
                            {member.role === 'MEMBER' && (
                                <S.AdminButton
                                    onClick={() => handleRole(member.memberId, "ADMIN")}
                                >
                                    관리자로 승격
                                </S.AdminButton>
                            )}
                            {member.role === 'ADMIN' && (
                                <S.AdminButton
                                    onClick={() => handleRole(member.memberId, "MEMBER")}
                                >
                                    멤버로 강등
                                </S.AdminButton>
                            )}
                        </S.MemberSection>
                    ))}
                    {visibleMembers < members.length && (
                        <div ref={observerRef}>
                        </div>
                    )}
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default Administrator;