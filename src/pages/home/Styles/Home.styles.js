import styled from "styled-components";

export const HomeContainer = styled.div`
    width:100%;
    height:100vh;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const Section = styled.div`
    flex: 1;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// MainSection.jsx

export const MainImage = styled.img`
    width: 100%;
    border-radius: 15px;
    margin: 30px 0;
`;

export const SectionTitle = styled.p`
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 38px;
`;

export const SectionSubtitle = styled.p`
    font-size: 16px;
    text-align:center;
    margin: 25px 0;
    line-height: 28px;
    color: #333;
`;

// PopularSection.jsx

export const PopularSection = styled.div`
    width: 1024px;
    margin: 20px 0;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
`;

export const PopularItem = styled.div`
    width: 25%;
    height:160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #D9D9D9;
    cursor: pointer;

    &:nth-child(4n) {
        border-right: none;
    }
`;

export const PopularTitle = styled.h3`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

export const PopularContent = styled.p`
    font-size: 14px;
    text-align: center;
    color: #333;
    margin-top: 10px;
`;

export const Fire = styled.img`
    display: inline-block;
    vertical-align: middle;
    margin-left: auto;
    margin-right: auto;
`;


// SlideSection.jsx

export const SlideWrapper = styled.div`
    width: 1024px;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 20px;
    margin: 60px 0;
    background: #f8f9fa;
    border-radius: 20px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
`;

export const Slides = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`;

export const SlideTextSection = styled.div`
    flex: 1;
    padding: 20px;
`;

export const SlideTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 1.4;
    letter-spacing: -0.02em;
`;

export const SlideSubtitle = styled.p`
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    position: absolute;
    gap: 10px;
    bottom: 20px;
`;

export const SlideButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #352EAE;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    &:hover {
        background: #3A44E5;
    }
`;

export const SliderWrapper = styled.div`
    flex: 2;
    overflow: hidden;
    position: relative;
`;

export const SlideTrack = styled.div`
    display: flex;
    transform: translateX(${props => props.$currentSlide * - 275}px);
    transition: transform 0.5s ease-in-out;
`;

export const SlideItem = styled.div`
    border: 1px solid #352EAE;
    border-radius: 10px;
    min-width: 260px;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
`;
export const SlideItemContent = styled.div`
    height: 340px;
    background: white;
    border-radius: 10px;
    border: 1px solid #eee;
    position: relative;
    overflow: hidden;
`;

export const MoreWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-top: 1px solid #D9D9D9;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const MoreLink = styled.a`
    font-size: 16px;
    color: #352EAE;
    text-decoration: none;
    font-weight: bold;
    bottom: 0;
`;

export const CrewCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

export const CrewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const CrewInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    width: 100%;
`;

export const CrewName = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const CrewCategory = styled.p`
    font-size: 14px;
`;

export const CrewMembers = styled.p`
    font-size: 14px;
`;

export const CrewHoverInfo = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(53, 46, 174, 0.9);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    text-align: center;
    z-index: 10;
    
    ${SlideItem}:hover & {
        opacity: 1;
    }
`;

export const CrewDescription = styled.p`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 15px;
  max-height: 180px;
  overflow-y: auto;
  transition: opacity 0.3s ease;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;

export const CrewJoinButton = styled.a`
  padding: 8px 16px;
  background-color: white;
  color: #352EAE;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;