import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { communityAPI } from '../../../api';
import * as S from '../Styles/Community.styles';

const UpdateCommunity = () => {
    const navigate = useNavigate();
    const { crewId, feedId } = useParams();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialPhotos, setInitialPhotos] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [deletedPhotoIds, setDeletedPhotoIds] = useState([]);
    const quillRef = useRef();

    // 기존 게시물 데이터 불러오기
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await communityAPI.getCommunityDetail(crewId, feedId);
                const postData = response.data.data;
                
                // HTML 형식의 내용 그대로 설정
                setContent(postData.content || '');
                
                // 기존 이미지들 저장
                if (postData.photos && postData.photos.length > 0) {
                    setInitialPhotos(postData.photos);
                }
            } catch (error) {
                console.error('게시물 상세 정보 가져오기 실패:', error);
                alert('게시물 정보를 불러오는 데 실패했습니다.');
                navigate(-1);
            }
        };
    
        fetchPostDetail();
    }, [crewId, feedId, navigate]);

    // 이미지 업로드 핸들러
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'multiple'); // 여러 이미지 선택 가능
        input.click();
    
        input.onchange = async (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                // 최대 5개까지만 업로드 허용
                if (initialPhotos.length + uploadedImages.length + files.length > 5) {
                    alert('최대 5개의 이미지만 업로드 가능합니다.');
                    return;
                }

                const newImages = [];
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    
                    if (file.size > 5 * 1024 * 1024) {
                        alert(`이미지 ${file.name}의 크기가 5MB를 초과합니다.`);
                        continue;
                    }

                    try {
                        const reader = new FileReader();
                        
                        // 비동기 작업을 Promise로 변환
                        await new Promise((resolve, reject) => {
                            reader.onload = () => {
                                newImages.push({
                                    file: file,
                                    preview: reader.result
                                });
                                resolve();
                            };
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        });
                    } catch (error) {
                        console.error('이미지 처리 실패:', error);
                    }
                }
                
                setUploadedImages(prev => [...prev, ...newImages]);
            }
        };
    };

    // 기존 이미지 삭제 핸들러
    const handleRemoveInitialImage = (index) => {
        const removedPhoto = initialPhotos[index];
        
        // 삭제된 이미지의 photoId 추가 (백엔드에 전달할 ID)
        if (removedPhoto.photoId) {
            setDeletedPhotoIds(prev => [...prev, removedPhoto.photoId]);
        }
        
        // initialPhotos에서 해당 이미지 제거
        setInitialPhotos(prev => prev.filter((_, i) => i !== index));
    };

    // 새로 추가한 이미지 삭제 핸들러
    const handleRemoveUploadedImage = (index) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // HTML 형식의 컨텐츠 그대로 사용
        const htmlContent = quillRef.current.getEditor().root.innerHTML;
        
        if (!htmlContent.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // 이미지가 있는지 확인 (기존 이미지 + 새 이미지)
        if (initialPhotos.length === 0 && uploadedImages.length === 0) {
            alert('최소 1개 이상의 이미지를 첨부해주세요.');
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // 피드 데이터 추가
            const feedData = {
                content: htmlContent.trim(),
                tagNames: [],
                // 삭제된 이미지 ID 전달
                deletedPhotoIds: deletedPhotoIds
            };
            
            formData.append('feedReqDto', new Blob([JSON.stringify(feedData)], {
                type: 'application/json'
            }));

            // 이미지 처리
            let hasPhotos = false;
            
            // 남아있는 기존 이미지 재업로드
            for (let i = 0; i < initialPhotos.length; i++) {
                try {
                    const response = await fetch(initialPhotos[i].url);
                    const blob = await response.blob();
                    formData.append('photos', blob, `existing-${i}.jpg`);
                    hasPhotos = true;
                } catch (error) {
                    console.error('기존 이미지 처리 실패:', error);
                }
            }
            
            // 새 이미지 업로드
            for (let i = 0; i < uploadedImages.length; i++) {
                formData.append('photos', uploadedImages[i].file, `new-image-${i}.jpg`);
                hasPhotos = true;
            }
            
            // 최소 하나의 이미지 확인
            if (!hasPhotos) {
                alert('최소 1개 이상의 이미지를 첨부해주세요.');
                setIsSubmitting(false);
                return;
            }

            // 서버에 전송
            await communityAPI.updateCommunity(crewId, feedId, formData);
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/crews/${crewId}/crewCommunity`);
        } catch (error) {
            console.error('피드 수정 실패:', error);
            alert('피드 수정에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Quill 에디터 설정
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
            ]
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet'
    ];

    return (
        <S.EditorWrapper>
            <S.EditorContainer>
                <S.QuillWrapper>
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        placeholder="내용을 입력해주세요"
                        theme="snow"
                    />
                </S.QuillWrapper>
                
                {/* 이미지 업로드 섹션 */}
                <S.ImageSection>
                    <S.ImageSectionTitle>이미지</S.ImageSectionTitle>
                    <S.ImageUploadButton type="button" onClick={handleImageUpload}>
                        이미지 업로드 (최대 5개)
                    </S.ImageUploadButton>
                    
                    {/* 기존 이미지 미리보기 */}
                    {initialPhotos.length > 0 && (
                        <S.ImagePreviewContainer>
                            <S.SectionSubtitle>기존 이미지</S.SectionSubtitle>
                            <S.ImageGrid>
                                {initialPhotos.map((photo, index) => (
                                    <S.ImagePreview key={`initial-${index}`}>
                                        <img src={photo.url} alt={`기존 이미지 ${index + 1}`} />
                                        <S.RemoveButton onClick={() => handleRemoveInitialImage(index)}>
                                            <AiOutlineClose />
                                        </S.RemoveButton>
                                    </S.ImagePreview>
                                ))}
                            </S.ImageGrid>
                        </S.ImagePreviewContainer>
                    )}
                    
                    {/* 새로 업로드한 이미지 미리보기 */}
                    {uploadedImages.length > 0 && (
                        <S.ImagePreviewContainer>
                            {initialPhotos.length > 0 && <S.SectionSubtitle>새로 업로드한 이미지</S.SectionSubtitle>}
                            <S.ImageGrid>
                                {uploadedImages.map((image, index) => (
                                    <S.ImagePreview key={`new-${index}`}>
                                        <img src={image.preview} alt={`새 이미지 ${index + 1}`} />
                                        <S.RemoveButton onClick={() => handleRemoveUploadedImage(index)}>
                                            <AiOutlineClose />
                                        </S.RemoveButton>
                                    </S.ImagePreview>
                                ))}
                            </S.ImageGrid>
                        </S.ImagePreviewContainer>
                    )}
                </S.ImageSection>

                <S.WriteButton>
                    <S.CancelButton onClick={() => navigate(-1)}>
                        취소
                    </S.CancelButton>
                    <S.SubmitButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '수정중...' : '수정하기'}
                    </S.SubmitButton>
                </S.WriteButton>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default UpdateCommunity;