import * as S from "../Styles/ViewSchedule.styles";
import MainImage from "../../../assets/MainImage.png";
import moment from "moment";
import ScheduleDetail from "./ScheduleDetail";
import AddSchedule from "./AddSchedule";

export default function ViewScheduleBox({showSchedules, setShowSchedules, isPast, isClickedAddButton, date, handleAddSchedule, deleteSchedule}) {
    
    const handleScheduleButton = (id) => {
        // console.log(setShowSchedules);
        setShowSchedules(showSchedules.map(schedule =>
            schedule.id === id ? {...schedule, isDetailVisible: !schedule.isDetailVisible} : schedule
        ));
    }

    return(
        <>
                <S.ViewContainer>
                    {isClickedAddButton && !isPast ? (
                        // add schedule 
                        <AddSchedule
                            date={date}
                            AddSchedule={handleAddSchedule}
                        />
                    ) : (
                            showSchedules.map((e)=>(
                            // schedule box
                            <S.ViewScheduleButton key={e.id}  onClick={()=>handleScheduleButton(e.id)}>
                                <S.CrewName>{e.crew}</S.CrewName>
                                <S.ScheduleInfo>
                                    <S.CrewImage src={MainImage}/>
                                    <div>
                                        <S.DateSchedule>{moment(e.date, "YYYY/MM/DD (ddd)").format("MM/DD (ddd)").toUpperCase()}</S.DateSchedule>
                                        <S.ScheduleTime>{e.time}</S.ScheduleTime>
                                    </div>
                                </S.ScheduleInfo>
                                {/* shcedule 세부사항 */}
                                {e.isDetailVisible ?
                                    <>
                                        <S.StyledIoIosArrowUp />
                                        <ScheduleDetail
                                            schedule={e}
                                            deleteSchedule={deleteSchedule}
                                        />
                                    </>
                                    : 
                                    <S.StyledIoIosArrowDown />
                                }
                            </S.ViewScheduleButton>
                        ))
                    )}
                </S.ViewContainer>
        </>
    );
}

