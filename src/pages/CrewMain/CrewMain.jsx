import styled from "styled-components";
import FloatingMenu from "./components/FloatingMenu";
import { Outlet } from "react-router-dom";

export default function CrewMain() {
    return(
        <Wrapper>
            {/* 배너 컴포넌트 */}
            <FloatingMenu/>
            <Outlet/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;