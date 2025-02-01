import { useEffect, useState } from "react";
import * as S from "../Styles/Notice.styles";
import { noticeAPI } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useNotices } from "../NoticeProvider";

export default function AddNotice() {
    const { crewId } = useParams(); //crewId 받기
    const navigate = useNavigate();
    const { noticeList, setNoticeList } = useNotices();
    const [isEnabled, setIsEnabled] = useState(true);
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

    const handleTitle = (e) => setVoteInfo((prev)=>({...prev, title: e.target.value}));
    const handleNotice = (e) => setNotice(e.target.value);

    const handleSubmit = async ()=>{
        const now = new Date();
        const year = now.getFullYear();  // 현재 년도
        const month = now.getMonth() + 1;  // 월 (0부터 시작하므로 +1)
        const day = now.getDate();  // 일
        const hours = now.getHours();  // 시
        const minutes = now.getMinutes();  // 분
        const dayOfWeek = now.getDay();  // 요일 번호 (0-6)
        // 요일 배열, 인덱스 0부터 일요일, 월요일, ..., 토요일
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        // // 2024.12.14 (토) 같은 형식
        const formatDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} (${days[dayOfWeek]})`;
        // // 17:03 같은 형식
        const formatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        try{
            const noticeData = isEnabled ? {
                content: notice,
                vote: {
                    isEnabled: isEnabled,
                    title: voteInfo.title,
                }
            }:{
                content: notice,
                vote: {
                    isEnabled: isEnabled,
                }
            }
    
            const token = localStorage.getItem('token');
            console.log("Notice data: ", noticeData);
            const response = await noticeAPI.createNotice(crewId, noticeData);
            if(response.status === 200){
                alert("공지가 생성되었습니다");
                const noticeId = response.data.data;
                setNoticeList(noticeList.map(notice=>
                    notice.id === noticeId ? ({ 
                        ...notice, 
                        date: formatDate,
                        time: formatTime,
                        isPinned: false,
                        isOpenedMenu: false,
                        isEnabled: isEnabled,
                        showVote: false,
                    }) : notice));
                // setNoticeList(prev=>[...prev, newNoticeInfo]);
                navigate(`/crews/${crewId}/crewNotice`);
            }else{
                console.log("공지 생성 요청 실패",response.data);
            }
        } catch (error) {
            console.error('공지생성실패:', error);
            alert("공지 생성 실패");
        }
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
                        <S.VoteBox shouldHide={!isEnabled}>
                            <S.VoteTitle
                                value={voteInfo.title}
                                onChange={handleTitle}
                            />
                            <S.SelectBox>
                                {voteInfo.selectList?.map((list, index)=>(
                                    <S.SelectList key={index}>{list}</S.SelectList>
                                ))}
                            </S.SelectBox>
                        </S.VoteBox>
                        <S.ButtonContainer>
                            <S.VoteButton
                                isEnabled={isEnabled}
                                shouldHide={!isEnabled}
                                onClick={() => setIsEnabled(false)}
                            >투표 삭제하기</S.VoteButton>
                            {!isEnabled && 
                            <S.VoteButton 
                                isEnabled={isEnabled}
                                onClick={()=>setIsEnabled(true)}
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

