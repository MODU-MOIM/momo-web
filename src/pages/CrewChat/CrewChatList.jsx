import { useParams } from "react-router-dom";
import * as S from "./Styles/CrewChat.styles";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../api";

export default function CrewChatList() {
    const { crewId } = useParams();
    const [chatRoomList, setCrewChatRoomList] = useState([]);
    const [isEnterRoomsClick, setIsEnterRoomsClick] = useState(false);

    const handleTab = () => {
        setIsEnterRoomsClick(true);
        console.log("tlfgod")
    }
    const fetchCrewChatRooms = async() => {
        try {
            const response = await ChatAPI.getCrewChatRoomList(crewId);
            console.log("크루 채팅방 목록", response.data.data);
            setCrewChatRoomList(response.data.data);
        } catch (error) {
            console.error("해당 크루 채팅방 목록 불러오기 실패", error);
        }
    }
    
    useEffect(()=>{
        fetchCrewChatRooms();
    },[]);

    return(
        <S.Wrapper>
            <S.TabBarContainer>
                <S.TabBarItem
                    onClick={()=>setIsEnterRoomsClick(false)}
                    style={{
                        color: isEnterRoomsClick ? "black" : "#fff",
                        backgroundColor: isEnterRoomsClick ? "#fff" : "#352EAE",
                    }}
                >
                    입장하지 않은 채팅방
                </S.TabBarItem>
                <S.TabBarItem
                    onClick={()=>setIsEnterRoomsClick(true)}
                    style={{
                        color: isEnterRoomsClick ? "#fff" : "black",
                        backgroundColor: isEnterRoomsClick ? "#352EAE" : "#fff",
                    }}
                >
                    입장한 채팅방
                </S.TabBarItem>
            </S.TabBarContainer>
            <S.RoomListContainer>
                {!isEnterRoomsClick && chatRoomList.map(room => (
                    <S.ChatRoomContainer>
                        {/* 채팅방 프로필 */}
                        <S.ProfileContainer>
                            <S.CrewProfile src={room.bannerImage}/>
                            <S.ChatRoomName>{room.name}</S.ChatRoomName>
                            <S.ChatMemNumbers>{room.chatMemberNumbers}</S.ChatMemNumbers>
                        </S.ProfileContainer>
                        {/* 입장버튼 */}
                        <S.EnterButton>입장하기</S.EnterButton>
                    </S.ChatRoomContainer>
                ))}
            </S.RoomListContainer>
        </S.Wrapper>
    );
}