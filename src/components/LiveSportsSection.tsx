import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LiveEvent {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  viewers: string;
  isLive: boolean;
  startTime?: string;
  channel: string;
}

export default function LiveSportsSection() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const liveEvents: LiveEvent[] = [
    {
      id: '1',
      title: 'Premier League: Manchester United vs Liverpool',
      category: 'Football',
      thumbnail: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64COcfe.jpg',
      viewers: '2.5M watching',
      isLive: true,
      channel: 'Sports HD',
    },
    {
      id: '2',
      title: 'NBA Finals: Lakers vs Celtics - Game 7',
      category: 'Basketball',
      thumbnail: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
      viewers: '1.8M watching',
      isLive: true,
      channel: 'Sports HD 2',
    },
    {
      id: '3',
      title: 'IPL 2024: Mumbai Indians vs Chennai Super Kings',
      category: 'Cricket',
      thumbnail: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
      viewers: '5.2M watching',
      isLive: true,
      channel: 'Cricket Live',
    },
    {
      id: '4',
      title: 'F1 Grand Prix: Monaco',
      category: 'Motorsport',
      thumbnail: 'https://image.tmdb.org/t/p/original/s3TBrRGB1jav7y4argnzPkNPZKs.jpg',
      viewers: '890K watching',
      isLive: true,
      channel: 'F1 TV',
    },
    {
      id: '5',
      title: 'Wimbledon: Men\'s Singles Final',
      category: 'Tennis',
      thumbnail: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8wYlsXQzEhRnJWE.jpg',
      viewers: '1.2M watching',
      isLive: true,
      channel: 'Tennis Channel',
    },
  ];

  const upcomingEvents = [
    { id: '101', title: 'Real Madrid vs Barcelona', time: 'Today, 11:30 PM', category: 'Football' },
    { id: '102', title: 'India vs Australia', time: 'Tomorrow, 2:00 PM', category: 'Cricket' },
    { id: '103', title: 'UFC 300: Main Card', time: 'Sunday, 8:00 PM', category: 'MMA' },
  ];

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-bold">Live Sports & TV</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-xs font-semibold text-red-500">LIVE</span>
          </div>
        </div>
        <Link
          to="/browse/sports"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
        >
          View All
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Live Events Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4">
        {liveEvents.map((event) => (
          <Link
            key={event.id}
            to={`/watch/live/${event.id}`}
            className="group relative aspect-video rounded-lg overflow-hidden bg-neutral-800 card-hover"
            onMouseEnter={() => setSelectedEvent(event.id)}
            onMouseLeave={() => setSelectedEvent(null)}
          >
            {/* Thumbnail */}
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            {/* Live Badge */}
            {event.isLive && (
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-red-600 rounded text-xs font-bold text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  LIVE
                </div>
              </div>
            )}

            {/* Channel Badge */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-neutral-950/80 backdrop-blur-sm rounded text-xs font-semibold">
              {event.channel}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-semibold text-white text-sm line-clamp-2 mb-2 group-hover:text-red-400 transition-colors">
                {event.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{event.category}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  {event.viewers}
                </span>
              </div>
            </div>

            {/* Play Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              selectedEvent === event.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                <svg className="w-6 h-6 text-neutral-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mt-8 px-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm truncate">{event.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{event.category}</p>
                <p className="text-xs text-red-400 mt-1">{event.time}</p>
              </div>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-semibold transition-colors">
                Notify
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
