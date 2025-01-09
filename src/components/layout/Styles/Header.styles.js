import { NavLink as RouterNavLink } from "react-router-dom";
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    height:85px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-bottom:1px solid #e1e1e1;
`;

export const Logo = styled(RouterNavLink)`
    font-size: 1.5em;
    font-weight: bold;
    position: absolute;
    margin:0 20px;
    text-decoration: none;
    color:#222;
`;

export const Nav = styled.div`
`;

export const StyledNavLink = styled(RouterNavLink)`
    color: #000;
    font-size: 18px;
    text-decoration: none;
    margin-right: 50px;
    cursor: pointer;
`;

export const StyledLoginLink = styled(RouterNavLink)`
    color: #000;
    font-size: 18px;
    text-decoration: none;
    margin-left:50px;
    cursor: pointer;
`;

export const Container = styled.div`
    width: 1024px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`;

export const AuthButtons = styled.div`
    display: flex;
    font-size: 15px;
    color: #000;
    padding: 10px 0;
`;


// Mypage.jsx

export const UserButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;


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

export const MyPage = styled.div`
    width: 340px;
    background: #0b0b0b;
    border-radius: 15px;
    display: flex;
    position: fixed;
    top: 60px;
    right: 400px;
    flex-direction: column;
`;

export const UserPanel = styled.div`
    width: 100%;
    height:150px;
    display:flex;
    align-items: center;
`;

export const CloseButton = styled.div`
    background: none;
    border: none;
    position: absolute;
    display: flex;
    top: 10px;
    right: 10px;
    z-index:2;
    color: #999;
    cursor: pointer;
`;

export const ProfileImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #fff;
    display: flex;
    margin-left:30px;
`;

export const UserInfo = styled.div`
    width:50%;
    height:100px;
    margin:0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Name = styled.p`
    color: #fff;
    font-size:22px;
    font-weight: 600;
    letter-spacing: 5px;
    margin: 30px 20px;
`;

export const Manners = styled.p`
    position: relative;
    display: flex;
    width:140px;
    height:8px;
    background: #EAEAEA;
    border-radius:4px;
    margin:0 20px;
    
    &::before {
        content: '';
        position: absolute;
        height:100%;
        width: ${props => props.score || 0}%;

        background: ${props => {
            if (props.score < 30) return '#FF666F'; //빨간색
            if (props.score < 60) return '#FF9F3E'; //주황색
            return '#75C1A7'; //초록색
        }};
        border-radius: 4px;
        transition: width 0.3s ease;
    }

    &::after {
        content: '${props => props.score || 0}℃';
        position: absolute;
        top:-20px;
        right: 0;
        color:${props => {
            if (props.score < 30) return '#FF666F';
            if (props.score < 60) return '#FF9F3E';
            return '#75C1A7';
        }};
        font-size:13px;
        font-wieght:600;
    }
`;

export const SelectButton = styled.div`
`;

export const Button = styled.button`
    width: 50%;
    height: 60px;
    border: none;
    font-size: 14px;
    background: #222;
    color: #fff;
    cursor: pointer;
`;

export const ContentContainer = styled.div`
`;

export const MyPageContent = styled.div`
    height:250px;
`;

export const CrewContent = styled.div`
`;

export const CrewList = styled.div`
    width:100%;
`;

export const CrewItem = styled.div`
    width:100%;
    height: 80px;
    border-bottom:1px solid #797979;
    position: relative;
    display: flex;
    align-items: center;
    padding:0 35px;
`;

export const CreateCrewButton = styled(RouterNavLink)`
    display: flex;
    width: 100%;
    height: 70px;
    font-size: 15px;
    text-decoration: none;
    text-align: center;
    align-items: center;
    justify-content: center;
    bottom: 0;
    cursor: pointer;
    color: #fff;
`;

export const CrewImage = styled.img`
    width:45px;
    height:45px;
    border:1px solid #797979;
    border-radius: 50%;
`;

export const CrewName = styled.p`
    margin:13px;
    font-weight: 600;
`;

export const CrewMember = styled.p`
    font-size: 13px;
    position: absolute;
    display:flex;
    bottom: 15px;
    right: 30px;
`