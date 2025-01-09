import { AiOutlineClose } from "react-icons/ai";
import * as S from "./Styles/Header.styles";


const MyPage = ({ closeModal }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

    const handleUserPanelClick = (e) => {
        e.stopPropagation();
    }

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.MyPage onClick={(e) => e.stopPropagation()}>
                <S.UserPanel onClick={handleUserPanelClick}>
                    <S.CloseButton onClick={closeModal}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                    {/* 프로필 이미지 */}
                    <S.ProfileImage/>
                    {/* 사용자 닉네임 or 이름 */}
                    <S.Name>김매너</S.Name>
                    <S.Manners></S.Manners>
                </S.UserPanel>
                <S.SelectButton>
                    <S.Button>마이페이지</S.Button>
                    <S.Button>내 크루</S.Button>
                </S.SelectButton>
            </S.MyPage>
        </S.Panel>
    );
}

export default MyPage;