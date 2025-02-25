import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { communityAPI } from '../../api';
import LikeButton from '../shared/LikeButton';
import { getTimeAgo } from './components/getTimeAgo';
import Popup from './components/Popup';
import striptHtmlAndTruncate from './components/textUtils';
import * as S from "./Styles/Community.styles";

const Community = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(2);
    const observerRef = useRef();
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFeedId, setSelectedFeedId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await communityAPI.getCommunityList(crewId);
                setPosts(Array.isArray(response.data.data) ? response.data.data.reverse() : []);
            } catch (error) {
                console.error('게시물 가져오기 실패:', error);
                setPosts([]);
            }
        };

        fetchPosts();
    }, [crewId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visiblePosts < posts.length) {
                    setVisiblePosts(prev => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [visiblePosts, posts.length]);


    const handlePostClick = (feedId) => {
        setSelectedFeedId(feedId);
        setIsPopupOpen(true);
    };


    return (
        <S.Container>
            <S.List>
                <S.FloatingButton onClick={() => navigate(`/crews/${crewId}/crewCommunity/write`)}>
                    글작성
                </S.FloatingButton>
                
                {Array.isArray(posts) && posts.slice(0, visiblePosts).map((post) => (
                    <S.ActivityCard key={`post-${post.feedId}`}>
                        <S.UserInfoContainer>
                            <S.ProfileImage src={post.profileImage}/>
                            <S.UserName>{post.writer}</S.UserName>
                            <S.Date> · {getTimeAgo(post.createdAt)}</S.Date>
                        </S.UserInfoContainer>
                        <S.ActivityImage
                            onClick={() => handlePostClick(post.feedId)}
                            src={post.thumbnailImage || '/default-image.png'}
                            alt={`${post.writer}의 게시물`}
                        />
                        <S.PostInfoContainer>
                            <S.ButtonsContainer>
                                <LikeButton 
                                    crewId={crewId}
                                    feedId={post.feedId}
                                    initialLiked={post.isLiked}
                                    initialCount={post.likeCount}
                                />
                                <S.IconButton onClick={() => handlePostClick(post.feedId)}>
                                    💬
                                </S.IconButton>
                            </S.ButtonsContainer>
                            <S.TextContainer>
                                <S.UserName>{post.writer}</S.UserName>
                                <S.Title onClick={() => handlePostClick(post.feedId)}>
                                    {striptHtmlAndTruncate(post.content, 13)}
                                </S.Title>
                            </S.TextContainer>
                        </S.PostInfoContainer>
                    </S.ActivityCard>
                ))}

                {Array.isArray(posts) && visiblePosts < posts.length && (
                    <div ref={observerRef} style={{
                        height: '1px',
                        margin: '0',
                        padding: '0'
                    }} />
                )}
            </S.List>

            <Popup
                key={selectedFeedId}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                feedId={selectedFeedId}
                crewId={crewId}
            />
        </S.Container>
    );
};

export default Community;