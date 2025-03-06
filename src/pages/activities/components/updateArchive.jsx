import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { archiveAPI } from '../../../api';
import { useAuth } from '../../../AuthProvider';
import { useImageHandling } from '../../shared/useImageHandling';
import * as S from '../Styles/Activities.styles';

const UpdateArchive = () => {
    const { crewId, archiveId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const location = useLocation();
    const { archiveData } = location.state || {};
    
    const quillRef = useRef(null);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [originalThumbnail, setOriginalThumbnail] = useState('');
    
    // 이미지 요구사항 여부 상태 (백엔드가 이미지를 필수로 요구하는지)
    const [requiresImage, setRequiresImage] = useState(true);
    
    // useImageHandling 훅 사용, 초기 썸네일 설정
    const { 
        thumbnailImageUrl, 
        setThumbnailImageUrl,
        handleImageUpload,
        uploadedImages
    } = useImageHandling(
        crewId, 
        archiveData?.thumbnailImage || archiveData?.thumbnailImageUrl || ''
    );

    // 아카이브 데이터 로드
    useEffect(() => {
        const fetchArchiveData = async () => {
            // location state에 데이터가 있으면 사용
            if (archiveData) {
                setTitle(archiveData.title || '');
                setContent(archiveData.content || '');
                const thumbnail = archiveData.thumbnailImage || archiveData.thumbnailImageUrl || '';
                setThumbnailImageUrl(thumbnail);
                setOriginalThumbnail(thumbnail);
                setLoading(false);
                return;
            }
            
            // 없으면 API 호출로 데이터 가져오기
            try {
                const response = await archiveAPI.getArchiveDetail(crewId, archiveId);
                const data = response.data.data || response.data;
                
                if (!data) {
                    throw new Error('데이터가 없습니다.');
                }
                
                setTitle(data.title || '');
                setContent(data.content || '');
                const thumbnail = data.thumbnailImage || data.thumbnailImageUrl || '';
                setThumbnailImageUrl(thumbnail);
                setOriginalThumbnail(thumbnail);
                
                // 작성자 확인
                if (data.writer && userInfo?.nickname !== data.writer) {
                    throw new Error('수정 권한이 없습니다.');
                }
            } catch (error) {
                console.error("아카이브 데이터 로드 실패:", error);
                setError(error.message || "활동 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchArchiveData();
    }, [crewId, archiveId, archiveData, userInfo, setThumbnailImageUrl]);

    // 현재 에디터 내용에서 이미지 URL 추출 함수
    const extractImagesFromContent = () => {
        if (!quillRef.current) return [];
        
        const contentDom = document.createElement('div');
        contentDom.innerHTML = quillRef.current.getEditor().root.innerHTML;
        
        const images = contentDom.querySelectorAll('img');
        return Array.from(images).map(img => img.src);
    };

    // 게시글 수정 함수
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

        // 에디터 내용에서 이미지 추출
        const contentImages = extractImagesFromContent();
        const hasImages = contentImages.length > 0;
        
        try {
            setIsSubmitting(true);

            // 썸네일 URL 결정 (에디터 내 첫 번째 이미지 또는 원본 또는
            let finalThumbnailUrl = thumbnailImageUrl || originalThumbnail;
            
            if (!finalThumbnailUrl && hasImages) {
                finalThumbnailUrl = contentImages[0];
            }

            const updateData = {
                title: title.trim(),
                content: quillRef.current?.getEditor().root.innerHTML,
                thumbnailImageUrl: finalThumbnailUrl || null
            };

            await archiveAPI.updateArchive(crewId, archiveId, updateData);
            
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/crews/${crewId}/archives/${archiveId}`);
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            alert('게시글 수정에 실패했습니다.');
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
            }
        };
    }, [handleImageUpload]);

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'image'
    ];

    // 로딩 상태
    if (loading) return <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>;
    
    // 에러 상태
    if (error) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>{error}</p>
            <button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</button>
        </div>
    );

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

                {/* 현재 썸네일 표시 (선택적) */}
                {originalThumbnail && (
                    <div style={{ margin: '10px 0' }}>
                        <p>현재 썸네일 이미지:</p>
                        <img 
                            src={originalThumbnail} 
                            alt="현재 썸네일" 
                            style={{ maxWidth: '200px', maxHeight: '150px', display: 'block', marginBottom: '10px' }} 
                        />
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                            * 에디터에서 이미지를 추가하거나 수정할 수 있습니다.
                        </div>
                    </div>
                )}

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
                        {isSubmitting ? '수정 중...' : '수정하기'}
                    </S.SubmitButton>
                </S.ButtonSection>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default UpdateArchive;