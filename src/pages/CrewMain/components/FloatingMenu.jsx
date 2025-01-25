import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function FloatingMenu() {
    const crewId = "1";
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState();
    
    const menu = {
        "홈": "crewHome",
        "공지사항": "crewNotice",
        "커뮤니티": "crewCommunity",
        "크루활동": "crewActivity",
        "일정": "crewSchedule"
    };
    
    const handleNavigate = (path) => {
        setSelectedMenu(path);
        navigate(`/crew/${crewId}/${path}`);
    }
    
    return(
        <Wrapper>
            <MenuContainer>
                {Object.entries(menu).map(([item, path])=>(
                    <MenuButton onClick={()=>handleNavigate(path)}>
                            <MenuText
                                isSelected={selectedMenu===path}
                            >
                                {item}
                            </MenuText>
                            <FaArrowRight />
                    </MenuButton>
                ))}
            </MenuContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    top: 250px;
    width: 200px;
    margin-left: 30px;
    /* background-color: aquamarine; */
`;
const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 20px;
    `;
const MenuButton = styled.button`
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 30px;
    
    display: flex;
    justify-content: space-between;
    &:hover{
        cursor: pointer;
        border-radius: 15px;
        background-color: #DEDFE7;
    }
    `;
const MenuText = styled.div`
    font-size: 14px;
    font-weight: bolder;
    /* 선택한 메뉴에 따라 색상 변경 */
    color: ${props => props.isSelected ? '#352EAE' : '#38383D'};
`;