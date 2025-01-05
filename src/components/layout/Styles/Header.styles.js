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