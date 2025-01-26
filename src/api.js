import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.124.54.225:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('인터셉터 에러:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('응답 에러:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        if(error.response?.status === 401){
            localStorage.clear();
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);
// API
export const authAPI = {
    // 회원가입
    signUp: (data) => api.post('/auth/sign-up', data),
    // 카테고리 저장
    signUpCategory: (data) => api.post('/users/interests', data),
    // 로그인
    signIn: (data) => api.post('/auth/sign-in', data),
    // 사용자 정보 조회
    getUserInfo: () => api.get('/users/me'),
    // 로그아웃
    signOut: () => api.post('/auth/sign-out'),
    // 토큰 재발급
    reissue: () => api.post('/auth/reissue'),
    sendSms: (phoneNumber) => api.post('/auth/send-sms', { toPhoneNumber: phoneNumber }),
    verifySms: (code) => api.post('/auth/verify-sms', { verificationCode: code }),
    
};

export const noticeAPI = {
   createNotice (crewId, noticeData){
    return api.post(`crews/${crewId}/notices`, noticeData)
   }
};

export default api;