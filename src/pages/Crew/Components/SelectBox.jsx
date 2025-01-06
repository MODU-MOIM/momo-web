import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const GenderSelect = () => {
  return (
    <Wrapper>
      <StyledSelect name="genderSelect" defaultValue="noLimit">
        <option value="onlyFemale">여성만</option>
        <option value="onlyMale">남성만</option>
        <option value="noLimit">제한없음</option>
      </StyledSelect>
    </Wrapper>
  );
};

export const AgeSelect = () => {
    const [years, setYears] = useState([]);

    useEffect(()=>{
        const currentYear = new Date().getFullYear();
        const yearsArray = [];
        for(let i = 1960; i <= currentYear; i++){
            yearsArray.push(i);
        }
        setYears(yearsArray);
    },[]);

    return (
      <Wrapper>
        <Container>
            <SubContainer>
                <Label htmlFor="minAgeSelect">최소 나이</Label>
                <StyledSelect name="minAgeSelect" defaultValue="noLimit">
                    <option value="noLimit">제한없음</option>
                    {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                    ))}
                </StyledSelect>
            </SubContainer>
            <SubContainer>
                <Label htmlFor="maxAgeSelect">최대 나이</Label>
                <StyledSelect name="maxAgeSelect" defaultValue="noLimit">
                    <option value="noLimit">제한없음</option>
                    {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                    ))}
                </StyledSelect>
            </SubContainer>
        </Container>
      </Wrapper>
    );
  };
  
const Wrapper = styled.div`
  width: 500px;
`;
const Container = styled.div`
  display: flex;
`;
const SubContainer = styled.div`
  width: 100%;
  margin: 0px 30px 30px 0px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;
const StyledSelect = styled.select`
  width: 200px;
  padding: 8px;
  text-align: center;
  border: 1px solid #DEDFE7;
  border-radius: 6px;
  cursor: pointer;
  appearance: none;
  &:hover {
    border-color: #4B44B6;
  }
  &:focus {
    outline: none;
  }
`;
