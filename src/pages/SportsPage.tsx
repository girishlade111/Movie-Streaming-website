import { useState } from 'react';
import { Link } from 'react-router-dom';
import { liveEvents, upcomingEvents, completedEvents, sportsCategories, tvChannels } from '../constants/sportsData';
import type { LiveEvent } from '../types/sports';

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'replays'>('live');

  const filterEvents = (events: LiveEvent[]) => {
    if (selectedSport === 'all') return events;
    return events.filter(e => e.sport === selectedSport);
  };

  const liveCount = liveEvents.length;
  const upcomingCount = upcomingEvents.length;

  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-12">
      {/* Hero - Featured Live Event */}
      {liveEvents.length > 0 && (
        <section className="relative h-[60vh] min-h-[500px] mb-8">
          <div className="absolute inset-0">
            <img
              src="https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYkJu64COcfe.jpg"
              alt="Featured Event"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
            <div className="max-w-3xl">
              {/* LIVE Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  <span className="text-xs font-bold text-white">LIVE</span>
                </div>
                <span className="text-gray-300">{liveEvents[0].viewers}</span>
              </div>

              {/* Teams & Score */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <img
                    src={liveEvents[0].homeTeam.logo}
                    alt={liveEvents[0].homeTeam.name}
                    className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2"
                  />
                  <h3 className="text-lg md:text-xl font-bold">{liveEvents[0].homeTeam.shortName}</h3>
                </div>

                <div className="text-center px-6">
                  <div className="text-4xl md:text-6xl font-bold mb-2">
                    {liveEvents[0].currentScore?.home} - {liveEvents[0].currentScore?.away}
                  </div>
                  <div className="text-sm md:text-base text-gray-400">
                    {liveEvents[0].currentScore?.period || liveEvents[0].currentScore?.innings}
                    {liveEvents[0].minute && ` • ${liveEvents[0].minute}'`}
                  </div>
                </div>

                <div className="text-center">
                  <img
                    src={liveEvents[0].awayTeam.logo}
                    alt={liveEvents[0].awayTeam.name}
                    className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-2"
                  />
                  <h3 className="text-lg md:text-xl font-bold">{liveEvents[0].awayTeam.shortName}</h3>
                </div>
              </div>

              {/* Tournament Info */}
              <p className="text-gray-400 mb-6">
                {liveEvents[0].tournament} • {liveEvents[0].venue}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link
                  to={`/watch/live/${liveEvents[0].id}`}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg flex items-center gap-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Live
                </Link>
                <button className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Highlights
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4">
        {/* Sports Categories */}
        <section className="mb-8">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setSelectedSport('all')}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-colors ${
                selectedSport === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
            >
              All Sports
            </button>
            {sportsCategories.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedSport === sport.id
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                <span>{sport.icon}</span>
                <span>{sport.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-8">
          <div className="flex items-center gap-6 border-b border-neutral-800">
            <button
              onClick={() => setActiveTab('live')}
              className={`pb-3 px-2 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'live' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Now
              {liveCount > 0 && (
                <span className="px-2 py-0.5 bg-red-600 rounded-full text-xs font-bold">{liveCount}</span>
              )}
              {activeTab === 'live' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 px-2 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'upcoming' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming
              {upcomingCount > 0 && (
                <span className="px-2 py-0.5 bg-neutral-700 rounded-full text-xs font-bold">{upcomingCount}</span>
              )}
              {activeTab === 'upcoming' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('replays')}
              className={`pb-3 px-2 font-medium transition-colors relative ${
                activeTab === 'replays' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Replays
              {activeTab === 'replays' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
          </div>
        </section>

        {/* Live Events Grid */}
        {activeTab === 'live' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Live Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(liveEvents).map((event) => (
                <LiveEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(upcomingEvents).map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Replays */}
        {activeTab === 'replays' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Replays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(completedEvents).map((event) => (
                <CompletedEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* TV Channels Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Live TV Channels</h2>
            <Link to="/tv-guide" className="text-red-500 hover:text-red-400 text-sm font-medium flex items-center gap-1">
              View TV Guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tvChannels.slice(0, 3).map((channel) => (
              <TVChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Live Event Card Component
function LiveEventCard({ event }: { event: LiveEvent }) {
  return (
    <Link to={`/watch/live/${event.id}`} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={event.homeTeam.logo}
          alt={event.tournament}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        
        {/* LIVE Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 rounded text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        </div>

        {/* Score */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={event.homeTeam.logo} alt={event.homeTeam.name} className="w-8 h-8" />
              <span className="font-semibold">{event.currentScore?.home}</span>
            </div>
            <span className="text-sm text-gray-400">{event.currentScore?.period || event.minute}'</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{event.currentScore?.away}</span>
              <img src={event.awayTeam.logo} alt={event.awayTeam.name} className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{event.tournament}</span>
          <span className="text-xs px-2 py-1 bg-neutral-800 rounded">{event.sport}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">{event.homeTeam.name}</span>
          <span className="text-gray-500 text-sm">vs</span>
          <span className="font-medium">{event.awayTeam.name}</span>
        </div>
      </div>
    </Link>
  );
}

// Upcoming Event Card Component
function UpcomingEventCard({ event }: { event: LiveEvent }) {
  const hoursUntilStart = Math.ceil((new Date(event.startTime).getTime() - Date.now()) / 3600000);

  return (
    <div className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">{event.tournament}</span>
          <span className="text-xs px-2 py-1 bg-neutral-800 rounded">{event.sport}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <img src={event.homeTeam.logo} alt={event.homeTeam.name} className="w-12 h-12 mx-auto mb-2" />
            <span className="text-sm font-medium">{event.homeTeam.shortName}</span>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">VS</div>
          </div>
          <div className="text-center">
            <img src={event.awayTeam.logo} alt={event.awayTeam.name} className="w-12 h-12 mx-auto mb-2" />
            <span className="text-sm font-medium">{event.awayTeam.shortName}</span>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="text-sm text-gray-400">Starts in {hoursUntilStart}h</div>
          <div className="text-xs text-gray-500">{new Date(event.startTime).toLocaleTimeString()}</div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors">
            Set Reminder
          </button>
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Completed Event Card Component
function CompletedEventCard({ event }: { event: LiveEvent }) {
  return (
    <Link to={`/watch/replay/${event.id}`} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="relative aspect-video">
        <img src={event.homeTeam.logo} alt={event.tournament} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{event.tournament}</span>
          <span className="text-xs px-2 py-1 bg-neutral-800 rounded">Full Replay</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={event.homeTeam.logo} alt={event.homeTeam.name} className="w-6 h-6" />
            <span className="font-semibold">{event.currentScore?.home}</span>
          </div>
          <span className="text-gray-500 text-sm">-</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{event.currentScore?.away}</span>
            <img src={event.awayTeam.logo} alt={event.awayTeam.name} className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{event.homeTeam.name}</span>
          <span>vs</span>
          <span>{event.awayTeam.name}</span>
        </div>
      </div>
    </Link>
  );
}

// TV Channel Card Component
function TVChannelCard({ channel }: { channel: any }) {
  const currentProgram = channel.epg[0];

  return (
    <Link to={`/watch/tv/${channel.id}`} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <img src={channel.logo} alt={channel.name} className="h-10" />
          {channel.isHD && (
            <span className="text-xs px-2 py-1 bg-neutral-800 rounded font-semibold">HD</span>
          )}
        </div>

        {currentProgram && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              {currentProgram.isLive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
              <span className="text-sm font-medium">{currentProgram.title}</span>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">{currentProgram.description}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
