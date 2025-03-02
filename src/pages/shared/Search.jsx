import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// 카테고리 데이터
const CATEGORIES = [
    { value: "ACTIVITY", label: "액티비티" },
    { value: "CULTURE_ART", label: "문화·예술" },
    { value: "FOOD", label: "푸드·드링크" },
    { value: "HOBBY", label: "취미" },
    { value: "TRAVEL", label: "여행" },
    { value: "SELF_IMPROVEMENT", label: "자기계발" },
    { value: "FINANCE", label: "재태크" },
    { value: "GAMING", label: "게임" }
];

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
    const [districts, setDistricts] = useState({});
    
    // 검색 상태 관리
    const [searchParams, setSearchParams] = useState({
        name: "",
        category: "",
        ageGroup: "",
        region: ""
    });
    
    // 필터 확장 상태
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
        }
    }));
    
    // Region.json 파일 불러오기
    useEffect(() => {
        fetch('/Region.json')
            .then(response => response.json())
            .then(data => {
                setRegions(data.regions);
                setDistricts(data.districtsByRegion);
            })
            .catch(error => {
                console.error('지역 데이터 로드 실패:', error);
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

    // 검색 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 부모 컴포넌트로 검색 파라미터 전달
        onSearch({ ...searchParams });
        // 검색 후 필터 접기 (옵션)
        // setIsExpanded(false);
    };

    // 필터 초기화 핸들러
    const handleReset = () => {
        setSearchParams({
            name: "",
            category: "",
            ageGroup: "",
            region: ""
        });
        
        // 부모 컴포넌트에 초기화 알림
        if (onReset) onReset();
        
        // 필터 접기
        setIsExpanded(false);
    };

    // 인풋 클릭 핸들러
    const handleInputClick = () => {
        setIsExpanded(true);
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
                {/* 카테고리 선택 */}
                <SelectWrapper>
                    <SelectLabel>카테고리</SelectLabel>
                    <Select
                        name="category"
                        value={searchParams.category}
                        onChange={handleChange}
                    >
                        <option value="">카테고리 선택</option>
                        {CATEGORIES.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </Select>
                </SelectWrapper>
                
                {/* 지역 선택 */}
                <SelectWrapper>
                    <SelectLabel>지역</SelectLabel>
                    <Select
                        name="region"
                        value={searchParams.region}
                        onChange={handleChange}
                    >
                        <option value="">지역 선택</option>
                        {regions.map((region, index) => (
                            <option key={`region-${index}`} value={region}>
                                {region}
                            </option>
                        ))}
                    </Select>
                </SelectWrapper>
                
                {/* 연령대 선택 */}
                <SelectWrapper>
                    <SelectLabel>연령대</SelectLabel>
                    <Select
                        name="ageGroup"
                        value={searchParams.ageGroup}
                        onChange={handleChange}
                    >
                        <option value="">연령대 선택</option>
                        {AGE_GROUPS.map(age => (
                        <option key={age.value} value={age.value}>
                            {age.label}
                        </option>
                        ))}
                    </Select>
                </SelectWrapper>
                
                {/* 필터 초기화 */}
                <FilterButton type="button" onClick={handleReset}>
                    필터 초기화
                </FilterButton>
            </FilterSection>
        </SearchForm>
    );
});

// 스타일 컴포넌트
const SearchForm = styled.form`
    margin-bottom: 20px;
    width: 100%;
    position: relative;
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
    display: ${props => props.$isExpanded ? 'grid' : 'none'};
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const SelectLabel = styled.label`
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 14px;
    &:focus {
        outline: none;
        border-color: #4a90e2;
    }
`;

const FilterButton = styled.button`
    padding: 10px 15px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    height: 40px;
    align-self: end;
    margin-top: auto;
    &:hover {
        background-color: #e9e9e9;
    }
`;

export default Search;