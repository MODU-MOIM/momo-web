import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>
        localStorage.getItem('isLoggedIn') === 'true'
    );
    
    const [token, setToken] = useState(() =>
        localStorage.getItem('token')
    );

    const [userInfo, setUserInfo] = useState(() => ({
        email: localStorage.getItem('email') || '',
        nickname: localStorage.getItem('nickname') || ''
    }));

    const login = (tokenValue, user) => {
        localStorage.setItem('token', tokenValue);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', user.email);
        localStorage.setItem('nickname', user.nickname);

        setIsLoggedIn(true);
        setToken(tokenValue);
        setUserInfo(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');

        setIsLoggedIn(false);
        setToken(null);
        setUserInfo({
            email: '',
            nickname: ''
        });
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