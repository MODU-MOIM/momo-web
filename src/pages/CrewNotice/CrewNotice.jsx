import styled from "styled-components";
import NoticeList from "./Components/NoticeList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotices } from "./NoticeProvider";
import { noticeAPI } from "../../api";

// user role 받아서 isManager 확인
export default function CrewNotice() {
    const {crewId} = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    const { noticeList, setNoticeList } = useNotices([]);
    const [isManager, setIsManager] = useState(true);
    
    const loadNoticeList = async() => {
        try {
            const response = await noticeAPI.readNoticeList(crewId);
            // console.log(response.data.data)
            const noticeListData = response.data.data;
            if(noticeListData && Array.isArray(noticeListData)){
                const fetchNoticeList = noticeListData.map(notice => {
                    // 날짜 및 시간 데이터 포맷
                    const now = new Date(notice.createdAt);
                    const year = now.getFullYear();  // 현재 년도
                    const month = now.getMonth() + 1;  // 월 (0부터 시작하므로 +1)
                    const day = now.getDate();  // 일
                    const hours = now.getHours();  // 시
                    const minutes = now.getMinutes();  // 분
                    const dayOfWeek = now.getDay();  // 요일 번호 (0-6), 0부터 일요일, 월요일, ..., 토요일
                    const days = ["일", "월", "화", "수", "목", "금", "토"];
                    // // 2024.12.14 (토) 형식
                    const formatDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} (${days[dayOfWeek]})`;
                    // // 17:03 형식
                    const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    return{
                        ...notice,
                        id: notice.noticeId,
                        date: formatDate,
                        time: formatTime,
                        isPinned: false,
                        isOpenedMenu: false,
                        showVote: false,
                    }
                })
                const sortedNotices = sortNoticeList(fetchNoticeList);
                setNoticeList(sortedNotices);
            }else{
                console.log("공지가 없습니다.", response.data);
                // alert("공지가 없습니다.");
            }
        } catch (error) {
            console.error('공지 목록을 불러오는데 실패했습니다.', error.response.data);
        }
    }

    // crewId가 변경될 때마다 공지 목록 다시 부름
    // 다른 크루로 네비게이션 시 자동으로 해당 크루의 공지사항으로 업데이트
    useEffect(() => {
        loadNoticeList();
    }, [crewId]);

    // 공지들 정렬
    const sortNoticeList = (noticeList) => {
        if(!Array.isArray(noticeList)){
            return [];
        }
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
        if(accessToken){
            navigate(`/crews/${crewId}/addNotice`);
        }
    }
    
    const togglePin = (id) => {
        setNoticeList(sortNoticeList(noticeList.map(notice => 
            notice.id === id ? {...notice, isPinned: !notice.isPinned} : notice)
        ));
        console.log(noticeList);
    };
    const toggleMenu = (id)=>{
        setNoticeList(currentNotices => 
            currentNotices.map(notice=>
                notice.id === id ? {...notice, isOpenedMenu: !notice.isOpenedMenu} : notice
        ));
        // console.log(noticeList);
    };
    console.log(noticeList);
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
                    isManager={isManager}
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