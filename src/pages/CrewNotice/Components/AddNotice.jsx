import { useEffect, useState } from "react";
import * as S from "../Styles/Notice.styles";
import { noticeAPI } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddNotice() {
    const { crewId } = useParams(); //crewId 받기
    const navigate = useNavigate();
    const [isEnabled, setIsEnabled] = useState(true);
    const [isGeneral, setIsGenral] = useState(true);
    const [voteInfo, setVoteInfo] = useState({});
    const [notice, setNotice] = useState("");

    useEffect(()=>{
        const initialVoteInfo = {
            title: "투표명 설정해주세요",
            selectList: isGeneral ? ["찬성", "반대"] : ["참석", "미참석"]
        }
        setVoteInfo(initialVoteInfo);
    },[isGeneral]);

    const handleTitle = (e) => setVoteInfo((prev)=>({...prev, title: e.target.value}));
    const handleNotice = (e) => setNotice(e.target.value);

    const handleSubmit = async ()=>{
        try{
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
                    <S.PostNotice onClick={handleSubmit}>공지 생성</S.PostNotice>
                </S.SubContainer>
            </S.Container>
        </S.Wrapper>
    );
}

