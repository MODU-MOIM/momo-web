import { useState } from "react";
import styled from "styled-components";
import ChatRoomList from "./components/ChatRoomList";

export default function CrewChat() {
    const [isChattingListOpen, setIsChattingListOpen] = useState(false);

    return(
        <Wrapper>
            <Text
                onClick={()=>setIsChattingListOpen(true)}
            >
                TALK
            </Text>
            {isChattingListOpen && (
                <ChatRoomList
                    onClose={() => setIsChattingListOpen(false)}
                />
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    bottom: 50px;
    right: 10%;
    width: 65px;
    height: 65px;
    margin-left: 30px;
    background-color: #F5F5FF;
    border: 1px solid #352EAE;
    border-radius: 50%;
    box-shadow: 0px 0px 5px 2px gray;

    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover{
        cursor: pointer;
        background-color: #e6e6ef;
    }
`;

const Text = styled.div`
    color: #352EAE;
    padding: 20px 10px;
`;