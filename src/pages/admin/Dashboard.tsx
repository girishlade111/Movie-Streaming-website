import AdminLayout from '../../layouts/AdminLayout';

export default function AdminDashboard() {
  const stats = {
    totalMovies: 1250,
    totalTVShows: 180,
    totalEpisodes: 4500,
    totalSports: 85,
    totalChannels: 45,
    storageUsed: 750,
    storageTotal: 1000,
    bandwidthUsed: 2400,
    activeUsers: 15420,
    totalViews: 1250000,
  };

  const topContent = [
    { rank: 1, title: 'Interstellar', views: '125K', type: 'Movie', trend: 'up' },
    { rank: 2, title: 'Stranger Things S4', views: '98K', type: 'TV Show', trend: 'up' },
    { rank: 3, title: 'The Dark Knight', views: '87K', type: 'Movie', trend: 'down' },
    { rank: 4, title: 'IPL 2024 Final', views: '250K', type: 'Sports', trend: 'up' },
    { rank: 5, title: 'Inception', views: '76K', type: 'Movie', trend: 'same' },
  ];

  const recentUploads = [
    { title: 'Oppenheimer', type: 'Movie', date: '2 hours ago', status: 'published' },
    { title: 'The Last of Us S2', type: 'TV Show', date: '5 hours ago', status: 'processing' },
    { title: 'F1 Monaco GP', type: 'Sports', date: '1 day ago', status: 'published' },
    { title: 'Dune: Part Two', type: 'Movie', date: '2 days ago', status: 'published' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your content.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Export Report
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Content
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Content"
            value={stats.totalMovies + stats.totalTVShows + stats.totalSports}
            subtitle={`${stats.totalMovies} Movies • ${stats.totalTVShows} TV Shows • ${stats.totalSports} Sports`}
            icon="🎬"
            trend="+12 this week"
          />
          <StatCard
            title="Storage Used"
            value={`${stats.storageUsed} GB`}
            subtitle={`of ${stats.storageTotal} GB total`}
            icon="💾"
            trend={`${Math.round((stats.storageUsed / stats.storageTotal) * 100)}% capacity`}
            trendWarning
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            subtitle="Currently streaming"
            icon="👥"
            trend="+23% from yesterday"
          />
          <StatCard
            title="Total Views"
            value={(stats.totalViews / 1000000).toFixed(1) + 'M'}
            subtitle="All time"
            icon="👁️"
            trend="+8.5% this month"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views Chart */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Views Overview (Last 7 Days)</h3>
            <div className="h-64 flex items-end gap-2">
              {[65, 45, 78, 52, 89, 72, 95].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-red-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-gray-400">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bandwidth Chart */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Bandwidth Usage</h3>
            <div className="space-y-4">
              <BandwidthBar label="Movies" value={45} color="bg-red-500" />
              <BandwidthBar label="TV Shows" value={32} color="bg-orange-500" />
              <BandwidthBar label="Sports" value={15} color="bg-yellow-500" />
              <BandwidthBar label="Live TV" value={8} color="bg-green-500" />
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center">
              <span className="text-gray-400">Total: {stats.bandwidthUsed} GB</span>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
          </div>
        </div>

        {/* Content Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Content */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Top Performing Content</h3>
              <a href="/admin/analytics" className="text-sm text-red-500 hover:text-red-400">View All</a>
            </div>
            <div className="space-y-3">
              {topContent.map((item) => (
                <div key={item.rank} className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-lg">
                  <span className="w-6 text-center font-bold text-gray-400">{item.rank}</span>
                  <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">
                    {item.type === 'Movie' ? '🎬' : item.type === 'TV Show' ? '📺' : '🏆'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{item.views}</p>
                    <span className={`text-xs ${item.trend === 'up' ? 'text-green-400' : item.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Uploads</h3>
              <a href="/admin/movies" className="text-sm text-red-500 hover:text-red-400">View All</a>
            </div>
            <div className="space-y-3">
              {recentUploads.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-lg">
                  <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center text-xl">
                    {item.type === 'Movie' ? '🎬' : item.type === 'TV Show' ? '📺' : '🏆'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.type} • {item.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'published' ? 'bg-green-600/20 text-green-400' :
                    item.status === 'processing' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HealthCard label="API Response Time" value="45ms" status="good" />
            <HealthCard label="Database" value="Connected" status="good" />
            <HealthCard label="Storage" value="75% Used" status="warning" />
            <HealthCard label="CDN" value="Active" status="good" />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, subtitle, icon, trend, trendWarning }: any) {
  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-white">{value}</h4>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-sm text-gray-400">{subtitle}</p>
      {trend && (
        <p className={`text-sm mt-2 ${trendWarning ? 'text-yellow-400' : 'text-green-400'}`}>
          {trend}
        </p>
      )}
    </div>
  );
}

function BandwidthBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HealthCard({ label, value, status }: any) {
  return (
    <div className="bg-neutral-800/50 rounded-lg p-4">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
        <span className="text-white font-medium">{value}</span>
      </div>
    </div>
  );
}
