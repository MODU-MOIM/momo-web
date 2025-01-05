import Google from "../../assets/social/Google.png";
import Kakao from "../../assets/social/Kakao.png";
import Naver from "../../assets/social/Naver.png";
import * as S from "./Styles/Login.styles";

const Login = () => {
    const social = [
        { image: Naver, name: "Naver" },
        { image: Google, name: "Google" },
        { image: Kakao, name: "Kakao" },
    ];

    return (
        <S.Container>
            <S.LoginForm>
                <S.AddInfoTitle>
                    로그인
                </S.AddInfoTitle>
                <S.InputWrapper>
                    <S.LoginInput type="email" autoComplete="email" placeholder="이메일을 입력해주세요." />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.LoginInput type="password" autoComplete="password" placeholder="비밀번호를 입력해주세요." />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Button>로그인</S.Button>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Button>회원가입</S.Button>
                </S.InputWrapper>
                <S.FindPassword>
                    비밀번호가 기억나지 않는다면?
                </S.FindPassword>
                <S.SocialLogin>
                    {social.map((item, index) => (
                    <S.SocialButton>
                        <S.Social key={index} src={item.image} alt={item.name} />
                    </S.SocialButton>
                    ))}
                </S.SocialLogin>
            </S.LoginForm>
        </S.Container>
    );
}

export default Login;