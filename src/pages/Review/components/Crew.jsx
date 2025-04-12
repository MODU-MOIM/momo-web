import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Styles/Crew.styles';
import { reviewAPI, crewAPI, scheduleAPI } from '../../../api';
import { useAuth } from '../../../AuthProvider';

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
    const { userInfo } = useAuth(); // AuthProvider에서 사용자 정보 가져오기
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keywordStats, setKeywordStats] = useState([]);
    const [mannersRating, setMannersRating] = useState(0);
    const [crewInfo, setCrewInfo] = useState(null);
    const [scheduleInfo, setScheduleInfo] = useState(null);
    const [showRecentCrews, setShowRecentCrews] = useState(false);
    const [recentCrews, setRecentCrews] = useState([]);
    
    // crewId 결정: URL 파라미터 > 부모 컴포넌트에서 전달된 파라미터 > URL 경로 파라미터
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

    const renderStars = (rating) => {
        const safeRating = rating || 0;
        
        return (
            <S.StarRating>
                {[1, 2, 3, 4, 5].map((star) => (
                    <S.Star key={star} $filled={star <= Math.round(safeRating)}>★</S.Star>
                ))}
                <S.RatingText>{safeRating.toFixed(1)}</S.RatingText>
            </S.StarRating>
        );
    };
    
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

    const handleCrewSelect = (crewId) => {
        navigate(`/review?tab=crew&crewId=${crewId}`);
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
            
            // 백엔드 API 형식에 맞게 데이터 변환
            const reviewData = {
                comment: formData.comment,
                rating: formData.rating,
                keywords: formData.keywords,
                scheduleId: parseInt(effectiveScheduleId)
            };
            
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
            alert('평가 등록 중 오류가 발생했습니다.');
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

    // 크루 선택 없이 페이지 접근한 경우
    if (!effectiveCrewId) {
        return (
            <S.CrewReviewContainer>
                <S.ReviewHeader>
                    <S.TabContainer>
                        <S.Tab $active={true}>크루 평가 작성</S.Tab>
                        <S.Tab $active={false}>크루 평가</S.Tab>
                    </S.TabContainer>
                </S.ReviewHeader>
                
                <S.NoCrewSelectedMessage>
                    평가할 크루를 선택해주세요
                    {showRecentCrews && recentCrews.length > 0 && (
                        <S.CrewSelectContainer>
                            <S.CrewSelectTitle>내 크루 목록</S.CrewSelectTitle>
                            <S.CrewList>
                                {recentCrews.map(crew => (
                                    <S.CrewItem 
                                        key={crew.id} 
                                        onClick={() => handleCrewSelect(crew.id)}
                                    >
                                        <S.CrewItemImage 
                                            src={crew.bannerImage || '/default-crew-profile.png'} 
                                            alt={crew.name} 
                                        />
                                        <S.CrewItemName>{crew.name}</S.CrewItemName>
                                    </S.CrewItem>
                                ))}
                            </S.CrewList>
                        </S.CrewSelectContainer>
                    )}
                    {showRecentCrews && recentCrews.length === 0 && (
                        <S.NoCrewsMessage>
                            아직 가입한 크루가 없습니다. 크루에 가입하고 활동 후 평가를 작성할 수 있습니다.
                        </S.NoCrewsMessage>
                    )}
                </S.NoCrewSelectedMessage>
            </S.CrewReviewContainer>
        );
    }

    if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

    return (
        <S.CrewReviewContainer>
            <S.ReviewHeader>
                <S.TabContainer>
                    <S.Tab $active={true}>크루 평가 작성</S.Tab>
                    <S.Tab $active={false}>크루 평가</S.Tab>
                </S.TabContainer>
            </S.ReviewHeader>

            {/* 평가 작성 폼 (알림을 통해 들어온 경우에만 표시) */}
            {canReview ? (
                isAlreadyReviewed ? (
                    <S.AlreadyReviewedMessage>
                        이미 해당 일정에 대한 평가를 작성하셨습니다. 크루 평가는 한 번만 작성 가능합니다.
                    </S.AlreadyReviewedMessage>
                ) : (
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
                            <S.StarSelector>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <S.StarOption 
                                        key={rating}
                                        $selected={formData.rating === rating}
                                        onClick={() => handleRatingChange(rating)}
                                    >
                                        ★
                                    </S.StarOption>
                                ))}
                            </S.StarSelector>
                        </S.ReviewFormHeader>

                        {/* 평가할 일정 정보 표시 */}
                        {scheduleInfo && (
                            <S.ScheduleInfoBox>
                                <S.ScheduleInfoTitle>평가할 일정 정보</S.ScheduleInfoTitle>
                                <S.ScheduleInfoItem>
                                    <span>일정명:</span> {scheduleInfo.title || '일정'}
                                </S.ScheduleInfoItem>
                                <S.ScheduleInfoItem>
                                    <span>날짜:</span> {formatDate(scheduleInfo.scheduleDate)}
                                </S.ScheduleInfoItem>
                                {scheduleInfo.location && (
                                    <S.ScheduleInfoItem>
                                        <span>장소:</span> {scheduleInfo.location}
                                    </S.ScheduleInfoItem>
                                )}
                            </S.ScheduleInfoBox>
                        )}

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
                )
            ) : (
                <S.NoReviewMessage>
                    알림을 통해 평가 요청을 받은 일정만 평가할 수 있습니다.
                    <br />
                    크루 일정에 참여하고 알림을 받으면 평가를 작성할 수 있습니다.
                    <br />
                    크루 평가는 한 번만 작성 가능합니다.
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
                            <S.ReviewItemHeader>
                                <S.ReviewerInfo>
                                    <S.ReviewerAvatar 
                                        src={review.profileImage || '/default-profile.png'} 
                                        alt={review.writer} 
                                    />
                                    <S.ReviewerName>{review.writer}</S.ReviewerName>
                                </S.ReviewerInfo>
                                <S.StarRating>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <S.Star key={star} $filled={star <= Math.round(review.rating || 0)}>★</S.Star>
                                    ))}
                                </S.StarRating>
                            </S.ReviewItemHeader>
                            
                            <S.ReviewDate>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </S.ReviewDate>
                            
                            <S.KeywordList>
                                {(review.keywords || []).map((keyword, idx) => (
                                    <S.KeywordTag key={idx}>
                                        {keywordMapping[keyword] || keyword}
                                    </S.KeywordTag>
                                ))}
                            </S.KeywordList>
                            
                            {review.scheduleInfo && (
                                <S.ReviewSchedule>
                                    참여 일정: {review.scheduleInfo.title || '일정'} 
                                    ({formatDate(review.scheduleInfo.date)})
                                </S.ReviewSchedule>
                            )}
                            
                            <S.ReviewContent>{review.comment}</S.ReviewContent>
                        </S.ReviewItem>
                    ))
                )}
            </S.ReviewListContainer>
        </S.CrewReviewContainer>
    );
}