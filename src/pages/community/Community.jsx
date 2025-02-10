import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { communityAPI } from '../../api';
import * as S from "./Styles/Community.styles";
import { getTimeAgo } from './components/getTimeAgo';

const Community = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(2);
    const observerRef = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            try{
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
        // IntersectionObserver를 사용하여 관찰 요소가 보일 때 더 많은 게시물을 로드

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visiblePosts < posts.length) {
                    setVisiblePosts(prev => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        // observerRef 요소를 관찰
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        // 컴포넌트 언마운트 시 옵저버 정리
        return () => observer.disconnect();
    }, [visiblePosts, posts.length]);

    // 게시물 내용을 잘라주는 함수
    const striptHtmlAndTruncate = (html, maxLength = 13) => {
        if (!html) return '';

        const temp = document.createElement('div');
        temp.innerHTML = html;
        const text = temp.textContent || temp.innerText || '';

        return text.length > maxLength ? `${text.substring(0, maxLength)} ··· ` : text;
    };

    return(
        <S.Container>
            <S.List>
                <S.FloatingButton onClick={() => navigate(`/crews/${crewId}/crewCommunity/write`)}>
                    글작성
                </S.FloatingButton>
                {/* 게시물 목록 출력 */}
                {Array.isArray(posts) && posts.slice(0, visiblePosts).map((post) => (
                <S.ActivityCard key={`post-${post.feedId}`}>
                    <S.UserInfoContainer>
                        <S.ProfileImage src={post.profileImage}/>
                        <S.UserName>{post.writer}</S.UserName>

                        {/* 작성일은 현재 시간 - 작성 시간으로 계산 */}
                        <S.Date> · {getTimeAgo(post.createdAt)}</S.Date>
                    </S.UserInfoContainer>
                    <S.ActivityImage
                        onClick={() => navigate(`/crews/${crewId}/feeds/${post.feedId}`)}
                        src={post.thumbnailImage || '/default-image.png'}
                        alt={`${post.writer}의 게시물`}
                    />
                    <S.PostInfoContainer>
                        <S.ButtonsContainer>
                            {/* uid를 통해 좋아요는 한번만 가능하도록 설정 */}
                            <S.IconButton>
                                ♥️ {post.likeCount}
                            </S.IconButton>
                            <S.IconButton>
                                💬
                            </S.IconButton>
                        </S.ButtonsContainer>
                        <S.TextContainer>
                            <S.UserName>{post.writer}</S.UserName>
                            <S.Title to={`/crews/${crewId}/feeds/${post.feedId}`}>
                                {striptHtmlAndTruncate(post.content)}
                            </S.Title>
                        </S.TextContainer>
                    </S.PostInfoContainer>

                </S.ActivityCard>
                ))}
                {/*
                    사용자가 스크롤을 내려 div가 화면에서 보이면 observer가 div를 감지하고
                    추가 게시글 1개씩 불러오도록 하는 trigger
                */}
                {Array.isArray(posts) && visiblePosts < posts.length && (
                    // observer를 작동하기 위한 감지점
                    <div ref={observerRef} style={{
                        height: '1px',
                        margin: '0',
                        padding: '0'
                    }} />
                )}
            </S.List>
        </S.Container>
    );
};


export default Community;