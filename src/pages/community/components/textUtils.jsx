const stripHtmlAndTruncate = (html, maxLength = null) => {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return maxLength ? `${text.substring(0, maxLength)} ··· ` : text;
};

export default stripHtmlAndTruncate;