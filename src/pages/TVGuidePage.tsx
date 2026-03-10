import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tvChannels } from '../constants/sportsData';

export default function TVGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentTime] = useState(new Date());

  const categories = ['all', 'sports', 'movies', 'entertainment', 'news', 'kids', 'music'];

  const filteredChannels = selectedCategory === 'all' 
    ? tvChannels 
    : tvChannels.filter(ch => ch.category === selectedCategory);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getProgramProgress = (startTime: string, endTime: string) => {
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return ((now - start) / (end - start)) * 100;
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">TV Guide</h1>
          <p className="text-gray-400">
            {formatTime(currentTime)} - Live TV Channels & Programs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TV Guide Grid */}
        <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800">
          {/* Header Row */}
          <div className="grid grid-cols-[200px_1fr] border-b border-neutral-800">
            <div className="p-4 border-r border-neutral-800 font-semibold">Channel</div>
            <div className="p-4">
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => {
                  const hour = new Date();
                  hour.setHours(hour.getHours() + i);
                  return (
                    <div key={i} className="flex-1 text-center text-sm text-gray-400 border-l border-neutral-800 pl-2">
                      {formatTime(hour)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="divide-y divide-neutral-800">
            {filteredChannels.map((channel) => {
              const currentProgram = channel.epg[0];
              const progress = currentProgram 
                ? getProgramProgress(currentProgram.startTime, currentProgram.endTime)
                : 0;

              return (
                <div key={channel.id} className="grid grid-cols-[200px_1fr] hover:bg-neutral-800/50 transition-colors">
                  {/* Channel Info */}
                  <Link
                    to={`/watch/tv/${channel.id}`}
                    className="p-4 border-r border-neutral-800 flex items-center gap-3"
                  >
                    <img src={channel.logo} alt={channel.name} className="h-8" />
                    <div>
                      <div className="font-medium text-sm">{channel.name}</div>
                      {channel.isHD && (
                        <span className="text-xs px-1.5 py-0.5 bg-neutral-700 rounded">HD</span>
                      )}
                    </div>
                  </Link>

                  {/* Programs Timeline */}
                  <div className="p-4">
                    <div className="relative">
                      {/* Current Time Indicator */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-red-600 z-10"
                        style={{ left: '16.67%' }} // Approximate position
                      >
                        <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-600 rounded-full" />
                      </div>

                      {/* Programs */}
                      <div className="flex gap-1">
                        {channel.epg.map((program) => (
                          <Link
                            key={program.id}
                            to={`/watch/tv/${channel.id}`}
                            className={`flex-1 p-3 rounded-lg border transition-colors ${
                              program.isLive
                                ? 'bg-red-600/20 border-red-600/50'
                                : 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {program.isLive && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                              )}
                              <span className="text-sm font-medium truncate">{program.title}</span>
                            </div>
                            <div className="text-xs text-gray-400 truncate">{program.genre}</div>
                            
                            {/* Progress Bar for Live */}
                            {program.isLive && (
                              <div className="mt-2 h-1 bg-neutral-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-red-600 transition-all duration-1000"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600/20 border border-red-600/50 rounded" />
            <span>Currently Playing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-4 bg-red-600" />
            <span>Current Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
