import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewChat.styles";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../../api";
import { useParams } from "react-router-dom";
import CrewChatRoom from "./CrewChatRoom";

export default function ChatRoomList({onClose}) {
    const { crewId } = useParams();
    const [chatRoom, setChatRoom] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    // 채팅방 이동
    const goToChatRoom = async(roomId) => {
        try {
            const response = await ChatAPI.getChatRoom(roomId);
            console.log(response.data.data);
            setIsChatRoomOpen(true);
            setChatRoom(response.data.data);
        } catch (error) {
            console.error("채팅방 불러오기 실패", error);
        }
    }

    // 채팅방 생성
    const createRoom = async() => {
        const SubmitData = {
            crewId: crewId,
            name: '채팅방생성테스트'
        }
        try {
            const response = await ChatAPI.createChatRoom(SubmitData);
            console.log(response);
        } catch (error) {
            console.error("채팅방 생성 실패", error);
        }
    }

    useEffect(() => {
        async function fetchChatRooms(){
            try {
                const response = await ChatAPI.getChatRoomList();
                console.log(response.data.data);
                setChatRooms(response.data.data);
            } catch (error) {
                console.error("채팅방 목록 불러오기 실패", error);
            }
        }
        fetchChatRooms();
    },[])

    return(
        <S.Panel onClick={handlePanelClick}>
            <S.ChatContainer onClick={(e) => e.stopPropagation()}>
                <S.DeleteContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={18}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.ListContainer>
                    {/* 사용자가 들어간 크루 채팅방만 보이도록 설정해야 함 */}
                    {chatRooms.map((room) => (
                        <S.RoomContainer
                            key={room.roomId}
                            onClick={() => goToChatRoom(room.roomId)}
                        >
                            <S.CrewProfile src={room.bannerImage}/>
                            <S.RoomName>{room.name}</S.RoomName>
                            <S.MemNums>{room.chatMemberNumbers}</S.MemNums>
                        </S.RoomContainer>
                    ))}
                    {isChatRoomOpen && (
                        <CrewChatRoom
                            chatRoom={chatRoom}
                            onClose={() => setIsChatRoomOpen(false)}
                        />
                    )}
                </S.ListContainer>
                <S.AddButton onClick={createRoom}>추가</S.AddButton>
            </S.ChatContainer>
        </S.Panel>
    );
}
