import { useEffect } from 'react';
import { HeroBanner, ContentRow } from '../components';
import { useMovieStore } from '../store';
import type { Movie } from '../types';

// Mock data for demonstration
const mockMovies: Movie[] = [
  {
    _id: '1',
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseYear: 2014,
    duration: 169,
    rating: 8.6,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    thumbnail: 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHt40H07A5KWYJL.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K',
    isTrending: true,
    isNewRelease: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    releaseYear: 2008,
    duration: 152,
    rating: 9.0,
    genre: ['Action', 'Crime', 'Drama'],
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8wYlsXQzEhRnJWE.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K',
    isTrending: true,
    isNewRelease: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.',
    releaseYear: 2010,
    duration: 148,
    rating: 8.8,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    director: 'Christopher Nolan',
    thumbnail: 'https://image.tmdb.org/t/p/w500/9gk7admal4ZLcnwnCSmYd2t8bU.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1jav7y4argnzPkNPZKs.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K',
    isTrending: true,
    isNewRelease: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    title: 'The Matrix',
    description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    releaseYear: 1999,
    duration: 136,
    rating: 8.7,
    genre: ['Action', 'Sci-Fi'],
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    director: 'Lana Wachowski',
    thumbnail: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9Gkd9EpXUkU4.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'FHD',
    isTrending: false,
    isNewRelease: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '5',
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
    releaseYear: 2019,
    duration: 181,
    rating: 8.4,
    genre: ['Action', 'Adventure', 'Drama'],
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
    director: 'Anthony Russo',
    thumbnail: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: '4K',
    isTrending: true,
    isNewRelease: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '6',
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    releaseYear: 1994,
    duration: 154,
    rating: 8.9,
    genre: ['Crime', 'Drama'],
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    director: 'Quentin Tarantino',
    thumbnail: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    quality: 'FHD',
    isTrending: false,
    isNewRelease: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const { setMovies, setTrendingMovies, setNewReleases, movies, trendingMovies } = useMovieStore();

  useEffect(() => {
    // In a real app, fetch from API
    setMovies(mockMovies);
    setTrendingMovies(mockMovies.filter(m => m.isTrending));
    setNewReleases(mockMovies.filter(m => m.isNewRelease));
  }, [setMovies, setTrendingMovies, setNewReleases]);

  const featuredMovie = movies[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* Content Sections */}
      <div className="space-y-8 -mt-32 relative z-10">
        <ContentRow title="Trending Now" movies={trendingMovies} />
        <ContentRow title="New Releases" movies={mockMovies.filter(m => m.isNewRelease)} />
        <ContentRow title="Action Movies" movies={mockMovies.filter(m => m.genre.includes('Action'))} />
        <ContentRow title="Sci-Fi Adventures" movies={mockMovies.filter(m => m.genre.includes('Sci-Fi'))} />
        <ContentRow title="Continue Watching" movies={mockMovies.slice(2, 5)} variant="landscape" />
      </div>
    </div>
  );
}
