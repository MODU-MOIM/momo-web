import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    width:1024px;
    margin:0 auto;
    border:1px solid red;
`;

export const List = styled.div`
    width:468px;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`;

export const ActivityCard = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    border-top:1px solid #D9D9D9;
    flex-direction: column;
`;

export const ActivityImage = styled(RouterNavLink)`
    width:100%;
    height:468px;
    border-radius: 10px;
    border:1px solid red;
    display: flex;
`;

export const UserInfoContainer = styled.div`
    margin-top:20px;
    margin-bottom:10px;

    & > * {
        float:left;
    }
`;

export const ProfileImage = styled.img`
    width:45px;
    height:45px;
    border-radius:50%;
    border:1px solid red;
`;

export const UserName = styled.p`
    height:45px;
    display: flex;
    align-items: center;
    margin:0 10px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
`;

export const Date = styled.p`
    height:45px;
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #8C8C8C;
`;

export const PostInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 15px;
`;

export const ButtonsContainer = styled.div`
    width:100%;
    display: flex;
    gap: 10px;  // 버튼 사이 간격
`;

export const IconButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    color: #8C8C8C;
    font-size: 15px;
    
    &:hover {
        color: #000;
    }
`;

export const TextContainer = styled.div`
    margin-top:-20px;
    display:flex;
    align-items: center;
`;

export const Title = styled(RouterNavLink)`
    flex-grow: 1;  // 남은 공간 모두 차지
    text-decoration: none;
    color: #38383D;
    font-size: 15px;
    font-weight: 600;
`;