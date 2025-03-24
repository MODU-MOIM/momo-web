import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as S from "../Styles/Notice.styles";
import { useEffect, useState } from "react";
import { noticeAPI } from "../../../api";

export default function UpdateNotice() {
    const location = useLocation();
    const navigate = useNavigate();
    const { crewId } = useParams();
    const NoticeData = location.state.noticeData;

    const [voteInfo, setVoteInfo] = useState({});
    const [notice, setNotice] = useState('');
    const [isEnabled, setIsEnabled] = useState(NoticeData.vote.isEnabled);
    const [isGeneral, setIsGenral] = useState(NoticeData.vote.voteType === "GENERAL");
    
    useEffect(() => {
        // location.state가 정의되어 있고, 그 안에 noticeData 객체가 존재하는지를 확인하여 상태 설정
        if (location.state && NoticeData) {
            // console.log(NoticeData);
            setNotice(NoticeData.content);
        }
        // // 다른 notice 선택으로 인해 location.state변하기 때문에 의존성 배열로 설정
    }, [location.state]);
    
    useEffect(()=>{
        const initialVoteInfo = {
            title: NoticeData.vote.title,
            selectList: isGeneral ? ["찬성", "반대"] : ["참석", "미참석"]
        }
        setVoteInfo(initialVoteInfo);
    },[isGeneral]);

    const handleNotice = (e) => setNotice(e.target.value);
    const handleTitle = (e) => setVoteInfo((prev)=>({...prev, title: e.target.value}));

    const handleSubmit = async ()=>{
        try {
            const noticeId = NoticeData.noticeId;
            const noticeData = isEnabled ? {
                content: notice,
                vote: {
                    isEnabled: isEnabled,
                    voteType: isGeneral ? "GENERAL" : "ATTENDANCE",
                    title: voteInfo.title,
                }
            }:{
                content: notice,
                vote: {
                    isEnabled: isEnabled,
                }
            }
            // console.log("noticeId",noticeId);
            // console.log("noticeData",noticeData);
            await noticeAPI.updateNotice(crewId, noticeId, noticeData);
            alert("공지가 수정되었습니다");
            navigate(`/crews/${crewId}/crewNotice`);
        } catch (error) {
            console.error('공지 수정 실패:', error);
            alert("공지 수정 실패");
        }
    }

    return(
        <S.Wrapper>
            <S.Container>
                <S.MainContainer>
                    <S.InputText 
                        value={notice}
                        onChange={handleNotice}
                    ></S.InputText>
                    <S.VoteContainer>
                        {isEnabled && <S.TopContainer>
                            {isGeneral ? (
                                <div style={{display: "flex"}}>
                                    <S.VoteTypeText>* 찬반투표 *</S.VoteTypeText>
                                    <S.ChangeVoteType onClick={()=>setIsGenral(!isGeneral)}/>
                                </div>
                            ):(
                                <div style={{display: "flex"}}>
                                    <S.VoteTypeText>* 참석여부투표 *</S.VoteTypeText>
                                    <S.ChangeVoteType onClick={()=>setIsGenral(!isGeneral)}/>
                                </div>
                            )}
                        </S.TopContainer>}
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
                    <S.PostNotice onClick={handleSubmit}>공지 수정</S.PostNotice>
                </S.SubContainer>
            </S.Container>
        </S.Wrapper>
    );
}