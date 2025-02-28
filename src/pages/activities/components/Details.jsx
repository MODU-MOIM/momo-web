import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { archiveAPI } from "../../../api";
import * as S from "../Styles/Activities.styles";

const Details = () => {
    const { crewId, archiveId } = useParams();
    const [archive, setArchive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArchiveDetails = async () => {
            try {
                setLoading(true);
                const response = await archiveAPI.getArchiveDetail(crewId, archiveId);
                console.log('아카이브 상세 정보:', response.data);
                
                // 응답 데이터 구조에 따라 적절하게 처리
                const archiveData = response.data.data || response.data;
                
                if (!archiveData) {
                    throw new Error('데이터가 없습니다.');
                }
                
                setArchive(archiveData);
            } catch (error) {
                console.error("아카이브 상세 정보 불러오기 실패:", error);
                setError("활동 상세 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchArchiveDetails();
    }, [crewId, archiveId]);

    const handleGoBack = () => {
        navigate(`/crews/${crewId}/crewActivity`);
    };

    if (loading) return <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>;
    
    if (error) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>{error}</p>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );
    
    if (!archive) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>아카이브 정보가 없습니다.</p>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );

    return (
        <S.DetailContainer>
            <S.BackButton onClick={handleGoBack}>
                ← 목록으로
            </S.BackButton>
            
            <S.DetailTitle>{archive.title}</S.DetailTitle>
            
            <S.DetailDate>
                작성일: {new Date(archive.createdAt).toLocaleDateString()}
            </S.DetailDate>
            
            {(archive.thumbnailImage || archive.thumbnailImageUrl) && (
                <S.DetailImage 
                    src={archive.thumbnailImage || archive.thumbnailImageUrl} 
                    alt={archive.title} 
                />
            )}
            
            <S.DetailContent>
                {archive.content && (
                    <div dangerouslySetInnerHTML={{ __html: archive.content }} />
                )}
            </S.DetailContent>
            
            <S.CommentCount>
                댓글 {archive.commentCount || 0}개
            </S.CommentCount>
        </S.DetailContainer>
    );
};

export default Details;