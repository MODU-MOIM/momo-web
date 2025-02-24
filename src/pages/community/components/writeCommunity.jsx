import { useMemo, useRef, useState } from 'react';
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
    const quillRef = useRef();

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('이미지 크기는 5MB 이하여야 합니다.');
                    return;
                }
    
                try {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const editor = quillRef.current?.getEditor();
                        if (editor) {
                            // 현재 커서 위치 가져오기
                            let range = editor.getSelection();
                            // 커서가 없는 경우 문서 끝에 추가
                            if (!range) {
                                range = { index: editor.getLength(), length: 0 };
                            }
                            // 이미지 삽입
                            editor.insertEmbed(range.index, 'image', reader.result);
                            // 커서를 이미지 다음으로 이동
                            editor.setSelection(range.index + 1, 0);
                        }
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('이미지 업로드 실패:', error);
                    alert('이미지 업로드에 실패했습니다.');
                }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), []);  // modules를 메모이제이션

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'image'
    ];

    const handleChange = (value) => {
        setContent(value);
    };


    const handleSubmit = async () => {
        if (!content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }
    
        // 이미지 URL 추출
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const images = tempDiv.getElementsByTagName('img');
        
        if (images.length === 0) {
            alert('최소 1개 이상의 이미지를 첨부해주세요.');
            return;
        }
    
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // content에서 이미지 태그 제거하고 순수 텍스트만 추출
            const contentWithoutImages = content.replace(/<img[^>]*>/g, '');
            
            // 피드 데이터 추가
            const feedData = {
                content: contentWithoutImages.trim(),
                tagNames: []
            };
            
            formData.append('feedReqDto', new Blob([JSON.stringify(feedData)], {
                type: 'application/json'
            }));
    
            // 이미지 처리
            for (let i = 0; i < images.length; i++) {
                const imageUrl = images[i].src;
                // base64 데이터를 Blob으로 변환
                const base64Data = imageUrl.split(',')[1];
                const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
                formData.append('photos', blob, `image${i}.jpg`);
            }
    
            await communityAPI.createCommunity(crewId, formData);
            navigate(`/crews/${crewId}/crewCommunity`);
        } catch (error) {
            console.error('피드 작성 실패:', error);
            alert('피드 작성에 실패했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        placeholder="내용을 입력해주세요 (이미지는 필수입니다)"
                        theme="snow"
                        preserveWhitespace
                    />
                </S.QuillWrapper>
                <S.SubmitButton 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '작성중...' : '작성하기'}
                </S.SubmitButton>
            </S.EditorContainer>
        </S.EditorWrapper>
    );
};

export default WriteCommunity;