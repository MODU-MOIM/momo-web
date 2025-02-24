import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { crewAPI } from "../../../api";


export default function BannerImageInput({bannerImage, setBannerImage, handleImageUpload}){
    const fileInputRef = useRef(null);
    
    useEffect(()=>{
        if(bannerImage){
            setBannerImage(bannerImage||'');
        }
    },[bannerImage])

    const handleImageClick = ()=>{
        fileInputRef.current?.click();
    }
    const handleBannerImageChange = (e) => {
        console.log("handleImageChange 실행")
        const file = e.target.files[0];
        handleImageUpload(file);
        console.log("handleImageUpload 실행")
    };
    
    return(
        <Wrapper>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleBannerImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <BannerImage
                    onClick={handleImageClick}
                    style={{ backgroundImage: `url(${bannerImage})`}}
                >
                </BannerImage>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 80%;
    height: 100px;
    border: 1px solid red;
    margin-bottom: 50px;
`;
const BannerImage = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    background-size: cover;
    background-position: center;
    position: relative;

    &:hover::after {
        content: '이미지 변경';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 30px;
        border-radius: 4px;
        font-size: 12px;
    }
`;