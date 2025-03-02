import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    const [updating, setUpdating] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const quillRef = useRef(null);
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    useEffect(() => {
        // 아카이브 상세 정보를 가져오는 함수
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
                setEditedTitle(archiveData.title || "");
                setEditedContent(archiveData.content || "");
            } catch (error) {
                console.error("아카이브 상세 정보 불러오기 실패:", error);
                setError("활동 상세 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchArchiveDetails();
    }, [crewId, archiveId]);

    // 목록으로 돌아가는 함수
    const handleGoBack = () => {
        navigate(`/crews/${crewId}/crewActivity`);
    };

    // 수정 모드로 전환하는 함수
    const handleEdit = () => {
        setIsEditing(true);
        setShowMenu(false); // 메뉴 닫기
    };

    // 수정을 취소하고 원래 상태로 돌아가는 함수
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(archive.title || "");
        setEditedContent(archive.content || "");
    };

    // 수정된 내용을 저장하는 함수
    const handleSaveEdit = async () => {
        try {
            setUpdating(true);
            
            const updatedData = {
                title: editedTitle,
                content: editedContent
            };
            
            await archiveAPI.updateArchive(crewId, archiveId, updatedData);
            
            setArchive({
                ...archive,
                title: editedTitle,
                content: editedContent
            });
            
            setIsEditing(false);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setUpdating(false);
        }
    };

    // 아카이브를 삭제하는 함수
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

    // 메뉴 토글 함수
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    // ReactQuill 에디터 설정
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: [] }, { background: [] }],
            ['clean']
        ],
    };

    // ReactQuill 에디터에서 사용할 수 있는 형식 정의
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image',
        'color', 'background'
    ];

    // 작성자 확인 (archive 객체에 writer 또는 authorId 필드가 있어야 함)
    const isOwner = archive && ((archive.writer && userInfo?.nickname === archive.writer));

    // 로딩 중일 때 표시할 컴포넌트
    if (loading) return <S.LoadingIndicator>로딩 중...</S.LoadingIndicator>;
    
    // 에러가 있을 때 표시할 컴포넌트
    if (error) return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <p>{error}</p>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );
    
    // 아카이브 데이터가 없을 때 표시할 컴포넌트
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
            
            {isEditing ? (
                <S.EditForm>
                    <S.TitleInput 
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />
                    
                    <S.EditorContainer>
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={editedContent}
                            onChange={setEditedContent}
                            modules={modules}
                            formats={formats}
                        />
                    </S.EditorContainer>
                    
                    <S.EditActions>
                        <S.CancelButton onClick={handleCancelEdit} disabled={updating}>
                            취소
                        </S.CancelButton>
                        <S.SaveButton onClick={handleSaveEdit} disabled={updating}>
                            {updating ? "저장 중..." : "저장"}
                        </S.SaveButton>
                    </S.EditActions>
                </S.EditForm>
            ) : (
                <>
                    <S.DetailTitle>{archive.title}</S.DetailTitle>
                    
                    
                    {/* <S.DetailDate>
                        작성일: {(() => {
                            const createdDate = new Date(archive.createdAt);
                            // 한국 시간대 기준으로 날짜 생성
                            createdDate.setDate(createdDate.getDate() + 1);
                            return createdDate.toLocaleDateString('ko-KR', {
                                timeZone: 'Asia/Seoul',
                            });
                        })()}
                    </S.DetailDate> */}
                    
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
                    
                    {/* 댓글 컴포넌트 추가 */}
                    <ArchiveComment 
                        crewId={crewId} 
                        archiveId={archiveId} 
                    />
                </>
            )}
        </S.DetailContainer>
    );
};

export default Details;