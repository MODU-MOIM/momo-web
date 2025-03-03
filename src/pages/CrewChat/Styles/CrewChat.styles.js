import styled from "styled-components";

// ChattingList.jsx

export const Panel = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index:1;
`;

export const ChatContainer = styled.div`
    width: 256px;
    height: 410px;
    /* width: 350px;
    height: 610px; */
    z-index:2;
    background: #fff;
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

export const CrewProfile = styled.div`
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
    margin: 15px 0px 0px 5px;
`;

export const AddButton = styled.button`
    position: fixed;
    bottom: 5%;
    right: 10%;
    padding: 5px;
    margin: 10px;
`;