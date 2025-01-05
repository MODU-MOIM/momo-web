import React from "react";
import styled from "styled-components";
import SetCategory from "./Components/SetCategory";
import SetRegion from "./Components/SetRegion";

export default function CrewCreate() {
    return(
        <Wrapper>

            <Container>

                <Title>내 취향의 모임을 함께 할 사람을 찾아보세요</Title>
        
                <CrewName>
                    <ItemTitle>크루명을 작성해주세요</ItemTitle>
                    <NameInput
                        placeholder="크루명을 작성해주세요."
                    />
                </CrewName>
                
                <CrewTheme>
                    <ItemTitle>어떤 모임 활동을 하실건가요?</ItemTitle>
                    {/* 모임활동 선택 */}
                    <SetCategory/>
                </CrewTheme>
        
                <CrewLocation>
                    <ItemTitle>어디서 만날까요?</ItemTitle>
                    {/* 지역,구 선택 */}
                    <SetRegion/>
                </CrewLocation>
        
                <CrewSettings>
                    <ItemTitle>참여인원(호스트 포함)</ItemTitle>
                    {/* 인원 수 설정 */}
                    <span>최소 </span> {/* 최소 2명부터 */}
                    <SetNumber type="number"/>
                    <span>명</span>
                    <span>~</span>
                    <span>최대 </span>
                    <SetNumber type="number"/>
                    <span>명</span>
                    {/* 성별 설정 */}
                    <ItemTitle>성별 제한</ItemTitle>

                    {/* 나이 설정 */}
                    <ItemTitle>나이 제한</ItemTitle>
                </CrewSettings>
        
                {/* <ItemTitle>크루 설명</ItemTitle> */}
                <CrewIntro>크루 설명을 입력해주세요</CrewIntro>
                <SubmitContainer>
                    <CreateButton>완료</CreateButton>
                </SubmitContainer>
            </Container>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    // background-color: #F6F7F9;
    display: flex;
    justify-content: center;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 60px 0px;
    width: 80%;
`
const Title = styled.h2`
    font-weight: normal;
    margin: 60px 0px;
    width: 50vw;
`;
const ItemTitle = styled.h3`
    font-weight: normal;
    margin: 40px 0px 15px 0px;
    width: 50vw;
`;

const CrewName = styled.div`
    margin-bottom: 40px;
`;
const NameInput = styled.input`
    padding: 10px;
    width: 400px;
    border: 1px solid #4B44B6;
    border-radius: 5px;
    box-shadow: none;

    &::placeholder {
        color: #929292;
    }
`;

const CrewTheme = styled.div`
`;
const CrewLocation = styled.div`
`;

const CrewSettings = styled.div`
`;

const SetNumber = styled.input`
    margin: 0px 10px;
    width: 50px;  
    border: 1px solid #DEDFE7;
    border-radius: 3px;
`;
const CrewIntro = styled.textarea`
    padding: 50px;
    width: 500px;
    height: 400px;
    border: 1px solid #DEDFE7;
    border-radius: 10px;
`;
const SubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    
`
const CreateButton = styled.button`
    margin: 50px;
    padding: 10px;
    width: 250px;
    border: none;
    background-color: #4B44B6;
    color: white;
    border-radius: 10px;
`;