import { useParams } from "react-router-dom";
import * as S from "./Styles/CrewChat.styles";
import { useEffect, useState } from "react";
import { ChatAPI } from "../../api";

export default function CrewChatList() {
    const { crewId } = useParams();
    const [myAllChatRoom, setMyAllChatRoom] = useState([]);
    const [crewChatRoomList, setCrewChatRoomList] = useState([]);
    const [myChatRoomList, setMyChatRoomList] = useState([]);
    const [notMyChatRoomList, setNotMyChatRoomList] = useState([]);
    const [isEnterRoomsClick, setIsEnterRoomsClick] = useState(false);

    const fetchCrewChatRooms = async() => {
        try {
            const response = await ChatAPI.getCrewChatRoomList(crewId);
            console.log("크루 채팅방 목록", response.data.data);
            setCrewChatRoomList(response.data.data);
        } catch (error) {
            console.error("해당 크루 채팅방 목록 불러오기 실패", error);
        }
    }
    // 내가 가입한(입장한) 채팅방 목록 불러오기
    const fetchChatRooms = async() => {
        try {
            const response = await ChatAPI.getMyChatRoom();
            console.log("내 채팅방", response.data.data);
            setMyAllChatRoom(response.data.data);
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패", error);
        }
    }
    
    const filterIsEnterRoom = () => {
        // 입장한 채팅방
        // 내가 가입한 모든 크루의 채팅방과 현재 크루에 존재하는 모든 채팅방과 비교 
        // => 같은 것만을 반환( 현재 크루에서 내가 가입한 채팅방만 필터링 )
        const enteredCrewChatRoom = myAllChatRoom.filter(
            myRoom => crewChatRoomList.some(crewRoom => myRoom.roomId == crewRoom.roomId)
        );
        console.log("enteredCrewChatRoom...", enteredCrewChatRoom);
        setMyChatRoomList(enteredCrewChatRoom);
        
        // 입장하지 않은 채팅방
        // 내가 가입한 현재 크루의 채팅방과 현재 크루에 존재하는 모든 채팅방과 비교
        // => 다른 것만을 반환
        const isntCrewChatRoom = crewChatRoomList.filter(
            crewRoom => !myChatRoomList.some(myRoom => myRoom.roomId == crewRoom.roomId)
        );
        console.log("notMyChatRoomList...", isntCrewChatRoom);
        setNotMyChatRoomList(isntCrewChatRoom);

    }

    useEffect(()=>{
        fetchCrewChatRooms();
        fetchChatRooms();
    },[]);
    useEffect(()=>{
        filterIsEnterRoom();
    },[myAllChatRoom]);

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
                {/* 크루 채팅방이 아예 없으면 => 아직 채팅방이 개설되지 않았습니다! */}
                {crewChatRoomList.length > 0 ? (
                    !isEnterRoomsClick ? (
                        // 노가입 채팅방 없으면 => 모든 채팅방에 입장하였습니다!
                        notMyChatRoomList.length > 0 ? (
                            notMyChatRoomList.map(room => (
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
                            ))
                        ):(
                            <S.DetailMsg>모든 채팅방에 입장하였습니다!</S.DetailMsg>
                        )
                        
                    ):(
                        // 가입 채팅방 없으면 => 입장한 채팅방이 없습니다!
                        myChatRoomList.length > 0 ? (
                            myChatRoomList.map(room => (
                                <S.ChatRoomContainer>
                                    {/* 채팅방 프로필 */}
                                    <S.ProfileContainer>
                                        <S.CrewProfile src={room.bannerImage}/>
                                        <S.ChatRoomName>{room.name}</S.ChatRoomName>
                                        <S.ChatMemNumbers>{room.chatMemberNumbers}</S.ChatMemNumbers>
                                    </S.ProfileContainer>
                                </S.ChatRoomContainer>
                            ))
                        ):(
                            <S.DetailMsg>입장한 채팅방이 없습니다!</S.DetailMsg>
                        )
                    )
                ):(
                    <S.DetailMsg>아직 채팅방이 개설되지 않았습니다!</S.DetailMsg>
                )}
            </S.RoomListContainer>
        </S.Wrapper>
    );
}