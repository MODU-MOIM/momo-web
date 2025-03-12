import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { archiveAPI } from '../../api';
import * as S from "./Styles/Activities.styles";
import CrewChat from '../CrewChat/CrewChat';

const Activities = () => {
    // 상태 관리
    const [archives, setArchives] = useState([]);
    const [visibleArchives, setVisibleArchives] = useState(6);
    const [loading, setLoading] = useState(true);
    
    const observerRef = useRef();
    const navigate = useNavigate();
    const { crewId } = useParams();

    // 아카이브 목록 불러오기
    useEffect(() => {
        const fetchArchives = async () => {
            try {
                setLoading(true);
                const response = await archiveAPI.getArchiveList(crewId);
                // console.log('Archive List Response:', response.data);
                
                // 응답 데이터 구조에 따라 적절하게 처리
                const archiveData = response.data.data || response.data || [];
                setArchives(Array.isArray(archiveData) ? archiveData : []);
            } catch (error) {
                console.error('아카이브 목록 불러오기 실패:', error);
                setArchives([]);
            } finally {
                setLoading(false);  // 로딩 상태 업데이트
            }
        };
    
        fetchArchives();
    }, [crewId]);

    // 무한 스크롤 구현
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && visibleArchives < archives.length) {
                    setVisibleArchives(prev => prev + 3);
                }
            },
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [visibleArchives, archives.length]);

    const handleArchiveClick = (archive) => {
        // 어떤 ID 필드가 있는지 확인하고 사용
        const archiveId = archive.archiveId || archive.id;
        
        if (!archiveId) {
            console.error('아카이브 ID를 찾을 수 없습니다:', archive);
            alert('아카이브 정보를 불러올 수 없습니다.');
            return;
        }
        
        navigate(`/crews/${crewId}/archives/${archiveId}`);
    };

    // 게시물 제목 길이 제한 함수
    const truncateTitle = (title) => {
        if (!title) return '';
        return title.length > 18 ? `${title.substring(0, 18)} ··· ` : title;
    };


    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate() + 1).padStart(2, '0')}`;
    };

    return(
        <S.Container>
            <CrewChat/>
            <S.FloatingButton onClick={() => navigate(`/crews/${crewId}/crewActivity/write`)}>
                글작성
            </S.FloatingButton>
            
            <S.TotalPosts>{archives.length}개의 글</S.TotalPosts>
            
            {loading ? (
                <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>
            ) : (
                <S.List>
                    {archives.length > 0 ? (
                        archives.slice(0, visibleArchives)
                            .reverse()
                            .map((archive) => (
                            <S.ActivityCard 
                                key={`archive-${archive.archiveId || archive.id || Math.random()}`} 
                                onClick={() => handleArchiveClick(archive)}
                            >
                                <S.ActivityImage
                                    style={{ backgroundImage: `url(${archive.thumbnailImageUrl || archive.thumbnailImage})` }}
                                />
                                <S.Title>{truncateTitle(archive.title)}</S.Title>
                                <S.Date>{formatDate(archive.createdAt)}</S.Date>
                            </S.ActivityCard>
                        ))
                    ) : (
                        <S.EmptyMessage>아직 게시물이 없습니다.</S.EmptyMessage>
                    )}
                    {archives.length > 0 && visibleArchives < archives.length && (
                        <div ref={observerRef} style={{
                            height: '1px',
                            margin: '0',
                            padding: '0'
                        }} />
                    )}
                </S.List>
            )}
        </S.Container>
    );
};

export default Activities;