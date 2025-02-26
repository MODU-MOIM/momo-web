import styled from "styled-components";

export const Container = styled.div`
    width:1024px;
    margin:100px auto;
`;

export const Setting = styled.div`
    width:100%;
    border:1px solid #DEDFE7;
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

export const CompletionButton = styled.button`
    background: #352EAE;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 20px 10px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: #2A258A;
        transition: all 0.3s ease-in-out;
    }
`;

export const HelpMsg = styled.div`
    color: red;
    font-size: small;
    padding: 10px;
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
    width: 768px;
    height: 58%;
    z-index:2;
    background: #fff;
    border-radius: 15px;
    position: fixed;
    top: 20%;
    right: 30%;
`;

export const DeleteContainer = styled.div`
    width:100%;
    height:50px;
    background: #DEDFE7;
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding:0 20px;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
`;

export const SettingContainer = styled.div`
    padding:20px 35px;
`;

export const SettingTitle = styled.p`
    font-size: 17px;
    font-weight: 600;
    margin:20px 10px;
`;

export const CrewNameInput = styled.input`
    width:40%;
    height:50px;
    background: #fff;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
    padding: 0 10px;
    margin-bottom: 50px;
`;

export const BannerImageContainer = styled.div`
    background: #fff;
    padding:20px 0;
    margin:0 auto
`;

export const BannerImage = styled.div`
    width:100%;
    height:150px;
    background: #fff;
    border:1px solid red;
    border-radius: 15px;
`;

// CrewIntro.jsx

export const NumberContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
`;

export const TextItem = styled.p`
    margin: 0 10px;
    font-size: 14px;
`;

export const SetNumber = styled.input`
    width: 50px;
    height: 30px;
    padding: 0 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    outline: none;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;


export const NumberSetting = styled.div`
    display: flex;
    align-items: center;
`;

// CrewRule.jsx

export const RuleContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const Select = styled.select`
    width: 150px;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    outline: none;
    margin-bottom: 20px;
`;

// CrewActivity.jsx

export const MemberSection = styled.div`
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    
    & > * {
        float: left;
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:1px solid red;
`;

export const Name = styled.p`
    margin: 0 15px;
    font-size: 14px;
    font-weight: 600;
`;

export const Role = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #352EAE;
`;

export const CrewButton = styled.button`
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
    color: #fff;
    background: #352EAE;
    border-radius: 5px;
    padding: 5px 10px;
`;

export const Loading = styled.p`
    text-align: center;
    margin: 20px 0;
`;

// Administrator.jsx

export const AdminButton = styled.button`
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    margin-left: auto;
    color: #fff;
    background: #352EAE;
    border-radius: 5px;
    padding: 10px 15px;
`;

// LeaderTransfer.jsx

export const Attached = styled.p`
    height: 60px;
    font-size: 14px;
    margin:20px 10px;
    color: #898989;
    line-height: 1.5;
`;

// Delete.jsx

export const Warning = styled.p`
    font-size: 15px;
    margin:50px 10px;
    color: #000;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DeleteButton = styled.button`
    font-weight: 600;
    background: #FFE5E5;
    color: red;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 20px 10px;
    cursor: pointer;
    &:hover {
        background: #FFD1D1;
        transition: all 0.3s ease-in-out;
    }
`;

export const CancelButton = styled.button`
    font-weight: 600;
    background: #DEDFE7;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 20px 10px;
    cursor: pointer;
    &:hover {
        background: #C3C4CF;
        transition: all 0.3s ease-in-out;
    }
`;