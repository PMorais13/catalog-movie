const ulrBase = 'https://api.themoviedb.org/3/';
// const url = 'https://api.themoviedb.org/3/search/movie?query=star-wars&include_adult=false&language=en-US&page=1';
export const endpoint = {
    search: ulrBase + 'search/movie',
    popular: ulrBase + 'movie/popular',
    topRated: ulrBase + 'movie/top_rated',
    image: ulrBase + 'movie/'
}