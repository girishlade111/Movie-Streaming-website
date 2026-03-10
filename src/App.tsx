import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout, PlayerLayout } from './layouts';
import {
  Home,
  WatchPage,
  MovieDetail,
  LoginPage,
  RegisterPage,
  SearchPage,
  BrowsePage,
  MyListPage,
  ContinueWatchingPage,
  SettingsPage,
  SportsPage,
  TVGuidePage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="browse/:category" element={<BrowsePage />} />
          <Route path="browse/:category/:genre" element={<BrowsePage />} />
          <Route path="movies" element={<BrowsePage />} />
          <Route path="tv-shows" element={<BrowsePage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="tv-guide" element={<TVGuidePage />} />
          <Route path="my-list" element={<MyListPage />} />
          <Route path="continue-watching" element={<ContinueWatchingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="show/:id" element={<MovieDetail />} />
          <Route path="premium" element={<Home />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="terms" element={<Home />} />
          <Route path="privacy" element={<Home />} />
        </Route>

        {/* Player Layout Routes */}
        <Route path="/" element={<PlayerLayout />}>
          <Route path="watch/:id" element={<WatchPage />} />
        </Route>

        {/* Auth Routes (Standalone) */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
              <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
              <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
