export default function CrewHome() {
    return(
        <Wrapper>
            {/* <CrewContainer> */}
                {/* 크루명, 배너 사진, 크루인원 */}
                {/* 크루 설정창 버튼*/}
            {/* </CrewContainer> */}
            <CrewIntro>
                <CrewInfo>
                    {/* 크루 대표, 지역, 크루인원 (아이콘) */}
                </CrewInfo>
                <CrewIntroText>{}정보받아와야함</CrewIntroText>
                <JoinButton isMember={isMember}/>
            </CrewIntro>
        </Wrapper>
    );
}