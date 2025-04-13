import { useState } from "react";
import * as S from "../Styles/Review.styles"

export default function StarRating() {
    const[score, setScore] = useState(0);
    const [hoverScore, setHoverScore] = useState(0); // 기존 선택 점수 유지하며 hover 별점 표시를 위해 새로 선언

    const ratingStarHandler = () => {
        const result = [];
        for(let i=0; i<5; i++){
            const isHovered = hoverScore >= i+1; // 각 별이 hover상태인지 확인하기 위해 선언
            result.push(
                   <span
                    key={i+1}
                    onClick={()=>setScore(i+1)}
                    onMouseEnter={()=>setHoverScore(i+1)} // hover 상태일때 변경
                    onMouseLeave={()=>setHoverScore(0)}   // hover 아니면 hoverScore을 0으로 초기화
                    >
                    {(i+1 <= (hoverScore || score))?
                        <S.FullStar $ishovered={isHovered}/>
                    :
                        <S.EmptyStar/>
                    }
                   </span>
            )
        }
        return result;
    }

    return(
        <S.ReviewContainer>
            {/* 1번째 별 */}
            {/* <S.halfStarLabel>
                <S.halfStarInput
                    type="radio"
                />
            </S.halfStarLabel> */}
            {/* <S.fullStarLabel>
                <S.fullStarInput
                    type="radio"
                />
            </S.fullStarLabel> */}
            <div>
                {ratingStarHandler()}
            </div>

        </S.ReviewContainer>
    );
}