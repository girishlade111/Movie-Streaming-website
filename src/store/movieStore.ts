import { create } from 'zustand';
import type { Movie } from '../types';

interface MovieState {
  movies: Movie[];
  trendingMovies: Movie[];
  newReleases: Movie[];
  selectedMovie: Movie | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setMovies: (movies: Movie[]) => void;
  setTrendingMovies: (movies: Movie[]) => void;
  setNewReleases: (movies: Movie[]) => void;
  setSelectedMovie: (movie: Movie | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addMovie: (movie: Movie) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  trendingMovies: [],
  newReleases: [],
  selectedMovie: null,
  searchQuery: '',
  isLoading: false,
  error: null,

  setMovies: (movies) => set({ movies }),
  setTrendingMovies: (movies) => set({ trendingMovies: movies }),
  setNewReleases: (movies) => set({ newReleases: movies }),
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addMovie: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
}));
