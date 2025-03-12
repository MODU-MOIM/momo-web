import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { communityAPI, crewMembersAPI } from '../../api';
import { useAuth } from '../../AuthProvider';
import LikeButton from '../shared/CommunityLikeButton';
import { getTimeAgo } from './components/getTimeAgo';
import Popup from './components/Popup';
import striptHtmlAndTruncate from './components/textUtils';
import * as S from "./Styles/Community.styles";
import CrewChat from '../CrewChat/CrewChat';

const Community = () => {
    const navigate = useNavigate();
    const { crewId } = useParams();
    const [posts, setPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(2);
    const observerRef = useRef();
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFeedId, setSelectedFeedId] = useState(null);

    const [isMember, setIsMember] = useState(false);
    const { userInfo } = useAuth();

    // 사용자가 해당 크루의 멤버인지 확인하는 함수
    const checkCrewMembership = async () => {
        try {
            // 로그인한 사용자 정보 확인
            if (!userInfo || !userInfo.nickname) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return false;
            }
    
            // 멤버 목록 API 호출
            const response = await crewMembersAPI.getMemberList(crewId);
            const members = response.data.data || response.data;
            
            // 닉네임으로 멤버십 확인
            const isMemberOfCrew = Array.isArray(members) &&
                members.some(member => member.nickname === userInfo.nickname);
            
            if (!isMemberOfCrew) {
                alert('크루 멤버만 접근할 수 있습니다.');
                navigate(-1);
                return false;
            }
            
            setIsMember(true);
            return true;
        } catch (error) {
            console.error('크루 멤버십 확인 실패:', error);
            alert('크루 정보를 불러오는 데 실패했습니다.');
            navigate(-1);
            return false;
        }
    };

    // 피드 목록을 불러오는 함수
    const fetchPosts = async () => {
        const memberChecked = await checkCrewMembership();
        
        if (!memberChecked) return;

        try {
            // 백엔드의 /crews/{crewId}/feeds 엔드포인트 사용
            const response = await communityAPI.getCommunityList(crewId);
            
            // 백엔드 FeedListResDto 구조에 맞게 데이터 접근
            // 최신 게시물이 상단에 표시되도록 역순 정렬
            const feedData = Array.isArray(response.data.data)
                ? response.data.data.reverse()
                : [];
                
            setPosts(feedData);
        } catch (error) {
            console.error('피드 목록 가져오기 실패:', error);

            if (error.response && error.response.status === 403) {
                alert('크루 멤버만 접근할 수 있습니다.');
                navigate(-1);
            }
            setPosts([]);
        }
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchPosts();
    }, [crewId]);

    // 무한 스크롤 구현을 위한 Intersection Observer 설정
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

    // 게시물 클릭 시 팝업 열기
    const handlePostClick = (feedId) => {
        setSelectedFeedId(feedId);
        setIsPopupOpen(true);
    };

    // 팝업 닫기 및 데이터 새로고침
    const handlePopupClose = () => {
        setIsPopupOpen(false);
        // 팝업이 닫힐 때마다 게시물 목록을 새로고침
        fetchPosts();
    };

    return (
        <S.Container>
            <CrewChat/>
            {isMember && (
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
            )}
            
            {isPopupOpen && (
                <Popup
                    key={selectedFeedId}
                    isOpen={isPopupOpen}
                    onClose={handlePopupClose}
                    feedId={selectedFeedId}
                    crewId={crewId}
                />
            )}
        </S.Container>
    );
};

export default Community;