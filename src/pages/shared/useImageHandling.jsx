import { useCallback, useEffect, useState } from 'react';
import { archiveAPI } from '../../api';

export function useImageHandling(crewId, initialThumbnail = '') {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState(initialThumbnail);
    
    useEffect(() => {
        if (uploadedImages.length > 0 && !thumbnailImageUrl) {
        setThumbnailImageUrl(uploadedImages[0]);
        }
    }, [uploadedImages, thumbnailImageUrl]);
    
    const uploadImage = useCallback(async (file) => {
        if (!file) return null;
        
        if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB를 초과할 수 없습니다.');
        return null;
        }
        
        try {
        const response = await archiveAPI.uploadArchiveImage(crewId, file);
        const imageUrl = response.data.data?.archiveImageUrl || response.data.archiveImageUrl;
        
        setUploadedImages(prev => [...prev, imageUrl]);
        
        return imageUrl;
        } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        return null;
        }
    }, [crewId]);
    
    const insertImageToEditor = useCallback((quillEditor, imageUrl) => {
        if (!quillEditor || !imageUrl) return;
        
        quillEditor.focus();
        
        setTimeout(() => {
        const range = quillEditor.getSelection() || { index: quillEditor.getLength() - 1, length: 0 };
        quillEditor.insertEmbed(range.index, 'image', imageUrl);
        quillEditor.setSelection(range.index + 1, 0);
        }, 10);
    }, []);
    
    const handleImageUpload = useCallback((quillEditor) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const imageUrl = await uploadImage(file);
        if (imageUrl && quillEditor) {
            insertImageToEditor(quillEditor, imageUrl);
        }
        };
    }, [uploadImage, insertImageToEditor]);
    
    const resetImageState = useCallback((newThumbnail = '') => {
        setUploadedImages([]);
        setThumbnailImageUrl(newThumbnail);
    }, []);
    
    return {
        uploadedImages,
        thumbnailImageUrl,
        setThumbnailImageUrl,
        uploadImage,
        insertImageToEditor,
        handleImageUpload,
        resetImageState
    };
}