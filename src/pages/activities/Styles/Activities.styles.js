import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    width: 1024px;
    margin: 60px auto;
    min-height: 100vh;

`;

export const List = styled.div`
    width:842px;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    border-top:1px solid #DEDFE7;
    padding:20px 0;
`;

export const TotalPosts = styled.p`
    margin:5px 95px;
`

export const ActivityCard = styled.div`
    width: 33.33%;
    height: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;
`;

export const ActivityImage = styled(RouterNavLink)`
    width:100%;
    height:280px;
    border:1px solid red;
    display: flex;

`
export const Title = styled(RouterNavLink)`
    text-decoration: none;
    color:#38383D;
    font-size: 14px;
    font-weight: 600;
    margin: 6px 0;
`;

export const Date = styled.p`
    font-size: 12px;
    color:#38383D;
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

export const LoadingIndicator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;


// WriteActivity.jsx
export const EditorWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const EditorContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 30px;
`;

export const TitleInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    border: 1px solid #DEDFE7;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #352EAE;
    }
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

export const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

export const CancelButton = styled.button`
    padding: 10px 20px;
    background-color: #F1F3F5;
    color: #343A40;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #E9ECEF;
    }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #352EAE;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2A258A;
    }

    &:disabled {
        background-color: #A0A5B1;
        cursor: not-allowed;
    }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 50px 0;
    font-size: 16px;
    color: #888;
    width: 100%;
`;

// 상세 페이지 관련 스타일
export const DetailContainer = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const BackButton = styled.button`
    padding: 8px 16px;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #e5e5e5;
    }
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
    color: #666;
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
    color: #666;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #eee;
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

export const ImageUploadButton = styled.button`
    padding: 10px 20px;
    background-color: #352EAE;
    color: white;
    border: none;
    border-radius: 6px;
`;

export const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #352EAE;
    color: white;
    border: none;
    border-radius: 6px;
`;
