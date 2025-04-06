import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/Banner.styles";
import { crewMembersAPI } from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MemList = ({ closeModal }) => {
    const { crewId } = useParams();
    const [members, setMembers] = useState();

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }
    const fetchMembers = async() => {
        try {
            const response = await crewMembersAPI.getMemberList(crewId);
            console.log(response.data.data);
            setMembers(response.data.data);
        } catch (error) {
            console.error("크루 멤버 읽기 실패", error);
        }
    }

    useEffect(() => {
        fetchMembers();
    },[]);

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.Container>
                <S.CloseButton onClick={() => closeModal()}>
                    <AiOutlineClose size={24}/>
                </S.CloseButton>
                <S.MemberList>
                    {members?.map(member => (
                        <S.MemberItem key={member.memberId}>
                            <S.MemberImage src={member.profileImage}/>
                            <S.MemberName>{member.nickname}</S.MemberName>
                            <S.MemberRole>{member.role}</S.MemberRole>
                        </S.MemberItem>
                    ))}
                </S.MemberList>
            </S.Container>
        </S.Panel>
    );
}

export default MemList;