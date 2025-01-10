import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Mypage from "./MyPage";


import * as S from "./Styles/Header.styles";

const Header = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closeModal = () => {
        setIsPopupOpen(false);
    }

    return (
        <S.HeaderContainer>
            <S.Logo to="/">Logo</S.Logo>
            <S.Container>
                <S.Nav>
                    <S.StyledNavLink to="/crew">크루</S.StyledNavLink>
                    <S.StyledNavLink to="">피드</S.StyledNavLink>
                    <S.StyledNavLink>핫 플레이스</S.StyledNavLink>
                </S.Nav>
                <S.AuthButtons>
                    {/* 로그인 기능 구현 후 uid를 통해 uid가 있으면 userbutton출력 */}
                    <S.UserButton onClick={togglePopup}>
                        <AiOutlineUser size={21} />
                    </S.UserButton>
                    {/* uid가 없으면 로그인 회원가입 버튼 출력 */}
                    <S.StyledLoginLink to="/login">로그인</S.StyledLoginLink>
                    <S.StyledLoginLink to="/signup">회원가입</S.StyledLoginLink>
                </S.AuthButtons>
            </S.Container>
            {isPopupOpen && <Mypage closeModal={closeModal}/>}
        </S.HeaderContainer>
    );
}

export default Header;