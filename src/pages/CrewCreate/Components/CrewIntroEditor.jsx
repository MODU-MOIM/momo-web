import axios from 'axios';
import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
import styled from "styled-components";
import { crewAPI } from '../../../api';
 
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
    const [content, setContent] = useState('')   

    const onChagecontent = (e) => {
        console.log(e);
        setContent(e);
    }
    const [srcArray, setSrcArray] = useState([]);
    const [urlArray, setUrlArray] = useState([]);
    const gainSource = useMemo(() => /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g, []);
    // base64파일 Blop으로 바꾸기
    const convertBase64ToFile = (base64String) => {
        const byteString = atob(base64String.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], { type: "image/png" });
        return new File([blob], "testimg.png");
    };

    async function Save(){
        try{
            let match;
            while ((match = gainSource.exec(content)) !== null) {
                const file = convertBase64ToFile(match[2]);
                const formData = new FormData();
                formData.append("crewImage", file);

                console.log('formData: ',formData)
                // const config = {
                //     headers : {
                //         'content-type': 'multipart/form-data',
                //         'Authorization': localStorage.getItem('token')
                //     }
                
                    for (let pair of formData.entries()) {
                        console.log(pair[0], pair[1]);
                    }
                    // console.log('Request URL:', '/crews/images');
                    // console.log('Headers:', config.headers);
                    
                    const response = await crewAPI.uploadImage(formData);
                    if(response.status === 200 && response.data.data.crewImageUrl){
                        setSrcArray(prev => [...prev, response.data.data.crewImageUrl]);
                        console.log("scrArray : ", srcArray)
                        console.log("이미지 서버에 업로드 성공", response);
                    }else{
                        console.log("fail:", response);
                        alert("이미지 업로드 실패");
                    }
                    // let updatedContent = content;
                    // updatedContent = updatedContent.replace(match[2], response.data.data.crewImageUrl);
                    // setContent(updatedContent);
                }
                const postData = {
                    content: content
                    // 필요한 다른 데이터도 추가
                };
                console.log("postData: ",postData)
                console.log("Test:", srcArray)
            
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            });
            console.error('처리 중 오류:', error);
            throw error;
        }

        if(srcArray.length > 0) {   
            console.log('실행은 됐음..')             
            for(let i = 0; i<srcArray.length; i++) {
                console.log('실행중.. '+i+' 번째임')
                console.log('srcArray[i]: ',srcArray[i],'urlArray[i]: ',urlArray[i])
                let replace = content.replace(srcArray[i],urlArray[i])
                setContent(replace);
                console.log('바뀌었는지 테스트',content)
            } 
        } // 없다면 content=content




    }
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
                onClick={()=>{Save()}}
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