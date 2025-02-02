import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import FloatingMenu from "../CrewMain/components/FloatingMenu";
import Calendar from "./components/ScheduleCalendar";
import moment from "moment";
import ViewScheduleBox from "./components/ViewScheduleBox";
import { scheduleAPI } from "../../api";
import { useParams } from "react-router-dom";


export default function CrewSchedule() {
    const { crewId } = useParams();
    const [date, setDate] = useState(new Date());
    const [isPast, setIsPast] = useState(moment().isAfter(moment(date), 'day'));
    const [schedules, setSchedules] = useState([]);
    const [showSchedules, setShowSchedules] = useState([]);
    const [isClickedAddButton, setIsClickedAddButton] = useState(false);
    const [editMode, setEditMode] = useState(null);

    const initialSchedule = [
        {id: 1, crew: "초코러닝", spot:"꿈트리 움 갤러리", time: "18:00", date:"2025/01/04 (SAT)", isDetailVisible: false},
        {id: 2, crew: "초코러닝", spot:"경상북도 남매지", time: "18:00", date:"2025/01/19 (SUN)", isDetailVisible: false},
        {id: 3, crew: "초코러닝", spot:"경상북도 남매지", time: "19:00", date:"2024/12/20 (FRI)", isDetailVisible: false},
    ];
    
    const SelectedDate = moment(date).format("YYYY년 MM월 DD일");
    useEffect(()=>{ setSchedules(initialSchedule)},[]);
    useEffect(()=>{ setShowSchedules(schedules)},[schedules]);
    useEffect(()=>{setIsPast(moment().isAfter(moment(date), 'day'))},[date]);

    // 외부 클릭 시 일정 추가 모드 나가기
    // const handlePanelClick = (e) => {
    //     console.log('Event Target:', e.target);
    //     console.log('Current Target:', e.currentTarget);
    //     console.log('isClickedAddButton:', isClickedAddButton);
        
    //     if(e.target !== e.currentTarget){
    //         setIsClickedAddButton(false);
    //     }
    // }

    const handleClickAddButton = () => { 
        setIsClickedAddButton(!isClickedAddButton);
    };
    const handleAddSchedule = (newSchedule) => {
        // 유효성 검사 필요(크루선택&&장소선택&&시간선택했는지)
        setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
        setIsClickedAddButton(false); // 일정 추가 후 버튼 상태 초기화
    };
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
    const handleDeleteSchedule = async (id) => {
        try {
            const response = await scheduleAPI.deleteSchedule(crewId, id);
            console.log("일정 삭제 성공 : ", response);
            setSchedules((prevSchedules) => prevSchedules.filter(schedule => schedule.id !== id));
        } catch (error) {
            console.log("일정 삭제 실패 : ", error);
        }
    };
    const handleUpdateSchedule = (updatedSchedule) => {
        setSchedules(prevSchedules => prevSchedules.map(sch =>
            sch.id === updatedSchedule.id ? updatedSchedule : sch
        ));
        setEditMode(null);  // 수정 모드 종료
    };
    return(
        <Wrapper>
            <FloatingMenu/>
            <CalendarContainer 
                // onClick={handlePanelClick}
            >
                <ScheduleContainer>
                    {/* 해당 월/날 일정 보여주기 */}
                    <DetailScheduleContainer>
                        <div>{SelectedDate}</div>
                        <ViewScheduleBox
                            showSchedules={showSchedules}
                            setShowSchedules={setShowSchedules}
                            isPast={isPast}
                            isClickedAddButton={isClickedAddButton}
                            date={SelectedDate}
                            handleAddSchedule={handleAddSchedule}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            handleUpdateSchedule={handleUpdateSchedule}
                            deleteSchedule={handleDeleteSchedule}
                        />
                    </DetailScheduleContainer>
                    {/* 일정 추가 버튼 */}
                    {isPast ? null : (
                        isClickedAddButton ? 
                            null :
                            <ButtonContainer>
                                <AddScheduleButton
                                    onClick={handleClickAddButton}
                                >+ 일정 추가</AddScheduleButton>
                            </ButtonContainer>
                    )}
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


export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 15px;
`;
export const AddScheduleButton = styled.button`
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