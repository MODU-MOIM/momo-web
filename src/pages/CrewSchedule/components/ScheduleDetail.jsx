import { FaMapMarkerAlt } from "react-icons/fa";
import { ItemContainer } from "../Styles/ViewSchedule.styles";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

export default function ScheduleDetail({schedule, deleteSchedule, setEditMode}) {
    const handleClick = (e) => {
        e.stopPropagation();  // isDetailVisible 변경 안되도록.
    };
    const handleEditClick = (id) => {
        setEditMode(id);
    };

    return(
        <Wrapper onClick={handleClick}>
            {/* 상세 위치 */}
            <ItemContainer>
                <FaMapMarkerAlt />
                <ItemText>{schedule.detailAddress}</ItemText>
            </ItemContainer>
            <SubButtonContainer>
                {/* 수정 버튼 */}
                <SubButton onClick={()=>handleEditClick(schedule.id)}>
                    <StyledRiEdit2Fill/>
                </SubButton>
                {/* 삭제버튼 */}
                <SubButton  onClick={()=>deleteSchedule(schedule.id)}>
                    <StyledFaTrashAlt/>
                </SubButton>
            </SubButtonContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    border-top: 2px solid #e0e0e0;
    margin-top: 10px;
    padding-top: 10px;
    cursor: default;
`;
const ItemText = styled.div`
    margin-left: 10px;
`;

const SubButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const SubButton = styled.button`
    width: 25px;
    height: 25px;
    background-color: white;
    border: none;
    border-radius: 5px;
    margin-left: 8px;
    &:hover{
        cursor: pointer;
        background-color: gray;
    }
`;
const StyledRiEdit2Fill = styled(RiEdit2Fill)`
    width: 15px;
    height: 20px;
    color: #c8c8c8;
`;
const StyledFaTrashAlt = styled(FaTrashAlt)`
    width: 12px;
    height: 12px;
    color: red;
`;