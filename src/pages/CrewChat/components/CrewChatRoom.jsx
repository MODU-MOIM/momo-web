import { useEffect, useState } from "react";
import useChat from "../../../hooks/useChat";
import * as S from "../Styles/CrewChat.styles";
import { AiOutlineClose } from "react-icons/ai";
import { ChatAPI } from "../../../api";

export default function CrewChatRoom({chatRoom, onClose}) {
    const roomId = chatRoom.roomId;
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const token = localStorage.getItem('token')?.replace('Bearer ', '');    // 저장된 토큰에서 'Bearer ' 제거
    const { messages, connect, disconnect, enterChatRoom, sendMessage, stompClient } = useChat(token, roomId);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
            disconnect();
        }
    }

    const handleSendMsg = () => {
        if(message.trim()){
            sendMessage(message, setMessage);
            // setMessage('');
        }
    }

    useEffect(() => {
        async function JoinChat() {
            await connect();
        }
        JoinChat();
    },[]);
    useEffect(() => {
        if (stompClient) {
            enterChatRoom();
        }
    }, [stompClient]);

    useEffect(() => {
        async function ChatHistory() {
            try {
                const response = await ChatAPI.getChatRoomHistory(roomId);
                console.log(response.data.data);
                setMessageList(response.data.data);
            } catch (error) {
                console.error("채팅 히스토리 불러오기 실패", error);
            }
        }
        ChatHistory();
    },[messages])

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
                <div style={{
                    height: '450px',
                    overflowY: 'auto',
                    padding: '10px'
                }}>
                    {messageList.map((msg, index) => (
                        <div key={index}>
                        [{msg.sendAt}] {msg.writerName} ({msg.role}): {msg.message}
                        </div>
                    ))}
                </div>
                <S.SendMsg>
                    <S.InputMsg
                        placeholder="메시지 입력"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && handleSendMsg}
                    />
                    <S.SendButton
                        onClick={handleSendMsg}
                    >전송</S.SendButton>
                </S.SendMsg>
            </S.ChatContainer>
        </S.Panel>
    );
}