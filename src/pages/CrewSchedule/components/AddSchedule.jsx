import * as S from "../Styles/ViewSchedule.styles";
import MainImage from "../../../assets/MainImage.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";
import { AddScheduleButton, ButtonContainer } from "../CrewSchedule";
import moment from "moment";
import { useState } from "react";
import { scheduleAPI } from "../../../api";
import { useParams } from "react-router-dom";

export default function AddSchedule({date, AddSchedule}) {
    const { crewId } = useParams();
    // const [crew, setCrew] = useState('초코러닝(초보자 코스 러닝)');
    const [spot, setSpot] = useState('꿈트리 움 갤러리');
    const [time, setTime] = useState('18:00');

    // const handleCrew = (e) => setCrew(e.target.value);
    const handleSpot = (e) => setSpot(e.target.value);
    const handleTime = (e) => setTime(e.target.value);

    const handleSubmitSchedule = async() => {
        const newSchedule = {
            id: Math.random(), // 랜덤 ID 생성
            // crew: crew,
            spot: spot,
            time: time,
            date: moment(date, "YYYY년 MM월 DD일").format("YYYY/MM/DD (ddd)").toUpperCase()
        };
        const submitSchedule={
            date: moment(date, "YYYY년 MM월 DD일").format("YYYY-MM-DD"),
            time: moment(time, "HH:mm").format("HH:mm:00"),
            title: "",
            description: "",
            detailAddress: spot,
            isOnline: false,
        }
        console.log("submitSchedule : ", submitSchedule);
        try {
            const response = await scheduleAPI.createSchedule(crewId, submitSchedule)
            console.log("일정 추가 성공 : ",response);
            AddSchedule(newSchedule);
        } catch (error) {
            console.log("일정 추가 실패 : ", error);
        }
    };
    return(
        <S.ViewScheduleButton>
            <S.DateSchedule>{moment(date, "YYYY년 MM월 DD일").format("MM/DD (ddd)").toUpperCase()}</S.DateSchedule>
            <S.SelectCrewContainer>
                {/* <S.ItemContainer>크루선택</S.ItemContainer> */}
                {/* 유저가 가입한 크루 목록 보이기 */}
                <S.CrewInfoBox>
                    <S.CrewInfo>
                        <S.CrewImage src={MainImage} style={{width: '30px', height: '30px', marginRight: '10px'}}/>
                        <S.CrewName>초코러닝</S.CrewName>
                    </S.CrewInfo>
                    {/* <MdOutlineArrowRight /> */}
                </S.CrewInfoBox>
            </S.SelectCrewContainer>
            <S.ItemContainer>
                <FaMapMarkerAlt />
                <S.SelectSpot
                    value={spot}
                    onChange={handleSpot}
                ></S.SelectSpot>
            </S.ItemContainer>
            <S.ItemContainer>
                <MdAccessTimeFilled />
                <S.SelectTime
                    type="time"
                    value={time}
                    onChange={handleTime}
                ></S.SelectTime>
            </S.ItemContainer>
            <ButtonContainer>
                <AddScheduleButton
                    onClick={handleSubmitSchedule}
                >+ 추가하기</AddScheduleButton>
            </ButtonContainer>
        </S.ViewScheduleButton>
    );
}