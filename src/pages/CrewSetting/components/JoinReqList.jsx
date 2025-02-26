import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useState, useRef, useEffect } from "react";

const JoinReqList = ({ crewData, onClose }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    // 멤버 api를 불러와 리더와 멤버를 비교
    // 리더외엔 탈퇴버튼 표시
    const members = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        name: `김멤버`,
        role: index === 0 ? '리더' : '', // 첫 번째 멤버(index가 0)일 때만 '리더'로 설정
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
                        가입 요청 목록 조회
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
                        <S.MemberSection
                            key={index}
                            style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}
                        >
                            <S.SectionContainer style={{display: 'flex'}}>
                                <S.ProfileImage />
                                <S.Name style={{marginTop: '11px'}}>
                                    {member.name}
                                </S.Name>
                            </S.SectionContainer>
                            <S.SectionContainer>
                                <S.DecisionButton>승낙</S.DecisionButton>
                                <S.DecisionButton
                                    style={{
                                        color: 'red',
                                        background: '#DEDFE7'
                                    }}
                                >거절</S.DecisionButton>
                            </S.SectionContainer>
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

export default JoinReqList;