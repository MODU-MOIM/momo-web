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

