import { API_BASE_URL } from '../constants';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, token } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add auth token if provided
  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  // Add body if provided
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Movie API endpoints
export const movieAPI = {
  getAll: () => apiRequest('/movies'),
  getById: (id: string) => apiRequest(`/movies/${id}`),
  getTrending: () => apiRequest('/movies/trending'),
  getNewReleases: () => apiRequest('/movies/new-releases'),
  getByGenre: (genre: string) => apiRequest(`/movies/genre/${genre}`),
  search: (query: string) => apiRequest(`/movies/search?q=${encodeURIComponent(query)}`),
};

// Auth API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', { method: 'POST', body: { email, password } }),
  register: (email: string, password: string, username: string) =>
    apiRequest('/auth/register', { method: 'POST', body: { email, password, username } }),
  logout: (token: string) => apiRequest('/auth/logout', { token }),
  getCurrentUser: (token: string) => apiRequest('/auth/me', { token }),
};

// User API endpoints
export const userAPI = {
  getWatchlist: (token: string) => apiRequest('/user/watchlist', { token }),
  addToWatchlist: (movieId: string, token: string) =>
    apiRequest('/user/watchlist', { method: 'POST', token, body: { movieId } }),
  removeFromWatchlist: (movieId: string, token: string) =>
    apiRequest(`/user/watchlist/${movieId}`, { method: 'DELETE', token }),
  getWatchHistory: (token: string) => apiRequest('/user/watch-history', { token }),
  updateProgress: (movieId: string, progress: number, token: string) =>
    apiRequest('/user/watch-history', { method: 'POST', token, body: { movieId, progress } }),
};
