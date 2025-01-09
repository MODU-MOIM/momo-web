import { useEffect, useState } from "react";
import styled from "styled-components";

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
        console.log("공지내용:",notice);
        console.log("voteTitle: ",voteInfo.title);
        console.log("voteList: ",voteInfo.selectList);
    }

    return(
        <Wrapper>
            <Container>
                <MainContainer>
                    <InputText 
                        placeholder="공지사항 입력"
                        onChange={handleNotice}
                    />
                    <VoteContainer>
                        <VoteBox shouldHide={isDeleted}>
                            <VoteTitle>{voteInfo.title}</VoteTitle>
                            <SelectBox>
                                {voteInfo.selectList?.map((list, index)=>(
                                    <SelectList key={index}>{list}</SelectList>
                                ))}
                            </SelectBox>
                        </VoteBox>
                        <ButtonContainer>
                            <VoteButton
                                isDeleted={isDeleted}
                                shouldHide={isDeleted}
                                onClick={() => setIsDeleted(true)}
                            >투표 삭제하기</VoteButton>
                            {isDeleted && 
                            <VoteButton 
                                isDeleted={isDeleted}
                                onClick={()=>setIsDeleted(false)}
                            >투표 생성하기</VoteButton>}
                        </ButtonContainer>
                    </VoteContainer>
                </MainContainer>
                <SubContainer>
                    <PostNotice onClick={handleSubmit}>공지 생성</PostNotice>
                </SubContainer>
            </Container>
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
const Container = styled.div`
    display: flex;
    flex-direction: column;
        
    margin-top: 30px;
    margin-bottom: 100px;
    width: 768px; 
    height: 370px;
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 15px;
`;
const MainContainer = styled.div`
    display: flex;
    
`;
const VoteContainer = styled.div`
    margin: 50px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;
const VoteBox = styled.div`
    width: 200px;
    margin-bottom: 20px;
    /* height: 160px; */
    background-color: white;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    display: ${props => props.shouldHide ? 'none' : 'inline-block'};
`;
const VoteTitle = styled.ul`
`;
const SelectBox = styled.div`
`;
const SelectList = styled.li`
    margin: 10px;
    padding: 5px;
    padding-left: 10px;
    font-size: 15px;
    list-style-type: none;
    border: 1px solid #D4E3FB;
    border-radius: 10px;
`;
const ButtonContainer = styled.div`
`;
const VoteButton = styled.button`
    width: 200px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #F0F0F0;
    display: ${props => props.shouldHide ? 'none' : 'inline-block'};
    color: ${props => props.isDeleted ? "black" : "red"};
`;
const InputText = styled.textarea`
    margin: 40px 0px 20px 40px;
    padding: 20px;
    width: 420px;
    height: 200px;
    resize: none;
    background-color: #F0F0F0;
    border: none;
    border-radius: 15px;
`;
const SubContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const PostNotice = styled.button`
    padding: 10px;
    width: 15%;
    color: white;
    border: none;
    border-radius: 30px;
    background-color: #4B44B6;
    &:hover{
        background: #352EAE;
        border: 1px solid white;
    }
`;