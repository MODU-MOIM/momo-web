import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import FloatingMenu from "../CrewMain/components/FloatingMenu";
import Calendar from "./components/ScheduleCalendar";
import moment from "moment";
import ViewScheduleBox from "./components/ViewScheduleBox";
import { crewAPI, scheduleAPI } from "../../api";
import { useParams } from "react-router-dom";
import CrewChat from "../CrewChat/CrewChat";


export default function CrewSchedule() {
    const { crewId } = useParams();
    const [crewData, setCrewData] = useState();
    const [date, setDate] = useState(new Date());
    const [isPast, setIsPast] = useState(moment().isAfter(moment(date), 'day'));
    const [schedules, setSchedules] = useState([]);
    const [showSchedules, setShowSchedules] = useState([]);
    const [isClickedAddButton, setIsClickedAddButton] = useState(false);
    const [editMode, setEditMode] = useState(null);

    const fetchCrewInfo = async () => {
        try {
            const response = await crewAPI.getCrewData(crewId);
            setCrewData(response.data.data);
        } catch (error) {
            console.error("크루 정보 불러오기 실패", error);
        }
    }
    
    const SelectedDate = moment(date).format("YYYY년 MM월 DD일");
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
    
    const fetchDailySchedule = async(date) => {
        const selectedDate = moment(date).format('YYYY-MM-DD');
        try {
            const response = await scheduleAPI.readDailySchedule(crewId, selectedDate);
            // console.log(response);
            setShowSchedules(response.data.data);
        } catch (error) {
            console.error("해당 날짜 일정 조회 실패", error);
        }
    }
    const fetchMonthSchedule = async(acticeStartDate) => {
        const yearMonth = moment(acticeStartDate).format('YYYY-MM');
        try {
            const response = await scheduleAPI.readMonthlySchedule(crewId, yearMonth);
            const sortSchedules = (schedule) => {
                return[...schedule].sort((a,b)=>{
                    return a.scheduleDate > b.scheduleDate ? 1 : -1;
                })
            }
            const sortedSchedules = sortSchedules(response.data.data)
            setShowSchedules(sortedSchedules);
            setSchedules(sortedSchedules);
        } catch (error) {
            console.error("이번 달 일정 조회 실패", error);
        }
    }

    // 날짜 선택
    const handleDate = (date) => {
        const formattedDate = moment(date).format("YYYY/MM/DD (ddd)").toUpperCase();
        const filteredSchedules = schedules.filter((schedule)=>(schedule.date === formattedDate));
        setShowSchedules(filteredSchedules);
        setDate(date);
        fetchDailySchedule(date);
    }
    // 월 이동 시 해당 월의 일정들 보여주기
    const handleMonthChange = (activeStartDate) => {
        setDate(activeStartDate);
        fetchMonthSchedule(activeStartDate);
    };
    const handleDeleteSchedule = async (id) => {
        try {
            const response = await scheduleAPI.deleteSchedule(crewId, id);
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

    useEffect(() => {
        fetchCrewInfo();
        fetchMonthSchedule();
    }, [crewId]);

    useEffect(()=>{
        fetchDailySchedule();
    },[isClickedAddButton]);
    return(
        <Wrapper>
            <CrewChat/>
            <FloatingMenu/>
            <CalendarContainer 
                // onClick={handlePanelClick}
            >
                <ScheduleContainer>
                    {/* 해당 월/날 일정 보여주기 */}
                    <DetailScheduleContainer>
                        <div>{SelectedDate}</div>
                        <ViewScheduleBox
                            crewData={crewData}
                            showSchedules={showSchedules}
                            setShowSchedules={setShowSchedules}
                            isPast={isPast}
                            isClickedAddButton={isClickedAddButton}
                            setIsClickedAddButton={setIsClickedAddButton}
                            date={SelectedDate}
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