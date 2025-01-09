import styled from "styled-components";
import NoticeList from "./Components/NoticeList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddNotice from "./Components/AddNotice";

export default function CrewNotice() {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const initialNotices = [
        { id: 1, content: "첫 번째 공지사항 내용입니다.", date: "2024.12.12 (수)", isPinned: false },
        { id: 2, content: "두 번째 공지사항 내용입니다.", date: "2024.12.12 (수)", isPinned: false },
        { id: 3, content: "세 번째 공지사항 내용입니다.", date: "2024.12.12 (수)", isPinned: false }
    ];
    
    useEffect(()=>{
        setNotices(initialNotices);
    },[]);
    
    // 공지들 정렬
    const sortNotices = (notices) => {
        return notices.sort((a, b) => b.isPinned - a.isPinned);
    };
    useEffect(() => {
        setNotices(currentNotices => sortNotices([...currentNotices]));
    }, [notices]);
    
    // 경로 추가하기 
    const linktoAddNotice = () => navigate('/crew/crewNotice/addNotice');
    
    const togglePin = (id) => {
        setNotices(notices.map(notice => 
            notice.id === id ? {...notice, isPinned: !notice.isPinned} : notice
        ));
    };
    return(
        <Wrapper>
            {/* userid 받아서 관리자만 보이도록 수정해야 함 */}
            <AddNoticeButton onClick={linktoAddNotice} >+ 공지추가</AddNoticeButton>
            {/* 무한스크롤 적용해야 함 */}
            <NoticeContainer>
                <NoticeList notices={notices} togglePin={togglePin}/>
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