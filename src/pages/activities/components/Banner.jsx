import { FaCog } from "react-icons/fa";
import Camper from "../../../assets/category/Camper.png";
import Coin from "../../../assets/category/Coin.png";
import Easel from "../../../assets/category/Easel.png";
import GameController from '../../../assets/category/GameController.png';
import Activity from '../../../assets/category/Running.png';
import SausageBarbeque from '../../../assets/category/SausageBarbeque.png';
import SelfDev from "../../../assets/category/SelfDev.png";
import Star from "../../../assets/category/Star.png";
import * as S from "../Styles/Activities.styles";

const Banner = () => {

    const categories = [
        { image: Activity, alt: "엑티비티"},
        { image: Easel, alt: "문화·예술"},
        { image: SausageBarbeque, alt: "푸드·드링크"},
        { image: Star, alt: "취미"},
        { image: Camper, alt: "여행"},
        { image: SelfDev, alt: "자기계발"},
        { image: Coin, alt: "재태크"},
        { image: GameController, alt: "게임"},
    ];

    const category = Activity;
    const categoryImage = categories.find(cat => cat.image === category)?.image;

    return(
        <S.Banner>
            <S.BannerTop>
                {/* title */}
                <S.CrewName>초보 러닝 크루 (초보자 러닝 코스)</S.CrewName>
                {/* category */}
                <S.CategoryImage src={categoryImage} />
                <S.CrewCategory>엑티비티</S.CrewCategory>
                <S.CrewMember>
                    {/* member profile image, crew 인원 수 */}
                </S.CrewMember>
            </S.BannerTop>
            {/* Banner Image */}
            <S.BannerImage/>
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