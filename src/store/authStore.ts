import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  
  // Actions
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
  updateSubscription: (subscription: any) => void;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  token: null,

  setUser: () => {},
  setToken: (token) => set({ token }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  login: async () => {
    set({ isLoading: true });
    console.log('Login');
    set({ isLoading: false });
  },
  
  register: async () => {
    set({ isLoading: true });
    console.log('Register');
    set({ isLoading: false });
  },
  
  logout: () => {
    set({ token: null, isAuthenticated: false });
  },
  
  updateSubscription: () => {},
  
  addToWatchlist: () => {},
  
  removeFromWatchlist: () => {},
}));
