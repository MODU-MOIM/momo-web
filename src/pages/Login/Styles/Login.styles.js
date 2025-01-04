import styled from 'styled-components';

export const Container = styled.div`
    width: 1024px;
    margin: 100px auto;
`;

export const AnimationWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

export const SlideContainer = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 200%;
    transform: translateX(${props => props.$slide ? '-50%' : '0%'});
`;

export const Section = styled.div`
    flex: 0 0 50%;
`;


// UserInfo.jsx

export const Form = styled.form`
    width:300px;
    margin: 0 auto;
`;

export const AddInfoTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 30px;
    line-height: 1;
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const IconWrapper = styled.div`
    position: absolute;
    left: 10px;
    color: #707070;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px 12px 12px 35px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    font-size: 13px;

    &::placeholder {
        color: #999;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px 0;
    border-radius: 5px;
    border: none;
    background: #352EAE;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: #4B44B6;
    }
`;


// Category.jsx

export const CategoryContainer = styled.div`
    width: 1024px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const CategoryItem = styled.div`
    width: 320px;
    height: 50px;
    margin: 10px;
    border: 1px solid #4B44B6;
    border-radius: 5px;
    float: left;
    display: flex;
    align-items: center;
    cursor: pointer;

    & > * {
        float: left;
    }
`;

export const CategoryImage = styled.img`
    width: 25px;
    height: 25px;
    margin: 10px;
`;

export const CategoryTextContainer = styled.div`
    margin-bottom: 10px;
    width:70%;
`;

export const CategoryTitle = styled.p`
    height:25px;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 600;
`;

export const CategorySubtitle = styled.p`
    font-size: 13px;
    color: #929292;
    margin: -5px 0;
`;

export const SelectButton = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;

    &:checked {
        background-color: #4B44B6;
        border:2px solid #4B44B6;
        position: relative;
    }
`;

// Category.jsx

export const SubmitButton = styled.button`
    width: 400px;
    padding: 12px 0;
    border-radius: 5px;
    border: none;
    background: #352EAE;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    display: block;
    margin: 0 auto;

    &:hover {
        background: #4B44B6;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 70px;
`;


// Login.jsx

export const LoginForm = styled.div`
    width: 300px;
    margin: 0 auto;
`;

export const LoginInput = styled.input`
    width: 100%;
    padding: 12px 12px 12px 12px;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
    font-size: 13px;

    &::placeholder {
        color: #999;
    }
`;

export const FindPassword = styled.div`
    font-size: 13px;
    margin-top: 20px;
    font-weight: bold;

    & > p {
        color: #222;
    }
`;

export const SocialLogin = styled.div`
    margin:0 auto;
    text-align: center;
`;

export const SocialButton = styled.button`
    width:30px;
    border-radius: 5px;
    border: none;
    color: #fff;
    cursor: pointer;
    margin: 60px 15px;
    background: none;
`;

export const Social = styled.img`
    width: 22px;
`;