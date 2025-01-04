import React from "react";
import * as S from "./Styles/Home.styles";
import MainSection from "./components/MainSection";
import PlaceSection from "./components/PlaceSection";
import PopularSection from "./components/PopularSection";
import SlideSection from "./components/SlideSection";

const Home = () => {
    return (
        <S.HomeContainer>
            <S.Container>
                <MainSection />
                <PopularSection />
                <SlideSection />
                <PlaceSection />
            </S.Container>
        </S.HomeContainer>
    );
}

export default Home;