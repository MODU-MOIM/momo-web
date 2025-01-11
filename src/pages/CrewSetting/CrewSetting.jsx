import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import SettingBanner from "./components/SettingBanner";
import * as S from "./Styles/CrewSetting.styles";


const CrewSetting = () => {
    const [isSettingBannerOpen, setIsSettingBannerOpen] = useState(false);

    return(
        <S.Container>
            <S.Setting>
                <S.CrewName>
                    <S.Title>초코러닝(초보자 코스 러닝)</S.Title>
                </S.CrewName>
                <S.MainTitle>
                    <S.Title>크루 기본 정보 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>크루 이름 및 배너사진 설정</S.Title>
                    <S.Button onClick={() => setIsSettingBannerOpen(true)}><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>크루 소개 설정</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                    {/* <S.Desc>크루 소개글 수정, 지역/주소/카테고리 설정</S.Desc> */}
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>크루 가입 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>크루 멤버수</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>가입 조건 설정</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                    {/* 설정한 조건 출력 */}
                    {/* <S.Desc>성별 제한없음, 나이 제한없음</S.Desc> */}
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>멤버 활동 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>멤버 탈퇴, 차단 설정</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>크루 일정 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>일정 설정</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                    {/* <S.Desc>일정 권한 수정</S.Desc> */}
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title>리더, 공동 관리자 관리</S.Title>
                </S.MainTitle>
                <S.SubTitle>
                    <S.Title>공동 관리자 관리</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.SubTitle>
                    <S.Title>리더 위임</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                </S.SubTitle>
                <S.MainTitle>
                    <S.Title style={{ color: 'red' }}>크루 삭제</S.Title>
                    <S.Button><BsChevronRight/></S.Button>
                </S.MainTitle>
            </S.Setting>

            {isSettingBannerOpen && (
                <SettingBanner 
                    onClose={() => setIsSettingBannerOpen(false)}
                />
            )}
        </S.Container>
    );
}

export default CrewSetting;