import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { communityAPI } from '../../api';

const EditDeleteMenu = ({ 
    crewId, 
    feedId, 
    onDelete, 
    editPath 
}) => {
    const navigate = useNavigate();

    const handleEditStart = (e) => {
        e.stopPropagation();
        navigate(editPath || `/crews/${crewId}/crewCommunity/update/${feedId}`);
    };

    const handleDeleteFeed = async (e) => {
        e.stopPropagation();
        try {
            if (onDelete) {
                await onDelete(crewId, feedId);
            } else {
                await communityAPI.deleteCommunity(crewId, feedId);
            }

            alert('게시물이 삭제되었습니다.');

            window.location.reload();
        } catch (error) {
            console.error('삭제 실패:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownItem onClick={handleEditStart}>
                수정
            </DropdownItem>
            <DropdownItem onClick={handleDeleteFeed}>
                삭제
            </DropdownItem>
        </DropdownMenu>
    );
};

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: #444;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 10;
`;

const DropdownItem = styled.div`
    width:100px;
    font-size: 0.6em;
    padding: 8px 12px;
    cursor: pointer;
    &:hover {
        background-color:rgb(56, 56, 56);
    }
`;

export default EditDeleteMenu;