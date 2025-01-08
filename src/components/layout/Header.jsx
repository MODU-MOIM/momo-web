import React from "react";
import * as S from "./Styles/Header.styles";

const Header = () => {
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
                    <S.StyledLoginLink to="/login">로그인</S.StyledLoginLink>
                    <S.StyledLoginLink to="/signup">회원가입</S.StyledLoginLink>
                </S.AuthButtons>
            </S.Container>
            
        </S.HeaderContainer>
    );
}

export default Header;