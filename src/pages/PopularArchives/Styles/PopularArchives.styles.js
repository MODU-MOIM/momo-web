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

export const ArchiveList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const ArchiveItem = styled.div`
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
    z-index: 1;
    background-color: #f0f0f0;
    color: #333;
    
    ${props => props.index === 0 && `
        background-color: #FFD700; /* 금색 */
        color: #fff;
        box-shadow: 0 2px 5px rgba(255, 215, 0, 0.5);
    `}
    
    ${props => props.index === 1 && `
        background-color: #C0C0C0; /* 은색 */
        color: #fff;
        box-shadow: 0 2px 5px rgba(192, 192, 192, 0.5);
    `}
    
    ${props => props.index === 2 && `
        background-color: #CD7F32; /* 동색 */
        color: #fff;
        box-shadow: 0 2px 5px rgba(205, 127, 50, 0.5);
    `}
`;

export const ArchiveImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-left: 40px; /* 순위 표시를 위한 여백 */
`;

export const ArchiveContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ArchiveTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 6px;
`;

export const ArchiveInfo = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
`;

export const ArchiveDate = styled.span`
    font-size: 13px;
    color: #777;
`;

export const ArchiveCrew = styled.span`
    font-size: 13px;
    color: #555;
    font-weight: 500;
`;

export const ArchiveStats = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
`;

export const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #666;
`;

export const ArchiveDescription = styled.div`
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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