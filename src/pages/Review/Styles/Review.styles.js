import styled from "styled-components";

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
`;

export const ButtonContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ToggleButton = styled.button`
    width: 50%;
    border-radius: 20px;
    background-color: #fff;
    border:none;
    padding: 10px;
    cursor: pointer;
    font-weight: 500;
    ${({ $active }) => $active && `
        background-color: #352EAE;
        color: #fff;
    `}
    margin: 5px;
`;

export const ReviewContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

