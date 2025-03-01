import React, { useEffect, useRef } from 'react';
import { BsPinAngleFill, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { noticeAPI } from "../../../api";
import * as S from "../Styles/Notice.styles";

export default function NoticeList({noticeList, togglePin, toggleMenu, setNoticeList, isManager}) {
    const { crewId } = useParams();
    const navigate = useNavigate();
    // const [isDetailVisible, setIsDetailVisible] = useState(false);
    const menuRefs = useRef([]);

    const handlePin = (id)=> togglePin(id);
    const handleMenu = (id) => toggleMenu(id);

    const handleUpdate = ({notice})=>{
        // 수정페이지 이동(notice.id에 맞는)
        navigate(`/crews/${crewId}/updateNotice/${notice.id}`, {
            state: {noticeData: notice,  mode: "update"}
        });
        // console.log("수정: ", notice.id);
    }
    const handleDelete = async (noticeId)=>{
        try {
            if (window.confirm("정말로 삭제하시겠습니까?")) {
                const token = localStorage.getItem('token');
                // console.log('Loaded token:', token);
                await noticeAPI.deleteNotice(crewId, noticeId);
                // 공지 삭제 후 상태 업데이트
                setNoticeList(currentnoticeList => currentnoticeList.filter(notice => notice.id !== noticeId));
                alert("공지가 삭제되었습니다");
            }
            
        } catch (error) {
            console.log("공지 삭제 실패: ", error);
        }
    }
    // 메뉴 열린 상태에서 외부영역 클릭 시 닫힘
    useEffect(() => {
        // console.log(noticeList)
        function handleClickOutside(e) {
            if (noticeList.some((notice, index) => notice.isOpenedMenu && menuRefs.current[index] && !menuRefs.current[index].contains(e.target))) {
                setNoticeList(noticeList.map(notice => ({...notice, isOpenedMenu: false})));
            }   
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [noticeList]);

    const handleShowDetail = async (noticeId) => {
        try {
            const response = await noticeAPI.readNotice(crewId,noticeId);
            console.log("통신 성공 : ", response);
            setNoticeList(noticeList.map(notice => 
                notice.id === noticeId ? ({...notice, showDetail: !notice.showDetail}) : notice,
            ));
        } catch (error) {
            console.log("통신 실패 : ", error);
        }
    }

    return(
        <Wrapper>
            {noticeList.map((notice, index)=>(
                <>
                    <SubContainer key={notice.id}>
                        {notice.isOpenedMenu && 
                            <SubMenu ref={el => menuRefs.current[index] = el}>
                                <MenuItem onClick={()=>handleUpdate({notice})}>수정</MenuItem>
                                <MenuItem onClick={()=>handleDelete(notice.id)}>삭제</MenuItem>
                            </SubMenu>
                        }
                    </SubContainer>
                    <Container key={notice.id}>
                        <TopContainer>
                            <UserInfoContainer>
                                <Profile>
                                    <ProfileImage src={notice.profileImage}/>
                                    <ProfileText>
                                        <UserPosition>{notice.writerRole}</UserPosition>
                                        <UserName>{notice.writer}</UserName>
                                    </ProfileText>
                                    <Date>{notice.date}<br/>{notice.time}</Date>
                                </Profile>
                            </UserInfoContainer>

                            {/* 관리자만 보이도록 */}
                            {/* 버튼 기능 추가하기 */}
                            <SettingContainer>
                                {isManager &&
                                <StyledBsPinAngleFill 
                                    size={20}
                                    isPinned={notice.isPinned}
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
                                // toggleDetailVisibility(id)
                            }}
                        >
                            <Notice showDetail={notice.showDetail}>
                                {notice.content.includes('\n') ?
                                    notice.content.split('\n').map((item)=>(
                                        <div>{item}<br/></div>
                                    )) :
                                    <div>{notice.content}<br/></div>
                                }
                            </Notice>
                            {/* 투표 */}
                        {notice.vote?.isEnabled && notice.showDetail ? 
                            <Vote>
                                <S.VoteContainer style={{margin: "0"}}>
                                    <S.VoteBox style={{fontSize: "small"}}>
                                        <S.VoteTitleText>정모 참여 투표</S.VoteTitleText>
                                        <S.SelectBox>
                                                <S.SelectList 
                                                    userVote
                                                >참여</S.SelectList>
                                                <S.SelectList 
                                                    userVote
                                                >미참여</S.SelectList>
                                        </S.SelectBox>
                                    </S.VoteBox>
                                </S.VoteContainer>
                            </Vote>
                        : null
                        }
                        </NoticeContainer>
                    </Container>
                </>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const Container = styled.div`
    margin-top: 30px;
    /* margin-bottom: 100px; */
    width: 768px; 
    /* height: 300px;     */
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
    /* justify-content: center; */
    margin:0;
    `;
const UserPosition = styled.p`
    color:#4B44B6;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
    `;
const UserName = styled.p`
    /* height:45px; */
    /* display: flex; */
    /* align-items: flex-end; */
    margin:0px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
    `;
const Date = styled.div`
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
    color: ${props=> props.isPinned ? "#000000" : "#929292"};
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
    /* 말줄임 처리 */
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
    /* height: 200px; */
    margin-right: 20px;
`;