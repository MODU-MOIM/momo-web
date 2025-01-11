import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as S from "./Styles/Header.styles";


const MyPage = ({ closeModal }) => {
    const [selectedMenu, setSelectedMenu] = useState('crew');

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

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
                    {/* 프로필 이미지 */}
                    <S.ProfileImage/>
                    {/* 사용자 닉네임 or 이름 */}
                    <S.UserInfo>
                        <S.Name>김매너</S.Name>
                        {/* 매너점수를 score에 넣어 출력 */}
                        <S.Manners score={25.1}/>
                    </S.UserInfo>
                </S.UserPanel>
                <S.SelectButton>
                    <S.Button
                        onClick={() => setSelectedMenu('mypage')}
                        className={selectedMenu === 'mypage' ? 'active': ''}
                    >
                        마이페이지
                    </S.Button>
                    <S.Button
                        onClick={() => setSelectedMenu('crew')}
                        className={selectedMenu === 'crew' ? 'active': ''}
                    >
                        내 크루
                    </S.Button>
                </S.SelectButton>
                <S.ContentContainer>
                    {selectedMenu === 'mypage' && (
                        <S.MyPageContent>
                            <p>마이페이지</p>
                        </S.MyPageContent>
                    )}
                    {selectedMenu === 'crew' && (
                        <S.CrewContent>
                            <S.CrewList>
                                {/* 크루는 최대 5개까지만 들어갈 수 있다. */}
                                {[...Array(2)].map((_, index) => (
                                    // 해당 크루 페이지로 이동할 수 있도록 추후 수정
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