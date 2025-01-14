import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api";
import { useAuth } from "../../AuthProvider";

import Google from "../../assets/social/Google.png";
import Kakao from "../../assets/social/Kakao.png";
import Naver from "../../assets/social/Naver.png";
import * as S from "./Styles/Login.styles";

const Login = () => {
    const navigate = useNavigate();
    const { login, setUserInfo } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const social = [
        { image: Naver, name: "Naver" },
        { image: Google, name: "Google" },
        { image: Kakao, name: "Kakao" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // 1. 로그인 요청
            const loginResponse = await authAPI.signIn(formData);
            
            if (loginResponse.headers.authorization) {
                // 2. 토큰 저장
                const token = loginResponse.headers.authorization;
                localStorage.setItem('token', token);
                localStorage.setItem('isLoggedIn', 'true');
                
                try {
                    // 3. 사용자 정보 조회
                    const userResponse = await authAPI.getUserInfo();
                    const userData = userResponse.data.data;
                
                    // 4. 사용자 정보 저장
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                    
                    // 5. Context 업데이트
                    login(token, userData);  // userData 직접 전달
                    
                    navigate('/', { replace: true });
                } catch (userError) {
                    setError('사용자 정보를 가져오는데 실패했습니다.');
                }
            } else {
                setError('로그인 응답에 토큰이 없습니다.');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || '로그인에 실패했습니다.');
            } else if (error.request) {
                setError('서버 응답이 없습니다.');
            } else {
                setError('요청 중 오류가 발생했습니다.');
            }
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <S.Container>
            <S.LoginForm onSubmit={handleLogin}>
                <S.AddInfoTitle>
                    로그인
                </S.AddInfoTitle>
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                <S.InputWrapper>
                    <S.LoginInput 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email" 
                        placeholder="이메일을 입력해주세요." 
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.LoginInput 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password" 
                        placeholder="비밀번호를 입력해주세요." 
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Button type="submit">로그인</S.Button>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Button type="button" onClick={handleSignUp}>회원가입</S.Button>
                </S.InputWrapper>
                <S.FindPassword>
                    비밀번호가 기억나지 않는다면?
                </S.FindPassword>
                <S.SocialLogin>
                    {social.map((item, index) => (
                        <S.SocialButton key={index}>
                            <S.Social src={item.image} alt={item.name} />
                        </S.SocialButton>
                    ))}
                </S.SocialLogin>
            </S.LoginForm>
        </S.Container>
    );
}

export default Login;