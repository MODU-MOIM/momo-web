import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 아이콘 이미지 가져오기
import Camper from "../../assets/category/Camper.png";
import Coin from "../../assets/category/Coin.png";
import Easel from "../../assets/category/Easel.png";
import GameController from '../../assets/category/GameController.png';
import Activity from '../../assets/category/Running.png';
import SausageBarbeque from '../../assets/category/SausageBarbeque.png';
import SelfDev from "../../assets/category/SelfDev.png";
import Star from "../../assets/category/Star.png";

// 카테고리 데이터 (이미지 아이콘 적용)
const CATEGORIES = [
    { value: "ACTIVITY", label: "액티비티", icon: Activity },
    { value: "CULTURE_ART", label: "문화·예술", icon: Easel },
    { value: "FOOD", label: "푸드·드링크", icon: SausageBarbeque },
    { value: "HOBBY", label: "취미", icon: Star },
    { value: "TRAVEL", label: "여행", icon: Camper },
    { value: "SELF_IMPROVEMENT", label: "자기계발", icon: SelfDev },
    { value: "FINANCE", label: "재태크", icon: Coin },
    { value: "GAMING", label: "게임", icon: GameController }
];

// 지역 데이터 샘플 (실제 데이터는 Region.json에서 가져옴)
const REGIONS_SAMPLE = ["서울", "경기", "인천", "부산", "대구", "대전", "경남", "전남", "충남", "광주", "울산", "경북"];

// 연령대 데이터
const AGE_GROUPS = [
    { value: "10", label: "10대" },
    { value: "20", label: "20대" },
    { value: "30", label: "30대" },
    { value: "40", label: "40대" },
    { value: "50", label: "50대 이상" }
];

/**
 * 크루 검색 컴포넌트
 * @param {Object} props
 * @param {Function} props.onSearch - 검색 이벤트 핸들러
 * @param {Function} props.onReset - 초기화 이벤트 핸들러
 */
const Search = React.forwardRef(({ onSearch, onReset }, ref) => {
    // 지역 데이터 상태
    const [regions, setRegions] = useState([]);
    
    // 검색 상태 관리
    const [searchParams, setSearchParams] = useState({
        name: "",
        category: "",
        ageGroup: "",
        region: ""
    });
    
    // 필터 표시 상태
    const [isExpanded, setIsExpanded] = useState(false);
    
    // 외부 클릭 감지를 위한 ref
    const searchFormRef = useRef(null);
    
    // 외부에서 접근 가능한 메서드
    React.useImperativeHandle(ref, () => ({
        resetForm: () => {
            setSearchParams({
                name: "",
                category: "",
                ageGroup: "",
                region: ""
            });
            setIsExpanded(false);
        },
        setFormValues: (values) => {
            setSearchParams(values);
            if(Object.values(values).some(value => value)) {
                setIsExpanded(true);
            }
        }
    }));
    
    // Region.json 파일 불러오기
    useEffect(() => {
        fetch('/Region.json')
            .then(response => response.json())
            .then(data => {
                setRegions(data.regions);
            })
            .catch(error => {
                console.error('지역 데이터 로드 실패:', error);
                setRegions(REGIONS_SAMPLE); // 로드 실패 시 샘플 데이터 사용
            });
    }, []);
    
    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 카테고리 버튼 클릭 핸들러
    const handleCategoryClick = (categoryValue) => {
        setSearchParams(prev => ({
            ...prev,
            category: prev.category === categoryValue ? "" : categoryValue
        }));
    };

    // 지역 버튼 클릭 핸들러
    const handleRegionClick = (regionValue) => {
        setSearchParams(prev => ({
            ...prev,
            region: prev.region === regionValue ? "" : regionValue
        }));
    };

    // 연령대 버튼 클릭 핸들러
    const handleAgeClick = (ageValue) => {
        setSearchParams(prev => ({
            ...prev,
            ageGroup: prev.ageGroup === ageValue ? "" : ageValue
        }));
    };

    // 검색 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ ...searchParams });
    };

    // 인풋 클릭 핸들러
    const handleInputClick = () => {
        setIsExpanded(true);
    };

    // 필터 초기화 핸들러
    const handleFilterReset = () => {
        setSearchParams({
            name: searchParams.name, // 검색어는 유지
            category: "",
            ageGroup: "",
            region: ""
        });
        
        if (onReset) {
            onReset();
        }
    };

    return (
        <SearchForm onSubmit={handleSubmit} ref={searchFormRef}>
            {/* 크루 이름 검색 입력 */}
            <SearchInputWrapper>
                <SearchInput
                    type="text"
                    name="name"
                    placeholder="크루 이름으로 검색"
                    value={searchParams.name}
                    onChange={handleChange}
                    onClick={handleInputClick}
                />
                <SearchButton type="submit">검색</SearchButton>
            </SearchInputWrapper>
            
            {/* 확장 가능한 필터 섹션 */}
            <FilterSection $isExpanded={isExpanded}>
                {/* 테마별 모임 섹션 */}
                <FilterGroup>
                    <FilterTitle>테마별 모임</FilterTitle>
                    <CategoryButtonsGrid>
                        {CATEGORIES.map(category => (
                            <CategoryButton
                                key={category.value}
                                type="button"
                                $isSelected={searchParams.category === category.value}
                                onClick={() => handleCategoryClick(category.value)}
                            >
                                <CategoryIconWrapper>
                                    <CategoryIcon src={category.icon} alt={category.label} />
                                </CategoryIconWrapper>
                                <CategoryLabel>{category.label}</CategoryLabel>
                            </CategoryButton>
                        ))}
                    </CategoryButtonsGrid>
                </FilterGroup>
                
                {/* 지역별 모임 섹션 */}
                <FilterGroup>
                    <FilterTitle>지역별 모임</FilterTitle>
                    <RegionButtonsGrid>
                        {regions.map((region, index) => (
                            <RegionButton
                                key={`region-${index}`}
                                type="button"
                                $isSelected={searchParams.region === region}
                                onClick={() => handleRegionClick(region)}
                            >
                                {region}
                            </RegionButton>
                        ))}
                    </RegionButtonsGrid>
                </FilterGroup>
                
                {/* 연령별 모임 섹션 */}
                <FilterGroup>
                    <FilterTitle>연령별 모임</FilterTitle>
                    <AgeButtonsGrid>
                        {AGE_GROUPS.map(age => (
                            <AgeButton
                                key={age.value}
                                type="button"
                                $isSelected={searchParams.ageGroup === age.value}
                                onClick={() => handleAgeClick(age.value)}
                            >
                                {age.label}
                            </AgeButton>
                        ))}
                    </AgeButtonsGrid>
                </FilterGroup>
                
                {/* 필터 제어 버튼 */}
                <FilterControls>
                    <FilterResetButton type="button" onClick={handleFilterReset}>
                        필터 초기화
                    </FilterResetButton>
                </FilterControls>
            </FilterSection>
        </SearchForm>
    );
});

