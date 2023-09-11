export const ulrBase = 'https://api.themoviedb.org/3/';
// 'https://api.themoviedb.org/3/search/movie?query=star%20wars&include_adult=false&language=en-US&page=1' \;
export const endpoint = {
    search: ulrBase + 'search/movie',
    popular: ulrBase + 'movie/popular',
    topRated: ulrBase + 'movie/top_rated',
    discover: ulrBase + 'discover/',
}