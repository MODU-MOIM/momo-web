import styled from "styled-components";

export const Container = styled.div`
    width: 768px;
    margin: 100px auto;
`;

export const ActivityCard = styled.div`
    border:1px solid red;
    width: 33.33%;
    height: 300px;
    margin: 10px 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    float: left;
    color:#38383D;
    box-sizing: border-box;
    text-align: left;
`;

export const ActivityImage = styled.img`
    width:100%;
    height:240px;
    border:1px solid red;
    box-sizing: border-box;
    display: flex;

`
export const Title = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin: 10px 0;
`;

export const Date = styled.p`
    font-size: 12px;
    font-weight: 600;
`;