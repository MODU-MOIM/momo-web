import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { useState, useRef, useEffect } from "react";
import { crewAPI } from "../../../api";
import { useParams } from "react-router-dom";

const JoinReqList = ({ onClose }) => {
    const { crewId } = useParams();
    const [reqMembers, setReqMembers] = useState([]);
    const [visibleMembers, setVisibleMembers] = useState(3);
    const observerRef = useRef();

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleAccept = async(userId) => {
        try {
            const response = crewAPI.acceptJoinReq(crewId, userId);
        } catch (error) {
            console.error("수락 실패", error);
        }
    }
    const handleReject = async(userId) => {
        try {
            const response = crewAPI.rejectJoinReq(crewId, userId);
        } catch (error) {
            console.error("거절 실패", error);
        }
    }

    useEffect(()=>{
        async function fetchJoinUserList() {
            try {
                const response = await crewAPI.getReqJoinUserList(crewId);
                const joinReqList = response.data.data;
                setReqMembers(joinReqList || []);
            } catch (error) {
                console.error("요청 불러오기 실패", error);
            }
        }
        fetchJoinUserList();
    },[]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting && visibleMembers < reqMembers.length){
                    setVisibleMembers(prev => prev + 3);
                }
            },
            { threshold: 0.5 }
        );

        if(observerRef.current){
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [visibleMembers, reqMembers.length]);


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
                    
                    {(Array.isArray(reqMembers) &&
                    reqMembers.some(member => member.requestStatus == "PENDING")) ? (
                        reqMembers?.map((member, index) =>
                            member.requestStatus == "PENDING" && (
                            <S.MemberSection
                                key={index}
                                style={{
                                    display:'flex',
                                    justifyContent:'space-between'
                                }}
                            >
                                <S.SectionContainer style={{display: 'flex'}}>
                                    <S.ProfileImage src={member.profileImage}/>
                                    <S.Name style={{marginTop: '11px'}}>
                                        {member.nickname}
                                    </S.Name>
                                </S.SectionContainer>
                                <S.SectionContainer>
                                    <S.DecisionButton
                                        onClick={() => handleAccept(member.joinRequestId)}
                                    >수락</S.DecisionButton>
                                    <S.DecisionButton
                                        style={{
                                            color: 'red',
                                            background: '#DEDFE7'
                                        }}
                                        onClick={() => handleReject(member.joinRequestId)}
                                    >거절</S.DecisionButton>
                                </S.SectionContainer>
                            </S.MemberSection>
                        ))) :(
                            <div style={{margin: "10px"}}>
                                <div>신규 가입 요청이 없습니다.</div>
                            </div>
                        )
                    }
                    {visibleMembers < reqMembers.length && (
                        <div ref={observerRef}>
                        </div>
                    )}
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default JoinReqList;