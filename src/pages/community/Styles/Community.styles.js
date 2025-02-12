import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    width:1024px;
    margin:0 auto;
`;

export const List = styled.div`
    width:468px;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`;

export const ActivityCard = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    border-top:1px solid #D9D9D9;
    flex-direction: column;
`;

export const ActivityImage = styled.img`
    width: 100%;
    height: 468px;
    border-radius: 10px;
    object-fit: cover; // 이미지 비율 유지하면서 꽉 채우기
    cursor: pointer;
`;

export const UserInfoContainer = styled.div`
    margin-top:20px;
    margin-bottom:10px;

    & > * {
        float:left;
    }
`;

export const ProfileImage = styled.img`
    width:45px;
    height:45px;
    border-radius:50%;
`;

export const UserName = styled.p`
    height:45px;
    display: flex;
    align-items: center;
    margin:0 10px;
    color:#000;
    font-size: 15px;
    font-weight: 600;
`;

export const Date = styled.p`
    height:45px;
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #8C8C8C;
`;

export const PostInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 15px;
`;

export const ButtonsContainer = styled.div`
    width:100%;
    display: flex;
    gap: 10px;  // 버튼 사이 간격
`;

export const IconButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    color: #8C8C8C;
    font-size: 15px;
    
    &:hover {
        color: #000;
    }
`;

export const TextContainer = styled.div`
    margin-top:-20px;
    display:flex;
    align-items: center;
`;

export const Title = styled(RouterNavLink)`
    flex-grow: 1;  // 남은 공간 모두 차지
    text-decoration: none;
    color: #38383D;
    font-size: 15px;
    font-weight: 600;
`;

export const FloatingButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 22%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #352EAE;  // 메인 컬러
    color: white;
    border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: all 0.3s ease;


    &:hover {
        background-color: #2A258A;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
`;


// WriteCommunity.jsx

export const EditorWrapper = styled.div`
    width: 1024px;  // 컨테이너 너비 지정
    min-height: 100vh;
    margin: 0 auto;  // 중앙 정렬
    padding: 20px;
    background-color: #f5f5f5;
`;

export const EditorContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 20px;  // 내부 여백 추가
`;

export const QuillWrapper = styled.div`
    .quill {
        width: 100%;
        height: 500px;  // 에디터 높이 고정
    }

    .ql-container {
        height: calc(100% - 42px);
        font-size: 16px;
    }

    .ql-editor {
        height: 100%;
        padding: 20px;
        overflow-y: auto;

        img {
            max-width: 100%;
            max-height: 500px;
            object-fit: contain;
        }
    }

    .ql-toolbar {
        border-bottom: 1px solid #ccc;
        padding: 8px;
    }
`;

export const SubmitButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    background-color: #4B44B6;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #3d37a1;
    }
`;