import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import moment from "moment";

export default function ScheduleCalendar({value, onChange}) {
        
    return(
        <Wrapper>
            <StyledCalendar
                locale="en"
                onChange={onChange}
                value={value}
                next2Label={null}
                prev2Label={null}
                 minDetail="year"
                // formatDay={(locale, date) => moment(date).format('D')}
                // tileContent={addContent}
                showNeighboringMonth={false}
                calendarType="gregory"
                // onActiveStartDateChange={({ activeStartDate }) =>
                //   getActiveMonth(activeStartDate)
                // }
            ></StyledCalendar>
            <div>
                {/* {moment(value).format("YYYY년 MM월 DD일")} */}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    /* height: 60vh; */
`;
const StyledCalendar = styled(Calendar)`
    width: 70vh;
    height: 60vh;
    border: 1px solid #E2E2E2;
    background-color: white;

    // 헤더 (상단 네비게이션) => 년도 제외 월만 표시!!!!!!!!!!!!!!!!!👍🍞
    .react-calendar__navigation {
        display: flex;
        justify-content: center;
        background-color: transparent;
        /* height: 50px; */
        margin-bottom: 10px;

        button {
            background: none;
            border: none;
            min-width: 30%;
            height: 80px;
            color: black;
            font-size: 2em; // 아이콘 크기 설정

            &:hover {
                background-color: #f0f0f0;
            }

            &:disabled {
                background: none;
            }
        }
    }
    .react-calendar__viewContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        
    }
    .react-calendar__month-view {
    }

    // 요일 표시 -> 센터로
    .react-calendar__month-view__weekdays {
        text-align: center;
        color: #666;
        font-weight: bold;
        /* text-decoration: underline; */
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid brown;
    }

    // 특정 날짜 선택
    .react-calendar__month-view__days__day {
        font-size: larger;
        border-radius: 50%; // 날짜 버튼을 원형으로 디자인합니다.
        &:hover {
            background-color: #e0e0e0; // 날짜 호버 배경색 변경
        }
    }
    .react-calendar__tile {
        text-align: center;
        height: 60px;
        border: none;
        padding:0px;
    }
    .react-calendar__tile--now {
        background-color: #3f51b5;
        color: white;
    }

    .react-calendar__tile--active {
        background-color: #656565;
        color: white;
    }
`;