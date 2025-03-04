import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

export default function useChat(roomId, token) {
    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);

    useEffect(() => {
        if (!token || !roomId) {
            alert("토큰과 채팅방 ID를 입력하세요!");
            return;
        }
    
        const socket = new SockJS('/stomp/chat');
        // stompClient = Stomp.over(socket);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            // debug: (msg) => console.log("[STOMP] : ", msg),
            connectHeaders: { Authorization: `Bearer ${token}` },
            onConnect: (frame) => {
                console.log("Connected : ", frame);
    
                // 특정 채팅방 subscribe
                stompClient.subscribe(`room/${roomId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, receivedMessage]);
                })
    
                // 채팅방 입장
                stompClient.send(`send/room/${roomId}/enter`, { "token": token }, {});
                
            },
            onStompError: (frame) => {
                console.error('WebSocket connection error:', frame);
                alert('채팅 연결에 실패했습니다. 다시 시도해주세요.');
            }
        })
        
        stompClient.activate(); // 클라이언트 활성화
        stompClientRef.current = stompClient;

        // 웹소켓 해제
        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    },[roomId, token]);

    const sendMessage = (content) => {
        if (!stompClientRef.current || !stompClientRef.current.connected) return;

        stompClientRef.current.send(
            `/send/room/${roomId}/message`, 
            { "token" : token }, 
            JSON.stringify({ content })
        );
    };

    return { messages, sendMessage };
}