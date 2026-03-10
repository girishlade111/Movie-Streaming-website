import { create } from 'zustand';
import type { User, Subscription } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (subscription: Subscription) => void;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  login: async () => {
    set({ isLoading: true });
    // TODO: Implement API call
    console.log('Login');
    set({ isLoading: false });
  },
  
  register: async () => {
    set({ isLoading: true });
    // TODO: Implement API call
    console.log('Register');
    set({ isLoading: false });
  },
  
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateSubscription: (subscription: Subscription) => {
    set((state) => ({
      user: state.user ? { ...state.user, subscription } : null,
    }));
  },
  
  addToWatchlist: (movieId: string) => {
    set((state) => ({
      user: state.user ? {
        ...state.user,
        watchlist: [...state.user.watchlist, movieId]
      } : null,
    }));
  },
  
  removeFromWatchlist: (movieId: string) => {
    set((state) => ({
      user: state.user ? {
        ...state.user,
        watchlist: state.user.watchlist.filter(id => id !== movieId)
      } : null,
    }));
  },
}));
