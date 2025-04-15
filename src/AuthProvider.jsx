import { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react';
import { authAPI, communityAPI, crewMembersAPI, sseAPI } from './api';

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
    
    // 알림 관련 상태
    const [notifications, setNotifications] = useState([]); // 알림 목록
    const [activeNotification, setActiveNotification] = useState(null); // 현재 표시 중인 알림
    const eventSourceRef = useRef(null); // SSE 연결 참조
    const notificationTimeoutRef = useRef(null); // 알림 타이머 참조

    // SSE 연결 시작
    const connectToSSE = useCallback(() => {
        // 이미 연결된 경우 중복 연결 방지
        if (eventSourceRef.current) {
            return;
        }

        // SSE 연결 생성 - 콜백 함수 전달 👇
        const eventSource = sseAPI.subscribe(
            // 리뷰 처리 콜백 함수
            (data) => {
                // 새 알림 생성
                const newNotification = {
                    id: Date.now(),
                    type: 'review',
                    content: `${data.crewName} 모임의 ${new Date(data.scheduleDate).toLocaleDateString()} 일정에 대한 평가를 작성해주세요!`,
                    createdAt: new Date(),
                    data: data
                };
                
                // 알림 목록에 추가
                setNotifications(prev => [newNotification, ...prev]);
                
                // 자동으로 알림 표시
                showNotification(newNotification);
            },
            // 오류 처리 콜백 함수
            (error) => {
                console.error('SSE 연결 오류(AuthProvider):', error);
                
                if (eventSourceRef.current) {
                    sseAPI.closeConnection(eventSourceRef.current);
                    eventSourceRef.current = null;
                }
                
                // 5초 후 재연결 시도
                setTimeout(connectToSSE, 5000);
            }
        );
        
        if (!eventSource) {
            console.error('SSE 연결 실패: 토큰이 없거나 연결 오류');
            return;
        }

        eventSourceRef.current = eventSource;
        
    }, []);

    // 알림을 화면에 표시하는 함수
    const showNotification = useCallback((notification) => {
        // 이미 표시 중인 알림이 있으면 해당 타이머 취소
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
        }
        
        // 새 알림 활성화
        setActiveNotification(notification);
        
        // 5초 후 알림 자동 닫기
        notificationTimeoutRef.current = setTimeout(() => {
            setActiveNotification(null);
            notificationTimeoutRef.current = null;
        }, 5000);
    }, []);

    // 페이지 로드 시 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isLoggedIn && token) {
                try {
                    const response = await authAPI.getUserInfo();
                    const userData = response.data.data;
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    setUserInfo(userData);
                    
                    // 로그인 되어 있으면 SSE 연결 시작
                    connectToSSE();
                } catch (error) {
                    console.error('사용자 정보 가져오기 실패:', error);
                    logout();
                }
            }
        };

        fetchUserInfo();
        
        // 컴포넌트 언마운트 시 SSE 연결 해제 및 타이머 정리
        return () => {
            if (eventSourceRef.current) {
                sseAPI.closeConnection(eventSourceRef.current);
                eventSourceRef.current = null;
            }
            
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
                notificationTimeoutRef.current = null;
            }
        };
    }, [isLoggedIn, token, connectToSSE]);

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
            
            // 로그인 성공 시 SSE 연결 시작
            connectToSSE();
        } catch (error) {
            console.error('사용자 정보 요청 실패:', error);
            logout();
        }
    };

    // 로그아웃 처리 함수
    const logout = () => {
        // SSE 연결 종료
        if (eventSourceRef.current) {
            sseAPI.closeConnection(eventSourceRef.current);
            eventSourceRef.current = null;
        }
        
        // 알림 타이머 정리
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }
        
        // 알림 상태 초기화
        setNotifications([]);
        setActiveNotification(null);
        
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

    const [crewMemberShip, setCrewMemberShip] = useState({});

    const checkCrewMembership = useCallback(async (crewId) => {
        if(crewMemberShip[crewId] !== undefined){
            return crewMemberShip[crewId];
        }

        try{
            if(!userInfo || !userInfo.nickname){
                setCrewMemberShip(prev => ({
                    ...prev,
                    [crewId]: false
                }));
                return false;
            }

            const response = await crewMembersAPI.getMemberList(crewId);
            const members = response.data.data || response.data;

            const isMember = Array.isArray(members) && members.some(member => member.nickname === userInfo.nickname);

            setCrewMemberShip(prev => ({
                ...prev,
                [crewId]: isMember
            }));

            return isMember;
        } catch (error) {
            console.error("크루 멤버 확인 중 에러 발생", error);
            setCrewMemberShip(prev => ({
                ...prev,
                [crewId]: false
            }));

            return false;
        }
    }, [userInfo, crewMemberShip]);

    const clearCrewMembershipCache = useCallback((crewId) => {
        if (crewId) {
            // 특정 크루 ID만 캐시 초기화
            setCrewMemberShip(prev => {
                const newMap = { ...prev };
                delete newMap[crewId];
                return newMap;
            });
        } else {
            // 전체 캐시 초기화
            setCrewMemberShip({});
        }
    }, []);

    // 사용자 정보 변경시 크루 멤버십 캐시 초기화
    useEffect(() => {
        clearCrewMembershipCache();
    }, [userInfo, clearCrewMembershipCache]);
    
    // 알림 제거 함수
    const removeNotification = useCallback((notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        
        // 현재 표시 중인 알림이면 닫기
        setActiveNotification(prev => 
            prev && prev.id === notificationId ? null : prev
        );
    }, []);

    // 모든 알림 제거 함수
    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
        setActiveNotification(null);
        
        // 타이머 정리
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }
    }, []);
    
    // 알림 클릭 처리 함수
    const handleNotificationClick = useCallback((notification) => {
        // 리뷰 유형의 알림인 경우
        if (notification.type === 'review' && notification.data) {
            const { crewId, scheduleId } = notification.data;
            
            // 확인한 알림 삭제
            removeNotification(notification.id);
            
            // 알림 창 닫기
            setActiveNotification(null);
            
            // 경로 반환 (실제 navigate는 컴포넌트에서 수행)
            return {
                path: `/crews/${crewId}/review?tab=crew&crewId=${crewId}&scheduleId=${scheduleId}`,
                state: { notificationData: notification.data }
            };
        }
        return null;
    }, [removeNotification]);
    
    // 알림 닫기 함수
    const closeNotification = useCallback(() => {
        setActiveNotification(null);
        
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }
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
            initializeLikeState,

            // 크루 멤버
            checkCrewMembership,
            crewMemberShip,
            clearCrewMembershipCache,
            
            // 알림 관련
            notifications,
            activeNotification,
            removeNotification,
            clearAllNotifications,
            handleNotificationClick,
            closeNotification
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