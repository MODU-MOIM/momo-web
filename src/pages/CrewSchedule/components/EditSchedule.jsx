import * as S from "../Styles/ViewSchedule.styles";
import MainImage from "../../../assets/MainImage.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdOutlineArrowRight } from "react-icons/md";
import { ButtonContainer, AddScheduleButton } from "../CrewSchedule";
import moment from "moment";
import { useState } from "react";

export default function EditSchedule({schedule, updateSchedule}) {
    const [crew, setCrew] = useState(schedule.crew);
    const [spot, setSpot] = useState(schedule.spot);
    const [time, setTime] = useState(schedule.time);

    const handleCrew = (e) => setCrew(e.target.value);
    const handleSpot = (e) => setSpot(e.target.value);
    const handleTime = (e) => setTime(e.target.value);
    
    const handleEdit = () => {
        const updatedSchedule = {
            ...schedule,
            crew: crew,
            spot: spot,
            time: time,
            date: moment(schedule.date).format("YYYY/MM/DD (ddd)").toUpperCase(),
            isDetailVisible: false,
        };
        updateSchedule(updatedSchedule);
    };

    return(
        <S.ViewScheduleButton>
            {/* 기존 일정 정보를 기본값으로 설정 */}
            <S.DateSchedule>{moment(schedule.date).format("MM/DD (ddd)").toUpperCase()}</S.DateSchedule>
            <S.SelectCrewContainer>
                <S.ItemContainer>크루 선택</S.ItemContainer>
                <S.CrewInfoBox>
                    <S.CrewInfo>
                        <S.CrewImage src={MainImage} style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        <S.CrewName value={crew} onChange={handleCrew}>{crew}</S.CrewName>
                    </S.CrewInfo>
                    <MdOutlineArrowRight />
                </S.CrewInfoBox>
            </S.SelectCrewContainer>
            <S.ItemContainer>
                <FaMapMarkerAlt />
                <S.SelectSpot value={spot} onChange={handleSpot}></S.SelectSpot>
            </S.ItemContainer>
            <S.ItemContainer>
                <MdAccessTimeFilled />
                <S.SelectTime type="time" value={time} onChange={handleTime}></S.SelectTime>
            </S.ItemContainer>
            <ButtonContainer>
                <AddScheduleButton onClick={handleEdit}>수정하기</AddScheduleButton>
            </ButtonContainer>
        </S.ViewScheduleButton>
    );
}
