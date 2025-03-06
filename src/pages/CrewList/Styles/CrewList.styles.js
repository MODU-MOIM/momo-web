import styled from 'styled-components';

export const Container = styled.div`
    width: 1024px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const FilterSection = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
`;

export const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    font-size: 14px;
`;

export const FilterButton = styled.button`
    padding: 8px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
        background: #f5f5f5;
    }
`;

export const CrewCard = styled.div`
    width:30%;
    margin: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.2s;
    cursor: pointer;
    float:left;
    
    &:hover {
        transform: translateY(-5px);
    }
`;

export const CrewImageWrapper = styled.div`
    width: 100%;
    height: 200px;
    overflow: hidden;
`;

export const CrewImage = styled.img`
    width: 100%;
    min-height: 100%;
`;

export const CrewInfo = styled.div`
    padding: 15px 5px;
`;

export const CrewName = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const CrewCategory = styled.p`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

export const CrewMemberCount = styled.p`
    font-size: 14px;
    color: #352EAE;
    font-weight: 500;
`;

export const CrewListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -15px; // CrewCard의 margin을 상쇄
`;

export const LoadingMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 18px;
    color: #666;
`;

export const CrewGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -15px; // 카드 마진 상쇄
`;