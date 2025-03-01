import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

// 공통 색상 변수
const colors = {
    primary: "#352EAE",
    primaryDark: "#2A258A",
    secondary: "#F1F3F5",
    secondaryDark: "#E9ECEF",
    danger: "#e25656",
    dangerDark: "#c43d3d",
    success: "#4caf50",
    successDark: "#3d8b40",
    edit: "#4a90e2",
    editDark: "#357ab8",
    text: "#38383D",
    lightText: "#666",
    border: "#DEDFE7",
    disabled: "#A0A5B1"
};

// 기본 레이아웃
export const Container = styled.div`
    width: 1024px;
    margin: 60px auto;
    min-height: 100vh;
`;

export const List = styled.div`
    width: 842px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    border-top: 1px solid ${colors.border};
    padding: 20px 0;
`;

export const TotalPosts = styled.p`
    margin: 5px 95px;
`;

// 카드 및 리스트 관련
export const ActivityCard = styled.div`
    width: 33.33%;
    height: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const ActivityImage = styled(RouterNavLink)`
    width: 100%;
    height: 280px;
    border: 1px solid red;
    display: flex;
    background-size: cover;
    background-position: center;
`;

export const Title = styled(RouterNavLink)`
    text-decoration: none;
    color: ${colors.text};
    font-size: 14px;
    font-weight: 600;
    margin: 6px 0;
`;

export const Date = styled.p`
    font-size: 12px;
    color: ${colors.text};
`;

// 버튼 스타일
const BaseButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
    
    &:disabled {
        cursor: not-allowed;
    }
`;

export const FloatingButton = styled(BaseButton)`
    position: fixed;
    bottom: 30px;
    right: 22%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${colors.primary};
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    justify-content: center;
    z-index: 1;
    white-space: nowrap;

    &:hover {
        background-color: ${colors.primaryDark};
        transform: translateY(-2px);
    }
`;

export const CancelButton = styled(BaseButton)`
    background-color: ${colors.secondary};
    color: #343A40;
    
    &:hover {
        background-color: ${colors.secondaryDark};
    }
    
    &:disabled {
        background-color: #f9f9f9;
        color: #999;
    }
`;

export const SubmitButton = styled(BaseButton)`
    background-color: ${colors.primary};
    color: white;
    
    &:hover {
        background-color: ${colors.primaryDark};
    }
    
    &:disabled {
        background-color: ${colors.disabled};
    }
`;

export const EditButton = styled(BaseButton)`
    gap: 5px;
    padding: 8px 12px;
    background-color: ${colors.edit};
    color: white;
    
    &:hover {
        background-color: ${colors.editDark};
    }
    
    &:disabled {
        background-color: #a0c4e8;
    }
`;

export const DeleteButton = styled(BaseButton)`
    gap: 5px;
    padding: 8px 12px;
    background-color: ${colors.danger};
    color: white;
    
    &:hover {
        background-color: ${colors.dangerDark};
    }
    
    &:disabled {
        background-color: #e89a9a;
    }
`;

export const SaveButton = styled(BaseButton)`
    background-color: ${colors.success};
    color: white;
    
    &:hover {
        background-color: ${colors.successDark};
    }
    
    &:disabled {
        background-color: #9ed29f;
    }
`;

export const BackButton = styled(BaseButton)`
    padding: 8px 16px;
    background-color: #f1f1f1;
    font-weight: 500;
    
    &:hover {
        background-color: #e5e5e5;
    }
`;

export const WriteButton = styled(SubmitButton)``;
export const ImageUploadButton = styled(SubmitButton)``;

// 상태 표시 관련
export const LoadingIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 50px 0;
    font-size: 16px;
    color: #888;
    width: 100%;
`;

// 에디터 관련 스타일
export const EditorWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    
    .quill {
        height: 400px;
        display: flex;
        flex-direction: column;
    }
    
    .ql-container {
        flex-grow: 1;
        overflow: auto;
        min-height: 300px;
        max-height: 600px;
    }
    
    .ql-editor {
        min-height: 300px;
    }
`;

export const EditorContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 30px;
`;

export const QuillWrapper = styled.div`
    .quill {
        height: 400px;
        display: flex;
        flex-direction: column;
    }
    .ql-container {
        flex-grow: 1;
        overflow: auto;
    }
    .ql-editor {
        min-height: 300px;
    }
