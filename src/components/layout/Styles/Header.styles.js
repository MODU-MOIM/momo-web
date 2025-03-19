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

export const ProfileImage = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ddd;
    position: relative;
    margin-left:30px;

    &:hover::after {
        content: '이미지 변경';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 5px;
        border-radius: 4px;
        font-size: 12px;
    }
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
        width: ${props => props.$score || 0}%;

        background: ${props => {
            if (props.$score < 30) return '#FF666F'; //빨간색
            if (props.$score < 60) return '#FF9F3E'; //주황색
            return '#75C1A7'; //초록색
        }};
        border-radius: 4px;
        transition: width 0.3s ease;
    }

    &::after {
        content: '${props => props.$score || 0}℃';
        position: absolute;
        top:-20px;
        right: 0;
        color:${props => {
            if (props.$score < 30) return '#FF666F';
            if (props.$score < 60) return '#FF9F3E';
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
    padding: 20px 0;
    min-height:250px;
`;

export const CrewContent = styled.div`
`;

export const CrewList = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    gap: 10px;
    max-height:400px;
    overflow-y: auto;
    padding-right: 10px;
    overscroll-behavior: contain; // 스크롤 propagation 방지

    &::-webkit-scrollbar {
        width: 6px;
    }
  
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export const CrewItem = styled.div`
    width:100%;
    min-height: 80px;
    border-bottom:1px solid #797979;
    position: relative;
    display: flex;
    align-items: center;
    padding:10px 35px;
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
    cursor: pointer;
`;

export const CrewMember = styled.p`
    font-size: 13px;
    position: absolute;
    display:flex;
    bottom: 15px;
    right: 30px;
`

export const UserInfoContainer = styled.div`
    font-size: 14px;
    width: 100%;
    margin: 10px 40px;
    margin-bottom: 5px;
    float: left;
    
`;

export const infoTitle = styled.p`
    width: 60px;
    font-weight: 600;
    margin-right: 10px;
    display: inline;
    float: left;
`;

export const GenderSelectContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const GenderButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const EditButton = styled.button`
    margin-left: 10px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 12px;
    cursor: pointer;
    
    &:hover {
        background-color: #f0f0f0;
    }
`;


export const AgeInputContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const AgeInput = styled.input`
    width: 60px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const SubmitButton = styled.button`
    padding: 4px 8px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #45a049;
    }
`;

export const CancelButton = styled.button`
    padding: 4px 8px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #da190b;
    }
`;