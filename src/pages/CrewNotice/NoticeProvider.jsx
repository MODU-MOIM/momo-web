import React, { createContext, useContext, useState } from 'react';

const NoticeContext = createContext(null);
export const useNotices = () => useContext(NoticeContext);


export const NoticeProvider = ({ children }) => {
    const [noticeList, setNoticeList] = useState([]);

    return (
        <NoticeContext.Provider value={{ noticeList, setNoticeList }}>
            {children}
        </NoticeContext.Provider>
    );
};