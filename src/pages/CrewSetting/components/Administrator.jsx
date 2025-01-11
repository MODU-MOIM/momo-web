import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";

const Administrator = ({ onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    // 멤버 api를 불러와 리더, 관리자, 멤버를 비교
    const members = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        name: `김멤버`,
        role: index === 0 ? '리더' : (index === 1 || index === 2) ? '관리자' : '멤버', // 리더, 관리자, 멤버 구분
    }));

    const [visibleMembers, setVisibleMembers] = useState(3);
    const observerRef = useRef();

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
        const roleOrder = { '리더': 0, '관리자': 1, '멤버': 2 };
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
                            <S.ProfileImage />
                            <S.Name>
                                {member.name}
                            </S.Name>
                            <S.Role>{member.role}</S.Role>
                            {member.role === '멤버' && (
                                <S.AdminButton>관리자로 승격</S.AdminButton>
                            )}
                            {member.role === '관리자' && (
                                <S.AdminButton>멤버로 강등</S.AdminButton>
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