import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''; // To be added by user in .env
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const movieService = {
  getTrending: async () => {
    const response = await tmdbApi.get('/trending/movie/day');
    return response.data.results;
  },
  
  getPopular: async () => {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
  },
  
  getTopRated: async () => {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
  },
  
  getMovieDetails: async (id) => {
    const response = await tmdbApi.get(`/movie/${id}?append_to_response=videos,credits,similar,recommendations`);
    return response.data;
  },
  
  searchMovies: async (query) => {
    const response = await tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}`);
    return response.data.results;
  },
  
  getSimilarMovies: async (id) => {
    const response = await tmdbApi.get(`/movie/${id}/similar`);
    return response.data.results;
  },

  getGenres: async () => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  }
};

export const getImageUrl = (path, size = 'original') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export default tmdbApi;
