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
    width: 100%;
    height: 85%;
    overflow: scroll;
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
    color: #929292;
`;

export const AddButton = styled.button`
    position: fixed;
    bottom: 43%;
    right: 20%;
    padding: 5px;
    margin: 10px;
`;

// CrewChatRoom.jsx

export const Name = styled.div`
    display: flex;
    padding: 0px 0px 20px 30px;
`;

export const SendMsg = styled.div`
    width: 398px;
    height: 110px;
    position: fixed;
    bottom: 5.1%;
    right: 10.05%;
    background-color: #fff;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const InputMsg = styled.textarea`
    display: block;
    width: 100%;
    height: 60%;
    margin-top: 15px;
    padding: 0px 20px;
    resize: none;
    border: none;
    outline: none;
    /* background-color: aqua; */
`;

export const SendButton = styled.button`
    margin-left: 330px;
    padding: 3px 10px;
    border: none;
    color: ${(props) => (props.isMessage ? "#fff" : "#8C8C8C")};
    background-color: ${(props) => (props.isMessage ? "#5E58B4" : "#F0F0F0")};
    cursor: ${(props) => (props.isMessage ? "pointer" : "auto")};

    &:hover{
        background-color: ${(props) => (props.isMessage ? "#352EAE" : "#F0F0F0")}
    }
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 410px;
    overflow: scroll;
    padding: 0px 20px;
`;

export const MessageContainer = styled.div`
    display: flex;
    margin: 20px 0px;
`;

export const ProfileWrapper = styled.div`
    position: relative;  // 배지 위치 설정 기준
    display: inline-block;
    width: 45px;
    height: 45px;
    margin-right: 5px;
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid red;
    margin: 5px 10px 0px 0px;
    position: relative;
`;

export const Badge = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    /* border: 1px solid red; */

    position: absolute;
    bottom: 0;
    right: 5%;
`;

export const Profile = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Role = styled.div`
    margin-left: 5px;
    font-size: 12px;
    color: #352EAE;
`;

export const BoxContainer = styled.div`
`;

export const MessageBox = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Message = styled.div`
    max-width: 230px;
    /* width: auto; */
    /* height: 40px; */
    width: fit-content;
    margin-top: 10px;
    padding: 7px 10px;
    border-radius: 10px;
    border: 3px solid #352EAE;
    background-color: #fff;
    box-shadow: 0px 2px 5px 0px gray;
    font-size: 14px;
`;

export const MessageTime = styled.div`
    margin-left: 5px;
    font-size: 12px;
    color: #797979;
`;