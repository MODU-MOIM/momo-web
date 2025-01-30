import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../../AuthProvider";
import Mypage from "./MyPage";
import * as S from "./Styles/Header.styles";

const Header = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            closeModal();
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };
    
    const closeModal = () => {
        setIsPopupOpen(false);
    }

    return (
        <S.HeaderContainer>
            <S.Logo to="/">Logo</S.Logo>
            <S.Container>
                <S.Nav>
                    <S.StyledNavLink to="/crews/1/crewHome">크루</S.StyledNavLink>
                    <S.StyledNavLink to="">피드</S.StyledNavLink>
                    <S.StyledNavLink>핫 플레이스</S.StyledNavLink>
                </S.Nav>
                <S.AuthButtons>
                    {isLoggedIn ? (
                        <>
                            <S.UserButton onClick={togglePopup}>
                                <AiOutlineUser size={21} />
                            </S.UserButton>
                            <S.StyledLoginLink onClick={handleLogout}>로그아웃</S.StyledLoginLink>
                        </>
                    ) : (
                        <>
                            <S.StyledLoginLink to="/login">로그인</S.StyledLoginLink>
                            <S.StyledLoginLink to="/signup">회원가입</S.StyledLoginLink>
                        </>
                    )}
                </S.AuthButtons>
            </S.Container>
            {isPopupOpen && <Mypage closeModal={closeModal}/>}
        </S.HeaderContainer>
    );
}

export default Header;