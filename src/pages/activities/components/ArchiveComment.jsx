import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../../AuthProvider";
import { archiveAPI } from "../../../api";
import * as S from "../Styles/Activities.styles";

const ArchiveComment = ({ crewId, archiveId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyToId, setReplyToId] = useState(null);
    const [replyToWriter, setReplyToWriter] = useState("");
    const [newReply, setNewReply] = useState("");
    const [showCommentMenu, setShowCommentMenu] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const { userInfo } = useAuth();

    // 댓글 목록 불러오기
    useEffect(() => {
        fetchComments();
    }, [crewId, archiveId]);

    const fetchComments = async () => {
        try {
            const response = await archiveAPI.getArchiveDetail(crewId, archiveId);
            const archiveData = response.data.data || response.data;
            
            // 댓글 데이터가 포함되어 있으면 사용, 아니면 빈 배열 사용
            if (archiveData.comments) {
                setComments(archiveData.comments);
            }else{
                setComments([]);
            }
        } catch (error) {
            console.error("댓글 목록 가져오기 실패:", error);
            setComments([]);
        }
    };
    // 댓글 입력 핸들러
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 작성 핸들러
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const commentData = {
                content: newComment
            };

            // archiveAPI 사용
            await archiveAPI.createComment(crewId, archiveId, commentData);
            
            // 댓글 작성 후 데이터 다시 가져오기
            fetchComments();
            
            // 입력 필드 초기화
            setNewComment("");
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 대댓글 모드 설정
    const handleReplyClick = (commentId, writer) => {
        setReplyToId(commentId);
        setReplyToWriter(writer);
        setNewReply("");
    };
    
    // 대댓글 취소
    const cancelReply = () => {
        setReplyToId(null);
        setReplyToWriter("");
        setNewReply("");
    };
    
    // 대댓글 입력 핸들러
    const handleReplyChange = (e) => {
        setNewReply(e.target.value);
    };
    
    // 대댓글 제출 핸들러
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!newReply.trim() || isSubmitting || !replyToId) return;

        setIsSubmitting(true);
        try {
            const replyData = {
                content: newReply
            };

            // archiveAPI 사용
            await archiveAPI.createReply(crewId, archiveId, replyToId, replyData);
            
            // 댓글 작성 후 데이터 다시 가져오기
            fetchComments();
            
            // 대댓글 모드 초기화
            setReplyToId(null);
            setReplyToWriter("");
            setNewReply("");
        } catch (error) {
            console.error('대댓글 작성 실패:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // 댓글 메뉴 토글
    const toggleCommentMenu = (e, commentId) => {
        e.stopPropagation();
        setShowCommentMenu(showCommentMenu === commentId ? null : commentId);
    };
    
    // 댓글 수정 시작
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.commentId);
        setEditCommentContent(comment.content);
        setShowCommentMenu(null);
    };
    
    // 댓글 수정 취소
    const cancelEditComment = () => {
        setEditingCommentId(null);
        setEditCommentContent('');
    };
    
    // 댓글 수정 저장
    const saveEditComment = async (commentId) => {
        if (!editCommentContent.trim() || isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const commentData = {
                content: editCommentContent
            };

            // archiveAPI 사용
            await archiveAPI.updateComment(crewId, archiveId, commentId, commentData);
            
            // 댓글 수정 후 데이터 다시 가져오기
            fetchComments();
            
            // 수정 모드 종료
            setEditingCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 댓글 총 개수 계산
    const getTotalCommentCount = () => {
        let totalCount = comments.length;
        
        comments.forEach(comment => {
            if (comment.replies && comment.replies.length > 0) {
                totalCount += comment.replies.length;
            }
        });
        
        return totalCount;
    };
    
    // 댓글 삭제
    const handleDeleteComment = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                // archiveAPI 사용
                await archiveAPI.deleteComment(crewId, archiveId, commentId);
                
                // 댓글 삭제 후 데이터 다시 가져오기
                fetchComments();
            } catch (error) {
                console.error('댓글 삭제 실패:', error);
            }
        }
        setShowCommentMenu(null);
    };

    // 외부 클릭 시 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = () => {
            setShowCommentMenu(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <S.CommentSection>
            <S.CommentTitle>댓글 {getTotalCommentCount()}개</S.CommentTitle>
            
            <S.CommentList>
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.commentId}>
                            <S.CommentItem>
                                <S.CommentHeader>
                                    <S.CommentProfileImage 
                                        src={comment.profileImage || "/default-profile.png"} 
                                        alt="Profile" 
                                    />
                                    <S.CommentWriter>{comment.writer}</S.CommentWriter>
                                    <S.CommentTimeAgo>
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </S.CommentTimeAgo>
                                    
                                    {/* 댓글 작성자 확인 후 수정/삭제 메뉴 추가 */}
                                    {comment.writer === userInfo?.nickname && (
                                        <S.CommentMenuWrapper>
                                            <BsThreeDotsVertical onClick={(e) => toggleCommentMenu(e, comment.commentId)} />
                                            {showCommentMenu === comment.commentId && (
                                                <S.CommentMenu>
                                                    <S.CommentMenuItem onClick={() => handleEditComment(comment)}>
                                                        수정
                                                    </S.CommentMenuItem>
                                                    <S.CommentMenuItem onClick={() => handleDeleteComment(comment.commentId)}>
                                                        삭제
                                                    </S.CommentMenuItem>
                                                </S.CommentMenu>
                                            )}
                                        </S.CommentMenuWrapper>
                                    )}
                                </S.CommentHeader>
                                
                                {/* 댓글 수정 모드 */}
                                {editingCommentId === comment.commentId ? (
                                    <S.EditCommentForm onSubmit={(e) => {
                                        e.preventDefault();
                                        saveEditComment(comment.commentId);
                                    }}>
                                        <S.EditCommentInput
                                            value={editCommentContent}
                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                            autoFocus
                                        />
                                        <S.EditCommentButtons>
                                            <S.CancelEditButton onClick={cancelEditComment} type="button">
                                                취소
                                            </S.CancelEditButton>
                                            <S.SaveEditButton type="submit" disabled={isSubmitting}>
                                                저장
                                            </S.SaveEditButton>
                                        </S.EditCommentButtons>
                                    </S.EditCommentForm>
                                ) : (
                                    <>
                                        <S.CommentContent>{comment.content}</S.CommentContent>
                                        <S.ReplyButton 
                                            onClick={() => handleReplyClick(comment.commentId, comment.writer)}
                                        >
                                            답글 달기
                                        </S.ReplyButton>
                                    </>
                                )}
                            </S.CommentItem>
                            
                            {/* 대댓글 목록 */}
                            {comment.replies && comment.replies.length > 0 && (
                                comment.replies.map(reply => (
                                    <S.ReplyItem key={reply.commentId}>
                                        <S.CommentHeader>
                                            <S.CommentProfileImage 
                                                src={reply.profileImage || "/default-profile.png"} 
                                                alt="Profile" 
                                            />
                                            <S.CommentWriter>{reply.writer}</S.CommentWriter>
                                            <S.CommentTimeAgo>
                                                {new Date(reply.createdAt).toLocaleDateString()}
                                            </S.CommentTimeAgo>
                                            
                                            {/* 대댓글 작성자 확인 후 수정/삭제 메뉴 추가 */}
                                            {reply.writer === userInfo?.nickname && (
                                                <S.CommentMenuWrapper>
                                                    <BsThreeDotsVertical onClick={(e) => toggleCommentMenu(e, reply.commentId)} />
                                                    {showCommentMenu === reply.commentId && (
                                                        <S.CommentMenu>
                                                            <S.CommentMenuItem onClick={() => handleEditComment(reply)}>
                                                                수정
                                                            </S.CommentMenuItem>
                                                            <S.CommentMenuItem onClick={() => handleDeleteComment(reply.commentId)}>
                                                                삭제
                                                            </S.CommentMenuItem>
                                                        </S.CommentMenu>
                                                    )}
                                                </S.CommentMenuWrapper>
                                            )}
                                        </S.CommentHeader>
                                        
                                        {/* 대댓글 수정 모드 */}
                                        {editingCommentId === reply.commentId ? (
                                            <S.EditCommentForm onSubmit={(e) => {
                                                e.preventDefault();
                                                saveEditComment(reply.commentId);
                                            }}>
                                                <S.EditCommentInput
                                                    value={editCommentContent}
                                                    onChange={(e) => setEditCommentContent(e.target.value)}
                                                    autoFocus
                                                />
                                                <S.EditCommentButtons>
                                                    <S.CancelEditButton onClick={cancelEditComment} type="button">
                                                        취소
                                                    </S.CancelEditButton>
                                                    <S.SaveEditButton type="submit" disabled={isSubmitting}>
                                                        저장
                                                    </S.SaveEditButton>
                                                </S.EditCommentButtons>
                                            </S.EditCommentForm>
                                        ) : (
                                            <S.CommentContent>{reply.content}</S.CommentContent>
                                        )}
                                    </S.ReplyItem>
                                ))
                            )}
                            
                            {/* 대댓글 작성 폼 */}
                            {replyToId === comment.commentId && (
                                <S.ReplyForm onSubmit={handleReplySubmit}>
                                    <S.ReplyInputContainer>
                                        <S.ReplyToInfo>
                                            {replyToWriter}님에게 답글 남기는 중
                                            <S.CancelReplyButton onClick={cancelReply}>
                                                취소
                                            </S.CancelReplyButton>
                                        </S.ReplyToInfo>
                                        <S.ReplyInput
                                            placeholder="답글을 입력하세요..."
                                            value={newReply}
                                            onChange={handleReplyChange}
                                        />
                                    </S.ReplyInputContainer>
                                    <S.CommentSubmit 
                                        type="submit" 
                                        disabled={isSubmitting || !newReply.trim()}
                                    >
                                        등록
                                    </S.CommentSubmit>
                                </S.ReplyForm>
                            )}
                        </div>
                    ))
                ) : (
                    <S.NoComments>댓글이 없습니다. 첫 댓글을 작성해보세요!</S.NoComments>
                )}
            </S.CommentList>
            
            {/* 메인 댓글 작성 폼 */}
            {!replyToId && (
                <S.CommentForm onSubmit={handleCommentSubmit}>
                    <S.CommentInput
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <S.CommentSubmit 
                        type="submit" 
                        disabled={isSubmitting || !newComment.trim()}
                    >
                        등록
                    </S.CommentSubmit>
                </S.CommentForm>
            )}
        </S.CommentSection>
    );
};

export default ArchiveComment;