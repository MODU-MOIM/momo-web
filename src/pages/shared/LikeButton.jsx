import React from 'react';
import styled, { css } from 'styled-components';
import useLike from './useLike';

/**
 * 좋아요 버튼 컴포넌트
 * @param {Object} props
 * @param {string|number} props.crewId - 크루 ID
 * @param {string|number} props.feedId - 피드 ID
 * @param {boolean} props.initialLiked - 초기 좋아요 상태 (기본값: false)
 * @param {number} props.initialCount - 초기 좋아요 수 (기본값: 0)
 * @param {function} props.onLikeChange - 좋아요 상태 변경 시 호출될 콜백 함수 (선택사항)
 * @param {string} props.className - 스타일 오버라이드를 위한 클래스명 (선택사항)
 */
const LikeButton = ({ 
    crewId, 
    feedId, 
    initialLiked = false,
    initialCount = 0,
    onLikeChange,
    className 
}) => {
    const { isLiked, likeCount, loading, toggleLike } = useLike(
        crewId, 
        feedId, 
        initialLiked, 
        initialCount, 
        onLikeChange
    );

    const handleClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleLike();
    };

    return (
        <Button 
            onClick={handleClick} 
            isLiked={isLiked} 
            disabled={loading}
            className={className}
        >
            {isLiked ? '❤️' : '🤍'} 
            {likeCount}
        </Button>
    );
};

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s ease;
    
    ${props => props.isLiked && css`
        color: #FF3B30;
    `}
    
    &:hover {
        opacity: 0.8;
    }
    
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

export default LikeButton;