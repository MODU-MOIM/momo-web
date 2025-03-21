import { useParams } from "react-router-dom";
import * as S from "./Styles/CrewChat.styles";
import { useState } from "react";

export default function CrewChatList() {

    return(
        <S.Wrapper>
            <S.TabBarContainer>
                <S.TabBarItem>입장하지 않은 채팅방</S.TabBarItem>
                <S.TabBarItem>입장한 채팅방</S.TabBarItem>
            </S.TabBarContainer>
            <S.RoomListContainer>
                <S.ChatRoomContainer>
                    {/* 채팅방 프로필 */}
                    <S.ProfileContainer>
                        <S.CrewProfile/>
                        <S.ChatRoomName>크루명</S.ChatRoomName>
                        <S.ChatMemNumbers>18</S.ChatMemNumbers>
                    </S.ProfileContainer>
                    {/* 입장버튼 */}
                    <S.EnterButton>입장하기</S.EnterButton>
                </S.ChatRoomContainer>
            </S.RoomListContainer>
        </S.Wrapper>
    );
}