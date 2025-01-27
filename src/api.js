import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
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
};

export const crewAPI = {
    uploadImage: (formData, config) => api.post('/crews/images', formData, config),
    createIntro: (data) => api.post('/crews', data)
}

export default api;