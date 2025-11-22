import { Movie, Series, Episode, DashboardStats } from '../types';

const STORAGE_KEYS = {
  ADMIN_LOGGED: 'yakmov_admin_logged',
  MOVIES: 'yakmov_movies',
  SERIES: 'yakmov_series',
  EPISODES: 'yakmov_episodes'
};

// Auth
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED) === 'true';
};

export const loginAdmin = (): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED, 'true');
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_LOGGED);
};

// Movies
export const getMovies = (): Movie[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MOVIES);
  return data ? JSON.parse(data) : [];
};

export const saveMovie = (movie: Movie): void => {
  const movies = getMovies();
  movies.push(movie);
  localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
};

export const deleteMovie = (id: string): void => {
  const movies = getMovies().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
};

// Series
export const getSeries = (): Series[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SERIES);
  return data ? JSON.parse(data) : [];
};

export const saveSeries = (series: Series): void => {
  const allSeries = getSeries();
  allSeries.push(series);
  localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(allSeries));
};

export const deleteSeries = (id: string): void => {
  const allSeries = getSeries().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(allSeries));
  // Cascade delete episodes
  const episodes = getEpisodes().filter(e => e.seriesId !== id);
  localStorage.setItem(STORAGE_KEYS.EPISODES, JSON.stringify(episodes));
};

// Episodes
export const getEpisodes = (seriesId?: string): Episode[] => {
  const data = localStorage.getItem(STORAGE_KEYS.EPISODES);
  let episodes: Episode[] = data ? JSON.parse(data) : [];
  if (seriesId) {
    episodes = episodes.filter(e => e.seriesId === seriesId);
  }
  return episodes;
};

export const saveEpisode = (episode: Episode): void => {
  const episodes = getEpisodes();
  episodes.push(episode);
  localStorage.setItem(STORAGE_KEYS.EPISODES, JSON.stringify(episodes));
};

export const deleteEpisode = (id: string): void => {
  const episodes = getEpisodes().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EPISODES, JSON.stringify(episodes));
};

// Stats
export const getStats = (): DashboardStats => {
  const movies = getMovies();
  const series = getSeries();
  const episodes = getEpisodes();
  
  // Mock view count calculation
  const movieViews = movies.reduce((acc, curr) => acc + (curr.views || 0), 0);
  
  return {
    totalMovies: movies.length,
    totalSeries: series.length,
    totalEpisodes: episodes.length,
    totalViews: movieViews + (episodes.length * 150) // Fake multiplier for series views
  };
};

// Helper to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};