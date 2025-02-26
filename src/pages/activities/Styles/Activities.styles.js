import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    width: 1024px;
    margin: 60px auto;
    min-height: 100vh;

`;

export const List = styled.div`
    width:842px;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    border-top:1px solid #DEDFE7;
    padding:20px 0;
`;

export const TotalPosts = styled.p`
    margin:5px 95px;
`

export const ActivityCard = styled.div`
    width: 33.33%;
    height: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const ActivityImage = styled(RouterNavLink)`
    width:100%;
    height:280px;
    border:1px solid red;
    display: flex;

`
export const Title = styled(RouterNavLink)`
    text-decoration: none;
    color:#38383D;
    font-size: 14px;
    font-weight: 600;
    margin: 6px 0;
`;

export const Date = styled.p`
    font-size: 12px;
    color:#38383D;
`;