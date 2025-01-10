import { useLocation } from "react-router-dom";
import * as S from "../Styles/Notice.styles";
import { useEffect, useState } from "react";

export default function UpdateNotice() {
    const location = useLocation();

    // const [isDeleted, setIsDeleted] = useState(false);
    // const [voteInfo, setVoteInfo] = useState({});
    const [notice, setNotice] = useState('');
    console.log(notice);
    useEffect(() => {
        // location.state가 정의되어 있고, 그 안에 noticeData 객체가 존재하는지를 확인하여 상태 설정
        if (location.state && location.state.noticeData) {
            setNotice(location.state.noticeData.content);
        }
        // // 다른 notice 선택으로 인해 location.state변하기 때문에 의존성 배열로 설정
    }, [location.state]);


    // // voteInfo 직접 수정 기능 만들기
    // useEffect(()=>{
    //     const initialVoteInfo = {
    //         title: "정모 참여 여부 투표",
    //         selectList: ["참여", "미참여"]
    //     }
    //     setVoteInfo(initialVoteInfo);
    // },[]);

    const handleNotice = (e) => setNotice(e.target.value);

    const handleSubmit = ()=>{
        console.log("수정된 공지내용:",notice);
        // console.log("voteTitle: ",voteInfo.title);
        // console.log("voteList: ",voteInfo.selectList);
    }

    return(
        <S.Wrapper>
            <S.Container>
                <S.MainContainer>
                    <S.InputText 
                        value={notice}
                        onChange={handleNotice}
                    ></S.InputText>
                    {/* <S.VoteContainer>
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
                    </S.VoteContainer> */}
                </S.MainContainer>
                <S.SubContainer>
                    <S.PostNotice onClick={handleSubmit}>공지 수정</S.PostNotice>
                </S.SubContainer>
            </S.Container>
        </S.Wrapper>
    );
}