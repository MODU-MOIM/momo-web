import ImageResize from 'quill-image-resize';
import React, { useMemo, useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
import { crewAPI } from '../../../api';
 
Quill.register('modules/ImageResize', ImageResize);

export default function CrewIntroEditor({setInfoContent}) {
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

    const srcArray =[];
    const urlArray =[];
    const gainSource = useMemo(() => /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g, []);
    
    const onChagecontent = (e) => {
        // console.log(e);
        setContent(e);
    }
    // base64파일 Blop으로 바꾸기
    const convertBase64ToFile = (base64String) => {
        const byteString = atob(base64String.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], { type: "image/jpeg" });
        return new File([blob], "image.jpg");
    };

    async function Save(){
        try{
            let match;
            while ((match = gainSource.exec(content)) !== null) {
                let result = match[2];
                srcArray.push(result);
                // console.log('srcArray 추가: ',srcArray);

                const file = convertBase64ToFile(result);
                const formData = new FormData();
                formData.append("crewImage", file);

                console.log('formData:');
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                
                const config = {
                    headers : {
                        'content-type': 'multipart/form-data',
                        'Authorization': localStorage.getItem('token')
                    }
                }
                await crewAPI.uploadImage(formData, config)
                .then(response => {
                    if(response.data.status == 200){
                        console.log("이미지 서버에 업로드 성공", response);
                        urlArray.push(response.data.data.crewImageUrl);
                        console.log("urlArray 추가", urlArray);
                    } else{
                        console.log("이미지 서버에 업로드 실패: ", response);
                        console.log("formData.keys : ", formData.keys());
                        console.log("formData.values : ", formData.values());
                    }
                })
                
            }
            let updateContent = content;
            if(srcArray.length > 0) {            
                for(let i = 0; i<srcArray.length; i++) {
                    // console.log('srcArray[i]: ',srcArray[i],'urlArray[i]: ',urlArray[i]);
                    let replace = updateContent.replace(srcArray[i],urlArray[i]);
                    updateContent = replace;
                    console.log('테스트',updateContent);
                } 
            }
            // console.log('updateContent:', updateContent);
            // console.log('최종 srcArray: ',srcArray);
            // console.log('최종 urlArray', urlArray);
            setInfoContent(updateContent);
            alert("저장되었습니다.");

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

    }
    return(
        <Wrapper>
            <EditContainer>
                <QuillStyled                     
                        modules={modules} 
                        placeholder='크루 설명을 입력해 주세요 (20자 이상)'
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