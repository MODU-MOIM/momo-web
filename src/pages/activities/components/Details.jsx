import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { archiveAPI } from "../../../api";
import { useAuth } from "../../../AuthProvider";
import LikeButton from "../../shared/ArchiveLikeButton";
import * as S from "../Styles/Activities.styles";
import ArchiveComment from "./ArchiveComment";

const Details = () => {
    const { crewId, archiveId } = useParams();
    const [archive, setArchive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    // 아카이브 상세 정보 불러오기
    useEffect(() => {
        const fetchArchiveDetails = async () => {
            try {
                setLoading(true);
                const response = await archiveAPI.getArchiveDetail(crewId, archiveId);
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

    // 목록으로 돌아가기
    const handleGoBack = () => {
        navigate(`/crews/${crewId}/crewActivity`);
    };

    // 수정 페이지로 이동
    const handleEdit = () => {
        navigate(`/crews/${crewId}/updateArchive/${archiveId}`, {
            state: { 
                archiveData: archive,
                mode: "update" 
            }
        });
    };

    // 삭제 처리
    const handleDelete = async () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            try {
                await archiveAPI.deleteArchive(crewId, archiveId);
                alert("게시글이 삭제되었습니다.");
                navigate(`/crews/${crewId}/crewActivity`);
            } catch (error) {
                console.error("게시글 삭제 실패:", error);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
        setShowMenu(false);
    };

    // 메뉴 토글
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = () => {
            if (showMenu) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    // 작성자 확인
    const isOwner = archive && ((archive.writer && userInfo?.nickname === archive.writer));

    // 로딩 상태
    if (loading) return <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>;
    
    // 에러 상태
    if (error) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>{error}</p>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );
    
    // 데이터 없음 상태
    if (!archive) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>아카이브 정보가 없습니다.</p>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );

    return (
        <S.DetailContainer>
            <S.HeaderSection>
                <S.BackButton onClick={handleGoBack}>
                    ← 목록으로
                </S.BackButton>
                
                {isOwner && (
                    <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                        <S.ActionButton onClick={toggleMenu}>
                            <BsThreeDotsVertical />
                        </S.ActionButton>
                        {showMenu && (
                            <S.DropdownMenu>
                                <S.DropdownItem onClick={handleEdit}>
                                    수정
                                </S.DropdownItem>
                                <S.DropdownItem onClick={handleDelete}>
                                    삭제
                                </S.DropdownItem>
                            </S.DropdownMenu>
                        )}
                    </div>
                )}
            </S.HeaderSection>
            
            <S.DetailTitle>{archive.title}</S.DetailTitle>
            
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
            
            <S.ContentButtonContainer>
                <LikeButton
                    crewId={crewId}
                    archiveId={archiveId}
                    initialLiked={archive.isLiked}
                    initialCount={archive.likeCount || 0}
                />
            </S.ContentButtonContainer>
            
            <ArchiveComment
                crewId={crewId}
                archiveId={archiveId}
            />
        </S.DetailContainer>
    );
};

export default Details;