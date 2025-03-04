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
    const [allImages, setAllImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const quillRef = useRef();

    // 기존 게시물 데이터 불러오기
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await communityAPI.getCommunityDetail(crewId, feedId);
                const postData = response.data.data;
    
                // 내용 설정
                setContent(postData.content || '');
    
                // 기존 사진 처리 및 유효성 검사
                if (postData.photos && postData.photos.length > 0) {
                    // 유효한 URL을 가진 사진만 필터링
                    const validPhotos = postData.photos.filter(photo => 
                        photo.url && 
                        typeof photo.url === 'string' && 
                        photo.url.trim() !== ''
                    );
                    
                    // 사진 포맷 변환
                    const formattedPhotos = validPhotos.map(photo => ({
                        url: photo.url,
                        photoId: photo.id || photo.photoId, // 백엔드 응답 구조에 따라 조정
                        isExisting: true
                    }));
                    
                    setAllImages(formattedPhotos);
                }
            } catch (error) {
                console.error('게시물 상세 정보 가져오기 실패:', error);
                alert('게시물 정보를 불러오는 데 실패했습니다.');
                navigate(-1);
            }
        };
    
        fetchPostDetail();
    }, [crewId, feedId, navigate]);

    // 이미지 업로드 처리기
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'multiple');
        input.click();
    
        input.onchange = async (e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
                // 최대 이미지 수 확인
                if (allImages.length + files.length > 5) {
                    alert('최대 5개의 이미지만 업로드 가능합니다.');
                    return;
                }

                const newImages = [];
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    
                    // 파일 크기 확인 (5MB 제한)
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
                                    url: reader.result,
                                    isExisting: false
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
                
                // 새 이미지를 기존 이미지 배열에 추가
                setAllImages(prev => [...prev, ...newImages]);
            }
        };
    };

    // 이미지 제거 처리기
    const handleRemoveImage = (index) => {
        setAllImages(prev => prev.filter((_, i) => i !== index));
    };

    // 내용 변경 처리기
    const handleChange = (value) => {
        setContent(value);
    };

    // 제출 처리기
    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // HTML 내용 가져오기
        const htmlContent = quillRef.current.getEditor().root.innerHTML;
        
        if (!htmlContent.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // 최소 1개 이상의 이미지 확인
        if (allImages.length === 0) {
            alert('최소 1개 이상의 이미지를 첨부해주세요.');
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // FeedReqDto에 맞는 데이터 구조 생성
            const feedData = {
                content: htmlContent.trim(),
                tagNames: []
            };
            
            // JSON으로 직렬화하여 feedReqDto 필드에 추가
            formData.append('feedReqDto', new Blob([JSON.stringify(feedData)], {
                type: 'application/json'
            }));

            // 이미지 처리 (기존 이미지와 새 이미지 모두)
            const imagePromises = [];
            
            // 새 이미지 처리 (이미 File 객체)
            allImages.filter(img => !img.isExisting).forEach(image => {
                if (image.file) {
                    formData.append('photos', image.file);
                }
            });
            
            // 기존 URL 이미지를 File 객체로 변환하여 처리
            for (const image of allImages.filter(img => img.isExisting)) {
                const promise = fetch(image.url)
                    .then(response => response.blob())
                    .then(blob => {
                        // 파일명 생성
                        const fileName = `existing-${image.photoId || Date.now()}.jpg`;
                        const file = new File([blob], fileName, { type: 'image/jpeg' });
                        formData.append('photos', file);
                        return true;
                    })
                    .catch(error => {
                        console.error('이미지 URL 변환 실패:', error);
                        return false;
                    });
                
                imagePromises.push(promise);
            }
            
            // 모든 이미지 변환 작업 완료 대기
            await Promise.all(imagePromises);

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
                    {allImages.length > 0 && (
                        <S.ImagePreviewContainer>
                            <S.ImageGrid>
                                {allImages.map((image, index) => (
                                    <S.ImagePreview key={index}>
                                        <img
                                            src={image.url}
                                            alt={`이미지 ${index + 1}`}
                                            onError={(e) => {
                                                console.warn(`이미지 로드 실패: ${image.url}`);
                                                e.target.src = 'https://via.placeholder.com/150?text=이미지+로드+실패';
                                            }}
                                        />
                                        <S.RemoveButton onClick={() => handleRemoveImage(index)}>
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