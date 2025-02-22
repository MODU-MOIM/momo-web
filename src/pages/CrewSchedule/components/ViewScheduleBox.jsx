import * as S from "../Styles/ViewSchedule.styles";
import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";
import AddSchedule from "./AddSchedule";
import EditSchedule from "./EditSchedule";
import { scheduleAPI } from "../../../api";
import { useParams } from "react-router-dom";

export default function ViewScheduleBox({crewData, showSchedules, setShowSchedules, isPast, isClickedAddButton, date, setIsClickedAddButton, editMode, setEditMode, handleUpdateSchedule, deleteSchedule}) {
    const { crewId } = useParams();
    const handleScheduleButton = async(id) => {
        // console.log(setShowSchedules);
        setShowSchedules(showSchedules.map(schedule =>
            schedule.id === id ? {...schedule, isDetailVisible: !schedule.isDetailVisible} : schedule
        ));
        try {
            const response = await scheduleAPI.readSchedule(crewId, id);
            console.log("일정읽기 성공",response.data.data);
        } catch (error) {
            console.log("일정읽기 실패", error);
        }
    }

    return(
        <S.Wrapper>
            <S.ViewContainer>
                {isClickedAddButton && !isPast && editMode === null ? (
                    // add schedule 
                    <AddSchedule
                        date={date}
                        setIsClickedAddButton={setIsClickedAddButton}
                    />
                ) : (
                    editMode !== null ? (
                        // 일정 수정
                        showSchedules.map((schedule) =>
                            schedule.id === editMode ? (
                                <EditSchedule
                                    key={schedule.id}
                                    schedule={schedule}
                                    crewData={crewData}
                                    setEditMode={setEditMode}
                                />
                            ) : null
                        )
                    ) : (
                        <S.ScheduleContainer>
                            {showSchedules.map((schedule)=>(
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
                            ))}
                        </S.ScheduleContainer>
                    )
                )}
            </S.ViewContainer>
        </S.Wrapper>
    );
}

