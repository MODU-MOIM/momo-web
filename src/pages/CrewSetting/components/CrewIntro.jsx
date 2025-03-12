import ImageResize from 'quill-image-resize';
import React, { useMemo, useState } from "react";
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineClose } from "react-icons/ai";
import * as S from "../Styles/CrewSetting.styles";
import { crewAPI } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';


const CrewIntro = ({ crewData, onClose }) => {
    const { crewId } = useParams();
    const navigate = useNavigate();
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

    const handleSubmit = async() => {
        try {
            const submitData = {
                description: content,
                category: crewData.category,
                regions: crewData.regions,
            }
            const response = await crewAPI.updateCrewIntro(crewId, submitData);
            if (response.data.status === 200) {
                // 성공하면 crewHome으로 이동 후 새로고침
                navigate(`/crews/${crewId}/crewHome`);
                window.location.reload();
            }
        } catch (error) {
            console.error("수정 실패", error);
        }
    }
    return (
        <S.Panel onClick={handlePanelClick}>
            <S.BannerContainer
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '950px',
                    height: '65%',
                    left: '25%',
                }}
            >
                <S.DeleteContainer>
                    <S.SettingTitle>
                        크루 소개 설정
                    </S.SettingTitle>
                    <S.CloseButton onClick={onClose}>
                        <AiOutlineClose size={24}/>
                    </S.CloseButton>
                </S.DeleteContainer>
                <S.EditContainer>
                    <S.QuillStyled
                        value={content}
                        modules={modules}
                        placeholder='크루 설명을 입력해 주세요 (20자 이상)'
                        onChange={(e) => setContent(e)}
                    />
                </S.EditContainer>
                <S.ButtonContainer
                    style={{
                        margin: "60px",
                    }}
                >
                    <S.CompletionButton onClick={() => handleSubmit()}>
                        수정완료
                    </S.CompletionButton>
                    <S.CancelButton onClick={onClose}>
                        취소
                    </S.CancelButton>
                </S.ButtonContainer>
            </S.BannerContainer>
        </S.Panel>
    );
};

export default CrewIntro;