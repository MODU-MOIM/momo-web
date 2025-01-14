import { createContext, useContext, useState } from 'react';
import { authAPI } from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem('isLoggedIn') === 'true'
    );
    
    const [token, setToken] = useState(() =>
        localStorage.getItem('token')
    );

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

    const login = (tokenValue, user) => {
        localStorage.setItem('token', tokenValue);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('nickname', user.nickname);

        setIsLoggedIn(true);
        setToken(tokenValue);
        setUserInfo(user);
    };

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
    const value = {
        isLoggedIn,
        token,
        userInfo,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};

// 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};