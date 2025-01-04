import styled from "styled-components";

export default function SetCategory() {
    // 활동 카테고리
    const  activitykindList= [
        {
            id : 1,
            img: img,
            title : "액티비티",
            info : "러닝·등산·클라이밍·헬스·서핑·산책"
        },
        {
            id : 2,
            title : "문화·예술",
            info : "전시·영화·페스티벌·연극·뮤지컬·공연"
        },
        {
            id : 3,
            title : "푸드·드링크",
            info : "맛집투어·카페·디저트·티룸·와인·비건"
        },
        {
            id : 4,
            title : "취미",
            info : "사진·공예·드로잉·뷰티·댄스·글쓰기"
        },
        {
            id : 5,
            title : "여행",
            info : "피크닉·놀이공원·드라이브·캠핑"
        },
        {
            id : 6,
            title : "자기계발",
            info : "독서·스터디·커리어·스피치"
        },
        {
            id : 7,
            title : "재테크",
            info : "N잡·부동산·창업·주식·비트코인·투자"
        },
        {
            id : 8,
            title : "게임",
            info : "PC·모바일·보드게임·방탈출·액팅게임"
        },
    ];

    return(
        <CategoryWrapper>
            <CategoryContainer>
                {activitykindList.map((kind)=>(
                    <Activitykind
                    type = "checkbox"
                    key={kind.id}
                    title={kind.title}
                    info={kind.info}
                    />
                ))}
            </CategoryContainer>
        </CategoryWrapper>
    );
}

const CategoryWrapper = styled.div`
`
const CategoryContainer = styled.div`
`
const Activitykind = styled.input`
`