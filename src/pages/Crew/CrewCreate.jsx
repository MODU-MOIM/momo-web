import React, { useState } from "react";
import styled from "styled-components";
import SetCategory from "./Components/SetCategory";
import SetRegion from "./Components/SetRegion";
import { AgeSelect, GenderSelect } from "./Components/SelectBox";

export default function CrewCreate() {
    const [crewName, setCrewName] = useState("");
    const [category, setCategory] = useState({});
    const [region, setRegion] = useState([]);
    const [minNumber, setMinNumber] = useState();
    const [maxNumber, setMaxNumber] = useState();
    const [crewIntro, setCrewIntro] = useState("");
    const [gender, setGender] = useState('noLimit');
    const [minAge, setMinAge] = useState('noLimit');
    const [maxAge, setMaxAge] = useState('noLimit');
    
    const handleCrewName = (e) => setCrewName(e.target.value);
    const handleCategory = (selectedCategory) => setCategory(selectedCategory);
    const handleRegion = (selectedRegion) => setRegion(selectedRegion);
    const handleMinNumber = (e) => setMinNumber(e.target.value);
    const handleMaxNumber = (e) => setMaxNumber(e.target.value);
    const handleGender = (slectedGender) => setGender(slectedGender);
    const handleMinAge = (selectedMinAge) => setMinAge(selectedMinAge);
    const handleMaxAge = (selectedMaxAge) => setMaxAge(selectedMaxAge);
    const handleCrewIntro = (e) => setCrewIntro(e.target.value);

    const handleSubmit = () => {
        console.log(crewName);
        console.log(category);
        console.log(region);
        console.log(minNumber);
        console.log(maxNumber);
        console.log(gender);
        console.log(minAge);
        console.log(maxAge);
        console.log(crewIntro);
    }
    
    return(
        <Wrapper>

            <Container>

                <Title>내 취향의 모임을 함께 할 사람을 찾아보세요</Title>
        
                <CrewName>
                    <ItemTitle>크루명을 작성해주세요</ItemTitle>
                    <NameInput
                        placeholder="크루명을 작성해주세요."
                        value={crewName}
                        onChange={handleCrewName}
                    />
                </CrewName>
                
                {/* 모임활동 선택 */}
                <ItemTitle>어떤 모임 활동을 하실건가요?</ItemTitle>
                <SetCategory onCategoryChange={handleCategory}/>
        
                {/* 지역,구 선택 */}
                <ItemTitle>어디서 만날까요?</ItemTitle>
                <SetRegion onRegionChange={handleRegion}/>
        
                <CrewSettings>
                    <ItemTitle>참여인원(호스트 포함)</ItemTitle>
                    <NumberSetting>
                        {/* 인원 수 설정 */}
                        <NumberContainer>
                            <TextItem>최소 </TextItem>
                            <SetNumber 
                                type="number" 
                                min={2}
                                value={minNumber}
                                onChange={handleMinNumber}
                            />
                            <TextItem>명</TextItem>
                        </NumberContainer>
                        <TextItem>~</TextItem>
                        <NumberContainer>
                            <TextItem>최대 </TextItem>
                            <SetNumber
                                type="number"
                                max={30}
                                value={maxNumber}
                                onChange={handleMaxNumber}
                            />
                            <TextItem>명</TextItem>
                        </NumberContainer>
                    </NumberSetting>

                    {/* 성별 설정 */}
                    <ItemTitle>성별 제한</ItemTitle>

                    <GenderSelect/>

                    {/* 나이 설정 */}
                    <ItemTitle>나이 제한</ItemTitle>
                    <AgeSelect/>
                    
                </CrewSettings>
        
                {/* <ItemTitle>크루 설명</ItemTitle> */}
                <CrewIntro
                    value={crewIntro}
                    onChange={handleCrewIntro}
                >
                    크루 설명을 입력해주세요</CrewIntro>
                <SubmitContainer>
                    <CreateButton onClick={handleSubmit}>완료</CreateButton>
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
    font-weight: bolder;
    margin: 60px 0px;
    width: 60vw;
`;
const ItemTitle = styled.h3`
    font-weight: bolder;
    margin: 40px 0px 15px 0px;
    width: 60vw;
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


const CrewSettings = styled.div`
`;

const NumberSetting = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-around;
    `;

const NumberContainer = styled.div`
    margin: 0px 5px;
`;
const TextItem = styled.span`
    font-size: 15px;
`;
const SetNumber = styled.input`
    margin: 0px 10px;
    width: 70px;
    height: 30px;
    text-align: center;
    border: 1px solid #DEDFE7;
    border-radius: 3px;
`;
const CrewIntro = styled.textarea`
    padding: 50px;
    width: 60%;
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