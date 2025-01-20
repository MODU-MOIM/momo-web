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
            const loginResponse = await authAPI.signIn(formData);
            
            if (loginResponse.headers.authorization) {
                const token = loginResponse.headers.authorization;
                
                // 토큰만 전달하여 로그인 처리
                await login(token);
                navigate('/', { replace: true });
            } else {
                setError('로그인 응답에 토큰이 없습니다.');
            }
        } catch (error) {
            setError(error.response?.data?.message || '로그인에 실패했습니다.');
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