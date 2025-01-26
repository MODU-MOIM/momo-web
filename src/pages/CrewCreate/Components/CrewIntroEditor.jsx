import React, { useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import styled from "styled-components";
 
Quill.register('modules/ImageResize', ImageResize);

export default function CrewIntroEditor() {
    const modules = {
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike','blockquote'],   // toggled buttons
            ['link','image'],
            [{ 'align': [] },{ 'color': [] }], // dropdown with defaults from theme
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],    // outdent/indent
        ],
        ImageResize: {
            parchment: Quill.import('parchment')
        }
    }
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')   

    const onChagecontent = (e) => {
        console.log(e);
        setContent(e);
    }
    
    const Save = () =>{}
    return(
        <Wrapper>
            <EditContainer>
                <QuillStyled                     
                        modules={modules} 
                        placeholder='크루 설명을 입력해 주세요'
                        onChange={onChagecontent}
                />
            </EditContainer>
            <Button
                onClick={()=>{Save}}
            >저장</Button>
        </Wrapper>
        
    );
}

const Wrapper = styled.div`
`;
const EditContainer = styled.div`
    height: 450px;
    background-color: white;
`;
const QuillStyled = styled(ReactQuill)`
    height: 100%;
    /* border: none; */
    /* background-color: white; */
    .ql-container {
        height: calc(100% - 42px); // 툴바 높이(42px) 제외
    }
    .ql-editor {
        height: 100%;
        overflow-y: auto;
    }
`;
const Button = styled.button`
    width: 80px;
    height: 20px;
    float: right;
    margin: 10px 10px 0 0;
    background-color: black;
    color: white;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: gray;
    }
`;