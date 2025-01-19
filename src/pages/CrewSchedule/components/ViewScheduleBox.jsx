import styled from "styled-components";
import MainImage from "../../../assets/MainImage.png";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";
import moment from "moment";
import { useState } from "react";
import { AddScheduleButton, ButtonContainer } from "../CrewSchedule";
import ScheduleDetail from "./ScheduleDetail";

export default function ViewScheduleBox({showSchedules, setShowSchedules, isPast, isClickedAddButton, date, handleAddSchedule}) {
    const [crew, setCrew] = useState('초코러닝(초보자 코스 러닝)');
    const [spot, setSpot] = useState('꿈트리 움 갤러리');
    const [time, setTime] = useState('18:00');

    const handleCrew = (e) => setCrew(e.target.value);
    const handleSpot = (e) => setSpot(e.target.value);
    const handleTime = (e) => setTime(e.target.value);
    const submitSchedule = () => {
        const newSchedule = {
            id: Math.random(), // 랜덤 ID 생성
            crew: crew,
            spot: spot,
            time: time,
            date: moment(date, "YYYY년 MM월 DD일").format("YYYY/MM/DD (ddd)").toUpperCase()
        };
        handleAddSchedule(newSchedule);
    };
    const handleScheduleButton = (id) => {
        // console.log(setShowSchedules);
        setShowSchedules(showSchedules.map(schedule =>
            schedule.id === id ? {...schedule, isDetailVisible: !schedule.isDetailVisible} : schedule
        ));
    }

    return(
        <>
                <ViewContainer>
                    {isClickedAddButton && !isPast ? (
                        // add schedule 
                        <ViewScheduleButton>
                            <DateSchedule>{moment(date, "YYYY년 MM월 DD일").format("MM/DD (ddd)").toUpperCase()}</DateSchedule>
                            <SelectCrewContainer>
                                <ItemContainer>크루선택</ItemContainer>
                                {/* 유저가 가입한 크루 목록 보이기 */}
                                <CrewInfoBox>
                                    <CrewInfo>
                                        <CrewImage src={MainImage} style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                                        <CrewName
                                            onChange={handleCrew}
                                        >{crew}</CrewName>
                                    </CrewInfo>
                                    <MdOutlineArrowRight />
                                </CrewInfoBox>
                            </SelectCrewContainer>
                            <ItemContainer>
                                <FaMapMarkerAlt />
                                <SelectSpot
                                    value={spot}
                                    onChange={handleSpot}
                                ></SelectSpot>
                            </ItemContainer>
                            <ItemContainer>
                                <MdAccessTimeFilled />
                                <SelectTime
                                    type="time"
                                    value={time}
                                    onChange={handleTime}
                                ></SelectTime>
                            </ItemContainer>
                            <ButtonContainer>
                                <AddScheduleButton
                                    onClick={submitSchedule}
                                >+ 추가하기</AddScheduleButton>
                            </ButtonContainer>
                        </ViewScheduleButton>
                    ) : (
                            showSchedules.map((e)=>(
                            // schedule box
                            <ViewScheduleButton key={e.id}  onClick={()=>handleScheduleButton(e.id)}>
                                <CrewName>{e.crew}</CrewName>
                                <ScheduleInfo>
                                    <CrewImage src={MainImage}/>
                                    <div>
                                        <DateSchedule>{moment(e.date, "YYYY/MM/DD (ddd)").format("MM/DD (ddd)").toUpperCase()}</DateSchedule>
                                        <ScheduleTime>{e.time}</ScheduleTime>
                                    </div>
                                </ScheduleInfo>
                                {/* shcedule 세부사항 */}
                                {e.isDetailVisible ?
                                    <>
                                        <StyledIoIosArrowUp />
                                        <ScheduleDetail
                                        schedule={e}
                                        />
                                    </>
                                    : 
                                    <StyledIoIosArrowDown />
                                }
                            </ViewScheduleButton>
                        ))
                    )}
                </ViewContainer>
        </>
    );
}

// view schedule
const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
const ViewScheduleButton = styled.div`
    width: 90%;
    height: 20%;
    /* border: 1px solid blue; */
    border-radius: 15px;
    margin: 5px 0px;
    padding: 10px;
    color: white;
    background-color: #8681CE;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    &:hover{
        cursor: pointer;
        /* background-color: ${(props) => props.isClickedAddButton ? '#8681CE' : '#786bcf'}; */
    }
`;
const CrewImage = styled.img`
    width: 60px;
    height: 60px;
    /* border: 1px solid red; */
    border-radius: 50%;
    margin-left: 10px;
`;
const ScheduleInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    `;
const CrewName = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: x-small;
    margin-right: 10px;
`;
const DateSchedule = styled.div`
    font-size: x-large;
    font-weight: 600;
`;
const ScheduleTime = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: x-large;
    font-weight: 600;
`;
const StyledIoIosArrowDown = styled(IoIosArrowDown)`
    margin-top: 3px;
    width: 180%;
`;
const StyledIoIosArrowUp = styled(IoIosArrowUp)`
    margin-top: 3px;
    width: 180%;
`;

// add schedule
const SelectCrewContainer = styled.div`
    background-color: #605D8A;
    border-radius: 15px;
    margin: 10px 0px;
`;
const CrewInfoBox = styled.button`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px 20px 10px;
    background-color: transparent;
    border: none;
    color: white;
    &:hover{
        cursor: pointer;
        /* background-color: #8681CE; */
    }
`;
const CrewInfo = styled.div`
    display: flex;
    align-items: center;
`;
export const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
    font-size: small;
`;
const SelectSpot = styled.input`
    margin-left: 10px;
    `;
const SelectTime = styled.input`
    margin-left: 10px;
`;