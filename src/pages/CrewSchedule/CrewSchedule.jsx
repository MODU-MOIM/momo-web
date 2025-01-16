import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import FloatingMenu from "../CrewMain/components/FloatingMenu";
import Calendar from "./components/ScheduleCalendar";
import MainImage from "../../assets/MainImage.png";
import { IoIosArrowDown } from "react-icons/io";
import moment from "moment";


export default function CrewSchedule() {
    const [date, setDate] = useState(new Date());
    const [isPast, setIsPast] = useState(moment().isAfter(moment(date), 'day'));
    const [schedules, setSchedules] = useState([]);
    const [showSchedules, setShowSchedules] = useState([]);
    const initialSchedule = [
        {id: 1, crew: "초코러닝", spot:"꿈트리 움 갤러리", time: "18:00", date:"2025/01/18 (SAT)"},
        {id: 2, crew: "초코러닝", spot:"경상북도 남매지", time: "18:00", date:"2025/01/03 (FRI)"},
        {id: 2, crew: "초코러닝", spot:"경상북도 남매지", time: "19:00", date:"2024/12/20 (FRI)"},
    ];

    useEffect(()=>{ setSchedules(initialSchedule)},[]);
    useEffect(()=>{setIsPast(moment().isAfter(moment(date), 'day'))},[date]);

    const handleDate = (date) => {
        const formattedDate = moment(date).format("YYYY/MM/DD (ddd)").toUpperCase();
        const filteredSchedules = schedules.filter((schedule)=>(schedule.date === formattedDate));
        setShowSchedules(filteredSchedules);
        setDate(date);
    }
    // 월 클릭 시 해당 월의 일정들 보여주기
    const handleMonthChange = (activeStartDate) => {
        // 해당 월의 시작과 끝 날짜
        const startOfMonth = moment(activeStartDate).startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(activeStartDate).endOf('month').format('YYYY-MM-DD');

        // 해당 월에 속하는 일정만 필터링
        const filteredSchedules = schedules.filter(schedule => {
            const DateSchedule = moment(schedule.date);
            return DateSchedule.isSameOrAfter(startOfMonth) && DateSchedule.isSameOrBefore(endOfMonth);
        });

        setShowSchedules(filteredSchedules);
        setDate(activeStartDate);
    };
    return(
        <Wrapper>
            <FloatingMenu/>
            <CalendarContainer>
                <ScheduleContainer>
                    {/* 해당 월/날 일정 보여주기 */}
                    <DetailScheduleContainer>
                        <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
                        {showSchedules.map((e, index)=>(
                            <ViewContainer>
                                <ViewScheduleButton key={index}>
                                    <CrewName>{e.crew}</CrewName>
                                    <ScheduleInfo>
                                        <CrewImage src={MainImage}/>
                                        <div>
                                            <DateSchedule>{moment(e.date, "YYYY/MM/DD (ddd)").format("MM/DD (ddd)").toUpperCase()}</DateSchedule>
                                            <ScheduleTime>{e.time}</ScheduleTime>
                                            {/* <div>토글아이콘</div> */}

                                        </div>
                                    </ScheduleInfo>
                                    <StyledIoIosArrowDown />
                                </ViewScheduleButton>
                            </ViewContainer>
                        ))}
                    </DetailScheduleContainer>
                    {/* 일정 추가 버튼 */}
                    {isPast ? null :
                        <ButtonContainer>
                            <AddScheduleButton>+ 일정 추가</AddScheduleButton>
                        </ButtonContainer>
                    }
                </ScheduleContainer>
                {/* 캘린더 */}
                <Calendar
                    onChange={handleDate}
                    value={date}
                    schedules={schedules}
                    isPast={isPast}
                    handleMonthChange={handleMonthChange}
                ></Calendar>
            </CalendarContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const CalendarContainer = styled.div`
    margin: 100px 0px;
    min-height: 60vh;
    display: flex;
    justify-content: center;
`;
const ScheduleContainer = styled.div`
    width: 300px;
    /* height: 60vh; */
    border: 1px solid #E2E2E2;
    background-color: #F5F5FF;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const DetailScheduleContainer = styled.div`
    /* margin-top: 5px; */
`;

// view schedule
const ViewContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0px;
`
const ViewScheduleButton = styled.div`
    width: 90%;
    height: 20%;
    /* border: 1px solid blue; */
    border-radius: 15px;
    padding: 10px;
    color: white;
    background-color: #8681CE;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 15px;
`;
const AddScheduleButton = styled.button`
    /* display: flex; */
    /* justify-content: center; */
    width: 90%;
    height: 30px;
    border: 1px solid #E2E2E2;
    background-color: white;
    border-radius: 20px;
    &:hover{
        cursor: pointer;
    }
`;