import axios from 'axios';

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
        if (config.url === '/users/upload-profile') {
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
                const token = localStorage.getItem('token')?.replace('Bearer ', '');
                
                // 토큰 재발급 요청
                const response = await authAPI.reissue(token);

                // 새로운 토큰이 있으면 저장하고 원래 요청 재시도
                const newToken = response.headers['authorization'];
                if (newToken) {
                    localStorage.setItem('token', newToken);
                    originalRequest.headers['Authorization'] = newToken;

                    // 토큰 재발급 후 원래 요청이 GET 메서드인 경우 페이지 새로고침
                    if(originalRequest.method.toLowerCase() === 'get'){
                        window.location.reload();
                        return new Promise(() => {});
                    }
                    
                    // 토큰 재발급 후 원래 요청이 GET 메서드가 아닌 경우 재시도
                    return api(originalRequest);
                }
            } catch (error) {
                // 토큰 재발급 실패 시 로그인 페이지로 이동
                localStorage.removeItem('token');
                window.location.href = '/login';
                return new Promise(() => {});
            }
        }
        // 그 외 에러는 그대로 반환
        if(error.response?.status !== 401){
            return Promise.reject(error);
        }

        return new Promise(() => {});
    }
);

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
};

export const crewAPI = {
    getCrewList: () => api.get('/crews'),
    getCrewData: (crewId) => api.get(`/crews/${crewId}`),
    uploadImage: (formData, config) => api.post('/crews/images', formData, config),
    createIntro: (data) => api.post('/crews', data),
    getMyCrewList: () => api.get('/crews/me'),
    deleteCrew: (crewId) => api.delete(`/crews/${crewId}`),
    // update api
    updateCrewBasicData: (crewId, formData) => api.patch(`/${crewId}/basic`, formData, {
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
};
export const crewMembersAPI = {
    getMemberList: (crewId) => api.get(`/crews/${crewId}/members`),
    kickoutMember: (crewId, memberId) => api.delete(`/crews/${crewId}/members/${memberId}`),
    manageSchPermission: (crewId, data) => api.patch(`/crews/${crewId}/schedules/permissions`, data),
    manageMemberRole: (crewId, memberId, data) => api.patch(`/crews/${crewId}/members/${memberId}/role`, data),
    delegateLeader: (crewId, memberId) => api.patch(`/crews/${crewId}/members/${memberId}/leader`),
}

export const scheduleAPI = {
    createSchedule: (crewId, scheduleData) => api.post(`/crews/${crewId}/schedules`, scheduleData),
    readSchedule: (crewId, scheduleId) => api.get(`/crews/${crewId}/schedules/${scheduleId}`),
    updateSchedule: (crewId, scheduleId, scheduleData) => api.put(`/crews/${crewId}/schedules/${scheduleId}`, scheduleData),
    deleteSchedule: (crewId, scheduleId) => api.delete(`/crews/${crewId}/schedules/${scheduleId}`),
    readMonthlySchedule: (crewId, yearMonth) => api.get(`/crews/${crewId}/schedules/monthly?yearMonth=${yearMonth}`),
    readDailySchedule: (crewId, date) => api.get(`/crews/${crewId}/schedules/daily?date=${date}`),
};

export const communityAPI = {
    createCommunity: (crewId, formData) => {
        delete api.defaults.headers['Content-Type'];
        return api.post(`/crews/${crewId}/feeds`, formData).finally(() => {
            api.defaults.headers['Content-Type'] = 'multipart/form-data';
        });
    },
    getCommunityList: (crewId) => api.get(`/crews/${crewId}/feeds`),
    getCommunityDetail: (crewId, feedId) => api.get(`/crews/${crewId}/feeds/${feedId}`),
};


export default api;