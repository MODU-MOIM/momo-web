import styled from "styled-components";
import NoticeList from "./Components/NoticeList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrewNotice() {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [isOpenedMenu, setIsOpenedMenu] = useState(false);
    const initialNotices = [
        { id: 1, content: "첫 번째 공지사항 내용입니다.\ndd", date: "2024.12.10 (화)", time: "12:00", isPinned: false, isOpenedMenu: false },
        { id: 2, content: "두 번째 공지사항 내용입니다.", date: "2024.12.10 (화)", time: "13:00", isPinned: false, isOpenedMenu: false },
        { id: 3, content: "세 번째 공지사항 내용입니다.", date: "2024.12.12 (목)", time: "03:00", isPinned: false, isOpenedMenu: false }
    ];
    
    useEffect(()=>{
        setNotices(initialNotices);
    },[]);
    
    // 공지들 정렬
    const sortNotices = (notices) => {
        return [...notices].sort((a, b) => {
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
        setNotices(currentNotices => sortNotices([...currentNotices]));
    }, []);
    
    // 경로 추가하기 
    const linktoAddNotice = () => navigate('/crew/addNotice');
    
    const togglePin = (id) => {
        setNotices(sortNotices(notices.map(notice => 
            notice.id === id ? {...notice, isPinned: !notice.isPinned} : notice)
        ));
        console.log(notices);
    };
    const toggleMenu = (id)=>{
        setNotices(notices.map(notice=>
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
                    notices={notices}
                    togglePin={togglePin}
                    toggleMenu={toggleMenu}
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
    background-color: #352EAE;
    border: 1px solid #DEDFE7;
    border-radius: 20px;
`;
const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;