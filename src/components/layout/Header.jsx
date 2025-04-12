import React, { useState } from "react";
import { AiOutlineUser, AiOutlineBell } from "react-icons/ai"; // 알림 아이콘 추가
import { useAuth } from "../../AuthProvider";
import Mypage from "./MyPage";
import NotificationCenter from "../../pages/Notification/NotificationCenter"; // 알림 센터 컴포넌트 import
import * as S from "./Styles/Header.styles";

const Header = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false); // 알림 표시 상태
    const [notificationCount, setNotificationCount] = useState(0); // 알림 개수
    const { isLoggedIn, logout } = useAuth();

    const togglePopup = () => {
        const newisPopupOpen = !isPopupOpen;
        setIsPopupOpen(newisPopupOpen);

        // 모달이 열릴때 body에 hidden 적용
        if(newisPopupOpen){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';
        }
    };

    // 알림 토글 함수
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        
        // 알림을 열면 알림 카운트 초기화
        if (!showNotifications) {
            setNotificationCount(0);
        }
    };
    
    // 새 알림이 도착하면 카운트 증가
    const handleNewNotification = () => {
        setNotificationCount(prev => prev + 1);
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
        document.body.style.overflow = 'auto';
    }

    return (
        <S.HeaderContainer>
            <S.Logo to="/">Logo</S.Logo>
            <S.Container>
                <S.Nav>
                    <S.StyledNavLink to="/crewList">크루</S.StyledNavLink>
                    <S.StyledNavLink to="/popularArchives">트렌딩</S.StyledNavLink>
                    <S.StyledNavLink>핫 플레이스</S.StyledNavLink>
                </S.Nav>
                <S.AuthButtons>
                    {isLoggedIn ? (
                        <>
                            {/* 알림 버튼 추가 */}
                            <S.NotificationButton onClick={toggleNotifications}>
                                <AiOutlineBell size={21} />
                                {notificationCount > 0 && (
                                    <S.NotificationCount>{notificationCount > 9 ? '9+' : notificationCount}</S.NotificationCount>
                                )}
                            </S.NotificationButton>
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
            
            {/* 알림 드롭다운 */}
            {showNotifications && (
                <S.NotificationsDropdown>
                    <NotificationCenter onNewNotification={handleNewNotification} />
                </S.NotificationsDropdown>
            )}
        </S.HeaderContainer>
    );
}

export default Header;