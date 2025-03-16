import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewChat.styles";
import { useEffect, useState } from "react";
import { authAPI, ChatAPI, crewMembersAPI } from "../../../api";
import { useParams } from "react-router-dom";
import CrewChatRoom from "./CrewChatRoom";

export default function ChatRoomList({onClose}) {
    const { crewId } = useParams();
    const [newChatName, setNewChatName] = useState('');
    const [chatRoom, setChatRoom] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [myNickname, setMyNickname] = useState('');

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    // 채팅방 이동
    const goToChatRoom = async(roomId) => {
        try {
            const response = await ChatAPI.getChatRoom(roomId);
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
        }
        if (newChatName !== ''){
            SubmitData.name = newChatName;
        }
        try {
            const response = await ChatAPI.createChatRoom(SubmitData);
            if(response.data.status == 200){
                setNewChatName('');
                fetchChatRooms();
            }
        } catch (error) {
            console.error("채팅방 생성 실패", error);
        }
    }

    // 크루 채팅방 목록 불러오기
    // 크루 생성(ChatRoomList.jsx) 및 크루 삭제(CrewChatRoom.jsx)할 때만 실행할 수 있도록 useEffect 외부로 빼주었음.
        const fetchChatRooms = async() => {
        try {
            const response = await ChatAPI.getMyChatRoom();
            setChatRooms(response.data.data);
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패", error);
        }
    }

    useEffect(() => {
        // 멤버 목록
        async function fetchMembers() {
            try {
                const response = await crewMembersAPI.getMemberList(crewId);
                setMembers(response.data.data);
            } catch (error) {
                console.error("멤버 목록 조회 실패", error);
            }
        }
        // 내 이름 정보 불러오기
        async function fetchMyName() {
            try {
                const response = await authAPI.getUserInfo();
                setMyNickname(response.data.data.nickname);
            } catch (error) {
                console.error("유저 정보 불러오기 실패", error);
            }
        }
        fetchMembers();
        fetchMyName();
        // 처음 렌더링될 때 채팅방 리스트 불러오기
        fetchChatRooms();
    },[]);

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
                            fetchChatRooms={fetchChatRooms}
                            onClose={() => setIsChatRoomOpen(false)}
                        />
                    )}
                </S.ListContainer>
                {/* 현재 유저가 있는 크루에서 해당 유저가 리더인 경우만 채팅방 생성 가능 */}
                {members?.filter(member => member.role === "LEADER").map((member) =>
                    member.nickname === myNickname ? (
                        <div key={member.memberId}>
                            <S.NewName
                                value={newChatName}
                                onChange={(e)=>setNewChatName(e.target.value)}
                                placeholder="새 채팅방 이름"
                            />
                            <S.AddButton onClick={createRoom}>추가</S.AddButton>
                        </div>

                    ) : (
                        null
                    )
                )}
            </S.ChatContainer>
        </S.Panel>
    );
}
