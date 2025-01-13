import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../../api";
import * as S from "../Styles/Login.styles";

const UserInfo = ({ onConfirm }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        nickname: "",
        cp: "",
        categories: [] // 카테고리 배열 추가
    });
    
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneNumberChange = (e) => {
        const formattedPhoneNumber = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(formattedPhoneNumber);
        setFormData(prev => ({
            ...prev,
            cp: formattedPhoneNumber
        }));
    };

    const isPhoneNumberValid = (phone) => {
        const phoneRegex = /^01[0-9]{8,9}$/;
        return phoneRegex.test(phone);
    };

    const handleRequestCode = async (e) => {
        e.preventDefault();
        try {
            await authAPI.sendSms(phoneNumber);
            setShowCodeInput(true);
        } catch (error) {
            console.error("인증번호 전송 실패:", error);
            alert("인증번호 전송에 실패했습니다.");
        }
    };

    const handleVerifyCode = async () => {
        try {
            await authAPI.verifySms({
                verificationCode: verificationCode
            });
            setIsVerified(true);
            alert("인증이 완료되었습니다.");
            onConfirm(formData);
        } catch (error) {
            console.error("인증번호 확인 실패:", error);
            if (error.response && error.response.data) {
                alert(error.response.data.message || "인증번호가 일치하지 않습니다.");
            } else {
                alert("인증번호 확인에 실패했습니다.");
            }
        }
    };

    return(
        <S.Form>
            <S.AddInfoTitle>
                고객님의 회원정보를 <br />
                입력해 주세요
            </S.AddInfoTitle>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaEnvelope />
                </S.IconWrapper>
                <S.Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email" 
                    placeholder="이메일" 
                />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaLock />
                </S.IconWrapper>
                <S.Input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="password" 
                    placeholder="비밀번호" 
                />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaUser />
                </S.IconWrapper>
                <S.Input 
                    type="text" 
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    autoComplete="nickname" 
                    placeholder="닉네임" 
                />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaPhone />
                </S.IconWrapper>
                <S.Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="전화번호"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </S.InputWrapper>
            {showCodeInput && (
                <S.InputWrapper>
                    <S.Input 
                        type="text" 
                        placeholder="인증번호 입력"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <S.Button 
                        type="button"
                        onClick={handleRequestCode}
                        style={{ marginLeft: '10px' }}
                    >
                        재전송
                    </S.Button>
                </S.InputWrapper>
            )}
            {showCodeInput ? (
                <S.Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={!verificationCode}
                >
                    확인
                </S.Button>
            ) : (
                <S.Button
                    type="button"
                    onClick={handleRequestCode}
                    disabled={!isPhoneNumberValid(phoneNumber)}
                >
                    인증번호 요청
                </S.Button>
            )}
        </S.Form>
    )
}

export default UserInfo;