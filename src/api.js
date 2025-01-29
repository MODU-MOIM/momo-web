import axios from 'axios';

const BASE_URL = 'https://modumoim.site';

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
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
                    return api(originalRequest);
                }
            } catch (error) {
                // 토큰 재발급 실패 시 로그인 페이지로 이동
                console.error('토큰 재발급 실패:', error);
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        // 그 외 에러는 그대로 반환
        return Promise.reject(error);
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

export const crewAPI = {
    getCrewList: () => api.get('/crews'),
};

export default api;