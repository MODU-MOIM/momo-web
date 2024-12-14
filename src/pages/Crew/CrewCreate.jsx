import React from "react";
import styled from "styled-components";

export default function CrewCreate() {
    return(
        <Title>내 취향의 모임을 함께 할 사람을 찾아보세요</Title>

        <CrewName>
            <ItemTitle>크루명을 작성해주세요</ItemTitle>
            <NameInput></NameInput>
        </CrewName>
        
        <CrewTheme>
            <ItemTitle>어떤 모임 활동을 하실건가요?</ItemTitle>
            {/* 모임활동 선택 */}
        </CrewTheme>

        <CrewLocation>
            <ItemTitle>어디서 만날까요?</ItemTitle>
            {/* 지역,구 선택 */}
        </CrewLocation>

        <CrewSettings>
            <ItemTitle>참여인원(호스트 포함)</ItemTitle>
            {/* 인원 수 설정 */}
            <ItemTitle>성별 제한</ItemTitle>
            {/* 성별 설정 */}
        </CrewSettings>

        <CrewIntro></CrewIntro>
        <CreateButton></CreateButton>
    );
}