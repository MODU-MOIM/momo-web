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
    cursor:pointer;
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
    width: 350px;
    height: 450px;
    background: #0b0b0b;
    border-radius: 15px;
    display: flex;
    position: fixed;
    top: 60px;
    right: 400px;
`