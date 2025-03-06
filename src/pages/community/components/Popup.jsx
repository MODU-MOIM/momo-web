import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { communityAPI } from '../../../api';
import { useAuth } from "../../../AuthProvider";
import LikeButton from '../../shared/CommunityLikeButton';
import EditDeleteMenu from "../../shared/EditDeleteMenu";
import * as S from '../Styles/Community.styles';
import { getTimeAgo } from './getTimeAgo';

function Popup({ isOpen, onClose, feedId, crewId }){
    const [post, setPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyToId, setReplyToId] = useState(null);
    const [replyToWriter, setReplyToWriter] = useState("");
    const [newReply, setNewReply] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const { userInfo } = useAuth();
    
    // 댓글 수정/삭제 관련 상태
    const [showCommentMenu, setShowCommentMenu] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    
    // 스크롤 고정 효과 설정
    useEffect(() => {
        if (isOpen) {
            // 현재 스크롤 위치 저장
            const scrollY = window.scrollY;
            
            // body에 스타일 적용하여 스크롤 방지
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflowY = 'scroll'; // 스크롤바 자리 유지
            
            // 팝업이 닫힐 때 원래 상태로 복원
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflowY = '';
                // 스크롤 위치 복원
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // 게시물 및 댓글 데이터 가져오기
    useEffect(() => {
        const fetchPostDetail = async () => {
            if (feedId) {
                try {
                    // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}
                    const response = await communityAPI.getCommunityDetail(crewId, feedId);
                    
                    // FeedDetailResDto 형식에 맞게 데이터 처리
                    const feedData = response.data.data;
                    setPost(feedData);
                    
                    // 댓글 데이터 설정 - 백엔드에서는 comments 필드에 담김
                    if (feedData.comments) {
                        setComments(feedData.comments);
                    }
                    
                    setCurrentImageIndex(0); // 팝업이 열릴 때마다 첫 번째 이미지부터 보여주기
                } catch (error) {
                    console.error('게시물 상세 정보 가져오기 실패:', error);
                }
            }
        };
        
        if (isOpen) {
            fetchPostDetail();
        }
    }, [feedId, isOpen, crewId]);

    // 이미지 네비게이션 함수
    const handleNextImage = () => {
        if (post.photos && currentImageIndex < post.photos.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    const handleIndicatorClick = (index) => {
        if (index === currentImageIndex) return;
        setCurrentImageIndex(index);
    };

    // 댓글 입력 핸들러
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 제출 핸들러 - 백엔드 API 형식에 맞게 수정
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}/comments
            const commentData = {
                content: newComment
            };
            await communityAPI.createComment(crewId, feedId, commentData);
            
            // 댓글 작성 후 데이터 다시 가져오기
            refreshData();
            
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
    
    // 대댓글 제출 핸들러 - 백엔드 API 형식에 맞게 수정
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!newReply.trim() || isSubmitting || !replyToId) return;

        setIsSubmitting(true);
        try {
            // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}/comments/{parentId}/replies
            const replyData = {
                content: newReply
            };
            await communityAPI.createReply(crewId, feedId, replyToId, replyData);
            
            // 댓글 작성 후 데이터 다시 가져오기
            refreshData();
            
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

    // 데이터 새로고침 함수
    const refreshData = async () => {
        try {
            // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}
            const response = await communityAPI.getCommunityDetail(crewId, feedId);
            const feedData = response.data.data;
            setPost(feedData);
            
            // 댓글 데이터 설정
            if (feedData.comments) {
                setComments(feedData.comments);
            }
        } catch (error) {
            console.error('데이터 새로고침 실패:', error);
        }
    };

    // 게시물 메뉴 토글
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
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
    
    // 댓글 수정 저장 - 백엔드 API 형식에 맞게 수정
    const saveEditComment = async (commentId) => {
        if (!editCommentContent.trim() || isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}/comments/{commentId}
            const commentData = {
                content: editCommentContent
            };
            await communityAPI.updateComment(crewId, feedId, commentId, commentData);
            
            // 댓글 수정 후 데이터 다시 가져오기
            refreshData();
            
            // 수정 모드 종료
            setEditingCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('댓글 수정 실패:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // 댓글 삭제 - 백엔드 API 형식에 맞게 수정
    const handleDeleteComment = async (commentId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                // 백엔드 API 경로: /crews/{crewId}/feeds/{feedId}/comments/{commentId}
                await communityAPI.deleteComment(crewId, feedId, commentId);
                
                // 댓글 삭제 후 데이터 다시 가져오기
                refreshData();
            } catch (error) {
                console.error('댓글 삭제 실패:', error);
            }
        }
        setShowCommentMenu(null);
    };

    if (!isOpen || !post) return null;

    // 현재 사용자가 게시물 작성자인지 확인
    const isOwner = post.writer === userInfo?.nickname;

    return (
        <S.PopupContainer onClick={onClose}>
            <S.PopupContent onClick={(e) => e.stopPropagation()}>
                {/* 이미지 갤러리 - 백엔드의 PhotoResDto 형식에 맞게 조정 */}
                {post.photos && post.photos.length > 0 && (
                    <S.ImageGallery>
                        <S.SlideContainer>
                            <S.SlideWrapper $currentImage={currentImageIndex}>
                                {post.photos.map((photo, index) => (
                                    <S.Slide key={index}>
                                        <S.PopupImage src={photo.url} alt={`사진 ${index + 1}`} />
                                    </S.Slide>
                                ))}
                            </S.SlideWrapper>
                        </S.SlideContainer>
                        {post.photos.length > 1 && (
                            <S.ImageIndicator>
                                {post.photos.map((_, index) => (
                                    <S.IndicatorDot
                                        key={index}
                                        $active={index === currentImageIndex}
                                        onClick={() => handleIndicatorClick(index)}
                                    />
                                ))}
                            </S.ImageIndicator>
                        )}
                        <S.ButtonContainer>
                            {post.photos.length > 1 && (
                                <>
                                    {currentImageIndex > 0 && (
                                        <S.PrevButton onClick={handlePrevImage}/>
                                    )}
                                    {currentImageIndex < post.photos.length - 1 && (
                                        <S.NextButton onClick={handleNextImage}/>
                                    )}
                                </>
                            )}
                        </S.ButtonContainer>
                    </S.ImageGallery>
                )}
                <S.ContentContainer>
                    {/* 게시물 수정/삭제 메뉴 - 작성자만 볼 수 있음 */}
                    {isOwner && (
                        <S.PopupButton>
                            <BsThreeDotsVertical onClick={toggleMenu}/>
                            {showMenu && (
                                <EditDeleteMenu
                                    crewId={crewId}
                                    feedId={feedId}
                                />
                            )}
                        </S.PopupButton>
                    )}
                    <S.PopupTitle>
                        <S.ProfileImage
                            src={post.profileImage}
                            alt="Profile"
                        />
                        <S.Writer>{post.writer}</S.Writer>
                    </S.PopupTitle>
                    <S.Content>
                        <S.TimeAgo>{getTimeAgo(post.createdAt)}</S.TimeAgo>
                        <S.ContentText
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <S.ContentButtonContainer>
                            <LikeButton
                                crewId={crewId}
                                feedId={post.feedId}
                                initialLiked={post.isLiked}
                                initialCount={post.likeCount}
                            />
                        </S.ContentButtonContainer>
                    </S.Content>
                    <S.CommentContainer>
                        <S.CommentList>
                            {/* 댓글 목록 - 백엔드의 CommentResDto 형식에 맞게 조정 */}
                            {comments && comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.commentId}>
                                        <S.CommentItem>
                                            <S.CommentHeader>
                                                <S.CommentProfileImage 
                                                    src={comment.profileImage} 
                                                    alt="Profile" 
                                                />
                                                <S.CommentWriter>{comment.writer}</S.CommentWriter>
                                                <S.CommentTimeAgo>{getTimeAgo(comment.createdAt)}</S.CommentTimeAgo>
                                                
                                                {/* 댓글 작성자 확인 후 수정/삭제 메뉴 */}
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
                                                            src={reply.profileImage} 
                                                            alt="Profile" 
                                                        />
                                                        <S.CommentWriter>{reply.writer}</S.CommentWriter>
                                                        <S.CommentTimeAgo>{getTimeAgo(reply.createdAt)}</S.CommentTimeAgo>
                                                        
                                                        {/* 대댓글 작성자 확인 후 수정/삭제 메뉴 */}
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
                    </S.CommentContainer>
                </S.ContentContainer>
            </S.PopupContent>
        </S.PopupContainer>
    );
}

export default Popup;