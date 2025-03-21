import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


export default function SetRegion({onRegionChange}) {
  const [regions, setRegions] = useState([]);
  const [districtsByRegion, setDistrictsByRegion] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [selectedDistrictsByRegion, setSelectedDistrictsByRegion] = useState({});
  
  // 데이터 가져오기
  useEffect(()=>{
    fetch('/Region.json')
    .then(res => res.json())
    .then(data=>{
      setRegions(data.regions);
      setDistrictsByRegion(data.districtsByRegion);
    })
    .catch(error=>console.error(error)
  )
},[]);
  
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    // 다른 지역(서울) 선택 시 선택값(종로구,etc) 초기화
    const initialDistrictsState = Object.keys(districtsByRegion).reduce((acc, region)=>({
      ...acc, [region] : []
    }),{});
    setSelectedDistrictsByRegion(initialDistrictsState);
  };
  
  const handleDistrictSelection = (district) => {
    const currentSelected = selectedDistrictsByRegion[selectedRegion] || [];
    
    if (currentSelected.includes(district)) {
      // 선택한 지역 한 번 더 눌러서 취소
      setSelectedDistrictsByRegion(prev => ({
        ...prev,
        [selectedRegion]: currentSelected.filter(d => d !== district)
      }));
    } 
    // 3개 이하로 선택 시 저장
    else if (currentSelected.length < 3) {
      setSelectedDistrictsByRegion(prev => ({
        ...prev,
        [selectedRegion]: [...currentSelected, district]
      }));
    }
  };

  useEffect(()=>{
    onRegionChange(selectedDistrictsByRegion);
  },[selectedDistrictsByRegion])

  const currentDistricts = districtsByRegion[selectedRegion] || [];
  const selectedDistricts = selectedDistrictsByRegion[selectedRegion] || [];

  // 레이아웃 3개로 분할(3행으로 설정)
  const districtsGroups = [];
  for (let i = 0; i < currentDistricts.length; i += 3) {
    districtsGroups.push(currentDistricts.slice(i, i + 3));
  }

  return (
    <Container>
      <RegionContainer>
        {regions.map((region) => (
          <RegionButton
            key={region}
            selected={selectedRegion === region}
            onClick={() => handleRegionChange(region)}
          >
            {region}
          </RegionButton>
        ))}
      </RegionContainer>

      <DistrictsGrid>
        {districtsGroups.map((group, index) => (
          <div key={index}>
            {group.map((district) => (
              <DistrictButton
                key={district}
                selected={selectedDistricts.includes(district)}
                disabled={!selectedDistricts.includes(district) && selectedDistricts.length >= 3}
                onClick={() => handleDistrictSelection(district)}
              >
                {district}
              </DistrictButton>
            ))}
          </div>
        ))}
      </DistrictsGrid>
    </Container>
  );
};

const Container = styled.div`
    max-width: 800px;
    margin-bottom: 30px;
    padding: 20px;
`;

const RegionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid #DEDFE7;
    margin-bottom: 24px;
`;

const RegionButton = styled.button`
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid ${props => props.selected ? '#4B44B6' : '#DEDFE7'};
    background-color: ${props => props.selected ? '#4B44B6' : 'white'};
    color: ${props => props.selected ? 'white' : 'black'};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.selected ? '#4B44B6' : '#DEDFE7'};
    }
`;

const DistrictsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 16px;
`;

const DistrictButton = styled.button`
    width: 100%;
    text-align: center;
    padding: 8px 0px;
    border-radius: 6px;
    border: 1px solid ${props => props.selected ? '#4B44B6' : '#DEDFE7'};
    background-color: ${props => props.selected ? '#4B44B6' : 'white'};
    color: ${props => props.selected ? 'white' : 'black'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    // 투명도를 설정하여 버튼 비활성화 표시
    opacity: ${props => props.disabled ? '0.5' : '1'};
    margin-bottom: 8px;

    &:hover {
        background-color: ${props => props.selected ? '#4B44B6' : '#DEDFE7'};
    }
`;