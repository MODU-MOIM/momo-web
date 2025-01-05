import React, { useState } from 'react';
import styled from 'styled-components';

export default function SetPlace() {
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const initialDistrictsState = {
    '서울': [],
    '부산': [],
    '대구': [],
    '인천': [],
    '광주': [],
    '대전': [],
    '울산': [],
    '세종': [],
    '경기도': [],
    '강원도': [],
    '충청북도': [],
    '충청남도': [],
    '경상북도': [],
    '경상남도': [],
    '전라남도': [],
    '전라북도': [],
    '제주도': []
  };

  const [selectedDistrictsByRegion, setSelectedDistrictsByRegion] = useState(initialDistrictsState);

  const regions = [
    '서울', '부산', '대구', '인천', '광주', '대전',
    '울산', '세종', '경기도', '강원도', '충청남도', '충청북도',
    '경상남도', '경상북도', '전라남도', '전라북도', '제주도'
  ];

  const districtsByRegion = {
    '서울': [
      '종로구', '중구', '용산구', '성동구', '광진구', '동대문구',
      '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구',
      '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구'
    ],
    '부산': [
      '중구', '서구', '동구', '영도구', '부산진구', '동래구',
      '남구', '북구', '해운대구', '사하구', '금정구', '강서구',
      '연제구', '수영구', '사상구', '기장군'
    ],
    '대구': [
      '중구', '동구', '서구', '남구', '북구', '수성구',
      '달서구', '달성군', '군위군'
    ],
    '인천': [
      '중구', '동구', '미추홀구', '연수구', '남동구', '부평구',
      '계양구', '서구', '강화군', '옹진군'
    ],
    '광주': [
      '동구', '서구', '중구', '북구', '광산구'
    ],
    '대전': [
        '중구', '서구', '동구', '유성구', '대덕구'
    ],
    '울산': [
        '중구', '남구', '동구', '북구', '울주군'
    ],
    '세종': [
        '조치원읍', '연기면', '연동면', '부강면', '금남면', '장군면',
        '연서면', '전의면', '전동면', '소정면', '한솔동', '새롬동',
        '나성동', '다정동', '도담동', '어진동', '해밀동', '아름동',
        '종촌동', '고운동', '보람동', '대평동', '소담동', '반곡동'
    ],
    '경기도': [
        '수원시', '성남시', '의정부시', '안양시', '부천시', '광명시',
        '동두천시', '평택시', '안산시', '고양시', '과천시', '구리시',
        '남양주시', '오산시', '시흥시', '군포시', '의왕시', '시흥시',
        '하남시', '용인시', '파주시', '이천시', '안성시', '김포시',
        '화성시', '광주시', '양주시', '포천시', '여주시', '연천군',
        '가평군', '양평군'
    ],
    '강원도': [
        '춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시',
        '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군',
        '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'
    ],
    '충청북도': [
        '청주시', '충주시', '제천시', '보은군', '옥천군', '영동군',
        '증평군', '진천군', '괴산군', '음성군', '단양군'
    ],
    '충청남도': [
        '천안시', '공주시', '보령시', '아산시', '서산시', '논산시',
        '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군',
        '홍성군', '예산군', '태안군'
    ],
    '경상북도': [
        '포항시', '경주시', '김천시', '안동시', '구미시', '영주시',
        '영천시', '상주시', '문경시', '경산시', '의성군', '청송군',
        '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군',
        '예천군', '봉화군', '울진군', '울릉군'
    ],
    '경상남도': [
        '창원시', '진주시', '통영시', '사천시', '김해시', '밀양시',
        '거제시', '양산시', '마산시', '의령군', '함안군', '창년군',
        '고성군', '남해군', '하동군', '산청군', '함양군', '거창군',
        '합천군'
    ],
    '전라남도': [
        '목포시', '여수시', '순천시', '나주시', '광양시', '담양군',
        '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군',
        '강진군', '해남군', '영암군', '무안군', '함평군', '영광군',
        '장성군', '완도군', '진도군', '신안군'
    ],
    '전라북도': [
        '전주시', '군산시', '익산시', '정읍시', '남원시', '김제시',
        '진안군', '무주군', '장수군', '임실군', '순창군', '고창군',
        '부안군'
    ],
    '제주도': ['제주시', '서귀포시']

  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    // 다른 지역(서울) 선택 시 선택값(종로구,etc) 초기화
    setSelectedDistrictsByRegion(initialDistrictsState);
  };

  const handleDistrictSelection = (district) => {
    const currentSelected = selectedDistrictsByRegion[selectedRegion] || [];
    
    if (currentSelected.includes(district)) {
      // 선택한 지역 한 번 더 눌러서 취소
      setSelectedDistrictsByRegion({
        ...selectedDistrictsByRegion,
        [selectedRegion]: currentSelected.filter(d => d !== district)
      });
    } else if (currentSelected.length < 3) {
      // 3개 이하로 선택 시 저장
      setSelectedDistrictsByRegion({
        ...selectedDistrictsByRegion,
        [selectedRegion]: [...currentSelected, district]
      });
    }
  };

  const currentDistricts = districtsByRegion[selectedRegion] || [];
  const selectedDistricts = selectedDistrictsByRegion[selectedRegion] || [];

  // 레이아웃 5개로 분할(5행으로 설정)
  const districtsGroups = [];
  for (let i = 0; i < currentDistricts.length; i += 5) {
    districtsGroups.push(currentDistricts.slice(i, i + 5));
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
    margin: 0 auto;
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
    grid-template-columns: repeat(5, 1fr);
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