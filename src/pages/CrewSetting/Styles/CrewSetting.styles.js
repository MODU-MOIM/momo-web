import styled from "styled-components";


export const Container = styled.div`
    width:1024px;
    margin:100px auto;
`;

export const Setting = styled.div`
    width:100%;
    border:1px solid #DEDFE7;

    & > p {
        float: left;
    }
`;

export const CrewName = styled.div`
    width:100%;
    height:55px;
    display: flex;
    align-items: center;
    padding:0 30px;
    font-size:20px;
    background: #D7D5EF;
`

export const MainTitle = styled.div`
    width:100%;
    height:45px;
    display: flex;
    align-items: center;
    padding-left: 45px;
    padding-right: 30px;
    font-size:15px;
    border-top:1px solid #C3C4CF;
`;

export const SubTitle = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding: 0 30px;
    background: #DEDFE7;
    border-top:1px solid #C3C4CF;
`;

export const Title = styled.p`
    width:25%;
`;

export const Desc = styled.p`
    display: flex;
    color: #898989;
`;

export const Button = styled.button`
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
`;

// SettingBanner.jsx

export const Panel = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    z-index:1;
`;

export const BannerContainer = styled.div`
    width:100%;
    height:100%;
    background-color: #D7D5EF;
`;

export const MyPage = styled.div`
    width: 50%;
    height: 50%;
    background: #0b0b0b;
    border-radius: 15px;
    display: flex;
    position: fixed;
    top: 20%;
    right: 25%;
    flex-direction: column;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
`;