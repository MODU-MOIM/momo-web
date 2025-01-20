// AuthProvider.jsx
import { createContext, useContext, useState } from 'react';
import { authAPI } from './api';

// 인증 관련 전역 상태를 관리할 Context 생성
export const AuthContext = createContext();

// 인증 관련 전역 상태와 기능을 제공하는 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    // 로그인 상태를 localStorage에서 가져와 초기화
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem('isLoggedIn') === 'true'
    );
    
    // 토큰을 localStorage에서 가져와 초기화
    const [token, setToken] = useState(() =>
        localStorage.getItem('token')
    );

    // 사용자 정보 상태 관리
    const [userInfo, setUserInfo] = useState(null);

    // 로그인 처리 함수
    const login = async (tokenValue) => {
        try {
            localStorage.setItem('token', tokenValue);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setToken(tokenValue);

            // 로그인 후 사용자 정보 가져오기
            const response = await authAPI.getUserInfo();
            setUserInfo(response.data.data);
        } catch (error) {
            console.error('사용자 정보 요청 실패:', error);
            logout();
        }
    };

    // 로그아웃 처리 함수
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setToken(null);
        setUserInfo(null);
        window.location.href = '/';
    };
    
    // Context Provider 반환
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            userInfo,
            setUserInfo,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// 커스텀 훅: AuthContext 사용을 위한 헬퍼 함수
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};