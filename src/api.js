import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        // 토큰이 있고 재발급 요청이 아닌 경우 헤더에 토큰 추가
        if (token && !config.url.includes('reissue')) {
            config.headers['Authorization'] = token;
        }

        // 파일 업로드 요청인 경우 Content-Type 헤더 제거
        if (config.url === '/users/upload-profile' ||
            config.url.includes('/archives/images') ||
            config.url.includes('/crews/images')) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터 설정
api.interceptors.response.use(
    // 정상 응답인 경우 그대로 반환
    (response) => response,
    // 에러 발생 시 처리
    async (error) => {
        const originalRequest = error.config;
        
        // 401 에러(인증 실패)이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            // 재시도 표시
            originalRequest._retry = true;
            
            try {
                // 저장된 토큰에서 'Bearer ' 제거
                const token = localStorage.getItem('token');
                
                // 토큰 재발급 요청
                const response = await authAPI.reissue(token);

                // 새로운 토큰이 있으면 저장하고 원래 요청 재시도
                const newToken = response.headers['authorization'];
                if (newToken) {
                    localStorage.setItem('token', newToken);
                    originalRequest.headers['Authorization'] = newToken;
                    
                    return api(originalRequest);
                }
            } catch (error) {
                // 토큰 재발급 실패 시 로그인 페이지로 이동
                localStorage.removeItem('token');
                window.location.href = '/login';
                return new Promise(() => {});
            }
        }
        if(error.response?.status !== 401){
            return Promise.reject(error);
        }

        return new Promise(() => {});
    }
);

export const connectSSE = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('토큰이 없습니다.');
        return null;
    }

    const baseURL = process.env.REACT_APP_BASE_URL || 'https://modumoim.site';
    // "Bearer " 접두사를 제거하여 쿼리 파라미터로 전달
    const tokenWithoutBearer = token.replace('Bearer ', '');
    const url = `${baseURL}/sse/subscribe?token=${tokenWithoutBearer}`;

    const eventSource = new EventSourcePolyfill(url, {
        withCredentials: true,
        headers: {
            'Authorization': token,
            'Accept': 'text/event-stream',
            'Cache-Control': 'no-cache'
        }
    });

    return eventSource;
};


export const authAPI = {
    signUp: data => api.post('/auth/sign-up', data),
    signUpCategory: data => api.post('/users/interests', data),
    signIn: data => api.post('/auth/sign-in', data),
    signOut: () => api.post('/auth/sign-out'),
    getUserInfo: () => api.get('/users/me'),
    sendSms: phoneNumber => api.post('/auth/send-sms', { toPhoneNumber: phoneNumber }),
    verifySms: code => api.post('/auth/verify-sms', { verificationCode: code }),
    uploadProfileImage: (formData) => api.post('/users/upload-profile', formData),
    updateUserInfo: (data) => api.put('/users', data),
    reissue: (token) => api.post('/auth/reissue',
        { expiredAccessToken: token },
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ),
};
export const noticeAPI = {
    createNotice (crewId, noticeData){
        return api.post(`/crews/${crewId}/notices`, noticeData)
    },
    readNoticeList: (crewId) => api.get(`/crews/${crewId}/notices`),
    readNotice: (crewId, noticeId) => api.get(`/crews/${crewId}/notices/${noticeId}`),
    updateNotice: (crewId, noticeId,noticeData)=> api.put(`/crews/${crewId}/notices/${noticeId}`, noticeData),
    deleteNotice: (crewId, noticeId) => api.delete(`/crews/${crewId}/notices/${noticeId}`),
    noticePinToggle: (crewId, noticeId) => api.patch(`/crews/${crewId}/notices/${noticeId}/pin-toggle`),
    // 투표 API
    selectVote: (crewId, noticeId, voteId, voteStatus) =>
        api.post(`/crews/${crewId}/notices/${noticeId}/vote/${voteId}`, voteStatus),
    reSelectVote: (crewId, noticeId, voteId, voteStatus) =>
        api.put(`/crews/${crewId}/notices/${noticeId}/vote/${voteId}`, voteStatus),

};

