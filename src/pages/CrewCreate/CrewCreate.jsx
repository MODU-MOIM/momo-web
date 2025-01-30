import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SetCategory from "./Components/SetCategory";
import SetRegion from "./Components/SetRegion";
import { AgeSelect, GenderSelect } from "./Components/SelectBox";
import CrewIntroEditor from "./Components/CrewIntroEditor";

export default function CrewCreate() {
    const [crewName, setCrewName] = useState("");
    const [category, setCategory] = useState({});
    const [region, setRegion] = useState([]);
    const [minNumber, setMinNumber] = useState();
    const [maxNumber, setMaxNumber] = useState();
    const [gender, setGender] = useState('noLimit');
    const [minAge, setMinAge] = useState('noLimit');
    const [maxAge, setMaxAge] = useState('noLimit');
    const [infoContent, setInfoContent] = useState();
    const [allow, setAllow] = useState(false);
    
    const handleCrewName = (e) => setCrewName(e.target.value);
    const handleCategory = (selectedCategory) => setCategory(selectedCategory);
    const handleRegion = (selectedRegion) => setRegion(selectedRegion);
    const handleMinNumber = (e) => setMinNumber(e.target.value);
    const handleMaxNumber = (e) => setMaxNumber(e.target.value);
    const handleGender = (slectedGender) => setGender(slectedGender);
    const handleMinAge = (selectedMinAge) => setMinAge(selectedMinAge);
    const handleMaxAge = (selectedMaxAge) => setMaxAge(selectedMaxAge);

    // 버튼 활성화
    useEffect(()=>{
        if(crewName && region && minNumber && maxNumber && infoContent.length>20){
            setAllow(true);
        }else{
            setAllow(false);
        }
    },[crewName, region, minNumber, maxNumber, infoContent]);

    const handleSubmit = () => {
        let regionData = [];
        for (let key in region) {
            for(let i=0; i<region[key].length; i++){
                regionData.push({regionDepth1: key, regionDepth2: region[key][i]});
            }
        }
        const submitData = {
            name: crewName,
            category: category.title,
            decription: infoContent,
            minMembers: minNumber,
            maxMembers: maxNumber,
            regions: regionData,
        }
        // 제한없음 상태이면 해당 필드 제외
        if (minAge !== 'noLimit') {
            submitData.minAge = minAge;
        }
        if (maxAge !== 'noLimit') {
            submitData.maxAge = maxAge;
        }
        if (gender !== 'noLimit') {
            submitData.genderRestriction = gender;
        }
        console.log(submitData);
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
                    {/* 인원 수 설정 */}
                    <ItemContainer>
                        <ItemTitle>참여인원(호스트 포함)</ItemTitle>
                        <NumberSetting>
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
                                    min={2}
                                    max={30}
                                    value={maxNumber}
                                    onChange={handleMaxNumber}
                                />
                                <TextItem>명</TextItem>
                            </NumberContainer>
                        </NumberSetting>
                    </ItemContainer>
                    
                    {/* 성별 설정 */}
                    <ItemContainer>
                        <ItemTitle>성별 제한</ItemTitle>
                        <GenderSelect onGenderChange={handleGender}/>
                    </ItemContainer>
                    
                    {/* 나이 설정 */}
                    <ItemContainer>
                        <ItemTitle>나이 제한</ItemTitle>
                        <AgeSelect onMinAgeChange={handleMinAge} onMaxAgeChange={handleMaxAge}/>
                    </ItemContainer>
                    
                </CrewSettings>
        
                {/* 크루 설명 컴포넌트 */}
                <CrewIntroEditor setInfoContent={setInfoContent}/>
                <SubmitContainer>
                    <CreateButton 
                        onClick={handleSubmit}
                        allow={allow}
                    >완료</CreateButton>
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
const ItemContainer = styled.div`
    margin-bottom: 50px;
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
    &:hover{
        background-color: ${props => props.allow ?'#352EAE' :'gray'};
        cursor: ${props => props.allow ? 'pointer':'not-allowed'};
    }
`;