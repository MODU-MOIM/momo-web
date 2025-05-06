import { useParams } from "react-router-dom";
import { crewMembersAPI } from "../../../api";
import * as S from "../Styles/Review.styles";
import * as SCH from "../../CrewSchedule/components/ScheduleDetail"
import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function Member() {
    const { crewId } = useParams();
    const [members, setMembers] = useState();
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({});
    const [myRvList, setMyRvList] = useState([]);
    const [selectMem, setSelectMem] = useState();
    const [isEditing, setIsEditing] = useState({});
    const [editReviews, setEditReviews] = useState({});
    const [editRatings, setEditRatings] = useState({});

    const handleTextReview = (e, memberId) => {
        setReviews(prev => ({
            ...prev,
            // memberId를 키값으로 설정해서 각 멤버들의 리뷰를 따로 저장
            [memberId]: e.target.value
        }));
    }

    const fetchMembers = async() => {
        try {
            const response = await crewMembersAPI.getMemberList(crewId);
            setMembers(response.data.data);
        } catch (error) {
            console.error("크루 멤버 읽기 실패", error);
        }
    }

    const submitReview = async(memberId) => {
        const review = {
            comment: reviews[memberId] || '',
            rating: ratings[memberId] || 0,
        }
        try{
            // console.log(memberId);
            // console.log(review);
            const response = await crewMembersAPI.postMemberReview(crewId, memberId, review);
            console.log(response);
            getMyReview(memberId);
        } catch (error) {
            console.error("멤버 리뷰 실패", error);
        }
    }

    const getMyReview = async(memberId) => {
        try {
            const res = await crewMembersAPI.getMyPostReview(crewId, memberId);
            // console.log(res.data.data);
            setMyRvList(res.data.data);
            setSelectMem(memberId);
        } catch (error) {
            console.error("작성한 리뷰 보기 실패", error);
        }
    }

    const handleEdit = async(memberId, reviewId) => {
        try {
            const editReveiw = {
                comment: editReviews[reviewId],
                rating: editRatings[reviewId]
            }
            // console.log(editReveiw);
            const res = await crewMembersAPI.putMemReview(crewId, memberId, reviewId, editReveiw);
            // console.log(res);
            getMyReview(memberId);
            setIsEditing(prev => ({...prev, [reviewId]: false}));
            alert("리뷰 수정 성공");
        } catch (error) {
            console.error("리뷰 수정 실패", error);
        }
    }

    const handleDelete = async(memberId, reviewId) => {
        try {
            const res = await crewMembersAPI.delMemberReview(crewId, memberId, reviewId);
            console.log(res);
            getMyReview(memberId);
            alert("리뷰 삭제 성공");
        } catch (error) {
            console.error("리뷰 삭제 실패", error);
        }
    }

    useEffect(() => {
        fetchMembers();
    },[]);

    return (
        <S.Wrapper>
            {members?.map(mem => (
                <S.OneWrapper key={mem.memberId}>
                    <S.MainContainer>
                        <S.MemReviewItem key={mem.memberId}>
                            <S.MemProfile src={mem.profileImage}/>
                            <S.ContainerWrapper>
                                {/* 위쪽 컨테이너 */}
                                <S.MRTopContainer>
                                    <S.MemName>{mem.nickname}</S.MemName>
                                    {/* rating */}
                                    <StarRating
                                        score={ratings[mem.memberId] || 0}
                                        setScore={(score) => setRatings(prev => ({
                                            ...prev, [mem.memberId]: score}))
                                        }
                                    />
                                </S.MRTopContainer>
                                {/* 아래쪽 컨테이너 */}
                                <S.MRBottomContainer>
                                    <S.SingleLineReview
                                        placeholder="한 줄 평가"
                                        // 속성(키) 이름이 변수이므로 대괄호 표기법 사용
                                        value={reviews[mem.memberId]}
                                        onChange={(e) => handleTextReview(e, mem.memberId)}
                                    />
                                    <S.SubmitButton
                                        onClick={() => submitReview(mem.memberId)}
                                    >
                                        저장
                                    </S.SubmitButton>
                                </S.MRBottomContainer>
                            </S.ContainerWrapper>
                        </S.MemReviewItem>
                        <S.ShowMyReview
                            onClick={() => getMyReview(mem.memberId)}
                        >
                            내가 작성한 리뷰 보기
                        </S.ShowMyReview>
                    </S.MainContainer>
                    {/* 작성한 리뷰 리스트 */}
                    <S.SubContainer>
                        {(selectMem === mem.memberId) && myRvList?.map(review => (
                            <S.MyReviewContainer>
                                {/* 수정 모드일때만 리뷰 변경 가능 */}
                                {!isEditing[review.reviewId] ? (
                                    // 읽기 모드
                                    <S.MyReviewContent>
                                        <S.Comment>{review.comment}</S.Comment>
                                        <StarRating score={review.rating} />
                                    </S.MyReviewContent>
                                ):(
                                    // 수정 모드
                                    <S.MyReviewContent>
                                        <S.SingleLineReview
                                            placeholder="한 줄 평가"
                                            value={editReviews[review.reviewId] == null ?
                                                review.comment : editReviews[review.reviewId]}
                                            onChange={(comment) => setEditReviews(prev => ({
                                                ...prev, [review.reviewId]: comment.target.value
                                            }))}
                                        />
                                        <StarRating
                                            score={editRatings[review.reviewId] || review.rating }
                                            setScore={(score) => setEditRatings(prev => ({
                                                ...prev, [review.reviewId]: score
                                            }))}
                                        />
                                    </S.MyReviewContent>
                                )}
                                {/* 수정 및 삭제 버튼 */}
                                <SCH.SubButtonContainer>
                                    <SCH.SubButton>
                                        <SCH.StyledRiEdit2Fill
                                            onClick={() => setIsEditing(prev => ({
                                                ...prev, [review.reviewId]: !isEditing[review.reviewId]
                                            }))}
                                        />
                                    </SCH.SubButton>
                                    {/* 수정 모드일 때만 확인 버튼 보여주기 */}
                                    {isEditing[review.reviewId] &&
                                        <SCH.SubButton>
                                            <S.StyledCheck
                                                onClick={() => handleEdit(selectMem, review.reviewId)}
                                            />
                                        </SCH.SubButton>
                                    }
                                    {/* 삭제 버튼 */}
                                    <SCH.SubButton>
                                        <SCH.StyledFaTrashAlt
                                            onClick={() => handleDelete(selectMem, review.reviewId)}
                                        />
                                    </SCH.SubButton>
                                </SCH.SubButtonContainer>
                            </S.MyReviewContainer>
                        ))}
                    </S.SubContainer>
                </S.OneWrapper>
            ))}
        </S.Wrapper>
    );
}
