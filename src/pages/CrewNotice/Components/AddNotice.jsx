import { useState } from "react";
import styled from "styled-components";

export default function AddNotice() {
    const [isDeleted, setIsDeleted] = useState(false);

    return(
        <Wrapper>
            <Container>
                <MainContainer>
                    <InputText placeholder="공지사항 입력"></InputText>
                    <VoteContainer>
                        <VoteBox shouldHide={isDeleted}>
                            <VoteTitle>정모 참여 여부 투표</VoteTitle>
                            <SelectBox>
                                <SelectList>참여</SelectList>
                                <SelectList>미참여</SelectList>
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
                    <PostNotice>공지 생성</PostNotice>
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