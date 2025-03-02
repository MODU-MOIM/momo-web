import styled from "styled-components";

export default function CrewChat() {
    return(
        <Wrapper>
            <Text>TALK</Text>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: fixed;
    bottom: 50px;
    right: 10%;
    width: 65px;
    height: 65px;
    margin-left: 30px;
    background-color: #F5F5FF;
    border: 1px solid #352EAE;
    border-radius: 50%;
    box-shadow: 0px 0px 5px 2px gray;

    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover{
        cursor: pointer;
        background-color: #e6e6ef;
    }
`;

const Text = styled.div`
    color: #352EAE;
`;