import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { communityAPI } from '../../../api';
import * as S from '../Styles/Community.styles';

const WriteCommunity = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const quillRef = useRef();

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
                if (uploadedImages.length + files.length > 5) {
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

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
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
        
        // 텍스트에서 HTML 태그 제거
        const plainText = quillRef.current.getEditor().getText();

        if (!plainText) {
            alert('내용을 입력해주세요.');
            return;
        }
        
        // 이미지가 있는지 확인
        if (uploadedImages.length === 0) {
            alert('최소 1개 이상의 이미지를 첨부해주세요.');
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // 피드 데이터 추가
            const feedData = {
                content: plainText.trim(),
                tagNames: []
            };
            
            formData.append('feedReqDto', new Blob([JSON.stringify(feedData)], {
                type: 'application/json'
            }));

            // 이미지 추가
            for (let i = 0; i < uploadedImages.length; i++) {
                formData.append('photos', uploadedImages[i].file, `image${i}.jpg`);
            }

            // 서버에 전송
            await communityAPI.createCommunity(crewId, formData);
            alert('게시글이 성공적으로 작성되었습니다.');
            navigate(`/crews/${crewId}/crewCommunity`);
        } catch (error) {
            console.error('피드 작성 실패:', error);
            alert('피드 작성에 실패했습니다.');
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
                    
                    {/* 업로드한 이미지 미리보기 */}
                    {uploadedImages.length > 0 && (
                        <S.ImagePreviewContainer>
                            <S.ImageGrid>
                                {uploadedImages.map((image, index) => (
                                    <S.ImagePreview key={index}>
                                        <img src={image.preview} alt={`이미지 ${index + 1}`} />
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
                        {isSubmitting ? '작성중...' : '작성하기'}
                    </S.SubmitButton>
                </S.WriteButton>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default WriteCommunity;