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

export const Panel = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;