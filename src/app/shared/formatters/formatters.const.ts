export const formatUrlImg = (imgUrl: string) => {
    if (!imgUrl) return '';
    return `linear-gradient(to top, var(--background-color), rgba(67, 9, 173, 0.1)),url('${imgUrl}')`;
}

export const formatUrlImgInternal = (imgUrl: string) => {
    if (!imgUrl) return '';
    return `url('${imgUrl}')`;
}