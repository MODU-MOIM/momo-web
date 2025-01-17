import { createContext, useContext, useState } from 'react';
import { authAPI } from './api';

// 인증 관련 전역 상태를 관리할 Context 생성
export const AuthContext = createContext();

// 인증 관련 상태와 기능을 제공하는 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    // 로그인 상태 관리
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem('isLoggedIn') === 'true'
    );
    
    // 인증 토큰 상태 관리
    const [token, setToken] = useState(() =>
        localStorage.getItem('token')
    );

    // 사용자 정보 상태 관리
    const [userInfo, setUserInfo] = useState(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        if(savedUserInfo){
            try{
                return JSON.parse(savedUserInfo);
            } catch (e){
                return null;
            }
        }
        return null;
    });

    // 로그인 처리 함수
    const login = (tokenValue, user) => {
        localStorage.setItem('token', tokenValue);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('nickname', user.nickname);

        setIsLoggedIn(true);
        setToken(tokenValue);
        setUserInfo(user);
    };

    // 로그아웃 처리 함수
    const logout = async () => {
        try {
            await authAPI.signOut();
        } catch (error) {
            console.error('로그아웃 API 호출 실패:', error);
        } finally {
            localStorage.clear();
            setIsLoggedIn(false);
            setToken(null);
            setUserInfo(null);
            window.location.href = '/';
        }
    };
    
    // Context에 제공할 값들을 객체로 구성
    const value = {
        isLoggedIn,
        token,
        userInfo,
        login,
        logout
    };

    // Provider를 통해 자식 컴포넌트들에게 인증 관련 상태와 함수들을 제공
    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};