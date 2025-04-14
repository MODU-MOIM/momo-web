import { useState } from "react";
import * as S from "../Styles/Review.styles"

export default function StarRating({score, setScore}) {
    const [hoverScore, setHoverScore] = useState(0); // 기존 선택 점수 유지하며 hover 별점 표시를 위해 새로 선언

    const ratingStarHandler = () => {
        const result = [];
        for(let i=0; i<5; i++){
            const leftValue = i + 0.5;
            const rightValue = i + 1;
            const isLeftHovered = hoverScore >= leftValue; // 각 왼쪽 반 별이 hover상태인지 확인하기 위해 선언
            const isRightHovered = hoverScore >= rightValue; // 각 오른쪽 반 별이 hover상태인지 확인하기 위해 선언
            // 왼쪽 반 별 push
            result.push(
                <S.RatingContainer
                    key={i * 2} // 0, 2, 4, 6, 8
                    onClick={()=>setScore(leftValue)}
                    onMouseEnter={()=>setHoverScore(leftValue)} // hover 상태일때 변경
                    onMouseLeave={()=>setHoverScore(0)}   // hover 아니면 hoverScore을 0으로 초기화
                >
                    <S.LeftHalfStar>
                    {(leftValue <= (hoverScore || score))?
                        <S.FullStar $ishovered={isLeftHovered}/>
                        :
                        <S.EmptyStar/>
                    }
                    </S.LeftHalfStar>
                </S.RatingContainer>
            )
            // 오른쪽 반 별 push
            result.push(
                <S.RatingContainer
                    key={i * 2 + 1} // 1, 3, 5, 7, 9
                    onClick={()=>setScore(rightValue)}
                    onMouseEnter={()=>setHoverScore(rightValue)} // hover 상태일때 변경
                    onMouseLeave={()=>setHoverScore(0)}   // hover 아니면 hoverScore을 0으로 초기화
                >
                    <S.RightHalfStar>
                    {(rightValue <= (hoverScore || score))?
                        <S.FullStar $ishovered={isRightHovered} $right/>
                    :
                        <S.EmptyStar $right/>
                    }
                    </S.RightHalfStar>
                </S.RatingContainer>
            )
        }
        return result;
    }

    return(
        <S.StarWrapper>
            {ratingStarHandler()}
        </S.StarWrapper>
    );
}