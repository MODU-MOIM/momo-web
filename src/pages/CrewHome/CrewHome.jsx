import styled from "styled-components";

export default function CrewHome() {
    // const initialIntro = "ddddd";
    return(
        <Wrapper>
            {/* <CrewContainer> */}
                {/* 크루명, 배너 사진, 크루인원 */}
                {/* 크루 설정창 버튼*/}
            {/* </CrewContainer> */}
            <InfoContainer>
                <CrewIntro>
                    <CrewInfo>
                        크루 대표, 지역, 크루인원 (아이콘)
                    </CrewInfo>
                    <CrewIntroText>
                        {/* {initialIntro} */}
                        🍫직장인 러닝크루 / 초코러닝(초보 코스 러닝)<br/>
                        ▪️WHO<br/>
                        - 앉아서 근무하는 찌뿌둥한 몸을 운동으로 풀고 싶은 사람이라면 누구나! <br/>
                        - 잘 달리지는 못해도 꾸준하게 달리고 싶은 사람 <br/>
                        - 달리고는 싶었으나 혼자는 금방 포기할까봐 걱정되는 사람<br/><br/>  

                        ◾️정원 10명 내외  <br/><br/>

                        ◾️매주 1회 정기런 <br/>
                        - 강요없음 / 시간 되는 날 참석<br/> 
                        - 단, 월1회 참석 필수 - 초보자 환영<br/><br/>

                        ◾️코스 : 5Km - 뚝섬유원지 ~ 성수대교  <br/><br/>

                        ◾️일시 : 매주 1회 오후 8시 <br/>
                        - 10/4(금) 오후 8시 / 완료 <br/>
                        - 10/17(목) 오후 8시 <br/>
                        - 10/24(목) 오후 8시 <br/>
                        - 11월 미정<br/>
                    </CrewIntroText>
                    <JoinButton
                         
                        // isMember={isMember}
                    >가입하기</JoinButton>
                </CrewIntro>
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
const CrewIntro = styled.div`
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
    /* background-color: #9a5555; */
    width: 90%;
    margin: 40px 0px;

`;
const CrewIntroText = styled.div`
    width: 80%;
    /* background-color: blueviolet; */
    padding: 20px 0px;
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