import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveAPI } from '../../../api';
import { useImageHandling } from '../../shared/useImageHandling';
import * as S from '../Styles/Activities.styles';

const WriteActivity = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const quillRef = useRef(null);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { thumbnailImageUrl, handleImageUpload } = useImageHandling(crewId);

    // 게시글 작성 함수
    const handleSubmit = async () => {
        // 제목 입력 확인
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        const plainText = quillRef.current?.getEditor().getText().trim();
        if (!plainText) {
            alert('내용을 입력해주세요.');
            return;
        }

        try {
            setIsSubmitting(true);

            const archiveData = {
                title: title.trim(),
                content: quillRef.current?.getEditor().root.innerHTML,
                thumbnailImageUrl: thumbnailImageUrl || null
            };

            await archiveAPI.createArchive(crewId, archiveData);
            
            alert('게시글이 성공적으로 작성되었습니다.');
            navigate(`/crews/${crewId}/crewActivity`);
        } catch (error) {
            console.error('게시글 작성 실패:', error);
            alert('게시글 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Quill 에디터 모듈 설정
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['image'],
                    ['clean']
                ],
                handlers: {
                    image: () => handleImageUpload(quillRef.current?.getEditor())
                }
            },
            clipboard: {
                matchVisual: false
            },
            history: {
                delay: 1000,
                maxStack: 50,
                userOnly: true
            }
        };
    }, [handleImageUpload]);

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'image'
    ];

    return (
        <S.EditorWrapper>
            <S.EditorContainer>
                {/* 제목 입력 */}
                <S.TitleInput
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Quill 에디터 */}
                <S.QuillWrapper>
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={(value) => setContent(value)}
                        modules={modules}
                        formats={formats}
                        placeholder="내용을 입력해주세요"
                        theme="snow"
                    />
                </S.QuillWrapper>

                {/* 버튼 섹션 */}
                <S.ButtonSection style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                    <S.CancelButton onClick={() => navigate(-1)}>
                        취소
                    </S.CancelButton>
                    <S.SubmitButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '작성 중...' : '작성하기'}
                    </S.SubmitButton>
                </S.ButtonSection>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default WriteActivity;