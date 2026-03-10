import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout, PlayerLayout } from './layouts';
import { Home, WatchPage, MovieDetail, LoginPage, RegisterPage, SearchPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Home />} />
          <Route path="tv-shows" element={<Home />} />
          <Route path="my-list" element={<Home />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>

        {/* Player Layout Routes */}
        <Route path="/" element={<PlayerLayout />}>
          <Route path="watch/:id" element={<WatchPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 404 Route */}
        <Route path="*" element={<div className="min-h-screen bg-dark-950 flex items-center justify-center text-white">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
