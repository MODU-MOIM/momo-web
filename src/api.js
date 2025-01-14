import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
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
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        console.error('인터셉터 에러:', error);
        return Promise.reject(error);
    }
);

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
    signUp: (data) => api.post('/auth/sign-up', data),
    signIn: (data) => api.post('/auth/sign-in', data),
    getUserInfo: () => api.get('/users/me'),
    signOut: () => api.post('/auth/sign-out'),
    reissue: () => api.post('/auth/reissue'),
    sendSms: (phoneNumber) => api.post('/auth/send-sms', { toPhoneNumber: phoneNumber }),
    verifySms: (code) => api.post('/auth/verify-sms', { verificationCode: code }),
    
};

export default api;