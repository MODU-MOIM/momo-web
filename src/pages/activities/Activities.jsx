import { useEffect, useRef, useState } from 'react';
import * as S from "./Styles/Activities.styles";


const Activities = () => {
    // 초기 게시물 데이터 추후 API로 데이터 받아오기
    const initialPosts = Array.from({ length: 41 }, (_, index) => ({
        id: index,
        title: `오늘은 자유 달리기 ${index}회차 진행했습니다.`,
        date: `2025-01-06`
    }));

    // 게시물과 보이는 게시물 수를 저장하는 상태
    const [posts, setPosts] = useState(initialPosts);
    const [visiblePosts, setVisiblePosts] = useState(6);
    const observerRef = useRef();

    useEffect(() => {
        // IntersectionObserver를 사용하여 관찰 요소가 보일 때 더 많은 게시물을 로드
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visiblePosts < posts.length) {
                    setVisiblePosts(prev => prev + 3);
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

    // 게시물 제목이 18자 이상일 경우 제목을 잘라주는 함수
    const truncateTitle = (title) => {
        return title.length > 18 ? `${title.substring(0, 18)} ··· ` : title;
    };

    return(
        <S.Container>
            {posts.slice(0, visiblePosts).map((post, index) => (
            <S.ActivityCard key={post.id}>
                <S.ActivityImage to={`/Activities/${post.id}`}/>
                <S.Title to={`/Activities/${post.id}`}>{truncateTitle(post.title)}[11]</S.Title>
                <S.Date>{post.date}</S.Date>
            </S.ActivityCard>
            ))}
            {visiblePosts < posts.length && (
                <div ref={observerRef} style={{
                    width: '100%',
                    height: '20px',
                    margin: '0',
                    padding: '0'
                }} />
            )}
        </S.Container>
    );
};

export default  Activities;