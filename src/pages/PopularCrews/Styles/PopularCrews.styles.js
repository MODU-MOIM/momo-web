import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
`;

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 18px;
    color: #666;
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
`;

export const Subtitle = styled.h2`
    font-size: 16px;
    color: #666;
    font-weight: normal;
`;

export const CrewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const CrewItem = styled.div`
    display: flex;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    position: relative;
    overflow: hidden;
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    &:nth-child(1) {
        background: linear-gradient(to right, #fff, #fff, #fffdf0);
        border-left: 5px solid #FFD700; /* 금색 */
    }
    
    &:nth-child(2) {
        background: linear-gradient(to right, #fff, #fff, #f8f8f8);
        border-left: 5px solid #C0C0C0; /* 은색 */
    }
    
    &:nth-child(3) {
        background: linear-gradient(to right, #fff, #fff, #fff8f4);
        border-left: 5px solid #CD7F32; /* 동색 */
    }
`;

export const Rank = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    background-color: #f0f0f0;
    color: #333;
    
    /* 상위 3개에 특별한 스타일 적용 */
    ${props => props.index === 0 && `
        background-color: #FFD700;
        color: #fff;
        box-shadow: 0 2px 5px rgba(255, 215, 0, 0.5);
    `}
    
    ${props => props.index === 1 && `
        background-color: #C0C0C0;
        color: #fff;
        box-shadow: 0 2px 5px rgba(192, 192, 192, 0.5);
    `}
    
    ${props => props.index === 2 && `
        background-color: #CD7F32;
        color: #fff;
        box-shadow: 0 2px 5px rgba(205, 127, 50, 0.5);
    `}
`;

export const CrewImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-left: 40px; /* 순위 표시를 위한 여백 */
`;

export const CrewInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const CrewName = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 6px;
`;

export const CrewCategory = styled.span`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    background-color: #f2f2f2;
    color: #666;
    font-size: 12px;
    margin-bottom: 8px;
    width: fit-content;
`;

export const CrewMembers = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

export const CrewDescription = styled.div`
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    
    /* HTML 콘텐츠에서 이미지 크기 제한 */
    img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
        margin: 5px 0;
    }
    
    p {
        margin: 5px 0;
    }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 16px;
    background-color: #f8f8f8;
    border-radius: 8px;
    width: 100%;
`;