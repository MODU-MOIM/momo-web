import * as S from "../Styles/ViewSchedule.styles";
import MainImage from "../../../assets/MainImage.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdOutlineArrowRight } from "react-icons/md";
import { ButtonContainer, AddScheduleButton } from "../CrewSchedule";
import moment from "moment";
import { useState } from "react";
import { scheduleAPI } from "../../../api";
import { useParams } from "react-router-dom";

export default function EditSchedule({schedule, crewData, setEditMode}) {
    const { crewId } = useParams();
    const [detailAddress, setdetailAddress] = useState(schedule.detailAddress);
    const [scheduleTime, setScheduleTime] = useState(schedule.scheduleTime);

    const handledetailAddress = (e) => setdetailAddress(e.target.value);
    const handleTime = (e) => setScheduleTime(e.target.value);
    
    const handleEdit = () => {
        const submitUpdateSchedule = {
            date: schedule.scheduleDate,
            time: scheduleTime,
            title: "",
            description: "",
            detailAddress: detailAddress,
            isOnline: false,
        };
        try {
            const response = scheduleAPI.updateSchedule(crewId, schedule.id, submitUpdateSchedule);
            console.log("업데이트 성공", response.data);
            setEditMode(null);
        } catch (error) {
            console.log("업데이트 요청 실패", error);
        }
    };

    return(
        <S.ViewScheduleButton>
            {/* 기존 일정 정보를 기본값으로 설정 */}
            <S.DateSchedule>{moment(schedule.scheduleDate, "YYYY-MM-DD").format("MM/DD (ddd)").toUpperCase()}</S.DateSchedule>
            <S.SelectCrewContainer>
                <S.CrewInfoBox>
                    <S.CrewInfo>
                        <S.CrewImage src={crewData?.bannerImage} style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        <S.CrewName>{crewData?.name}</S.CrewName>
                    </S.CrewInfo>
                </S.CrewInfoBox>
            </S.SelectCrewContainer>
            <S.ItemContainer>
                <FaMapMarkerAlt />
                <S.SelectSpot value={detailAddress} onChange={handledetailAddress}></S.SelectSpot>
            </S.ItemContainer>
            <S.ItemContainer>
                <MdAccessTimeFilled />
                <S.SelectTime type="time" value={scheduleTime} onChange={handleTime}></S.SelectTime>
            </S.ItemContainer>
            <ButtonContainer>
                <AddScheduleButton onClick={handleEdit}>수정하기</AddScheduleButton>
            </ButtonContainer>
        </S.ViewScheduleButton>
    );
}
