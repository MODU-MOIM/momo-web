import * as S from "../Styles/ViewSchedule.styles";
import MainImage from "../../../assets/MainImage.png";
import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";
import AddSchedule from "./AddSchedule";
import EditSchedule from "./EditSchedule";

export default function ViewScheduleBox({crewData, showSchedules, setShowSchedules, isPast, isClickedAddButton, date, handleAddSchedule, editMode, setEditMode, handleUpdateSchedule, deleteSchedule}) {
    
    const handleScheduleButton = (id) => {
        // console.log(setShowSchedules);
        setShowSchedules(showSchedules.map(schedule =>
            schedule.id === id ? {...schedule, isDetailVisible: !schedule.isDetailVisible} : schedule
        ));
    }

    return(
        <>
            <S.ViewContainer>
                {isClickedAddButton && !isPast && editMode === null ? (
                    // add schedule 
                    <AddSchedule
                        date={date}
                        AddSchedule={handleAddSchedule}
                    />
                ) : (
                    editMode !== null ? (
                        // 일정 수정
                        showSchedules.map((schedule) =>
                            schedule.id === editMode ? (
                                <EditSchedule
                                    key={schedule.id}
                                    schedule={schedule}
                                    updateSchedule={handleUpdateSchedule}
                                />
                            ) : null
                        )
                    ) : (
                        showSchedules.map((schedule)=>(
                        // schedule box
                        <S.ViewScheduleButton key={schedule.id}  onClick={()=>handleScheduleButton(schedule.id)}>
                            <S.CrewName>{crewData?.name}</S.CrewName>
                            <S.ScheduleInfo>
                                <S.CrewImage src={crewData?.bannerImage}/>
                                <div>
                                    <S.DateSchedule>{moment(schedule.scheduleDate, "YYYY-MM-DD").format("MM/DD (ddd)").toUpperCase()}</S.DateSchedule>
                                    <S.ScheduleTime>{moment(schedule.scheduleTime, "HH:mm:00").format("HH:mm")}</S.ScheduleTime>
                                </div>
                            </S.ScheduleInfo>
                            {/* shcedule 세부사항 */}
                            {schedule.isDetailVisible ?
                                <>
                                    <S.StyledIoIosArrowUp />
                                    <ScheduleDetail
                                        schedule={schedule}
                                        deleteSchedule={deleteSchedule}
                                        setEditMode={setEditMode}
                                    />
                                </>
                                : 
                                <S.StyledIoIosArrowDown />
                            }
                        </S.ViewScheduleButton>
                        )))
                )}
            </S.ViewContainer>
        </>
    );
}

