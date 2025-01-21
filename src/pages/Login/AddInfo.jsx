// src/pages/Login/AddInfo.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api";
import Category from "./components/Category";
import UserInfo from "./components/UserInfo";
import * as S from "./Styles/Login.styles";



const AddInfo = () => {
    const navigate = useNavigate();
    const [showCategory, setShowCategory] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nickname: "",
        cp: "",
        categories: []
    });

    const handleConfirmCode = (userData) => {
        setFormData(prevData => ({
            ...prevData,
            ...userData
        }));
        setShowCategory(true);
    };

    const handleCategorySelect = async (selectedCategories) => {
        try{

            // 회원가입
            await authAPI.signUp({
                email: formData.email,
                password: formData.password,
                nickname: formData.nickname,
                cp: formData.cp
            });

            // 로그인
            const loginResponse = await authAPI.signIn({
                email: formData.email,
                password: formData.password
            });

            // 토큰 저장
            const token = loginResponse.headers?.authorization || loginResponse.data?.token;

            if(!token) {
                throw new Error("토큰이 없습니다.");
            }
            
            localStorage.setItem("token", token);

            // 토큰을 이용하여 카테고리 저장
            await authAPI.signUpCategory(selectedCategories);

            alert("회원가입이 완료되었습니다!");
            navigate('/login');
        } catch (error) {
            console.error("회원가입 실패:", error);
            if(error.response?.status === 409) {
                alert("이미 가입된 이메일입니다.");
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
            localStorage.removeItem("token");
        }
    };

    return (
        <S.Container>
            <S.AnimationWrapper>
                <S.SlideContainer $slide={showCategory}>
                    <S.Section>
                        <UserInfo onConfirm={handleConfirmCode} />
                    </S.Section>
                    <S.Section>
                        <Category onComplete={handleCategorySelect} />
                    </S.Section>
                </S.SlideContainer>
            </S.AnimationWrapper>
        </S.Container>
    );
}

export default AddInfo;