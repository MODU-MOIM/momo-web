import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { crewAPI } from "../../../api";
import Camper from "../../../assets/category/Camper.png";
import Coin from "../../../assets/category/Coin.png";
import Easel from "../../../assets/category/Easel.png";
import GameController from '../../../assets/category/GameController.png';
import Activity from '../../../assets/category/Running.png';
import SausageBarbeque from '../../../assets/category/SausageBarbeque.png';
import SelfDev from "../../../assets/category/SelfDev.png";
import Star from "../../../assets/category/Star.png";
import * as S from "../Styles/Banner.styles";

const activityCategories = [
    { image: Activity, alt: "액티비티", title: "ACTIVITY", subtitle: "다양한 활동을 즐겨보세요" },
    { image: Easel, alt: "문화·예술", title: "CULTURE_ART", subtitle: "다양한 문화를 즐겨보세요" },
    { image: SausageBarbeque, alt: "푸드·드링크", title: "FOOD", subtitle: "맛있는 음식을 즐겨보세요" },
    { image: Star, alt: "취미", title: "HOBBY", subtitle: "다양한 취미를 즐겨보세요" },
    { image: Camper, alt: "여행", title: "TRAVEL", subtitle: "다양한 여행을 즐겨보세요" },
    { image: SelfDev, alt: "자기계발", title: "SELF_IMPROVEMENT", subtitle: "자기계발을 즐겨보세요" },
    { image: Coin, alt: "재태크", title: "FINANCE", subtitle: "재태크를 즐겨보세요" },
    { image: GameController, alt: "게임", title: "GAMING", subtitle: "게임을 즐겨보세요" },
];

const Banner = () => {
    const { crewId } = useParams();
    const [crewInfoData, setCrewInfoData] = useState();
    // const [category, setCategory] = useState();
    const [categoryImage, setCategoryImage] = useState();
    const [categoryAlt, setCategoryAlt] = useState("");

    const fetchCrewInfo = async () => {
        try {
            const response = await crewAPI.getCrewData(crewId);
            const crewData = response.data.data;
            setCrewInfoData(crewData);
            // setCategory(crewData.category);

            const categoryData = activityCategories.find(cat => cat.title === crewData.category);
            if (categoryData) {
                setCategoryImage(categoryData.image);
                setCategoryAlt(categoryData.alt);
            }
        } catch (error) {
            console.error("크루 정보 불러오기 실패", error);
        }
    }

    useEffect(() => {
        fetchCrewInfo();
    }, [crewId]);

    return(
        <S.Banner>
            <S.BannerTop>
                {/* title */}
                <S.CrewName>{crewInfoData?.name}</S.CrewName>
                {/* category */}
                <S.CategoryImage src={categoryImage} alt={categoryAlt}/>
                <S.CrewCategory>{categoryAlt}</S.CrewCategory>
                <S.CrewMember>
                    {/* member profile image, crew 인원 수 */}
                </S.CrewMember>
            </S.BannerTop>
            {/* Banner Image */}
            <S.BannerImage src={crewInfoData?.bannerImage}/>
            <S.Setting>
                <S.Link to="/crew/crewSetting">
                {/* 관리자만 볼 수 있도록 */}
                    <FaCog size={20}/>
                </S.Link>
            </S.Setting>
        </S.Banner>
    );
}

export default Banner;