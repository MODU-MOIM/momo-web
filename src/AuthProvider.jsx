// AuthProvider.jsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authAPI, communityAPI } from './api';

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
    const [userInfo, setUserInfo] = useState(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : null;
    });

    // 좋아요 상태 관리
    const [likeStates, setLikeStates] = useState({});

    // 페이지 로드 시 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isLoggedIn && token) {
                try {
                    const response = await authAPI.getUserInfo();
                    const userData = response.data.data;
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    setUserInfo(userData);
                } catch (error) {
                    console.error('사용자 정보 가져오기 실패:', error);
                    logout();
                }
            }
        };

        fetchUserInfo();
    }, [isLoggedIn, token]);

    // 로그인 처리 함수
    const login = async (tokenValue) => {
        try {
            localStorage.setItem('token', tokenValue);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            setToken(tokenValue);

            const response = await authAPI.getUserInfo();
            const userData = response.data.data;
            localStorage.setItem('userInfo', JSON.stringify(userData));
            setUserInfo(userData);
        } catch (error) {
            console.error('사용자 정보 요청 실패:', error);
            logout();
        }
    };

    // 로그아웃 처리 함수
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setToken(null);
        setUserInfo(null);
        window.location.href = '/';
    };

    // 좋아요 토글 함수
    const toggleLike = useCallback(async (crewId, feedId) => {
        try {
            // 현재 해당 피드의 좋아요 상태 확인
            const currentState = likeStates[feedId] || { isLiked: false, likeCount: 0 };
            
            // 새로운 좋아요 상태 계산
            const newIsLiked = !currentState.isLiked;
            const newLikeCount = newIsLiked 
                ? currentState.likeCount + 1 
                : Math.max(0, currentState.likeCount - 1);

            // API 호출
            if (newIsLiked) {
                await communityAPI.likeCommunity(crewId, feedId);
            } else {
                await communityAPI.unlikeCommunity(crewId, feedId);
            }

            // 상태 업데이트
            setLikeStates(prev => ({
                ...prev,
                [feedId]: {
                    isLiked: newIsLiked,
                    likeCount: newLikeCount
                }
            }));

            return { isLiked: newIsLiked, likeCount: newLikeCount };
        } catch (error) {
            console.error('좋아요 토글 실패:', error);
            throw error;
        }
    }, [likeStates]);

    // 초기 좋아요 상태 설정
    const initializeLikeState = useCallback((feedId, isLiked, likeCount) => {
        setLikeStates(prev => ({
            ...prev,
            [feedId]: { isLiked, likeCount }
        }));
    }, []);
    
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            token,
            userInfo,
            setUserInfo,
            login,
            logout,
            
            // 좋아요
            likeStates,
            toggleLike,
            initializeLikeState
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};