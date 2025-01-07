import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CrewHome() {
    //crewId로 crewData 받기(API)
    const [crewData, setCrewData] = useState({
        region: '',
        currentNum: 0,
        maxNumber: 0,
        crewIntro: ''
    });

    //초기 데이터 설정
    useEffect(() => {
        setCrewData({
            region: '광진구',
            currentNum: 7,
            maxNumber: 10,
            crewIntro: `🍫직장인 러닝크루 / 초코러닝(초보 코스 러닝)\n
                        ▪️WHO\n
                        - 앉아서 근무하는 찌뿌둥한 몸을 운동으로 풀고 싶은 사람이라면 누구나!\n
                        - 잘 달리지는 못해도 꾸준하게 달리고 싶은 사람\n
                        - 달리고는 싶었으나 혼자는 금방 포기할까봐 걱정되는 사람\n\n
                        ◾️정원 10명 내외\n\n
                        ◾️매주 1회 정기런\n
                        - 강요없음 / 시간 되는 날 참석\n
                        - 단, 월1회 참석 필수 - 초보자 환영\n\n
                        ◾️코스 : 5Km - 뚝섬유원지 ~ 성수대교\n\n
                        ◾️일시 : 매주 1회 오후 8시\n
                        - 10/4(금) 오후 8시 / 완료\n
                        - 10/17(목) 오후 8시\n
                        - 10/24(목) 오후 8시\n
                        - 11월 미정`
        });
    }, []);

    return(
        <Wrapper>
            {/* <CrewContainer> */}
                {/* 크루명, 배너 사진, 크루인원 */}
                {/* 크루 설정창 버튼*/}
            {/* </CrewContainer> */}
            <InfoContainer>
                <CrewMainHome>
                    <CrewInfo>
                        <User>크루 리더/관리자</User>
                        <InfoItem>
                            <CrewRegion>
                                {crewData.region}
                            </CrewRegion>
                            <CrewNumber>
                                {crewData.currentNum} / {crewData.maxNumber}
                            </CrewNumber>
                        </InfoItem>
                    </CrewInfo>
                    <CrewIntroText>
                        {crewData.crewIntro.split('\n').map((item)=>(
                            <div>{item}<br/></div>
                        ))}
                    </CrewIntroText>
                    <JoinButton
                         
                        // isMember={isMember}
                    >가입하기</JoinButton>
                </CrewMainHome>
            </InfoContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    
`;
const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;
const CrewMainHome = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 768px; 
    /* height: 700px;     */
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 15px;
`;

const CrewInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 40px 0px;
    /* background-color: #9a5555; */
`;
const User = styled.div`
`;
const InfoItem = styled.div`    
`;
const CrewRegion = styled.span`
`;
const CrewNumber = styled.span`
`;
const CrewIntroText = styled.div`
    width: 80%;
    padding: 20px 0px;
    font-size: 13px;
    /* background-color: blueviolet; */
`;
const JoinButton = styled.button`
    width: 150px;
    height: 40px;
    font-size: 15px;
    border: none;
    border-radius: 30px;
    color: white;
    background-color: #4B44B6;
    margin: 20px 0px;
    
`;