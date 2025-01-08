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
    box-sizing: border-box;
    text-align: left;
`;

export const ActivityImage = styled(RouterNavLink)`
    width:100%;
    height:280px;
    border:1px solid red;
    box-sizing: border-box;
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

// Banner.jsx

export const Banner = styled.div`
    width:100%;
    height:100%;
    margin:0 auto;
`;

export const BannerTop = styled.div`
    height:50px;
    & > p {
        float: left;
    }
`;

export const CrewName = styled.p`
    height:50px;
    font-size:23px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

export const CategoryImage = styled.img`
    width:20px;
    height:20px;
    float:left;
    margin: 14px 0;
    margin-left:15px;
`;

export const CrewCategory = styled.p`
    height:50px;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin-left:5px;
`;

export const BannerImage = styled.img`
    width:100%;
    height:220px;
    border:1px solid red;
    margin:10px 0;
`;

export const CrewMember = styled.div`
    width:30%;
    height:100%;
    border:1px solid red;
    float: right;
`;

export const Setting = styled.div`
    width:100%;
    height:50px;

    & > * {
        float:right;
        color:#999;
        margin:0 10px;
        cursor: pointer;
    }
`