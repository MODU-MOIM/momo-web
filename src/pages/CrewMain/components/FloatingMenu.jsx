import { useEffect, useState } from "react";
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../AuthProvider";

export default function FloatingMenu() {
    const { crewId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useAuth();
    const { checkCrewMembership, crewMemberShip } = useAuth();

    
    // 크루 멤버 여부를 확인하는 상태 변수
    const [isMember, setIsMember] = useState(false);
    
    const menu = {
        "홈": "crewHome",
        "공지사항": "crewNotice",
        "커뮤니티": "crewCommunity",
        "크루활동": "crewActivity",
        "일정": "crewSchedule",
        "채팅": "crewChatList"
    };

    // 접근 가능한 메뉴 (멤버가 아닌 경우 홈과 크루활동만 가능)
    const accessibleMenus = isMember 
        ? Object.values(menu) 
        : ["crewHome", "crewActivity"];

    const [selectedMenu, setSelectedMenu] = useState(() => {
        const currentPath = location.pathname.split('/').pop();
        return Object.values(menu).includes(currentPath) ? currentPath : "crewHome";
    });


    useEffect(() => {
        const checkMemberShip = async () => {
            const memberStatus= await checkCrewMembership(crewId);
            setIsMember(memberStatus);
        };

        checkMemberShip();
    }, [crewId, checkCrewMembership, crewMemberShip]);

    
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        if (Object.values(menu).includes(currentPath)) {
            setSelectedMenu(currentPath);
        }
    }, [location.pathname]);
    
    
    const handleNavigate = (path) => {
        // 접근 가능한 메뉴인지 확인
        if (!accessibleMenus.includes(path)) {
            // 접근 불가능한 메뉴일 경우 알림 표시 (또는 다른 처리)
            alert("크루 멤버만 이용할 수 있는 메뉴입니다.");
            return;
        }
        
        setSelectedMenu(path);
        navigate(`/crews/${crewId}/${path}`);
    }
    
    return(
        <Wrapper>
            <MenuContainer>
                {Object.entries(menu).map(([item, path])=>(
                    <MenuButton 
                        key={path} 
                        onClick={()=>handleNavigate(path)}
                        $disabled={!accessibleMenus.includes(path)}
                    >
                        <MenuText
                            $isSelected={selectedMenu===path}
                            $disabled={!accessibleMenus.includes(path)}
                        >
                            {item}
                        </MenuText>
                        <IconContainer>
                            <LockIcon $visible={!accessibleMenus.includes(path)}>
                                <FaLock />
                            </LockIcon>
                            <FaArrowRight style={{
                                opacity: accessibleMenus.includes(path) ? 1 : 0.5
                            }} />
                        </IconContainer>
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
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.$disabled ? 0.6 : 1};
    transition: background-color 0.2s;
    
    &:hover{
        border-radius: 15px;
        background-color: ${props => props.$disabled ? 'transparent' : '#DEDFE7'};
        
        ${props => props.$disabled && `
            .lock-icon {
                opacity: 1;
            }
        `}
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LockIcon = styled.div`
    opacity: 0;
    transition: opacity 0.2s;
    margin-right: 10px;
    color: #A0A0A8;
    display: ${props => props.$visible ? 'block' : 'none'};
    
    ${MenuButton}:hover & {
        opacity: 1;
    }
`;

const MenuText = styled.div`
    font-size: 14px;
    font-weight: bolder;
    /* 선택한 메뉴에 따라 색상 변경 */
    color: ${props => {
        if (props.$disabled) return '#A0A0A8';
        return props.$isSelected ? '#352EAE' : '#38383D';
    }};
`;