// 스타일 컴포넌트
const SearchForm = styled.form`
    margin-bottom: 20px;
    width: 100%;
    position: relative;
    font-family: 'Noto Sans KR', sans-serif;
`;

const SearchInputWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #4a90e2;
    }
`;

const SearchButton = styled.button`
    padding: 12px 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    &:hover {
        background-color: #3a80d2;
    }
`;

const FilterSection = styled.div`
    display: ${props => props.$isExpanded ? 'flex' : 'none'};
    flex-direction: column;
    margin-top: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const FilterGroup = styled.div`
    padding: 20px;
    border-bottom: 1px solid #eee;
    
    &:last-of-type {
        border-bottom: none;
    }
`;

const FilterTitle = styled.h3`
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

const CategoryButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const CategoryButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 10px;
    background: ${props => props.$isSelected ? '#e8f2ff' : '#f8f8f8'};
    border: 1px solid ${props => props.$isSelected ? '#4a90e2' : '#eee'};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: ${props => props.$isSelected ? '#e8f2ff' : '#f0f0f0'};
        transform: translateY(-2px);
    }
`;

const CategoryIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;

const CategoryIcon = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const CategoryLabel = styled.span`
    font-size: 14px;
`;

const RegionButtonsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const RegionButton = styled.button`
    padding: 10px;
    background: ${props => props.$isSelected ? '#e8f2ff' : '#f8f8f8'};
    border: 1px solid ${props => props.$isSelected ? '#4a90e2' : '#eee'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: ${props => props.$isSelected ? '#e8f2ff' : '#f0f0f0'};
    }
`;

const AgeButtonsGrid = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

const AgeButton = styled.button`
    padding: 10px 15px;
    background: ${props => props.$isSelected ? '#e8f2ff' : '#f8f8f8'};
    border: 1px solid ${props => props.$isSelected ? '#4a90e2' : '#eee'};
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: ${props => props.$isSelected ? '#e8f2ff' : '#f0f0f0'};
    }
`;

const FilterControls = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 15px 20px;
    border-top: 1px solid #eee;
    gap: 10px;
`;

const FilterResetButton = styled.button`
    padding: 8px 15px;
    background: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const ApplyFilterButton = styled.button`
    padding: 8px 15px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background: #3a80d2;
    }
`;

export default Search;