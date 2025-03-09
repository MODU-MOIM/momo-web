import { useEffect, useRef, useState } from "react";
import useChat from "../../../hooks/useChat";
import * as S from "../Styles/CrewChat.styles";
import { AiOutlineClose } from "react-icons/ai";
import { authAPI, ChatAPI } from "../../../api";
import BadgeImage from "../../../assets/badge.png"

export default function CrewChatRoom({chatRoom, onClose}) {
    const roomId = chatRoom.roomId;
    const endMsgRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [myNickname, setMyNickname] = useState('');
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
                // console.log(response.data.data);
                setMessageList(response.data.data);
            } catch (error) {
                console.error("채팅 히스토리 불러오기 실패", error);
            }
        }
        ChatHistory();
    },[messages]);

    useEffect(() => {
        async function fetchMyName() {
            try {
                const response = await authAPI.getUserInfo();
                setMyNickname(response.data.data.nickname);
            } catch (error) {
                console.error("유저 정보 불러오기 실패", error);
            }
        }
        fetchMyName();
    },[]);

    const formatSendAt = (sendat) => {
        const SendAt = new Date(sendat);
        const hours = SendAt.getHours().toString().padStart(2, '0');
        const minutes = SendAt.getMinutes().toString().padStart(2, '0');
        return {
            time: `${hours}:${minutes}`
        }
    }
    const formatRole = (role) => {
        if (role === 'LEADER') return '리더';
        else if (role === 'ADMIN') return '관리자';
        else return '멤버';
    }

    useEffect(() => {
        // setTimeout을 사용하여 메시지리스트 렌더링이 된 후의 속도에 맞추어 스크롤바를 아래로 이동
        setTimeout(() => {
            endMsgRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 1000);
    }, [messages]);

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.ChatContainer
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '400px',
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
                            width:'auto',
                            marginTop: '0px',
                        }}
                    >
                        {chatRoom.name}
                    </S.RoomName>
                    <S.MemNums
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        {chatRoom.chatMemberNumbers}
                    </S.MemNums>
                </S.Name>
                <S.MessagesContainer>
                    {messageList.map((msg, index) => (
                        <S.MessageContainer key={index}>
                            <S.ProfileWrapper>
                                <S.ProfileImage/>
                                {msg.role !== 'MEMBER' ? (
                                    <S.Badge src={BadgeImage}/>
                                    ):(
                                        null
                                    )}
                            </S.ProfileWrapper>
                            <S.BoxContainer>
                                <S.Profile>
                                    {msg.writerName}
                                    {msg.role !== 'MEMBER' ? (
                                        <S.Role>{formatRole(msg.role)}</S.Role>
                                    ):(
                                        null
                                    )}
                                </S.Profile>
                                <S.MessageBox>
                                    <S.Message
                                        style={msg.writerName === myNickname ? {backgroundColor: '#CFCDEF'}:null}
                                    >
                                        {msg.message}
                                    </S.Message>
                                    <S.MessageTime>{formatSendAt(msg.sendAt).time}</S.MessageTime>
                                </S.MessageBox>
                            </S.BoxContainer>
                        </S.MessageContainer>
                    ))}
                    <div ref={endMsgRef} disabled/> {/* 스크롤바 기능이 있는 태그 안에 ref 적용 */}
                </S.MessagesContainer>
                <S.SendMsg>
                    <S.InputMsg
                        placeholder="메시지 입력"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && handleSendMsg}
                    />
                    <S.SendButton
                        isMessage={message !== ''}
                        disabled={message === ''}
                        onClick={handleSendMsg}
                    >전송</S.SendButton>
                </S.SendMsg>
            </S.ChatContainer>
        </S.Panel>
    );
}