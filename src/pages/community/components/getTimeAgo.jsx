export const getTimeAgo = (createdAt) => {
    // 서버 시간이 9시간 뒤처져 있다고 가정하고 보정
    const now = new Date();
    // 9시간을 밀리초로 변환: 9 * 60 * 60 * 1000 = 32400000
    const adjustedNow = new Date(now.getTime() - 32400000);
    const created = new Date(createdAt);
    
    const diffInMilliseconds = adjustedNow - created;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInMinutes < 1) {
        return '방금 전';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else if (diffInDays < 30) {
        return `${diffInDays}일 전`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}개월 전`;
    } else {
        return `${diffInYears}년 전`;
    }
};