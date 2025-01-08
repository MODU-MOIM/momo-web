import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa6";

export default function FloatingMenu() {
    const menu = ["홈","공지사항","커뮤니티","크루활동","일정"];
    
    return(
        <Wrapper>
            <MenuContainer>
                {menu.map((item)=>(
                    <MenuButton>
                            <MenuText>{item}</MenuText>
                            <FaArrowRight />
                    </MenuButton>
                ))}
            </MenuContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 200px;
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
    `;
const MenuText = styled.div`
    font-size: 14px;
    font-weight: bolder;
`;