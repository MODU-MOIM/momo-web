import ImageResize from 'quill-image-resize';
import React, { useMemo, useState } from "react";
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";


const CrewIntro = ({ crewData, onClose }) => {
    const [content, setContent] = useState(crewData?.description);

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

    const handlePanelClick = (e) => {
        if(e.target === e.currentTarget){
            onClose();
        }
    }

    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer onClick={(e) => e.stopPropagation()}
                style={{
                    width: '950px',
                    left: '25%',
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 소개 설정
                    </S.SettingTitle>
                    <S.EditContainer>
                        <S.QuillStyled
                            value={content}      
                            modules={modules}
                            placeholder='크루 설명을 입력해 주세요 (20자 이상)'
                            onChange={(e) => setContent(e)}
                        />
                    </S.EditContainer>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default CrewIntro;