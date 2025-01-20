// 필요한 라이브러리와 컴포넌트 import
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { authAPI } from "../../api";
import { useAuth } from "../../AuthProvider";
import * as S from "./Styles/Header.styles";

const MyPage = ({ closeModal }) => {
    // 상태 관리
    const [selectedMenu, setSelectedMenu] = useState('crew'); // 선택된 메뉴 (마이페이지/내크루)
    const { userInfo, setUserInfo } = useAuth(); // 전역 사용자 정보
    const [nickname, setNickname] = useState(''); // 사용자 닉네임
    const [profileImage, setProfileImage] = useState(''); // 프로필 이미지 URL
    const fileInputRef = useRef(null); // 파일 입력 참조
    const [showGenderSelect, setShowGenderSelect] = useState(false); // 성별 선택
    const [showAgeSelect, setShowAgeSelect] = useState(false); // 나이 선택
    const [age, setAge] = useState(''); // 나이 입력값
    const [showAgeInput, setShowAgeInput] = useState(false); // 나이 입력
    const [updatedUserInfo, setUpdatedUserInfo] = useState(null); // 업데이트된 사용자 정보

    // 사용자 정보가 변경될 때마다 닉네임과 프로필 이미지 업데이트
    useEffect(() => {
        if (userInfo) {
            setNickname(userInfo.nickname || '');
            setProfileImage(userInfo.profileImage || '');
        }
    }, [userInfo]);

    // 프로필 이미지 업로드 처리
    const handleProfileImageUpload = async (file) => {
        if (!file) return;
    
        // 이미지 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }
    
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await authAPI.uploadProfileImage(formData);
            const imageUrl = response.data.data;

            setProfileImage(imageUrl);
            
            // 전역 유저 정보 업데이트
            if (userInfo) {
                setUserInfo({
                    ...userInfo,
                    profileImage: imageUrl
                });
                setUserInfo(updatedUserInfo);

                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            }

            alert('프로필 이미지가 업데이트되었습니다.');
        } catch (error) {
            console.error('프로필 이미지 업로드 실패:', error);
            alert('프로필 이미지 업로드에 실패했습니다.');
        }
    };

    // 이미지 클릭 시 파일 선택 다이얼로그 열기
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    // 파일 선택 시 이미지 업로드 처리
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        handleProfileImageUpload(file);
    };

    // 성별 선택 처리
    const handleGenderSelect = async (gender) => {
        try {
            const response = await authAPI.updateUserInfo({
                gender,
                nickname: userInfo.nickname,
                cp: userInfo.cp,
                age: userInfo.age
            });
    
            if (response.data.data) {
                const updatedUserInfo = {...userInfo, ...response.data.data};
                setUserInfo(updatedUserInfo);
                // localStorage도 함께 업데이트
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                setShowGenderSelect(false);  // 성공 시에만 UI 닫기
            }
        } catch (error) {
            console.error('성별 업데이트 실패:', error);
            alert('성별 업데이트에 실패했습니다.');
        }
    };
    

    // 성별 표시 텍스트 변환
    const displayGender = (gender) => {
        if(!gender) return '성별 선택';
        return gender === 'M' ? '남성' : '여성';
    }

    // 나이 제출 처리
    const handleAgeSubmit = async () => {
        if (!age || age < 1 || age > 100) {
            alert('1-100 사이의 나이를 입력해주세요.');
            return;
        }
    
        try {
            const response = await authAPI.updateUserInfo({
                age: parseInt(age),
                nickname: userInfo.nickname,
                cp: userInfo.cp,
                gender: userInfo.gender
            });
    
            if (response.data.data) {
                const updatedUserInfo = {...userInfo, ...response.data.data};
                setUserInfo(updatedUserInfo);
                // localStorage도 함께 업데이트
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
                setShowAgeInput(false);
                setAge('');
            }
        } catch (error) {
            console.error('나이 업데이트 실패:', error);
            alert('나이 업데이트에 실패했습니다.');
        }
    };

    // 모달 외부 클릭 시 닫기
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

    // 사용자 패널 클릭 이벤트 전파 방지
    const handleUserPanelClick = (e) => {
        e.stopPropagation();
    }

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.MyPage onClick={(e) => e.stopPropagation()}>
                <S.UserPanel onClick={handleUserPanelClick}>
                    <S.CloseButton onClick={closeModal}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                    {/* 숨겨진 파일 입력 */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleProfileImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    {/* 프로필 이미지 */}
                    <S.ProfileImage
                        onClick={handleImageClick}
                        style={{
                            backgroundImage: profileImage ? `url(${profileImage})` : 'none',
                            cursor: 'pointer',
                            width: '90px',
                            height: '90px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    />
                    {/* 사용자 정보 표시 */}
                    <S.UserInfo>
                        <S.Name>{nickname}</S.Name>
                        <S.Manners $score={25.1}/>
                    </S.UserInfo>
                </S.UserPanel>
                {/* 메뉴 선택 버튼 */}
                <S.SelectButton>
                    <S.Button
                        onClick={() => setSelectedMenu('mypage')}
                        style={{ fontWeight: selectedMenu === 'mypage' ? 600 : '' }}
                    >
                        마이페이지
                    </S.Button>
                    <S.Button
                        onClick={() => setSelectedMenu('crew')}
                        style={{ fontWeight: selectedMenu === 'crew' ? 600 : '' }}
                    >
                        내 크루
                    </S.Button>
                </S.SelectButton>
                {/* 컨텐츠 영역 */}
                <S.ContentContainer>
                    {/* 마이페이지 컨텐츠 */}
                    {selectedMenu === 'mypage' && (
                        <S.MyPageContent>
                            <S.UserInfoContainer>
                                <S.infoTitle>이메일:</S.infoTitle> {userInfo.email}
                            </S.UserInfoContainer>
                            <S.UserInfoContainer>
                                <S.infoTitle>닉네임:</S.infoTitle> {userInfo.nickname}
                            </S.UserInfoContainer>
                            <S.UserInfoContainer>
                                <S.infoTitle>전화번호:</S.infoTitle> {userInfo.cp}
                            </S.UserInfoContainer>
                            {/* 성별 정보 */}
                            <S.UserInfoContainer>
                                <S.infoTitle>성별:</S.infoTitle>
                                {showGenderSelect ? (
                                    <S.GenderSelectContainer>
                                        <S.GenderButton onClick={() => handleGenderSelect('M')}>남성</S.GenderButton>
                                        <S.GenderButton onClick={() => handleGenderSelect('F')}>여성</S.GenderButton>
                                    </S.GenderSelectContainer>
                                ) : (
                                    <>
                                        <S.infoTitle>{displayGender(userInfo?.gender)}</S.infoTitle>
                                        {!userInfo?.gender && (
                                            <S.EditButton onClick={() => setShowGenderSelect(true)}>
                                                수정
                                            </S.EditButton>
                                        )}
                                    </>
                                )}
                            </S.UserInfoContainer>
                            {/* 나이 정보 */}
                            <S.UserInfoContainer>
                                <S.infoTitle>나이:</S.infoTitle>
                                {showAgeInput ? (
                                    <S.AgeInputContainer>
                                        <S.AgeInput
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            min="1"
                                            max="100"
                                        />
                                        <S.SubmitButton onClick={handleAgeSubmit}>
                                            확인
                                        </S.SubmitButton>
                                        <S.CancelButton onClick={() => setShowAgeInput(false)}>
                                            취소
                                        </S.CancelButton>
                                    </S.AgeInputContainer>
                                ) : (
                                    <>
                                        <span>{userInfo?.age || '미설정'}</span>
                                        {(!userInfo?.age || userInfo?.age === 0) && (
                                            <S.EditButton onClick={() => setShowAgeInput(true)}>
                                                수정
                                            </S.EditButton>
                                        )}
                                    </>
                                )}
                            </S.UserInfoContainer>
                        </S.MyPageContent>
                    )}
                    {/* 크루 컨텐츠 */}
                    {selectedMenu === 'crew' && (
                        <S.CrewContent>
                            <S.CrewList>
                                {/* 크루 목록 (최대 5개) */}
                                {[...Array(2)].map((_, index) => (
                                    <S.CrewItem key={index}>
                                        <S.CrewImage/>
                                        <S.CrewName>
                                            크루명
                                        </S.CrewName>
                                        <S.CrewMember>
                                            11/20
                                        </S.CrewMember>
                                    </S.CrewItem>
                                ))}
                            </S.CrewList>
                            {/* 크루 생성 버튼 */}
                            <S.CreateCrewButton to="/crewcreate" onClick={closeModal}>
                                크루 생성
                            </S.CreateCrewButton>
                        </S.CrewContent>
                    )}
                </S.ContentContainer>
            </S.MyPage>
        </S.Panel>
    );
}

export default MyPage;