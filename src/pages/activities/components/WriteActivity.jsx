import React, { useCallback, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveAPI } from '../../../api';
import * as S from '../Styles/Activities.styles';

const WriteActivity = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const quillRef = useRef(null);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 이미지 업로드 핸들러
    const handleImageUpload = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            if (file.size > 5 * 1024 * 1024) {
                alert('이미지 크기는 5MB를 초과할 수 없습니다.');
                return;
            }
    
            try {
                const response = await archiveAPI.uploadArchiveImage(crewId, file);
                const imageUrl = response.data.archiveImageUrl;
                
                // 첫 번째 이미지인 경우 자동으로 썸네일로 설정
                if (!thumbnailImageUrl) {
                    setThumbnailImageUrl(imageUrl);
                }
    
                // 에디터에 이미지 삽입
                if (quillRef.current) {
                    const quillEditor = quillRef.current.getEditor();
                    const range = quillEditor.getSelection(true);
                    quillEditor.insertEmbed(range.index, 'image', imageUrl);
                }
            } catch (error) {
                console.error('이미지 업로드 실패:', error);
                alert('이미지 업로드에 실패했습니다.');
            }
        };
    }, [crewId, thumbnailImageUrl]);

    // 제출 핸들러
    const handleSubmit = async () => {
        // 유효성 검사
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        const plainText = quillRef.current?.getEditor().getText().trim();
        if (!plainText) {
            alert('내용을 입력해주세요.');
            return;
        }

        if (!thumbnailImageUrl) {
            alert('최소 한 개 이상의 이미지를 추가해주세요. 첫 번째 이미지가 썸네일로 사용됩니다.');
            return;
        }

        try {
            setIsSubmitting(true);

            const archiveData = {
                title: title.trim(),
                content: quillRef.current?.getEditor().root.innerHTML,
                thumbnailImageUrl: thumbnailImageUrl
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
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['image'],
                ['clean']
            ],
            handlers: {
                image: handleImageUpload
            }
        }
    };

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