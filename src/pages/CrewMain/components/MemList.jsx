import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/Banner.styles";

const profile = "https://yu-momo-bucket.s3.ap-northeast-2.amazonaws.com/profile/94b9c947-9324-4575-9980-ba2b15aa1124_testimg.png"
const members = [
    {id: 1, nickname: "짱구런", role: "리더", profileImage: profile},
    {id: 2, nickname: "초보러닝", role: "멤버", profileImage: profile},
    {id: 3, nickname: "루피피러닝", role: "관리자", profileImage: profile},
    {id: 4, nickname: "헬로우", role: "멤버", profileImage: profile},
    {id: 5, nickname: "짱구런", role: "리더", profileImage: profile},
    {id: 6, nickname: "초보러닝", role: "멤버", profileImage: profile},
    {id: 7, nickname: "루피피러닝", role: "관리자", profileImage: profile},
    {id: 8, nickname: "헬로우", role: "멤버", profileImage: profile},
];

const MemList = ({ closeModal }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.Container>
                <S.CloseButton onClick={() => closeModal()}>
                    <AiOutlineClose size={24}/>
                </S.CloseButton>
                <S.MemberList>
                    {members.map(member => (
                        <S.MemberItem key={member.id}>
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