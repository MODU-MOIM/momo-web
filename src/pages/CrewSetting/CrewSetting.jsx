import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Administrator from "./components/Administrator";
import CrewActivity from "./components/CrewActivity";
import CrewIntro from "./components/CrewIntro";
import CrewMember from "./components/CrewMember";
import CrewRule from "./components/CrewRule";
import CrewSchedule from "./components/CrewSchedule";
import Delete from "./components/Delete";
import LeaderTransfer from "./components/LeaderTransfer";
import SettingBanner from "./components/SettingBanner";
import * as S from "./Styles/CrewSetting.styles";
import { useParams } from "react-router-dom";
import { crewAPI } from "../../api";
import JoinReqList from "./components/JoinReqList";


const CrewSetting = () => {
    const { crewId } = useParams();
    const [crewData, setCrewData] = useState();
    const [isSettingBannerOpen, setIsSettingBannerOpen] = useState(false);
    const [isCrewIntroOpen, setIsCrewIntroOpen] = useState(false);
    const [isCrewMemberOpen, setIsCrewMemberOpen] = useState(false);
    const [isCrewRuleOpen, setIsCrewRuleOpen] = useState(false);
    const [isJoinReqListOpen, setIsJoinReqListOpen] = useState(false);
    const [isCrewActivityOpen, setIsCrewActivityOpen] = useState(false);
    const [isCrewScheduleOpen, setIsCrewScheduleOpen] = useState(false);
    const [isAdministratorOpen, setIsAdministratorOpen] = useState(false);
    const [isLeaderTransferOpen, setIsLeaderTransferOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    const fetchCrewInfo = async () => {
            try {
                const response = await crewAPI.getCrewData(crewId);
                setCrewData(response.data.data);
            } catch (error) {
                console.error("크루 정보 불러오기 실패", error);
            }
    }
    useEffect(()=>{
        fetchCrewInfo();
    },[crewId]);
    return(
        <S.Container>
            <S.Setting>
                <S.CrewName>
                    <S.Title>{crewData?.name}</S.Title>
                </S.CrewName>
                <S.MainTitle>
                    <S.Title>크루 기본 정보 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>크루 이름 및 배너사진 설정</S.Title>
                    <S.Button onClick={() => setIsSettingBannerOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>크루 소개 설정</S.Title>
                    <S.Button onClick={() => setIsCrewIntroOpen(true)}><BsChevronRight/></S.Button>
                    {/* <S.Desc>크루 소개글 수정, 지역/주소/카테고리 설정</S.Desc> */}
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>크루 가입 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>크루 멤버수</S.Title>
                    <S.Button onClick={() => setIsCrewMemberOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>가입 조건 설정</S.Title>
                    <S.Button onClick={() => setIsCrewRuleOpen(true)}><BsChevronRight/></S.Button>
                    {/* 설정한 조건 출력 */}
                    {/* <S.Desc>성별 제한없음, 나이 제한없음</S.Desc> */}
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>가입 요청 목록 조회</S.Title>
                    <S.Button onClick={() => setIsJoinReqListOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>멤버 활동 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>멤버 탈퇴, 차단 설정</S.Title>
                    <S.Button onClick={() => setIsCrewActivityOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>크루 일정 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>일정 설정</S.Title>
                    <S.Button onClick={() => setIsCrewScheduleOpen(true)}><BsChevronRight/></S.Button>
                    {/* <S.Desc>일정 권한 수정</S.Desc> */}
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>리더, 공동 관리자 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>공동 관리자 관리</S.Title>
                    <S.Button onClick={() => setIsAdministratorOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>리더 위임</S.Title>
                    <S.Button onClick={() => setIsLeaderTransferOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title style={{ color: 'red' }}>크루 삭제</S.Title>
                    <S.Button onClick={() => setIsDeleteOpen(true)}><BsChevronRight/></S.Button>
                </S.MainTitle>
            </S.Setting>

            {isSettingBannerOpen && (
                <SettingBanner
                    crewData={crewData}
                    onClose={() => setIsSettingBannerOpen(false)}
                />
            )}
            {isCrewIntroOpen && (
                <CrewIntro
                    onClose={() => setIsCrewIntroOpen(false)}
                />
            )}
            {isCrewMemberOpen && (
                <CrewMember
                    crewData={crewData}
                    onClose={() => setIsCrewMemberOpen(false)}
                />
            )}
            {isCrewRuleOpen && (
                <CrewRule
                    crewData={crewData}
                    onClose={() => setIsCrewRuleOpen(false)}
                />
            )}
            {isJoinReqListOpen && (
                <JoinReqList
                    onClose={() => setIsJoinReqListOpen(false)}
                />
            )}
            {isCrewActivityOpen && (
                <CrewActivity
                    onClose={() => setIsCrewActivityOpen(false)}
                />
            )}
            {isCrewScheduleOpen && (
                <CrewSchedule
                    onClose={() => setIsCrewScheduleOpen(false)}
                />
            )}
            {isAdministratorOpen && (
                <Administrator
                    onClose={() => setIsAdministratorOpen(false)}
                />
            )}
            {isLeaderTransferOpen && (
                <LeaderTransfer
                    onClose={() => setIsLeaderTransferOpen(false)}
                />
            )}
            {isDeleteOpen && (
                <Delete
                    onClose={() => setIsDeleteOpen(false)}
                />
            )}
        </S.Container>
    );
}

export default CrewSetting;