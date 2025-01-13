import axios from 'axios';

// axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'http://13.124.54.225:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키 및 인증 정보 포함
});

// 요청 인터셉터 - JWT 토큰이 있다면 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // 또는 sessionStorage
        if (token) {
        config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 - 토큰 만료 등의 에러 처리
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
        // 토큰 만료 등의 인증 에러 처리
        localStorage.removeItem('token');
        // 로그인 페이지로 리다이렉트 등의 처리
        }
        return Promise.reject(error);
    }
);

// API
export const authAPI = {
    signIn: async (data) => {
        const response = await api.post('/auth/sign-in', data);
        return response;
    },
    signUp: (data) => api.post('/auth/sign-up', data),
    reissue: () => api.post('/auth/reissue'),
    sendSms: (phoneNumber) => api.post('/auth/send-sms', { toPhoneNumber: phoneNumber }),
    verifySms: (code) => api.post('/auth/verify-sms', { verificationCode: code }),
};

export default api;