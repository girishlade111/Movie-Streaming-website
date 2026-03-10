import { HeroBanner, ContentRow, CategoryNav, LiveSportsSection } from '../components';
import { useAppStore } from '../store';
import { movies, tvShows } from '../constants/mockData';

export default function Home() {
  const { getContinueWatchingItems } = useAppStore();

  const allContent = [...movies, ...tvShows];
  const trendingContent = allContent.filter(m => m.isTrending);
  const newReleases = allContent.filter(m => m.isNewRelease);
  const topRated = [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const actionMovies = allContent.filter(m => m.genre.includes('Action'));
  const sciFiContent = allContent.filter(m => m.genre.includes('Sci-Fi'));
  const comedyContent = allContent.filter(m => m.genre.includes('Comedy'));
  const horrorContent = allContent.filter(m => m.genre.includes('Horror'));
  const continueWatchingItems = getContinueWatchingItems();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

      {/* Category Navigation */}
      <CategoryNav />

      {/* Content Sections */}
      <div className="space-y-8 py-8">
        {continueWatchingItems.length > 0 && (
          <ContentRow
            title="Continue Watching"
            movies={continueWatchingItems}
            variant="landscape"
            seeAllLink="/my-list"
          />
        )}

        {/* Top 10 Section */}
        <ContentRow
          title="Top 10 Today"
          movies={topRated}
          variant="poster"
          showRank
        />

        {/* Trending Now */}
        <ContentRow
          title="🔥 Trending Now"
          movies={trendingContent}
          variant="poster"
          seeAllLink="/browse/trending"
        />

        {/* Live Sports Section */}
        <LiveSportsSection />

        {/* New Releases */}
        <ContentRow
          title="🆕 New Releases"
          movies={newReleases}
          variant="poster"
          seeAllLink="/browse/new-releases"
        />

        {/* Action Movies */}
        <ContentRow
          title="Action & Adventure"
          movies={actionMovies}
          variant="poster"
          seeAllLink="/browse/action"
        />

        {/* Sci-Fi & Fantasy */}
        <ContentRow
          title="Sci-Fi & Fantasy"
          movies={sciFiContent}
          variant="poster"
          seeAllLink="/browse/sci-fi"
        />

        {/* Comedy */}
        <ContentRow
          title="Comedy"
          movies={comedyContent}
          variant="poster"
          seeAllLink="/browse/comedy"
        />

        {/* Horror */}
        <ContentRow
          title="Horror & Thriller"
          movies={horrorContent}
          variant="poster"
          seeAllLink="/browse/horror"
        />

        {/* TV Shows */}
        <ContentRow
          title="Popular TV Shows"
          movies={tvShows}
          variant="poster"
          seeAllLink="/browse/tv-shows"
        />

        {/* Recommended For You */}
        <ContentRow
          title="Because You Watched Interstellar"
          movies={[...sciFiContent].sort(() => 0.5 - Math.random()).slice(0, 6)}
          variant="poster"
        />
      </div>
    </div>
  );
}
