// Category.js
import React, { useState } from 'react';
import Camper from "../../../assets/category/Camper.png";
import Coin from "../../../assets/category/Coin.png";
import Easel from "../../../assets/category/Easel.png";
import GameController from '../../../assets/category/GameController.png';
import Activity from '../../../assets/category/Running.png';
import SausageBarbeque from '../../../assets/category/SausageBarbeque.png';
import SelfDev from "../../../assets/category/SelfDev.png";
import Star from "../../../assets/category/Star.png";
import * as S from '../Styles/Login.styles';

const Category = ({ onComplete }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        { image: Activity, alt: "액티비티", title: "ACTIVITY", subtitle: "다양한 활동을 즐겨보세요" },
        { image: Easel, alt: "문화·예술", title: "CULTURE_ART", subtitle: "다양한 문화를 즐겨보세요" },
        { image: SausageBarbeque, alt: "푸드·드링크", title: "FOOD", subtitle: "맛있는 음식을 즐겨보세요" },
        { image: Star, alt: "취미", title: "HOBBY", subtitle: "다양한 취미를 즐겨보세요" },
        { image: Camper, alt: "여행", title: "TRAVEL", subtitle: "다양한 여행을 즐겨보세요" },
        { image: SelfDev, alt: "자기계발", title: "SELF_IMPROVEMENT", subtitle: "자기계발을 즐겨보세요" },
        { image: Coin, alt: "재테크", title: "FINANCE", subtitle: "재테크를 즐겨보세요" },
        { image: GameController, alt: "게임", title: "GAMING", subtitle: "게임을 즐겨보세요" }
    ];

    // 카테고리 선택
    const handleCategoryClick = (index) => {
        const isSelected = selectedCategories.includes(index);

        if (isSelected) {
            setSelectedCategories(selectedCategories.filter((id) => id !== index));
            return;
        }

        if(selectedCategories.length >= 3) {
            alert("관심 카테고리는 최대 3개까지 선택할 수 있습니다.");
            return;
        }

        setSelectedCategories([...selectedCategories, index]);
    };

    // 카테고리 선택 완료
    const handleComplete = () => {
        if (selectedCategories.length === 0) {
            alert("최소 1개의 카테고리를 선택해주세요.");
            return;
        }

        const categoryData = {
            categories: selectedCategories.map(index => categories[index].title)
        };
        
        onComplete(categoryData);
    };

    return (
        <S.CategoryContainer>
            <S.AddInfoTitle>
                관심 카테고리 선택
            </S.AddInfoTitle>
            <S.Section>
                {categories.map((category, index) => (
                    <S.CategoryItem
                        key={index}
                        onClick={() => handleCategoryClick(index)}
                    >
                        <S.CategoryImage src={category.image} alt={category.alt} />
                        <S.CategoryTextContainer>
                            <S.CategoryTitle>{category.alt}</S.CategoryTitle>
                            <S.CategorySubtitle>{category.subtitle}</S.CategorySubtitle>
                        </S.CategoryTextContainer>
                        <S.SelectButton
                            type="checkbox"
                            checked={selectedCategories.includes(index)}
                            readOnly
                        />
                    </S.CategoryItem>
                ))}
            </S.Section>
            <S.ButtonWrapper>
                <S.SubmitButton onClick={handleComplete}>
                    선택완료
                </S.SubmitButton>
            </S.ButtonWrapper>
        </S.CategoryContainer>
    );
};

export default Category;