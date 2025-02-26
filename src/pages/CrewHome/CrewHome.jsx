import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { authAPI, crewAPI, crewMembersAPI } from "../../api";

export default function CrewHome() {
    const { crewId } = useParams();
    const [members, setMembers] = useState({});
    const [leader, setLeader] = useState({});
    const [isMember, setIsMember] = useState(false);
    const [crewData, setCrewData] = useState({
        region: '',
        currentNum: 0,
        maxMembers: 0,
        crewIntro: ''
    });

    const handleJoin = async() => {
        try {
            // fetchUserId
            const userResponse = await authAPI.getUserInfo();
            const userId = userResponse.data.data.id;
            // requestJoin
            const requestJoin = await crewAPI.requestsCrewJoin(crewId, userId);
        } catch (error) {
            switch (error.response.data.code) {
                case "CM002":
                    alert("이미 해당 크루에 가입 요청을 했습니다");
                    break;
                case "C003":
                    alert("크루 정원이 꽉 찼습니다");
                    break;
                case "CM004":
                    alert("크루 가입 조건에 맞지 않습니다");
                    break;
                default:
                    console.error("실패", error.response.data);
                    break;
            }
        }
    }

    // 해당 크루가 유저가 가입한 크루인지 확인
    useEffect(()=>{
        async function cmpUserCrew() {
            try {
                const response = await crewAPI.getMyCrewList();
                const crewList = response.data.data;
                const myCrewListId = crewList.map(crew => crew.crewId);
                if(myCrewListId.find(id => id ==crewId)){
                    setIsMember(true);
                }
            } catch (error) {
                console.error("유저 가입 크루 확인 실패", error);
            }
        }
        cmpUserCrew();
    },[crewId]);

    //초기 데이터 설정
    useEffect(() => {
        // 크루 데이터
        async function fetchCrewData() {
            try {
                const response = await crewAPI.getCrewData(crewId);
                const resCrewData = response.data.data;
                const regions = resCrewData.regions.map(region => region.regionDepth2).join(', ');
                setCrewData({
                    region: regions,
                    currentNum: members.length,
                    maxMembers: resCrewData.maxMembers,
                    crewIntro: resCrewData.description
                });
                
            } catch (error) {
                console.error("크루 읽기 실패", error);
            }
        }
        // 크루 멤버 확인
        async function fetchMembers() {
            try {
                const response = await crewMembersAPI.getMemberList(crewId);
                const resMem = (response.data.data);
                setMembers(resMem);
                setLeader(resMem.find(member => member.role == "LEADER"));
            } catch (error) {
                console.error("크루 멤버 데이터 가져오기 실패");
            }
        }
        fetchCrewData();
        fetchMembers();
    }, [crewId]);

    return(
        <Wrapper>
            <InfoContainer>
                <CrewMainHome>
                    <CrewInfo>
                        <UserInfoContainer>
                            <Profile>
                                <ProfileImage src={leader?.profileImage}/>
                                <ProfileText>
                                    <UserPosition>리더</UserPosition>
                                    <UserName>{leader?.nickname}</UserName>
                                </ProfileText>
                            </Profile>
                        </UserInfoContainer>
                        <InfoItem>
                            <CrewRegion>
                                <FaMapMarkerAlt style={{marginRight: "10px"}}/>
                                {crewData.region}
                            </CrewRegion>
                            <CrewNumber>
                                <BsFillPeopleFill />
                                {crewData.currentNum} / {crewData.maxMembers}
                            </CrewNumber>
                        </InfoItem>
                    </CrewInfo>
                    <CrewIntroText dangerouslySetInnerHTML={{ __html: crewData.crewIntro }}/>
                    {isMember ? null : (
                        <JoinButton
                            onClick={handleJoin}
                        >가입하기</JoinButton>
                    )}
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
`;

const UserInfoContainer = styled.div`
    width: 60%;
`;
const Profile = styled.div`
    display: flex;
    align-items: center;
    /* margin: 20px; */
`;
const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #c3c3c3;
    margin-right: 10px;
`;
const ProfileText = styled.div`
    height:35px;
    display: flex;
    flex-direction: column;
    margin:0;
`;
const UserPosition = styled.p`
    color:#4B44B6;
    font-size: 15px;
    font-weight: 600;
    margin: 0;
`;
const UserName = styled.p`
    margin:0px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
`;


const InfoItem = styled.div`
    /* flex: 1 0 25%; */
    display: flex;
    justify-content: space-between;
`;
const CrewRegion = styled.div`
    /* width: 20%; */
    display: flex;
    justify-content: space-around;
    margin-right: 10px;
`;
const CrewNumber = styled.div`
    width: 80px;
    display: flex;
    justify-content: space-around;
`;
const CrewIntroText = styled.div`
    width: 80%;
    font-size: 13px;
    margin-bottom: 20px;
    padding: 20px 0px;
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
    margin-bottom: 25px;
    &:hover{
        cursor: pointer;
        background-color: #2c22b4;
    }
`;