import * as S from "../Styles/Banner.styles";

const MemList = ({ closeModal }) => {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            closeModal();
        }
    }

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.Container>
            </S.Container>
        </S.Panel>
    );
}

export default MemList;