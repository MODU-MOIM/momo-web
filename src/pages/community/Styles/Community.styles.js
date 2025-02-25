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
    z-index: 1;
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

// Popup.jsx
export const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    z-index: 100;
`;

export const PopupContent = styled.div`
    width: 1440px;
    height: 80%;
    position: relative;
    background-color: #000;
    border-radius: 10px;
    top:10%;
    color:white;
`;

export const PopupTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    margin:0 20px;
    border-bottom:1px solid #D9D9D9;
`;

export const Writer = styled.div`
    font-size:1.2em;
`;

export const PopupCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    color:white;
    cursor: pointer;
    font-size: 1.5em;
    margin-right:20px;
`;

export const ImageGallery = styled.div`
    float:left;
    width:50%;
    height:100%;
    position: relative;
`;

export const SlideContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

export const SlideWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;
    transform: translateX(-${props => props.currentImage * 100}%);
`;

export const Slide = styled.div`
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

export const PopupImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

export const ButtonContainer = styled.div`
    width:100%;
    height:100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
`;

export const PrevButton = styled.button`
    position: absolute;
    width: 50%;
    height: 100%;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 2em;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
`;

export const NextButton = styled.button`
    position: absolute;
    width: 50%;
    height: 100%;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 2em;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
`;

export const ImageIndicator = styled.div`
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 8px;
    z-index: 10;
`;

export const IndicatorDot = styled.button`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    border: none;
    padding: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background: rgba(255, 255, 255, 0.8);
    }
`;

export const ContentContainer = styled.div`
    float:left;
    width:50%;
    height:100%;
    position: relative;
`;

export const Content = styled.div`
    height:40%;
    padding:20px 0;
    margin:0 20px;
    position: relative;
    font-weight:500;
`;

export const ContentButtonContainer = styled.div`
    width:100%;
    border-bottom:1px solid #D9D9D9;
    position: absolute;
    padding:20px;
    bottom:0;
    display:flex;
    gap:10px;

    button{
        border:none;
        background:none;
        cursor:pointer;
        font-size:1.2em;
        color:white;
    }
`;

export const TimeAgo = styled.div`
    position: absolute;
    right: 0;
    color:#8C8C8C;
    font-size:1em;
`;

export const ContentText = styled.div`
    font-size:1.2em;
    line-height:1.2;
    padding:0 20px;
`;

// 댓글 입력 컴포넌트
export const CommentContainer = styled.div`
    height: calc(55% - 60px);
    margin: 0 20px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const CommentList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin-bottom: 10px;
    padding-right: 10px;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: #1e1e1e;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #777;
    }
`;

export const NoComments = styled.div`
    text-align: center;
    color: #888;
    padding: 20px 0;
    font-style: italic;
`;

export const CommentItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #333;
    &:last-child {
        border-bottom: none;
    }
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export const CommentProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;

export const CommentWriter = styled.div`
    font-weight: 600;
    font-size: 14px;
`;

export const CommentTimeAgo = styled.div`
    margin-left: auto;
    font-size: 12px;
    color: #888;
`;

export const CommentContent = styled.div`
    margin-left: 40px;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
`;

export const CommentForm = styled.form`
    display: flex;
    padding-top: 10px;
`;

export const CommentInput = styled.input`
    flex: 1;
    background-color: #1e1e1e;
    border: 1px solid #333;
    border-radius: 20px;
    padding: 10px 15px;
    color: white;
    outline: none;
    
    &::placeholder {
        color: #777;
    }
    
    &:focus {
        border-color: #666;
    }
`;

export const CommentSubmit = styled.button`
    background-color: #352EAE;
    color: white;
    border: none;
    border-radius: 20px;
    margin-left: 10px;
    padding: 0 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
        background-color: #2A258A;
    }
    
    &:disabled {
        background-color: #555;
        cursor: not-allowed;
        opacity: 0.7;
    }
`;


// 답글 버튼
export const ReplyButton = styled.button`
    background: none;
    border: none;
    color: #888;
    font-size: 12px;
    margin-left: 40px;
    margin-top: 5px;
    padding: 2px 8px;
    border-radius: 12px;
    cursor: pointer;
    
    &:hover {
        color: white;
        background-color: #333;
    }
`;

// 대댓글 아이템
export const ReplyItem = styled.div`
    padding: 10px 0;
    margin-left: 30px;
    padding-left: 10px;
    &:last-child {
        border-bottom: none;
    }
`;

// 대댓글 작성 폼
export const ReplyForm = styled.form`
    display: flex;
    margin-left: 30px;
    padding: 10px 0;
    padding-left: 10px;
`;

// 대댓글 입력 컨테이너
export const ReplyInputContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

// 대댓글 대상 정보
export const ReplyToInfo = styled.div`
    font-size: 12px;
    color: #888;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 대댓글 취소 버튼
export const CancelReplyButton = styled.button`
    background: none;
    border: none;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    
    &:hover {
        color: white;
    }
`;

// 대댓글 입력 필드
export const ReplyInput = styled.input`
    background-color: #1e1e1e;
    border: 1px solid #333;
    border-radius: 20px;
    padding: 8px 15px;
    color: white;
    outline: none;
    
    &::placeholder {
        color: #777;
    }
    
    &:focus {
        border-color: #666;
    }
`;