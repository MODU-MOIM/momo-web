// src/pages/Login/AddInfo.jsx
import React, { useState } from "react";
import Category from "./components/Category";
import UserInfo from "./components/UserInfo";
import * as S from "./Styles/Login.styles";



const AddInfo = () => {
    const [showCategory, setShowCategory] = useState(false);

    const handleConfirmCode = () => {
        setShowCategory(true);
    };

    const handleComplete = (selectedCategories) => {
        console.log(selectedCategories);
    }

    return (
        <S.Container>
            <S.AnimationWrapper>
                <S.SlideContainer $slide={showCategory}>
                    <S.Section>
                        <UserInfo onConfirm={handleConfirmCode} />
                    </S.Section>
                    <S.Section>
                        <Category onComplete={handleComplete}/>
                    </S.Section>
                </S.SlideContainer>
            </S.AnimationWrapper>
        </S.Container>
    );
}

export default AddInfo;