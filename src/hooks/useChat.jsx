import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const useChat = (token, roomId) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    // const [token, setToken] = useState("");
    // const [roomId, setRoomId] = useState("");

    useEffect(() => {
        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log("Disconnected");
            }
        };
    }, [stompClient]);

    const connect = () => {
        if (!token || !roomId) {
            alert("토큰과 채팅방 ID를 입력하세요!");
            return;
        }

        const socket = new SockJS("/stomp/chat");
        const client = Stomp.over(socket);
        
        client.connect({ Authorization: `${token}` }, (frame) => {
            console.log("Connected: " + frame);
            client.subscribe(`/room/${roomId}`, (message) => {
                console.log("Received message:", message);
                showMessage(JSON.parse(message.body));
            });
            setStompClient(client);
        }, (error) => {
            console.error("WebSocket connection error:", error);
        });
    };

    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
            setStompClient(null);
            console.log("Disconnected");
        }
    };

    const enterChatRoom = () => {
        if (!stompClient || !stompClient.connected) {
            alert("WebSocket에 먼저 연결하세요!");
            return;
        }
        stompClient.send(`/send/room/${roomId}/enter`, { token }, {});
        console.log("Entered chat room:", roomId);
    };

    const sendMessage = (message, clearMessage) => {
        if (!token || !roomId) {
            alert("토큰과 채팅방 ID를 입력하세요!");
            return;
        }

        if (message.trim() && stompClient) {
            console.log(message);
            stompClient.send(`/send/room/${roomId}/message`, { token }, JSON.stringify({
                content: message.trim()
            }));
            clearMessage("");
        }
    };

    const showMessage = (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    };

    return { messages, connect, disconnect, enterChatRoom, sendMessage };
};

export default useChat;