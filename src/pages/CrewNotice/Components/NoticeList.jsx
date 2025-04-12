import React, { useEffect, useRef, useState } from 'react';
import { BsPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { noticeAPI } from "../../../api";
import * as S from "../Styles/Notice.styles";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

export default function NoticeList({noticeList, togglePin, toggleMenu, setNoticeList, isManager}) {
    const { crewId } = useParams();
    const navigate = useNavigate();
    const menuRefs = useRef([]);
    const [loadingVote, setLoadingVote] = useState(false);

    const handlePin = (id)=> togglePin(id);
    const handleMenu = (id) => toggleMenu(id);

    const handleVote = async(notice, status) => {
        if (loadingVote) return; // 로딩 중에는 중복 요청 방지
        
        try {
            setLoadingVote(true);
            
            // 이미 같은 상태로 투표한 경우 중복 요청 방지
            if (notice.vote?.voteStatus === status) {
                setLoadingVote(false);
                return;
            }
            
            const submitStatus = {
                voteStatus: status
            };
            
            // 투표 상태에 따라 API 호출 분기
            let response;
            if (notice.vote?.voteStatus === "NOT_VOTED") {
                response = await noticeAPI.selectVote(crewId, notice.noticeId, notice.vote?.voteId, submitStatus);
            } else {
                response = await noticeAPI.reSelectVote(crewId, notice.noticeId, notice.vote?.voteId, submitStatus);
            }
            
            // 투표 성공 후 상태 업데이트
            setNoticeList(prevList => prevList.map(item => 
                item.id === notice.id 
                    ? {...item, vote: {...item.vote, voteStatus: status}} 
                    : item
            ));
            
            // 최신 데이터로 갱신
            handleShowDetail(notice.id);
            
        } catch (error) {
            console.error("투표 실패", error);
            
            // 이미 참여한 투표라는 에러가 발생한 경우 최신 상태로 갱신
            if (error.response?.data?.code === "N004") {
                handleShowDetail(notice.id);
            }
        } finally {
            setLoadingVote(false);
        }
    };

    const handleUpdate = ({notice})=>{
        navigate(`/crews/${crewId}/updateNotice/${notice.id}`, {
            state: {noticeData: notice,  mode: "update"}
        });
    };

    const handleDelete = async (noticeId)=>{
        try {
            if (window.confirm("정말로 삭제하시겠습니까?")) {
                await noticeAPI.deleteNotice(crewId, noticeId);
                setNoticeList(currentnoticeList =>
                    currentnoticeList.filter(notice => notice.id !== noticeId));
                alert("공지가 삭제되었습니다");
            }
        } catch (error) {
            console.log("공지 삭제 실패: ", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (noticeList.some((notice, index) => notice.isOpenedMenu &&
            menuRefs.current[index] && !menuRefs.current[index].contains(e.target))) {
                setNoticeList(noticeList.map(notice => ({...notice, isOpenedMenu: false})));
            }   
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [noticeList, setNoticeList]);

    const handleShowDetail = async (noticeId) => {
        try {
            const response = await noticeAPI.readNotice(crewId, noticeId);
            const updateNoticeData = response.data.data;
            setNoticeList(noticeList.map(notice => 
                notice.id === noticeId ? ({
                    ...notice, 
                    ...updateNoticeData, 
                    showDetail: !notice.showDetail
                }) : notice
            ));
        } catch (error) {
            console.log("통신 실패 : ", error);
        }
    };

    const isVotingAvailable = (notice) => {
        if (notice.noticeType === "SCHEDULE" && notice.vote?.voteType === "ATTENDANCE") {
            const now = new Date();

            const scheduleDate = notice.content.scheduleDate;
            const scheduleTime = notice.content.scheduleTime;

            if(!scheduleDate || !scheduleTime) return false;

            const [year, month, day] = scheduleDate.split('-').map(num => parseInt(num, 10));
            const [hours, minutes] = scheduleTime.split(':').map(num => parseInt(num, 10));

            const scheduleDateTime = new Date(year, month - 1, day, hours, minutes);

            const votingDeadline = new Date(scheduleDateTime);
            votingDeadline.setHours(votingDeadline.getHours() - 2);

            return now < votingDeadline;
        }
        return true;
    }

    // 시간 포맷 변환 함수
    const formatTime = (timeString) => {
        if (!timeString) return '';
        
        const timeParts = timeString.split(':');
        if (timeParts.length >= 2) {
            return `${timeParts[0]}:${timeParts[1]}`;
        }
        return timeString;
    };

    // 날짜 포맷 변환 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        try {
            const parts = dateString.split('-');
            if (parts.length >= 3) {
                const year = parts[0];
                const month = parseInt(parts[1], 10);
                const day = parseInt(parts[2], 10);
                return `${year}년 ${month}월 ${day}일`;
            }
            return dateString;
        } catch (error) {
            console.error('날짜 형식 오류:', error);
            return dateString;
        }
    };

    return(
        <Wrapper>
            {noticeList.map((notice, index)=>(
                <React.Fragment key={notice.id || index}>
                    <SubContainer key={`sub-${notice.id || index}`}>
                        {notice.isOpenedMenu && 
                            <SubMenu ref={el => menuRefs.current[index] = el}>
                                <MenuItem onClick={()=>handleUpdate({notice})}>수정</MenuItem>
                                <MenuItem onClick={()=>handleDelete(notice.id)}>삭제</MenuItem>
                            </SubMenu>
                        }
                    </SubContainer>
                    <Container key={`container-${notice.id || index}`}>
                        <TopContainer>
                            <UserInfoContainer>
                                <Profile>
                                    <ProfileImage src={notice.profileImage}/>
                                    <ProfileText>
                                        <UserPosition>{notice.writerRole}</UserPosition>
                                        <UserName>{notice.writer}</UserName>
                                    </ProfileText>
                                    <StyledDate>{notice.date}<br/>{notice.time}</StyledDate>
                                </Profile>
                            </UserInfoContainer>

                            <SettingContainer>
                                {isManager &&
                                <StyledBsPinAngleFill 
                                    size={20}
                                    $isPinned={notice.isPinned}
                                    onClick={()=>handlePin(notice.id)}
                                />
                                }
                                {isManager && 
                                <StyledBsThreeDotsVertical
                                size={20}
                                onClick={()=>handleMenu(notice.id)}
                                />}
                            </SettingContainer>
                        </TopContainer>
                        <NoticeContainer
                            onClick={()=>{
                                handleShowDetail(notice.id)
                            }}
                        >
                            <Notice $showDetail={notice.showDetail}>
                                {notice.noticeType === "GENERAL" ? (
                                    // 일반 공지
                                    typeof notice.content === 'string' && notice.content ? (
                                        notice.content.includes('\n') ?
                                            notice.content.split('\n').map((item, index)=>(
                                                <div key={index}>{item}<br/></div>
                                            )) :
                                            <div>{notice.content}</div>
                                    ) : <div>내용 없음</div>
                                ) : (
                                    // 일정 공지
                                    <ScheduleNotice>
                                        <ScheduleTitle>
                                            {notice.content.title || "일정 안내"}
                                        </ScheduleTitle>
                                        
                                        <ScheduleInfo>
                                            <ScheduleInfoItem>
                                                <MdAccessTimeFilled />
                                                <ScheduleInfoText>
                                                    {formatDate(notice.content.scheduleDate)} {formatTime(notice.content.scheduleTime)}
                                                </ScheduleInfoText>
                                            </ScheduleInfoItem>
                                            
                                            {notice.content.detailAddress && (
                                                <ScheduleInfoItem>
                                                    <FaMapMarkerAlt />
                                                    <ScheduleInfoText>
                                                        {notice.content.detailAddress}
                                                    </ScheduleInfoText>
                                                </ScheduleInfoItem>
                                            )}
                                        </ScheduleInfo>
                                        
                                        {notice.content.description && (
                                            <ScheduleDescription>
                                                {notice.content.description}
                                            </ScheduleDescription>
                                        )}
                                    </ScheduleNotice>
                                )}
                            </Notice>
                            {notice.vote?.isEnabled && notice.showDetail ? 
                                <Vote>
                                    <S.VoteContainer style={{margin: "0"}}>
                                        <S.VoteBox style={{fontSize: "small"}}>
                                            <S.VoteTitleText>{notice.vote?.title}</S.VoteTitleText>

                                            {isVotingAvailable(notice) ? (
                                            // 투표 가능한 경우 투표 UI 표시
                                            <>
                                                {notice.vote?.voteType === "GENERAL" ? (
                                                <S.SelectBox>
                                                    <SelectList
                                                    $selected={notice.vote?.voteStatus === "POSITIVE"}
                                                    onClick={() => handleVote(notice, "POSITIVE")}
                                                    disabled={loadingVote}
                                                    >
                                                    찬성
                                                    </SelectList>
                                                    <SelectList
                                                    $selected={notice.vote?.voteStatus === "NEGATIVE"}
                                                    onClick={() => handleVote(notice, "NEGATIVE")}
                                                    disabled={loadingVote}
                                                    >
                                                    반대
                                                    </SelectList>
                                                </S.SelectBox>
                                                ) : (
                                                <S.SelectBox>
                                                    <SelectList
                                                    $selected={notice.vote?.voteStatus === "POSITIVE"}
                                                    onClick={() => handleVote(notice, "POSITIVE")}
                                                    disabled={loadingVote}
                                                    >
                                                    참석
                                                    </SelectList>
                                                    <SelectList
                                                    $selected={notice.vote?.voteStatus === "NEGATIVE"}
                                                    onClick={() => handleVote(notice, "NEGATIVE")}
                                                    disabled={loadingVote}
                                                    >
                                                    미참석
                                                    </SelectList>
                                                </S.SelectBox>
                                                )}
                                            </>
                                            ) : (
                                            // 투표 기간이 지난 경우 메시지 표시
                                            <VoteClosedContainer>
                                                {notice.vote?.voteStatus && notice.vote.voteStatus !== "NOT_VOTED" ? (
                                                // 이미 투표한 경우
                                                <VoteResult>
                                                    {notice.vote.voteStatus === "POSITIVE" 
                                                    ? (notice.vote.voteType === "GENERAL" ? "찬성" : "참석") 
                                                    : (notice.vote.voteType === "GENERAL" ? "반대" : "미참석")}
                                                    으로 투표했습니다
                                                </VoteResult>
                                                ) : (
                                                // 투표하지 않았고 기간이 지난 경우
                                                <VoteClosedMessage>
                                                    투표 마감되었습니다. (정모 시작 2시간 전까지 가능)
                                                </VoteClosedMessage>
                                                )}
                                            </VoteClosedContainer>
                                            )}
                                            
                                            {/* 투표 상태 표시 - 투표 가능 기간 중에만 표시 */}
                                            {isVotingAvailable(notice) && notice.vote?.voteStatus && notice.vote.voteStatus !== "NOT_VOTED" && (
                                            <VoteStatusText>
                                                {notice.vote.voteStatus === "POSITIVE" 
                                                ? (notice.vote.voteType === "GENERAL" ? "찬성" : "참석") 
                                                : (notice.vote.voteType === "GENERAL" ? "반대" : "미참석")}
                                                으로 투표했습니다
                                            </VoteStatusText>
                                            )}
                                        </S.VoteBox>
                                        </S.VoteContainer>
                                    </Vote>
                                    : null}
                        </NoticeContainer>
                    </Container>
                </React.Fragment>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;

const Container = styled.div`
    margin-top: 30px;
    width: 768px; 
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 15px;
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const UserInfoContainer = styled.div`
    width: 100%;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
`;

const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #c3c3c3;
    margin-right: 10px;
`;

const ProfileText = styled.div`
    height:35px;
    display: flex;
    flex-direction: column;
    margin:0;
`;

const UserPosition = styled.p`
    color:#4B44B6;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
`;

const UserName = styled.p`
    margin:0px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
`;

const StyledDate = styled.div`
    margin: 0 0 10px 10px;
    color: #666666;
    font-size: 13px;
`;

const SettingContainer = styled.div`
    position: relative;
    width: 10%;
    display: flex;
    justify-content: space-between;
    margin: 20px;
`;

const StyledBsPinAngleFill = styled(BsPinAngleFill)`
    color: ${props=> props.$isPinned ? "#000000" : "#929292"};
    &:hover{
        color: black;
        cursor: pointer;
    }
`;

const StyledBsThreeDotsVertical = styled(BsThreeDotsVertical)`
    color: #929292;
    &:hover{
        color: black;
        cursor: pointer;
    }
`;

const NoticeContainer = styled.div`
    margin: 10px 30px 0px 70px;
    display: flex;
`;

const Notice = styled.div`
    margin-bottom: 40px;
    width: 70%;
    height: auto;
    display: ${props=> props.showDetail ? 'block' : '-webkit-box' };
    word-break: keep-all; 
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: ${props=> props.showDetail ? 'visible' : 'hidden' };
    text-overflow: ellipsis;
    white-space: pre-wrap;
`;

const SubContainer = styled.div`
    position: absolute;
    padding-left: 760px;
`;

const SubMenu = styled.div`
    width: 80px;
    background-color: white;
    border: 1px solid #f0f0f0;
`;

const MenuItem = styled.div`
    text-align: center;
    padding: 8px 12px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Vote = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20px;
`;

// 일정 공지 관련 스타일
const ScheduleNotice = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    border-radius: 8px;
`;

const ScheduleTitle = styled.div`
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
    color: #4B44B6;
`;

const ScheduleInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
`;

const ScheduleInfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #555;
`;

const ScheduleInfoText = styled.span`
    font-size: 14px;
`;

const ScheduleDescription = styled.div`
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    border-top: 1px dashed #ddd;
    padding-top: 10px;
`;

const SelectList = styled.div`
    padding: 8px 15px;
    margin: 5px;
    border-radius: 15px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    background-color: ${props => props.$selected ? '#4a6cfa' : 'white'};
    color: ${props => props.$selected ? 'white' : 'black'};
    border: 1px solid ${props => props.$selected ? '#4a6cfa' : '#e0e0e0'};
    font-weight: ${props => props.$selected ? 'bold' : 'normal'};
    
    &:hover {
        background-color: ${props => props.$selected ? '#4a6cfa' : '#f0f4ff'};
        border-color: #4a6cfa;
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const VoteStatusText = styled.div`
    font-size: 12px;
    text-align: center;
    color: #4a6cfa;
    margin-top: 8px;
    font-weight: 500;
`;

const VoteClosedContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteClosedMessage = styled.div`
  font-size: 14px;
  text-align: center;
  color: #888;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 100%;
`;

const VoteResult = styled.div`
  font-size: 14px;
  text-align: center;
  color: #4a6cfa;
  font-weight: 500;
  padding: 12px;
  background-color: #f0f4ff;
  border-radius: 8px;
  width: 100%;
`;