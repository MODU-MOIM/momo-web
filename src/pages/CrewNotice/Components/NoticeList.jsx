import styled from "styled-components";
import { BsPinAngleFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

// user정보도 받아오기 (이름, 포지션)
export default function NoticeList({notices}) {
    const [isManager, setIsManager] = useState(true);

    return(
        <Wrapper>
            {notices.map((notice)=>(
                <Container key={notice.id}>
                    <TopContainer>
                        <UserInfoContainer>
                            <Profile>
                                <ProfileImage/>
                                <ProfileText>
                                    <UserPosition>관리자</UserPosition>
                                    <UserName>러닝초보123</UserName>
                                </ProfileText>
                                <Date>{notice.date}</Date>
                            </Profile>
                        </UserInfoContainer>

                        {/* 관리자만 보이도록 */}
                        {/* 버튼 기능 추가하기 */}
                        <SettingContainer>
                            <BsPinAngleFill size={20} color="#000000"/>
                            {isManager && <BsThreeDotsVertical size={20} color="#929292"/>}
                        </SettingContainer>
                    </TopContainer>
                    <NoticeContainer>{notice.content}</NoticeContainer>
                </Container>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const Container = styled.div`
    margin-top: 30px;
    /* margin-bottom: 100px; */
    width: 768px; 
    /* height: 300px;     */
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 15px;
`;
const TopContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;
const UserInfoContainer = styled.div`
    width: 100%;
`;
const Profile = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
`;
const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid red;
    margin-right: 10px;
`;
const ProfileText = styled.div`
    height:35px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    margin:0;
`;
const UserPosition = styled.p`
    color:#4B44B6;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
`;
const UserName = styled.p`
    /* height:45px; */
    /* display: flex; */
    /* align-items: flex-end; */
    margin:0px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
`;
const Date = styled.div`
    margin: 0 0 20px 10px;
    color: #666666;
    font-size: 13px;
`
const SettingContainer = styled.div`
    width: 10%;
    display: flex;
    justify-content: space-between;
    margin: 20px;
`;

const NoticeContainer = styled.div`
    margin: 10px 70px 40px 70px;
`;
const NoticeListItem = styled.div``;