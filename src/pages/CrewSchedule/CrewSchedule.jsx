import styled from "styled-components";
import React, { useState } from 'react';
import FloatingMenu from "../CrewMain/components/FloatingMenu";
import Calendar from "./components/ScheduleCalendar";

export default function CrewSchedule() {
    const [date, setDate] = useState(new Date());

    
    return(
        <Wrapper>
            <FloatingMenu/>
            <CalendarContainer>
                <ScheduleContainer>

                </ScheduleContainer>
                <Calendar onChange={setDate} value={date}></Calendar>
            </CalendarContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const CalendarContainer = styled.div`
    margin-top: 100px;
    height: 60vh;
    display: flex;
    justify-content: center;
`;
const ScheduleContainer = styled.div`
    width: 300px;
    border: 1px solid red;
`;