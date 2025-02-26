import { useEffect, useState } from "react";
import { communityAPI } from '../../../api';
import LikeButton from '../../shared/LikeButton';
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
                    const response = await communityAPI.getCommunityDetail(crewId, feedId);
                    setPost(response.data.data);
                    
                    // 댓글 데이터가 있는지 확인하고 설정
                    if (response.data.data.comments) {
                        setComments(response.data.data.comments);
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

    // 댓글 제출 핸들러
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
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
    
    // 대댓글 제출 핸들러
    const handleReplySubmit = async (e) => {
        e.preventDefault();
        if (!newReply.trim() || isSubmitting || !replyToId) return;

        setIsSubmitting(true);
        try {
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
            const response = await communityAPI.getCommunityDetail(crewId, feedId);
            setPost(response.data.data);
            
            // 댓글 데이터 설정
            if (response.data.data.comments) {
                setComments(response.data.data.comments);
            }
        } catch (error) {
            console.error('데이터 새로고침 실패:', error);
        }
    };

    if (!isOpen || !post) return null;

    return (
        <S.PopupContainer>
            <S.PopupContent>
                {post.photos && post.photos.length > 0 && (
                    <S.ImageGallery>
                        <S.SlideContainer>
                            <S.SlideWrapper currentImage={currentImageIndex}>
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
                                        active={index === currentImageIndex}
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
                    <S.PopupCloseButton onClick={onClose}>
                        ✕
                    </S.PopupCloseButton>
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
                                            </S.CommentHeader>
                                            <S.CommentContent>{comment.content}</S.CommentContent>
                                            <S.ReplyButton 
                                                onClick={() => handleReplyClick(comment.commentId, comment.writer)}
                                            >
                                                답글 달기
                                            </S.ReplyButton>
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
                                                    </S.CommentHeader>
                                                    <S.CommentContent>{reply.content}</S.CommentContent>
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