`;

export const TitleInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid ${colors.border};
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }
`;

// 섹션 및 레이아웃 요소
export const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

export const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
`;

export const EditForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const EditActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

// 썸네일 관련
export const ThumbnailPreview = styled.div`
    margin-top: 20px;
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0,0,0,0.6);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0,0,0,0.8);
    }
`;

export const ThumbnailSection = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const SectionTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
`;

// 상세 페이지 관련
export const DetailContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const DetailTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
    line-height: 1.4;
`;

export const DetailDate = styled.p`
    font-size: 14px;
    color: ${colors.lightText};
    margin-bottom: 20px;
`;

export const DetailImage = styled.img`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    margin-bottom: 24px;
    border-radius: 8px;
`;

export const DetailContent = styled.div`
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 32px;
    
    img {
        max-width: 100%;
        border-radius: 4px;
        margin: 16px 0;
    }
    
    p {
        margin-bottom: 16px;
    }
`;

export const CommentCount = styled.p`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${colors.lightText};
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #eee;
`;

export const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    font-size: 18px;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: #333;
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 10;
`;

export const DropdownItem = styled.div`
    width: 100px;
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;
    text-align: center;
    
    &:hover {
        background-color: #f5f5f5;
    }
`;


// 댓글 관련
export const CommentSection = styled.div`
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
`;

export const CommentTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
`;

export const CommentList = styled.div`
    margin-bottom: 30px;
`;

export const CommentItem = styled.div`
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
`;

export const ReplyItem = styled.div`
    background-color: #f0f2f5;
    border-radius: 8px;
    padding: 15px;
    margin-left: 30px;
    margin-bottom: 10px;
`;

export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    position: relative;
`;

export const CommentProfileImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
`;

export const CommentWriter = styled.span`
    font-weight: 600;
    font-size: 14px;
    margin-right: 10px;
`;

export const CommentTimeAgo = styled.span`
    font-size: 12px;
    color: #777;
`;

export const CommentContent = styled.p`
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    white-space: pre-wrap;
`;

export const ReplyButton = styled.button`
    background: none;
    border: none;
    font-size: 12px;
    color: #555;
    cursor: pointer;
    padding: 0;
    margin-top: 5px;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const CommentForm = styled.form`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

export const CommentInput = styled.textarea`
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    resize: none;
    min-height: 80px;
    font-family: inherit;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary || '#352EAE'};
    }
`;

export const CommentSubmit = styled.button`
    align-self: flex-end;
    padding: 10px 15px;
    background-color: ${props => props.theme.primary || '#352EAE'};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    height: 40px;
    
    &:hover {
        background-color: ${props => props.theme.primaryDark || '#2A258A'};
    }
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const NoComments = styled.div`
    text-align: center;
    padding: 30px;
    color: #777;
    font-size: 14px;
`;

export const CommentMenuWrapper = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    
    &:hover {
        color: #000;
    }
`;

export const CommentMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 10;
`;

export const CommentMenuItem = styled.div`
    width: 100px;
padding: 8px 12px;
    cursor: pointer;
    font-size: 13px;
    text-align: center;

    
    &:hover {
        background-color: #f5f5f5;
    }
`;

export const EditCommentForm = styled.form`
    margin: 10px 0;
`;

export const EditCommentInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: none;
    min-height: 60px;
    font-family: inherit;
    margin-bottom: 10px;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary || '#352EAE'};
    }
`;

export const EditCommentButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const CancelEditButton = styled.button`
    padding: 6px 12px;
    background-color: #f1f3f5;
    color: #343a40;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #e9ecef;
    }
`;

export const SaveEditButton = styled.button`
    padding: 6px 12px;
    background-color: ${props => props.theme.primary || '#352EAE'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme.primaryDark || '#2A258A'};
    }
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const ReplyForm = styled.form`
    display: flex;
    gap: 10px;
    margin: 10px 0 15px 30px;
`;

export const ReplyInputContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const ReplyToInfo = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
`;

export const CancelReplyButton = styled.button`
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const ReplyInput = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: none;
    min-height: 60px;
    font-family: inherit;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary || '#352EAE'};
    }
`;

export const ContentButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 15px 0;
    padding-top: 10px;
    border-top: 1px solid #eee;
`;