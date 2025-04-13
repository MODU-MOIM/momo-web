import { useState } from "react";
import * as S from "../Styles/Review.styles"

export default function StarRating() {
    // const [starScore, setStarScore] = useState(0);
    const[score, setScore] = useState(0);



    const ratingStarHandler = () => {
        const result = [];
        for(let i=0; i<5; i++){
            result.push(
                   <span key={i+1} onClick={()=>setScore(i+1)}>
                    {(i+1 <= score)?
                        <S.FullStar/>
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