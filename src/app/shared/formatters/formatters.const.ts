export const formatUrlImg = (imgUrl: string) => {
    if (!imgUrl) return '';
    return `linear-gradient(to top, var(--background-color), rgba(63, 81, 181, 0.1)),url('${imgUrl}')`;
}

export const formatUrlImgInternal = (imgUrl: string) => {
    if (!imgUrl) return '';
    return `url('${imgUrl}')`;
}