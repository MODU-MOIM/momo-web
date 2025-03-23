import React, { useState, useEffect, useRef } from "react";
import * as S from "./Styles/PopularArchives.styles";
import { recommendAPI, archiveAPI, crewAPI } from "../../api";
import { useNavigate } from "react-router-dom";

export default function PopularArchivesPage() {
    const [archives, setArchives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // API 호출 추적을 위한 ref 추가
    const apiCalledRef = useRef(false);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    // 제목 길이 제한 함수
    const truncateTitle = (title) => {
        if (!title) return '';
        return title.length > 30 ? `${title.substring(0, 30)}...` : title;
    };

    // 내용 길이 제한 함수
    const truncateContent = (content) => {
        if (!content) return '';
        return typeof content === 'string' 
            ? (content.length > 60 ? `${content.substring(0, 60)}...` : content)
            : '내용이 올바른 형식이 아닙니다.';
    };

    // 아카이브 컨텐츠에서 이미지 URL 추출 함수
    const extractImageUrlFromContent = (content) => {
        if (!content || typeof content !== 'string') return null;
        
        const imgRegex = /<img[^>]+src="([^">]+)"/i;
        const match = content.match(imgRegex);
        return match && match[1] ? match[1] : null;
    };

    // 아카이브 클릭 핸들러
    const handleArchiveClick = (archive) => {
        // 여러 가능한 ID 필드 중 유효한 것 사용
        const archiveId = archive.archiveId || archive.id;
        
        navigate(`/crews/${archive.crewId}/archives/${archiveId}`);
    };

    useEffect(() => {
        // 이미 API를 호출했다면 중복 호출 방지
        if (apiCalledRef.current) return;
        
        // API 호출 상태 표시
        apiCalledRef.current = true;
        
        const fetchPopularArchives = async () => {
            setLoading(true);
            try {
                // 인기 아카이브 정보 가져오기
                const response = await recommendAPI.getPopularArchives();
                
                const archiveInfoList = response.data?.data || [];
                
                if (archiveInfoList && archiveInfoList.length > 0) {
                    // 아카이브 상세 정보와 크루 정보를 병렬로 가져오기
                    const archivePromises = archiveInfoList.map(async (info) => {
                        try {
                            // archiveId와 crewId가 있는지 확인
                            if (!info.archiveId || !info.crewId) {
                                console.error("유효하지 않은 아카이브 정보:", info);
                                return null;
                            }
                            
                            // 아카이브 상세 정보와 크루 정보 병렬로 요청
                            const [archiveResponse, crewResponse] = await Promise.all([
                                archiveAPI.getArchiveDetail(info.crewId, info.archiveId),
                                crewAPI.getCrewData(info.crewId)
                            ]);
                            
                            if (archiveResponse?.data?.data && crewResponse?.data?.data) {
                                const archiveData = archiveResponse.data.data;
                                
                                // content에서 첫 번째 이미지 URL 추출
                                const imageUrl = extractImageUrlFromContent(archiveData.content);
                                
                                return {
                                    ...archiveData,
                                    thumbnailImageUrl: imageUrl,
                                    crewName: crewResponse.data.data.name || "알 수 없는 크루",
                                    crewId: info.crewId,
                                    archiveId: info.archiveId
                                };
                            }
                            return null;
                        } catch (error) {
                            console.error(`아카이브 조회 실패: ID ${info.archiveId}, 크루 ID ${info.crewId}`, error);
                            return null;
                        }
                    });
                    
                    const results = await Promise.all(archivePromises);
                    const validArchives = results.filter(archive => archive !== null);
                    
                    // console.log(`총 ${validArchives.length}개의 인기 아카이브를 찾았습니다.`);
                    setArchives(validArchives);
                } else {
                    setArchives([]);
                }
            } catch (error) {
                console.error("인기 아카이브 데이터 가져오기 실패:", error);
                setError("인기 아카이브 데이터를 불러오는 중 오류가 발생했습니다.");
                setArchives([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPopularArchives();
        
        return () => {
            apiCalledRef.current = false;
        };
    }, [navigate]);

    if (loading) {
        return <S.Loading>인기 아카이브 정보를 불러오는 중...</S.Loading>;
    }

    // 아카이브 데이터가 없거나 비어있는 경우 처리
    if (!archives || archives.length === 0) {
        return (
            <S.Container>
                <S.EmptyMessage>
                    {error || "표시할 인기 아카이브가 없습니다."}
                </S.EmptyMessage>
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>인기 아카이브</S.Title>
                <S.Subtitle>가장 많은 관심을 받은 아카이브를 확인해보세요!</S.Subtitle>
            </S.Header>
            <S.ArchiveList>
                {archives.map((archive, index) => (
                    <S.ArchiveItem 
                        key={archive.archiveId || index}
                        onClick={() => handleArchiveClick(archive)}
                    >
                        <S.Rank index={index}>{index + 1}위</S.Rank>
                        <S.ArchiveImage 
                            style={{ 
                                backgroundImage: `url(${archive.thumbnailImageUrl || '/assets/images/default-archive-thumbnail.jpg'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <S.ArchiveContent>
                            <S.ArchiveTitle>{truncateTitle(archive.title)}</S.ArchiveTitle>
                            <S.ArchiveInfo>
                                <S.ArchiveDate>{formatDate(archive.createdAt)}</S.ArchiveDate>
                                <S.ArchiveCrew>{archive.crewName}</S.ArchiveCrew>
                            </S.ArchiveInfo>
                            <S.ArchiveStats>
                                <S.StatItem>
                                    <span role="img" aria-label="likes">❤️</span>
                                    <span>{archive.likeCount || 0}</span>
                                </S.StatItem>
                                <S.StatItem>
                                    <span role="img" aria-label="comments">💬</span>
                                    <span>{archive.commentCount || 0}</span>
                                </S.StatItem>
                            </S.ArchiveStats>
                            <S.ArchiveDescription>
                                <div dangerouslySetInnerHTML={{ __html: truncateContent(archive.content) }} />
                            </S.ArchiveDescription>
                        </S.ArchiveContent>
                    </S.ArchiveItem>
                ))}
            </S.ArchiveList>
        </S.Container>
    );
}