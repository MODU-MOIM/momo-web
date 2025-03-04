import styled from "styled-components";

// ChattingList.jsx

export const Panel = styled.div`
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.7); */
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index:1;
`;

export const ChatContainer = styled.div`
    width: 256px;
    height: 410px;
    z-index:2;
    background: #F5F5FF;
    border: 1px solid #929292;
    border-radius: 15px;
    position: fixed;
    bottom: 5%;
    right: 10%;
`;

export const DeleteContainer = styled.div`
    width:100%;
    height:50px;
    /* background: #DEDFE7; */
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding:0 20px;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
`;

export const ListContainer = styled.div`
    
`;

export const RoomContainer = styled.div`
    display: flex;
    border: 1px solid red;
`;

export const CrewProfile = styled.img`
    width: 50px;
    height: 50px;
    margin: 10px;
    border-radius: 50%;
    border: 1px solid red;
`;

export const RoomName = styled.div`
    width: 40%;
    height: 20px;
    margin-top: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; // 말줄임표시
`;

export const MemNums = styled.div`
    height: 20px;
    margin: 15px 0px 0px 15px;
`;

export const AddButton = styled.button`
    position: fixed;
    bottom: 5%;
    right: 10%;
    padding: 5px;
    margin: 10px;
`;

// CrewChatRoom.jsx

export const Name = styled.div`
    display: flex;
    padding-left: 30px;
    padding-bottom: 15px;
    background-color: aqua;
`;

export const SendMsg = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 350px;
    height: 100px;
    background-color: aquamarine;
    position: fixed;
    bottom: 5%;
`;

export const InputMsg = styled.input`
    display: block;
    width: 100%;
`;

export const SendButton = styled.button`
`;