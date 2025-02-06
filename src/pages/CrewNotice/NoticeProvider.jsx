import React, { createContext, useContext, useState } from 'react';

const NoticeContext = createContext(null);
export const useNotices = () => useContext(NoticeContext);

const initialNoticeList = [
    { id: 1, content: "첫 번째 공지사항 내용입니다.\ndd", date: "2024.12.10 (화)", time: "12:00", 
        isPinned: false, isOpenedMenu: false, isEnabled: false },
    { id: 2, content: "두 번째 공지사항 내용입니다.", date: "2024.12.10 (화)", time: "13:00",
         isPinned: false, isOpenedMenu: false, isEnabled: false },
    { id: 3, content: "세 번째 공지사항 내용입니다.", date: "2024.12.12 (목)", time: "03:00",
         isPinned: false, isOpenedMenu: false, isEnabled: true }
];

export const NoticeProvider = ({ children }) => {
    const [noticeList, setNoticeList] = useState(initialNoticeList);

    return (
        <NoticeContext.Provider value={{ noticeList, setNoticeList }}>
            {children}
        </NoticeContext.Provider>
    );
};