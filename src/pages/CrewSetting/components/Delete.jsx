import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { crewAPI, crewMembersAPI } from "../../../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const Delete = ({ setIsCrewActivityOpen, onClose }) => {
    const { crewId } = useParams();
    const [members, setMembers] = useState([]);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    const handleToActivity = () => {
        onClose();
        setIsCrewActivityOpen(true);
    }

    const handleDelete = async() => {
        try {
            const response = await crewAPI.deleteCrew(crewId);
            console.log(response);
        } catch (error) {
            console.error("크루 삭제 실패", error);
        }
    }

    useEffect(() => {
        async function fetcheMembers() {
            try {
                const response = await crewMembersAPI.getMemberList(crewId);
                console.log(response.data.data);
                setMembers(response.data.data);
            } catch (error) {
                console.error("멤버리스트 불러오기 실패", error);
            }
        }
        fetcheMembers();
    },[])

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: "560px",
                    height: "350px",
                    right: "35%",
                }}
            >
                <S.DeleteContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.SettingContainer>
                    <S.SettingTitle style={{ color: "red" }}>
                        크루 삭제하기
                    </S.SettingTitle>
                    {/* 리더 제외 멤버가 아직 있을 때 표시 */}
                    {members.length > 1 &&
                        <>
                            <S.Warning>
                                크루를 삭제하려면 직접 모든 멤버를 강제탈퇴 시킨 후 진행해주세요.
                            </S.Warning>
                            <S.ButtonContainer>
                                <S.CancelButton
                                    onClick={handleToActivity}
                                >
                                    멤버 활동 관리 페이지로 이동
                                </S.CancelButton>
                            </S.ButtonContainer>
                        </>
                    }
                    {/* 멤버가 리더만 남았을 때 삭제 메시지 표시 */}
                    {members.length == 1 &&
                        <>
                            <S.Warning>
                                정말로 크루를 삭제하시겠습니까?
                            </S.Warning>
                            <S.ButtonContainer>
                                <S.DeleteButton onClick={handleDelete}>
                                    크루 삭제
                                </S.DeleteButton>
                                <S.CancelButton onClick={onClose}>
                                    취소
                                </S.CancelButton>
                            </S.ButtonContainer>
                        </>
                    }
                </S.SettingContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default Delete;