import { useEffect, useState } from "react";
import * as S from "../Styles/Notice.styles";

export default function AddNotice() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [voteInfo, setVoteInfo] = useState({});
    const [notice, setNotice] = useState("");

    // voteInfo 직접 수정 기능 만들기
    useEffect(()=>{
        const initialVoteInfo = {
            title: "정모 참여 여부 투표",
            selectList: ["참여", "미참여"]
        }
        setVoteInfo(initialVoteInfo);
    },[]);

    const handleNotice = (e) => setNotice(e.target.value);

    const handleSubmit = ()=>{
        const now = new Date();
        const year = now.getFullYear();  // 현재 년도
        const month = now.getMonth() + 1;  // 월 (0부터 시작하므로 +1)
        const day = now.getDate();  // 일
        const hours = now.getHours();  // 시
        const minutes = now.getMinutes();  // 분
        const dayOfWeek = now.getDay();  // 요일 번호 (0-6)

        // 요일 배열, 인덱스 0부터 일요일, 월요일, ..., 토요일
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        // 2024.12.14 (토) 같은 형식
        const formatDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} (${days[dayOfWeek]})`;
        // 17:03 같은 형식
        const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
       
        console.log("공지내용:",notice);
        console.log("voteTitle: ",voteInfo.title);
        console.log("voteList: ",voteInfo.selectList);
        console.log("날짜: ",formatDate);
        console.log("시간: ",formatTime);
    }

    return(
        <S.Wrapper>
            <S.Container>
                <S.MainContainer>
                    <S.InputText 
                        placeholder="공지사항 입력"
                        onChange={handleNotice}
                    />
                    <S.VoteContainer>
                        <S.VoteBox shouldHide={isDeleted}>
                            <S.VoteTitle>{voteInfo.title}</S.VoteTitle>
                            <S.SelectBox>
                                {voteInfo.selectList?.map((list, index)=>(
                                    <S.SelectList key={index}>{list}</S.SelectList>
                                ))}
                            </S.SelectBox>
                        </S.VoteBox>
                        <S.ButtonContainer>
                            <S.VoteButton
                                isDeleted={isDeleted}
                                shouldHide={isDeleted}
                                onClick={() => setIsDeleted(true)}
                            >투표 삭제하기</S.VoteButton>
                            {isDeleted && 
                            <S.VoteButton 
                                isDeleted={isDeleted}
                                onClick={()=>setIsDeleted(false)}
                            >투표 생성하기</S.VoteButton>}
                        </S.ButtonContainer>
                    </S.VoteContainer>
                </S.MainContainer>
                <S.SubContainer>
                    <S.PostNotice onClick={handleSubmit}>공지 생성</S.PostNotice>
                </S.SubContainer>
            </S.Container>
        </S.Wrapper>
    );
}

