import styled from "styled-components";
import NoticeList from "./Components/NoticeList";
import { useEffect, useState } from "react";

export default function CrewNotice() {
    const [notices, setNotices] = useState([]);
    const initialNotices = [
        { id: 1, content: "첫 번째 공지사항 내용입니다.", date: "2024.12.12 (수)" },
        { id: 2, content: "두 번째 공지사항 내용입니다.", date: "2024.12.12 (수)" },
        { id: 3, content: "세 번째 공지사항 내용입니다.", date: "2024.12.12 (수)" }
    ];

    useEffect(()=>{
        setNotices(initialNotices);
    },[]);

    return(
        <Wrapper>
            {/* 무한스크롤 적용해야함 */}
            <NoticeList notices={notices}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;