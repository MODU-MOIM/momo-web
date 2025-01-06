
import React from 'react';
import styled from 'styled-components';

export const GenderSelect = () => {
  return (
    <Wrapper>
      <StyledSelect name="genderSelect" defaultValue="제한없음">
        <option value="onlyFemale">여성만</option>
        <option value="onlyMale">남성만</option>
        <option value="noLimit">제한없음</option>
      </StyledSelect>
    </Wrapper>
  );
};

export const AgeSelect = () => {
    return (
      <Wrapper>
        <Container>
            <SubContainer>

                <Label for="age-select">최소나이</Label>
                <StyledSelect name="ageSlect" defaultValue="제한없음">
                <option value="10대">10대</option>
                <option value="20대">20대</option>
                <option value="제한없음">제한없음</option>
                </StyledSelect>
            </SubContainer>
            <SubContainer>

                <Label for="age-select">최대나이</Label>
                <StyledSelect name="ageSelect" defaultValue="제한없음">
                <option value="10대">10대</option>
                <option value="20대">20대</option>
                <option value="제한없음">제한없음</option>
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
