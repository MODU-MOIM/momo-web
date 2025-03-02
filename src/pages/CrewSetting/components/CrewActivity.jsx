import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useState, useRef, useEffect } from "react";
import { crewMembersAPI } from "../../../api";
import { useParams } from "react-router-dom";

const CrewActivity = ({ onClose }) => {
    const { crewId } = useParams();
    const [members, setMembers] = useState([]);
    const [visibleMembers, setVisibleMembers] = useState(3);
    const observerRef = useRef();
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleKickOut = async(memberId) => {
        try {
            const response = await crewMembersAPI.kickoutMember(crewId, memberId);
            if (response.data.status === 200) {
                // 성공하면 새로고침
                window.location.reload();
            }
        } catch (error) {
            console.error("탈퇴 실패", error);
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
                        멤버 활동 관리
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
                    {members.slice(0, visibleMembers).map((member, index) => (
                        <S.MemberSection key={index}>
                            <S.ProfileImage src={member.profileImage}/>
                            <S.Name>
                                {member.nickname}
                            </S.Name>
                            <S.Role>{member.role}</S.Role>
                            {member.role !== 'LEADER' && (
                                <S.CrewButton
                                    onClick={() => handleKickOut(member.memberId)}
                                >탈퇴</S.CrewButton>
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

export default CrewActivity;