import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";

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

    display: flex;
`;

export const MemberProfile = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid red;
    border: 1px solid #c3c3c3;
    margin-right: -8px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ThreeDots = styled(BsThreeDots)`
    color: white;
`;

export const Setting = styled.div`
    width: 100%;
    height: 50px;

    & > * {
        float:right;
        color:#999;
        margin:0 10px;
        cursor: pointer;
    }
`

export const Link = styled(RouterNavLink)`
`;

// MemList.jsx

export const Panel = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index:1;
`;

export const Container = styled.div`
    /* top: 20%;
    right: 15%; */
    width: 400px;
    height: 500px;
    background-color: white;
    z-index:2;
    position: fixed;
    top: 20%;
    right: 25%;
    background: #fff;
    border-radius: 15px;
`;
