import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { archiveAPI } from '../../api';

const LikeButton = ({ crewId, archiveId, initialLiked = false, initialCount = 0 }) => {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialCount);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLikeClick = async () => {
        if (isProcessing) return; // 처리 중일 때는 클릭 무시
        
        setIsProcessing(true);
        try {
            if (isLiked) {
                // 좋아요 취소
                await archiveAPI.unlikeArchive(crewId, archiveId);
                setLikeCount(prev => Math.max(0, prev - 1));
                setIsLiked(false);
            } else {
                // 좋아요 추가
                await archiveAPI.likeArchive(crewId, archiveId);
                setLikeCount(prev => prev + 1);
                setIsLiked(true);
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류 발생:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <LikeButtonContainer onClick={handleLikeClick}>
            {isLiked ? (
                <FaHeart color="#e74c3c" size={16} />
            ) : (
                <FaRegHeart size={16} />
            )}
            <LikeCount>좋아요 {likeCount}개</LikeCount>
        </LikeButtonContainer>
    );
};

const LikeButtonContainer = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 4px;
    
    &:hover {
        background-color: #f0f0f0;
    }
`;

const LikeCount = styled.span`
    font-size: 14px;
    color: #555;
`;

export default LikeButton;