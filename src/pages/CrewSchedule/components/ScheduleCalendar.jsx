import styled from "styled-components";
import React, { useState } from 'react';
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import moment from "moment";
import { weekdays } from "moment/moment";

export default function ScheduleCalendar({value, onChange}) {
    const mark = [10];
    const formatMonthYear = (locale, date) => {
        return date.toLocaleString(locale, { month: 'long' }).toUpperCase();  // "long" 옵션은 월 이름 전체를 반환합니다.
    };
    const formatShortWeekday = (locale, date) => {
        return date.toLocaleString(locale, { weekday: 'short' }).toUpperCase();  // "long" 옵션은 월 이름 전체를 반환합니다.
    };
    const handleMonthClick = (monthDate) => {
    console.log("월이 클릭되었습니다:", monthDate);
    onChange(new Date()); // 예를 들어 여기서 오늘 날짜로 설정
  };
        
    return(
        <Wrapper>
            <StyledCalendar
                locale="en"
                onChange={onChange}
                value={value}
                onClickMonth={handleMonthClick}
                next2Label={null}
                prev2Label={null}
                minDetail="month"
                formatMonthYear={formatMonthYear}
                formatShortWeekday={formatShortWeekday}
                // formatDay={(locale, date) => moment(date).format('D')}
                // tileContent={addContent}
                showNeighboringMonth={false}
                calendarType="gregory"
                // onActiveStartDateChange={({ activeStartDate }) =>
                //   getActiveMonth(activeStartDate)
                // }
                // tileContent={({ date }) => {

                //     const html = [];
                //     if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                //       html.push(<div className="dot"></div>);
                //     }
                //     return (
                //       <>
                //       <div className="flex justify-center items-center absoluteDiv">
                //         {html}
                //       </div>
                //       </>
                //     );
                // }}
            ></StyledCalendar>
            <div>
                {/* {moment(value).format("YYYY년 MM월 DD일")} */}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const StyledCalendar = styled(Calendar)`
    width: 550px;
    min-height: 60vh;
    border: 1px solid #E2E2E2;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;

    // 헤더 (상단 네비게이션)
    .react-calendar__navigation {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        
        button {
            background: none;
            border: none;
            min-width: 30%;
            height: 100px;
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
    // 헤더 상단 월
    .react-calendar__navigation__label{
        font-weight: 600;
        
    }
    .react-calendar__viewContainer{
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px 0px;
    }
    .react-calendar__month-view {
    }
    
    // 요일 표시 -> 센터로
    .react-calendar__month-view__weekdays {
        text-align: center;
        /* color: #666; */
        /* font-weight: bold; */
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #E2E2E2;
    }
    // 요일 글자 커스텀
    .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
    }
    
    .react-calendar__month-view__days{
        margin-bottom: 20px;
    }
    // 특정 날짜 선택
    .react-calendar__month-view__days__day {
        height: 70px;
        /* margin: 5px; */
        /* margin-right: 5px; */
        /* padding: 10px 0px; */
        font-size: larger;
        border-radius: 50%; // 날짜 버튼을 원형으로 디자인합니다.
        background-color: transparent;
        /* background-color: red; */
        &:hover {
            /* background-color: #e0e0e0; // 날짜 호버 배경색 변경 */
            cursor: pointer;
        }
    }
    .react-calendar__tile {
        text-align: center;
        /* height: 9.5vh; */
        border: 10px solid white;
        border-radius: 50%;
        /* margin: 10px; */
    }
    .react-calendar__tile--range{

    }

    /* 저번 달 & 다음 달 일자 */
    .react-calendar__month-view__days__day--neighboringMonth{
        color: #5F5F5F;
        /* font-size: 18px; */
        font-weight: bold;
    }
    
    .react-calendar__tile--active {
        background-color: #e0e0e0;
        color: white;
    }
    .react-calendar__tile--now {
        background-color: #2F80ED;
        color: white;
    }
    /* .dot {
    height: 8px;
    width: 8px;
    background-color: #51F8C4;
    border-radius: 50%;
    text-align: center;
    margin-top: 3px;
  } */
   
`;