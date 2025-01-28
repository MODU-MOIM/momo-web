import styled from "styled-components";
import NoticeList from "./Components/NoticeList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotices } from "./NoticeProvider";

export default function CrewNotice() {
    const {crewId} = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    const { noticeList, setNoticeList } = useNotices();
    
    // 공지들 정렬
    const sortNoticeList = (noticeList) => {
        return [...noticeList].sort((a, b) => {
            if (b.isPinned !== a.isPinned) {
                // isPinned == true인 notice를 상단에 배치
                return b.isPinned - a.isPinned;
            }
            // isPinned 상태가 같은 경우 날짜 순으로 정렬
            if (a.date == b.date){
                return a.time > b.time ? -1 : 1;
            }
            // -1(음수)가 하단으로
            return a.date > b.date ? -1 : 1;
        });
    };
    useEffect(() => {
        setNoticeList(currentNoticeList => sortNoticeList([...currentNoticeList]));
    }, []);
    
    // crewId 전달하기
    const linktoAddNotice = () => {
        const crewId = "1";
        if(accessToken){
            navigate(`/crew/${crewId}/addNotice`);
        }
    }
    
    const togglePin = (id) => {
        setNoticeList(sortNoticeList(noticeList.map(notice => 
            notice.id === id ? {...notice, isPinned: !notice.isPinned} : notice)
        ));
        console.log(noticeList);
    };
    const toggleMenu = (id)=>{
        setNoticeList(noticeList.map(notice=>
            notice.id === id ? {...notice, isOpenedMenu: !notice.isOpenedMenu} : notice
        ));
    };
    return(
        <Wrapper>
            {/* userid 받아서 관리자만 보이도록 수정해야 함 */}
            <AddNoticeButton onClick={linktoAddNotice} >+ 공지추가</AddNoticeButton>
            {/* 무한스크롤 적용해야 함 */}
            <NoticeContainer>
                <NoticeList 
                    noticeList={noticeList}
                    togglePin={togglePin}
                    toggleMenu={toggleMenu}
                    setNoticeList={setNoticeList}
                    crewId={crewId}
                />
            </NoticeContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const AddNoticeButton = styled.button`
    position: fixed;
    top: 190px;
    width: 150px;
    margin-left: 60px;
    padding: 10px;
    border: none;
    color: white;
    font-size: 15px;
    background-color: #4B44B6;
    border: 1px solid #DEDFE7;
    border-radius: 20px;
    &:hover{
        background-color: #352EAE;
        cursor: pointer;
    }
`;
const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;