export const crewAPI = {
    getCrewList: () => api.get('/crews'),
    getCrewData: (crewId) => api.get(`/crews/${crewId}`),
    uploadImage: (formData, config) => api.post('/crews/images', formData, config),
    createIntro: (data) => api.post('/crews', data),
    getMyCrewList: () => api.get('/crews/me'),
    deleteCrew: (crewId) => api.delete(`/crews/${crewId}`),
    // update api
    updateCrewBasicData: (crewId, formData) => api.patch(`/crews/${crewId}/basic`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    updateCrewIntro: (crewId, data) => api.patch(`/crews/${crewId}/report`, data),
    updateCrewHeadCount: (crewId, data) => api.patch(`/crews/${crewId}/headcount`, data),
    updateCrewRestriction: (crewId, data) => api.patch(`/crews/${crewId}/condition`, data),
    // join api
    requestsCrewJoin: (crewId, userId) => api.post(`/crews/${crewId}/join-requests`, userId),
    getReqJoinUserList: (crewId) => api.get(`/crews/${crewId}/join-requests`),
    acceptJoinReq: (crewId, joinRequestId) => api.post(`/crews/${crewId}/join-requests/${joinRequestId}/accept`),
    rejectJoinReq: (crewId, joinRequestId) => api.post(`/crews/${crewId}/join-requests/${joinRequestId}/reject`),

    //크루 검색 api
    searchCrews: (params) => {
        const queryParams = new URLSearchParams();

        if (params.name) queryParams.append('name', params.name);
        if (params.region) queryParams.append('region', params.region);
        if (params.category) queryParams.append('category', params.category);
        if (params.ageGroup) queryParams.append('age-group', params.ageGroup);

        const queryString = queryParams.toString();
        return api.get(`/crews/type?${queryString ? `${queryString}&` : ''}`);
    },
};

//
export const crewMembersAPI = {
    getMemberList: (crewId) => api.get(`/crews/${crewId}/members`),
    kickoutMember: (crewId, memberId) => api.delete(`/crews/${crewId}/members/${memberId}`),
    manageSchPermission: (crewId, data) => api.patch(`/crews/${crewId}/schedules/permissions`, data),
    manageMemberRole: (crewId, memberId, data) => api.patch(`/crews/${crewId}/members/${memberId}/role`, data),
    delegateLeader: (crewId, memberId) => api.patch(`/crews/${crewId}/members/${memberId}/leader`),
}

// 일정 api
export const scheduleAPI = {
    createSchedule: (crewId, scheduleData) => api.post(`/crews/${crewId}/schedules`, scheduleData),
    readSchedule: (crewId, scheduleId) => api.get(`/crews/${crewId}/schedules/${scheduleId}`),
    updateSchedule: (crewId, scheduleId, scheduleData) => api.put(`/crews/${crewId}/schedules/${scheduleId}`, scheduleData),
    deleteSchedule: (crewId, scheduleId) => api.delete(`/crews/${crewId}/schedules/${scheduleId}`),
    readMonthlySchedule: (crewId, yearMonth) => api.get(`/crews/${crewId}/schedules/monthly?yearMonth=${yearMonth}`),
    readDailySchedule: (crewId, date) => api.get(`/crews/${crewId}/schedules/daily?date=${date}`),
    getUserAttendedSchedules: (crewId) => api.get(`/crews/${crewId}/schedules/attended`),
    getScheduleByScheduleId: (crewId, scheduleId) => api.get(`/crews/${crewId}/schedules/${scheduleId}`)
};

// 커뮤니티 api
export const communityAPI = {
    createCommunity: (crewId, formData) =>
        api.post(`/crews/${crewId}/feeds`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    ),
    getCommunityList: (crewId) => api.get(`/crews/${crewId}/feeds`),
    getCommunityDetail: (crewId, feedId) => api.get(`/crews/${crewId}/feeds/${feedId}`),
    updateCommunity: (crewId, feedId, formData) => {
        delete api.defaults.headers['Content-Type'];
        return api.put(`/crews/${crewId}/feeds/${feedId}`, formData)
            .finally(() => {
                api.defaults.headers['Content-Type'] = 'application/json';
            });
    },
    deleteCommunity: (crewId, feedId) => api.delete(`/crews/${crewId}/feeds/${feedId}`),

    createComment: (crewId, feedId, commentData) => api.post(`/crews/${crewId}/feeds/${feedId}/comments`, commentData),
    updateComment: (crewId, feedId, commentId, commentData) => api.put(`/crews/${crewId}/feeds/${feedId}/comments/${commentId}`, commentData),
    deleteComment: (crewId, feedId, commentId) => api.delete(`/crews/${crewId}/feeds/${feedId}/comments/${commentId}`),
    createReply: (crewId, feedId, parentId, commentData) => api.post(`/crews/${crewId}/feeds/${feedId}/comments/${parentId}/replies`, commentData),

    likeCommunity: (crewId, feedId) => api.post(`/crews/${crewId}/feeds/${feedId}/likes`),
    unlikeCommunity: (crewId, feedId) => api.delete(`/crews/${crewId}/feeds/${feedId}/likes`),
};

// 아카이브 api
export const archiveAPI = {
    createArchive: (crewId, archiveData) => api.post(`/crews/${crewId}/archives`, archiveData),
    uploadArchiveImage: (crewId, file) => {
        const formData = new FormData();
        formData.append('archiveImage', file);

        const token = localStorage.getItem('token');

        return api.post(`/crews/${crewId}/archives/images`, formData, {
            headers: {
                'Authorization': token
            }
        });
    },
    getArchiveList: (crewId) => api.get(`/crews/${crewId}/archives`),
    getArchiveDetail: (crewId, archiveId) => api.get(`/crews/${crewId}/archives/${archiveId}`),
    updateArchive: (crewId, archiveId, archiveData) => api.put(`/crews/${crewId}/archives/${archiveId}`, archiveData),
    deleteArchive: (crewId, archiveId) => api.delete(`/crews/${crewId}/archives/${archiveId}`),

    // 댓글 관련
    createComment: (crewId, archiveId, data) => api.post(`/crews/${crewId}/archives/${archiveId}/comments`, data),
    updateComment: (crewId, archiveId, commentId, data) => api.put(`/crews/${crewId}/archives/${archiveId}/comments/${commentId}`, data),
    deleteComment: (crewId, archiveId, commentId) => api.delete(`/crews/${crewId}/archives/${archiveId}/comments/${commentId}`),
    createReply: (crewId, archiveId, parentId, data) => api.post(`/crews/${crewId}/archives/${archiveId}/comments/${parentId}/replies`, data),

    // 좋아요 관련
    likeArchive: (crewId, archiveId) => api.post(`/crews/${crewId}/archives/${archiveId}/likes`),
    unlikeArchive: (crewId, archiveId) => api.delete(`/crews/${crewId}/archives/${archiveId}/likes`),
};

// 채팅 api
export const ChatAPI = {
    createChatRoom: (data) => api.post('/chat-rooms', data),
    getChatRoomList: () => api.get('/chat-rooms'),
    getCrewChatRoomList: (crewId) => api.get(`chat-rooms?crewId=${crewId}`),
    getChatRoom: (roomId) => api.get(`/chat-rooms/${roomId}`),
    getMyChatRoom: () => api.get(`/chat-rooms/me`),
    getChatRoomHistory: (roomId) => api.get(`/chat-rooms/${roomId}/chat`),
    deleteChatRoom: (roomId) => api.delete(`/chat-rooms/${roomId}`),
    getRoomRecentChat: (roomId) => api.get(`/chat-rooms/${roomId}/chat/recent`),
}

// 추천 api
export const recommendAPI = {
    getPopularArchives: (limit = 50) => api.get(`/archives/popular?limit=${limit}`),
    getPopularCrews: (limit = 10) => api.get(`/crews/popular?limit=${limit}`)
}

// 평가 api
export const reviewAPI = {
    getCrewReviews: (crewId) => api.get(`/crews/${crewId}/reviews`),
    getCrewReviewDetail: (crewId, reviewId) => api.get(`/crews/${crewId}/reviews/${reviewId}`),
    createCrewReview: (crewId, reviewData) => api.post(`/crews/${crewId}/reviews`, reviewData),
    updateCrewReview: (crewId, reviewId, reviewData) => api.put(`/crews/${crewId}/reviews/${reviewId}`, reviewData),
    deleteCrewReview: (crewId, reviewId) => api.delete(`/crews/${crewId}/reviews/${reviewId}`),
}

export const sseAPI = {
    subscribe: () => {
        const eventSource = connectSSE();
        if (!eventSource) {
            return null;
        }
        eventSource.onopen = () => {
            console.log('SSE 연결 성공');
        };
        eventSource.addEventListener('review', (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('리뷰 알림 수신:', data);
            } catch (err) {
                console.error('리뷰 이벤트 처리 오류:', err);
            }
        });
        eventSource.addEventListener('heartbeat', (event) => {
            console.log('하트비트 수신:', event.data);
        });
        eventSource.addEventListener('sse', (event) => {
            console.log('SSE 첫 구독 이벤트:', event.data);
        });
        eventSource.onmessage = (event) => {
            console.log('일반 메시지 수신:', event.data);
        };
        eventSource.onerror = (error) => {
            console.error('SSE 연결 오류:', error);
            eventSource.close();
        };
        return eventSource;
    },

    closeConnection: (eventSource) => {
        if (eventSource) {
            eventSource.close();
            console.log('SSE 연결 종료');
        }
    }
};

export default api;