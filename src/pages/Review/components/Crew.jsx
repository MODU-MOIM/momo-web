import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Styles/Crew.styles';
import { reviewAPI, crewAPI, scheduleAPI } from '../../../api';
import { useAuth } from '../../../AuthProvider';
import StarRating from './StarRating';

const keywordMapping = {
  MANAGEMENT: '체계적인 모임 운영',
  ATMOSPHERE: '편안하고 즐거운 분위기',
  COMMUNICATION: '크루원들과 원활한 소통',
  ENGAGEMENT: '모임 참여자들 적극적임',
  USEFULNESS: '유익함',
  ENJOYMENT: '흥미롭고 재미짐',
  FRIENDSHIP: '새로운 사람과 친해지기 좋음',
  EXPERTISE: '전문적임',
  TIMING: '적절한 모임 진행 시간',
  VENUE: '편리하고 쾌적한 모임 장소'
};

export default function Crew({ crewIdFromUrl, scheduleIdFromUrl, notificationData }) {
    const { crewId: paramCrewId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keywordStats, setKeywordStats] = useState([]);
    const [mannersRating, setMannersRating] = useState(0);
    const [crewInfo, setCrewInfo] = useState(null);
    const [scheduleInfo, setScheduleInfo] = useState(null);
    const [showRecentCrews, setShowRecentCrews] = useState(false);
    const [recentCrews, setRecentCrews] = useState([]);
    
    // crewId는 URL 파라미터나 알림 데이터에서 가져옴
    const effectiveCrewId = crewIdFromUrl || paramCrewId || notificationData?.crewId;
    
    // scheduleId는 URL 파라미터나 알림 데이터에서 가져옴
    const effectiveScheduleId = scheduleIdFromUrl || notificationData?.scheduleId;
    
    // 평가 가능 여부
    const canReview = Boolean(effectiveScheduleId);
    
    // 리뷰 작성 상태
    const [formData, setFormData] = useState({
        comment: '',
        rating: 3,
        keywords: [],
        scheduleId: effectiveScheduleId || ''
    });

    useEffect(() => {
        console.log('Crew 컴포넌트 마운트됨');
        console.log('crewIdFromUrl:', crewIdFromUrl);
        console.log('scheduleIdFromUrl:', scheduleIdFromUrl);
        console.log('notificationData:', notificationData);
        console.log('effectiveCrewId:', effectiveCrewId);
        console.log('effectiveScheduleId:', effectiveScheduleId);
        console.log('canReview:', canReview);
      }, []);
    
    // 크루 선택 없이 탭에 접근한 경우에는 내 크루 목록을 가져옴
    useEffect(() => {
        const fetchMyCrews = async () => {
            if (!effectiveCrewId && !loading) {
                try {
                    const response = await crewAPI.getMyCrewList();
                    setRecentCrews(response.data.data || []);
                    setShowRecentCrews(true);
                } catch (err) {
                    console.error('내 크루 목록 조회 에러:', err);
                }
            }
        };
        
        fetchMyCrews();
    }, [effectiveCrewId, loading]);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!effectiveCrewId) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                
                // 크루 정보 가져오기
                const crewResponse = await crewAPI.getCrewData(effectiveCrewId);
                setCrewInfo(crewResponse.data.data);
                
                // 특정 일정 정보 가져오기 (알림을 통해 들어온 경우)
                if (effectiveScheduleId) {
                    try {
                        const scheduleResponse = await scheduleAPI.readSchedule(effectiveCrewId, effectiveScheduleId);
                        setScheduleInfo(scheduleResponse.data.data);
                    } catch (error) {
                        console.error('일정 정보 조회 에러:', error);
                        // 일정 정보 조회 실패해도 크루 평가는 계속 진행
                    }
                }
                
                // 리뷰 정보 가져오기
                const reviewResponse = await reviewAPI.getCrewReviews(effectiveCrewId);
                const { data } = reviewResponse.data;
                setReviews(data.crewReviewList || []);
                setKeywordStats(data.keywordCount || []);
                setMannersRating(data.mannersRating || 0);
                
                setLoading(false);
            } catch (err) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
                console.error('크루 정보/평가 조회 에러:', err);
            }
        };
        
        fetchData();
    }, [effectiveCrewId, effectiveScheduleId]);

    // 이미 평가한 일정인지 확인
    const isAlreadyReviewed = reviews.some(review => 
        review.scheduleInfo && review.scheduleInfo.id === parseInt(effectiveScheduleId)
    );

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating
        });
    };

    const handleKeywordToggle = (keyword) => {
        const updatedKeywords = formData.keywords.includes(keyword)
            ? formData.keywords.filter(k => k !== keyword)
            : [...formData.keywords, keyword];
        
        setFormData({
            ...formData,
            keywords: updatedKeywords.length <= 3 ? updatedKeywords : formData.keywords
        });
    };

    const handleCommentChange = (e) => {
        setFormData({
            ...formData,
            comment: e.target.value
        });
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await reviewAPI.deleteCrewReview(effectiveCrewId, reviewId);

            const response = await reviewAPI.getCrewReviews(effectiveCrewId);
            const { data } = response.data;
            setReviews(data.crewReviewList || []);
            setKeywordStats(data.keywordCount || []);
            setMannersRating(data.mannersRating || 0);

            alert('평가가 삭제되었습니다.');
            setLoading(false);
        } catch (err) {
            console.error('평가 삭제 에러:', err);
            alert('평가 삭제 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    const isReviewAuthor = (review) => {
        if(!userInfo) return false;
        return review.writer === userInfo.nickname;
    };


    const handleSubmit = async () => {
        try {
            if (!formData.comment.trim()) {
                alert('평가 내용을 입력해주세요.');
                return;
            }
            
            if (!effectiveScheduleId) {
                alert('평가할 일정 정보가 없습니다.');
                return;
            }
            
            if (formData.keywords.length === 0) {
                alert('최소 1개 이상의 키워드를 선택해주세요.');
                return;
            }
            
            // 이미 평가한 일정인지 다시 한번 확인
            if (isAlreadyReviewed) {
                alert('이미 해당 일정에 대한 평가를 작성하셨습니다. 크루 평가는 한 번만 작성 가능합니다.');
                return;
            }
            
            setLoading(true);
            
            // 평가 데이터 생성
            const reviewData = {
                comment: formData.comment,
                rating: formData.rating,
                keywords: formData.keywords,
                scheduleId: parseInt(effectiveScheduleId)
            };
            
            // 평가 등록
            await reviewAPI.createCrewReview(effectiveCrewId, reviewData);
            
            // 폼 초기화
            setFormData({
                comment: '',
                rating: 3,
                keywords: [],
                scheduleId: effectiveScheduleId
            });
            
            // 리뷰 목록 갱신
            const response = await reviewAPI.getCrewReviews(effectiveCrewId);
            const { data } = response.data;
            setReviews(data.crewReviewList || []);
            setKeywordStats(data.keywordCount || []);
            setMannersRating(data.mannersRating || 0);
            
            alert('크루 평가가 등록되었습니다. 크루 평가는 한 번만 작성 가능합니다.');
            setLoading(false);
            
        } catch (err) {
            console.error('평가 등록 에러:', err);
            
            // 409 Conflict 에러 처리 추가
            if (err.response && err.response.status === 409) {
                alert('이미 해당 일정에 대한 평가를 작성하셨습니다. 크루 평가는 한 번만 작성 가능합니다.');
                
                // 서버에서 이미 리뷰가 존재한다고 알려준 경우, UI 상태도 업데이트
                const reviewResponse = await reviewAPI.getCrewReviews(effectiveCrewId);
                const { data } = reviewResponse.data;
                setReviews(data.crewReviewList || []);
                setKeywordStats(data.keywordCount || []);
                setMannersRating(data.mannersRating || 0);
            } else {
                alert('평가 등록 중 오류가 발생했습니다.');
            }
            
            setLoading(false);
        }
    };

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        });
    };

    if (loading) return <S.LoadingMessage>정보를 불러오는 중입니다...</S.LoadingMessage>;

    return (
        <S.CrewReviewContainer>
            {/* 평가 작성 폼 (알림을 통해 들어온 경우에만 표시) */}
            {canReview ? (
                <S.ReviewForm>
                    <S.ReviewFormHeader>
                        <S.ReviewerInfo>
                            {/* 크루 정보 표시 */}
                            <S.ReviewerAvatar 
                                src={crewInfo?.bannerImage || '/default-crew-profile.png'} 
                                alt={crewInfo?.name} 
                            />
                            <S.ReviewerName>{crewInfo?.name || '크루명'}</S.ReviewerName>
                        </S.ReviewerInfo>
                        <StarRating 
                            score={formData.rating} 
                            setScore={(rating) => handleRatingChange(rating)} 
                        />
                    </S.ReviewFormHeader>
                    <S.KeywordSelector>
                        {Object.entries(keywordMapping).map(([key, value]) => (
                            <S.KeywordOption 
                                key={key}
                                $selected={formData.keywords.includes(key)}
                                $disabled={!formData.keywords.includes(key) && formData.keywords.length >= 3}
                                onClick={() => handleKeywordToggle(key)}
                            >
                                {value}
                            </S.KeywordOption>
                        ))}
                    </S.KeywordSelector>

                    <S.CommentTextarea 
                        value={formData.comment}
                        onChange={handleCommentChange}
                        placeholder="크루에 대한 평가를 작성해주세요. 크루 평가는 한 번만 작성 가능합니다."
                        rows={5}
                    />

                    <S.SubmitButton onClick={handleSubmit} disabled={loading}>
                        {loading ? '처리 중...' : '작성완료'}
                    </S.SubmitButton>
                </S.ReviewForm>
                ) : (
                <S.NoReviewMessage>
                    알림을 통해 평가 요청을 받은 일정만 평가할 수 있습니다.
                    <br />
                    크루 일정에 참여하고 알림을 받으면 평가를 작성할 수 있습니다.
                </S.NoReviewMessage>
            )}

            {/* 리뷰 목록 */}
            <S.ReviewListContainer>
                <S.ReviewListHeader>
                    크루 평가 내역
                </S.ReviewListHeader>
                
                {reviews.length === 0 ? (
                    <S.EmptyReview>아직 등록된 평가가 없습니다.</S.EmptyReview>
                ) : (
                    reviews.map((review) => (
                        <S.ReviewItem key={review.reviewId}>
                          <S.DeleteButtonContainer>
                            <S.ReviewerInfo>
                                <S.ReviewerAvatar 
                                    src={review.profileImage || '/default-profile.png'} 
                                    alt={review.writer} 
                                />
                                <S.ReviewerName>{review.writer}</S.ReviewerName>
                            </S.ReviewerInfo>
                            {isReviewAuthor(review) && (
                                <S.DeleteButton onClick={() => handleDeleteReview(review.reviewId)}>
                                    삭제
                                </S.DeleteButton>
                            )}
                          </S.DeleteButtonContainer>
                            <S.KeywordList>
                                {(review.keywords || []).map((keyword, idx) => (
                                    <S.KeywordTag key={idx}>
                                        {keywordMapping[keyword] || keyword}
                                    </S.KeywordTag>
                                ))}
                                <S.StarRating>
                                    <StarRating 
                                        score={review.rating} 
                                        setScore={(rating) => handleRatingChange(rating)} 
                                    />
                                </S.StarRating>
                            </S.KeywordList>
                            <S.ReviewContent>{review.comment}</S.ReviewContent>
                            <S.ReviewDate>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </S.ReviewDate>
                        </S.ReviewItem>
                    ))
                )}
            </S.ReviewListContainer>
        </S.CrewReviewContainer>
    );
}