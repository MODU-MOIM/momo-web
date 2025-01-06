import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import * as S from "../Styles/Login.styles";

const UserInfo = ({ onConfirm }) => {
    // 코드 입력 필드의 가시성을 제어하는 상태
    const [showCodeInput, setShowCodeInput] = useState(false);

    // 인증 코드를 요청하는 함수
    const handleRequestCode = (e) => {
        e.preventDefault();
        setShowCodeInput(true);
    };
    
    // 전화번호 입력을 저장하는 상태
    const [phoneNumber, setPhoneNumber] = useState("");

    // 전화번호 입력을 포맷하고 설정하는 함수
    const handlePhoneNumberChange = (e) => {
        const formattedPhoneNumber = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(formattedPhoneNumber);
    };

    // 전화번호 형식을 검증하는 함수
    const isPhoneNumberValid = (phone) => {
        const phoneRegex = /^01[0-9]{8,9}$/;
        return phoneRegex.test(phone);
    };

    // 코드 입력 필드의 애니메이션을 처리하는 효과
    useEffect(() => {
        if (showCodeInput) {
            setTimeout(() => {
                // 애니메이션 로직 추가 가능
            }, 0);
        }
    }, [showCodeInput]);
    
    // 코드 확인을 처리하는 함수
    const handleConfirmCode = () => {
        // 코드 확인 로직 추가
        onConfirm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfirmCode();
    }

    return(
        <S.Form onSubmit={handleSubmit}>
            <S.AddInfoTitle>
                고객님의 회원정보를 <br />
                입력해 주세요
            </S.AddInfoTitle>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaEnvelope />
                </S.IconWrapper>
                <S.Input type="email" autoComplete="email" placeholder="이메일" />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaLock />
                </S.IconWrapper>
                <S.Input type="password" autoComplete="password" placeholder="비밀번호" />
            </S.InputWrapper>
            <S.InputWrapper>
                <S.IconWrapper>
                    <FaUser />
                </S.IconWrapper>
                <S.Input type="text" autoComplete="nickname" placeholder="닉네임" />
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
                    <S.Input type="text" placeholder="인증번호 입력" />
                    <S.Button style={{ marginLeft: '10px' }}>재전송</S.Button>
                </S.InputWrapper>
            )}
            {showCodeInput ? (
                <S.Button
                    type="submit"
                    onClick={handleConfirmCode}
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