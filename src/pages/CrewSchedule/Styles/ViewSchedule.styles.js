import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

// view schedule
export const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
export const ViewScheduleButton = styled.div`
    width: 90%;
    height: 20%;
    /* border: 1px solid blue; */
    border-radius: 15px;
    margin: 5px 0px;
    padding: 10px;
    color: white;
    background-color: #8681CE;

    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    &:hover{
        cursor: pointer;
        /* background-color: ${(props) => props.isClickedAddButton ? '#8681CE' : '#786bcf'}; */
    }
`;
export const CrewImage = styled.img`
    width: 60px;
    height: 60px;
    /* border: 1px solid red; */
    border-radius: 50%;
    margin-left: 10px;
`;
export const ScheduleInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    `;
export const CrewName = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: x-small;
    margin-right: 10px;
`;
export const DateSchedule = styled.div`
    font-size: x-large;
    font-weight: 600;
`;
export const ScheduleTime = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: x-large;
    font-weight: 600;
`;
export const StyledIoIosArrowDown = styled(IoIosArrowDown)`
    margin-top: 3px;
    width: 180%;
`;
export const StyledIoIosArrowUp = styled(IoIosArrowUp)`
    margin-top: 3px;
    width: 180%;
`;

// add schedule
export const SelectCrewContainer = styled.div`
    background-color: #605D8A;
    border-radius: 15px;
    margin: 10px 0px;
`;
export const CrewInfoBox = styled.button`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px 20px 10px;
    background-color: transparent;
    border: none;
    color: white;
    &:hover{
        cursor: pointer;
        /* background-color: #8681CE; */
    }
`;
export const CrewInfo = styled.div`
    display: flex;
    align-items: center;
`;
export const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
    font-size: small;
`;
export const SelectSpot = styled.input`
    margin-left: 10px;
    `;
export const SelectTime = styled.input`
    margin-left: 10px;
`;