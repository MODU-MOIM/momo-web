import styled from "styled-components";
import FloatingMenu from "./components/FloatingMenu";
import { Outlet } from "react-router-dom";
import Banner from "../activities/components/Banner";

export default function CrewMain() {
    return(
        <Wrapper>
            <TopContainer>
                <BannerContainer>
                    <Banner/>
                </BannerContainer>
            </TopContainer>
            <FloatingMenu/>
            <Outlet/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;
const TopContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;
const BannerContainer = styled.div`
    width: 70%;
`;