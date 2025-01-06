import React from 'react';
import styled from 'styled-components';

export const GenderSelect = () => {
  return (
    <Container>
      <StyledSelect name="genderSelect" defaultValue="제한없음">
        <option value="onlyFemale">여성만</option>
        <option value="onlyMale">남성만</option>
        <option value="noLimit">제한없음</option>
      </StyledSelect>
    </Container>
  );
};


const Container = styled.div`
  width: 200px;
`;

const StyledSelect = styled.select`
  width: 100%;
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
