import * as S from "../Styles/CrewChat.styles";
import { AiOutlineClose } from "react-icons/ai";

export default function CrewChatRoom({chatRoom, onClose}) {
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.ChatContainer
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '350px',
                    height: '610px'
                }}
            >
                <S.DeleteContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={18}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.Name>
                    <S.RoomName
                        style={{
                            width:'auto'
                        }}
                    >{chatRoom.name}</S.RoomName>
                    <S.MemNums>{chatRoom.chatMemberNumbers}</S.MemNums>
                </S.Name>
                <div>hello</div>
                <S.SendMsg>
                    <S.InputMsg
                        placeholder="메시지 입력"
                    />
                    <S.SendButton>전송</S.SendButton>
                </S.SendMsg>
            </S.ChatContainer>
        </S.Panel>
    );
}