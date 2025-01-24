import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 100px;
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
        
    margin-top: 30px;
    margin-bottom: 100px;
    width: 768px; 
    height: 370px;
    background-color: white;
    border: 1px solid #DEDFE7;
    border-radius: 15px;
`;
export const MainContainer = styled.div`
    display: flex;
    
`;
export const VoteContainer = styled.div`
    margin: 50px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;
export const VoteBox = styled.div`
    width: 200px;
    margin-bottom: 20px;
    /* height: 160px; */
    background-color: white;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    display: ${props => props.shouldHide ? 'none' : 'inline-block'};
`;
export const VoteTitle = styled.input`
    margin: 10px 0px 0px 10px;
`;
export const SelectBox = styled.div`
`;
export const SelectList = styled.li`
    margin: 10px;
    padding: 5px;
    padding-left: 10px;
    font-size: 15px;
    list-style-type: none;
    border: 1px solid #D4E3FB;
    border-radius: 10px;
`;
export const ButtonContainer = styled.div`
`;
export const VoteButton = styled.button`
    width: 200px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #F0F0F0;
    display: ${props => props.shouldHide ? 'none' : 'inline-block'};
    color: ${props => props.isEnabled ? "red" : "black"};
    &:hover{
        background-color: #D8D8D8;
        cursor: pointer;
    }
`;
export const InputText = styled.textarea`
    margin: 40px 0px 20px 40px;
    padding: 20px;
    width: 420px;
    height: 200px;
    resize: none;
    background-color: #F0F0F0;
    border: none;
    border-radius: 15px;
`;
export const SubContainer = styled.div`
    display: flex;
    justify-content: center;
`;
export const PostNotice = styled.button`
    padding: 10px;
    width: 15%;
    color: white;
    border: none;
    border-radius: 30px;
    background-color: #4B44B6;
    &:hover{
        background: #352EAE;
        border: 1px solid white;
        cursor: pointer;
    }
`;