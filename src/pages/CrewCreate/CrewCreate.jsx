import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SetCategory from "./Components/SetCategory";
import SetRegion from "./Components/SetRegion";
import { AgeSelect, GenderSelect } from "./Components/SelectBox";
import CrewIntroEditor from "./Components/CrewIntroEditor";
import BannerImageInput from "./Components/BannerImageInput";
import initialBannerImage from "../../assets/initialBannerImage.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CrewCreate() {
    const navigate = useNavigate();
    const [crewName, setCrewName] = useState("");
    const [category, setCategory] = useState({});
    const [region, setRegion] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [minNumber, setMinNumber] = useState(2);
    const [maxNumber, setMaxNumber] = useState(2);
    const [gender, setGender] = useState('noLimit');
    const [minAge, setMinAge] = useState('noLimit');
    const [maxAge, setMaxAge] = useState('noLimit');
    const [infoContent, setInfoContent] = useState('');
    const [allow, setAllow] = useState(false);
    const [bannerImage, setBannerImage] = useState(initialBannerImage);
    const [bannerImageFile, setBannerImageFile] = useState(null);
    
    const handleCrewName = (e) => setCrewName(e.target.value);
    const handleCategory = (selectedCategory) => setCategory(selectedCategory);
    const handleMinNumber = (e) => setMinNumber(e.target.value);
    const handleMaxNumber = (e) => setMaxNumber(e.target.value);
    const handleGender = (slectedGender) => setGender(slectedGender);
    const handleMinAge = (selectedMinAge) => setMinAge(selectedMinAge);
    const handleMaxAge = (selectedMaxAge) => setMaxAge(selectedMaxAge);
    const handleRegion = (selectedRegion) => {
        setRegion(selectedRegion);
        let newRegionData = [];
        for (let key in selectedRegion) {
            for(let i=0; i<selectedRegion[key].length; i++){
                newRegionData.push({regionDepth1: key, regionDepth2: selectedRegion[key][i]});
            }
        }
        setRegionData(newRegionData);
    }
    // 버튼 활성화
    useEffect(()=>{
        if(crewName && regionData.length>0 && minNumber && maxNumber && infoContent.length>=20 && category){
            setAllow(true);
        }else{
            setAllow(false);
        }
    },[crewName, regionData, minNumber, maxNumber, infoContent, category]);

    // 이미지 파일을 URL로 변환하는 로직을 추가
    useEffect(() => {
        if (bannerImageFile) {
            const objectUrl = URL.createObjectURL(bannerImageFile);
            setBannerImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [bannerImageFile]);

    const handleImageUpload = async(file)=>{
        if (!file) return;
        if (!file.type.startsWith('image/')){
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }
        setBannerImageFile(file);
    }

    const handleSubmit = async() => {
        const crewReqDto = {
            name: crewName,
            category: category.title,
            description: infoContent,
            minMembers: Number(minNumber),
            maxMembers: Number(maxNumber),
            regions: regionData,
        };
        // 제한없음 상태이면 해당 필드 제외
        if (minAge !== 'noLimit') {
            crewReqDto.minAge = Number(minAge);
        }
        if (maxAge !== 'noLimit') {
            crewReqDto.maxAge = Number(maxAge);
        }
        if (gender !== 'noLimit') {
            crewReqDto.genderRestriction = gender;
        }
        
        const formData = new FormData();
        formData.append("crewReqDto", new Blob([JSON.stringify(crewReqDto)], { type: "application/json" }));

        console.log("crewReqDto: ",crewReqDto);
        console.log("File to be uploaded:", bannerImageFile);

        if (bannerImageFile) {
            formData.append("bannerImage", bannerImageFile);
        }else {
            console.log("No file selected");
        }
        
        try {
            console.log("get하여 배너이미지 확인 :");
            console.log(formData.get("bannerImage"));
            const token = localStorage.getItem('token');
            const response = await axios.post('/crews', formData, {
                headers: {
                    'Authorization': token,
                }
            });
            // if (response.status === 200 && !response.data.error) {
            //     console.log('크루 생성 성공 :', response);
            //     alert('크루 생성 성공');
            // } else {
            //     throw new Error(response.data.message || '알 수 없는 에러가 발생했습니다.');
            // }
            if (response.data.status === 200 && response.status === 200) {
                alert('요청이 성공적으로 처리되었습니다.');
            } else if (response.data.status === 500 || response.status === 500) {
                console.error('서버 오류 발생:', response.data);
                alert('서버 오류가 발생했습니다.');
            } else {
                alert('알 수 없는 응답 상태입니다.');
            }
            console.log('크루 생성 성공 :', response);
            alert('크루 생성 성공');
            navigate('/crewList');
        } catch (error) {
            console.log("크루 생성 실패", error);
            alert("크루 생성 실패");
        }
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
                <Banner>
                    <ItemTitle>배너 이미지를 선택해주세요</ItemTitle>
                    <BannerImageInput
                        bannerImage={bannerImage}
                        setBannerImage={setBannerImage}
                        handleImageUpload={handleImageUpload}
                    />
                </Banner>
                
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
                        disabled={!allow}
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
const Banner = styled.div`
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
        background-color: ${props => props.disabled ?'gray' :'#352EAE'};
        cursor: ${props => props.disabled ? 'not-allowed':'pointer'};
    }
`;