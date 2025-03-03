import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewChat.styles";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../../api";
import { useParams } from "react-router-dom";

export default function ChatRoomList({onClose}) {
    const { crewId } = useParams();
    const [chatRooms, setChatRooms] = useState([]);
    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }
    const createRoom = async() => {
        const SubmitData = {
            crewId: crewId,
            name: '채팅방이름길이테스트하는중입니다'
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
                    {chatRooms.map((room) => (
                        <S.RoomContainer key={room.roomId}>
                            <S.CrewProfile/>
                            <S.RoomName>{room.name}</S.RoomName>
                            <S.MemNums>{room.chatMemberNumbers}</S.MemNums>
                        </S.RoomContainer>
                    ))}
                    {/* <div>초코러닝</div>
                    <div>테스트크루</div> */}
                </S.ListContainer>
                <S.AddButton onClick={createRoom}>추가</S.AddButton>
            </S.ChatContainer>
        </S.Panel>
    );
}
