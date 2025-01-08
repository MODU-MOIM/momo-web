import * as S from "./Styles/Header.styles";

const MyPage = () => {
    return(
        <S.Panel>
            <S.MyPage>
                <S.UserPanel>
                    <S.ProfileImage/>
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