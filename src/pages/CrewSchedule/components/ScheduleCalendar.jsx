import styled from "styled-components";
import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import '../Calendar.css';
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
                // formatDay={(locale, date) => moment(date).format('D')}
                // tileContent={addContent}
                showNeighboringMonth={false}
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
const StyledCalendar = styled.div`
    width: 70vh;
    height: 60vh;
    border: none;
    border-radius: 10px; // 모서리를 둥글게 처리합니다.
    box-shadow: 0 5px 15px rgba(0,0,0,0.1); // 그림자를 부드럽게 추가합니다.

    // 헤더 (월 표시)
    .react-calendar__navigation {
        background-color: transparent; // 헤더의 배경색을 제거합니다.
        /* height: 50px; */
        margin-bottom: 10px;

        button {
            background: none;
            border: none;
            min-width: 100px;
            height: 80px;
            color: #333;
            font-size: 2em; // 아이콘 크기를 적절히 조절합니다.

            &:hover {
                background-color: #f0f0f0; // 버튼 호버 배경색 변경
            }

            &:disabled {
                background: none;
            }
        }
    }

    // 요일 표시
    .react-calendar__month-view__weekdays {
        text-align: center;
        color: #666;
        font-weight: bold;
        /* text-decoration: underline; */
    }

    /* // 특정 날짜 선택
    .react-calendar__month-view__days__day {
        border-radius: 50%; // 날짜 버튼을 원형으로 디자인합니다.
        &:hover {
        background-color: #e0e0e0; // 날짜 호버 배경색 변경
        }
    }

    .react-calendar__tile--now {
        background-color: #3f51b5;
        color: white;
    }

    .react-calendar__tile--active {
        background-color: #9fa8da;
        color: white;
    } */
`;