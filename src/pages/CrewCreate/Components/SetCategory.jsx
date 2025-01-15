import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../../theme";
import Activity from '../../../assets/category/Running.png';
import Easel from "../../../assets/category/Easel.png";
import SausageBarbeque from '../../../assets/category/SausageBarbeque.png';
import Star from "../../../assets/category/Star.png";
import Camper from "../../../assets/category/Camper.png";
import SelfDev from "../../../assets/category/SelfDev.png";
import Coin from "../../../assets/category/Coin.png";
import GameController from '../../../assets/category/GameController.png';

export default function SetCategory({onCategoryChange}) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // 활동 카테고리
    const activityCategories = [
        { image: Activity, alt: "액티비티", title: "액티비티", subtitle: "다양한 활동을 즐겨보세요" },
        { image: Easel, alt: "문화·예술", title: "문화·예술", subtitle: "다양한 문화를 즐겨보세요" },
        { image: SausageBarbeque, alt: "푸드·드링크", title: "푸드·드링크", subtitle: "맛있는 음식을 즐겨보세요" },
        { image: Star, alt: "취미", title: "취미", subtitle: "다양한 취미를 즐겨보세요" },
        { image: Camper, alt: "여행", title: "여행", subtitle: "다양한 여행을 즐겨보세요" },
        { image: SelfDev, alt: "자기계발", title: "자기계발", subtitle: "자기계발을 즐겨보세요" },
        { image: Coin, alt: "재태크", title: "재태크", subtitle: "재태크를 즐겨보세요" },
        { image: GameController, alt: "게임", title: "게임", subtitle: "게임을 즐겨보세요" },
    ];

    const handleCategoryClick = (index) => {
        if (selectedCategory === index) {
            setSelectedCategory(null); // 이미 선택된 카테고리를 클릭하면 선택 해제
        } else {
            setSelectedCategory(index); // 새로운 카테고리 선택
        }
    };
    useEffect(() => {
        onCategoryChange(activityCategories[selectedCategory]);
    },[selectedCategory]);


    return(
        <CategoryWrapper>
            <CategoryContainer>
                {activityCategories.map((category, index)=>(
                    <CategoryItem
                        key={index}
                        onClick={()=>handleCategoryClick(index)}
                    >
                        <CategoryImage src={category.image} alt={category.alt} />
                        <CategoryTextContainer>
                            <CategoryTitle>{category.title}</CategoryTitle>
                            <CategorySubtitle>{category.subtitle}</CategorySubtitle>
                        </CategoryTextContainer>
                        <CategoryGrid>
                            <SelectButton
                                type="checkbox"
                                checked={selectedCategory === index}
                                readOnly
                            />
                        </CategoryGrid>
                    </CategoryItem>
                ))}
            </CategoryContainer>
        </CategoryWrapper>
    );
}

const CategoryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    
`
const CategoryContainer = styled.div`
    width: 80%;
    gap: 10px;
`;

const CategoryItem = styled.div`
    width: 250px;
    height: 50px;
    margin: 10px;
    border: 1px solid ${theme.colors.purple};
    border-radius: 5px;
    float: left;
    display: flex;
    align-items: center;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: #eeeeee;
    }
`;

const CategoryImage = styled.img`
    width: 25px;
    height: 25px;
    margin: 10px;
`;

const CategoryTextContainer = styled.div`
    margin-bottom: 10px;
    width:70%;
`;

const CategoryTitle = styled.p`
    height:25px;
    font-size: 16px;
    margin-top: 10px;
    font-weight: 600;
`;

const CategorySubtitle = styled.p`
    font-size: 13px;
    color: ${theme.colors.subtextgray};
    margin: -5px 0;
`;
const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* gap: 16px; */
`;
const SelectButton = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.colors.gray02};
    border-radius: 50%;
    cursor: pointer;
    /* margin-right: 10px; */
    &:checked {
        background-color: ${theme.colors.purple};
        border:2px solid ${theme.colors.purple};
        position: relative;
    }
`;