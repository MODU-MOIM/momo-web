import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

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
    /* border:1px solid red; */
    border-radius: 30px;
    margin:10px 0;
`;

export const CrewMember = styled.div`
    width:30%;
    height:100%;
    border:1px solid red;
    float: right;
`;

export const Setting = styled.div`
    width: 100%;
    height:50px;

    & > * {
        float:right;
        color:#999;
        margin:0 10px;
        cursor: pointer;
    }
`

export const Link = styled(RouterNavLink)`
`;