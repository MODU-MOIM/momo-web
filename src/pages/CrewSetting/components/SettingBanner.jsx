import * as S from "../Styles/CrewSetting.styles";

const SettingBanner = ({ onClose }) => {
    return (
        <S.Panel>
            <h2>배너 설정</h2>
            <button onClick={onClose}>닫기</button>
            {/* 배너 설정 관련 내용 추가 */}
        </S.Panel>
    );
};

export default SettingBanner;