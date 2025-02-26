import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useAuth } from '../../AuthProvider';

const LikeButton = ({
    crewId,
    feedId,
    initialLiked = false,
    initialCount = 0,
    className
}) => {
    const { likeStates, toggleLike, initializeLikeState } = useAuth();

    // 초기 상태 설정
    useEffect(() => {
        initializeLikeState(feedId, initialLiked, initialCount);
    }, [feedId, initialLiked, initialCount, initializeLikeState]);

    // 해당 피드의 현재 좋아요 상태
    const currentLikeState = likeStates[feedId] || {
        isLiked: initialLiked,
        likeCount: initialCount
    };

    const handleClick = async (e) => {
        e.stopPropagation();
        try {
            await toggleLike(crewId, feedId);
        } catch (error) {
            console.error('좋아요 토글 중 오류:', error);
        }
    };

    return (
        <Container>
            <Button
                onClick={handleClick}
                isLiked={currentLikeState.isLiked}
                className={className}
            >
                {currentLikeState.isLiked ? '❤️' : '🤍'}
            </Button>
            <Count>좋아요 {currentLikeState.likeCount}개</Count>
        </Container>
    );
};


const Container = styled.div`
    display: flex;
    align-items: center;
`;

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
`;

const Count = styled.div`
    font-size: 0.8em;
    color: #666;
    margin-top:2px;
`;


export default LikeButton;