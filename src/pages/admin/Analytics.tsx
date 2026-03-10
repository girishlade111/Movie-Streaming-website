import AdminLayout from '../../layouts/AdminLayout';

export default function AdminAnalytics() {
  const viewsData = [
    { day: 'Mon', views: 45000 },
    { day: 'Tue', views: 52000 },
    { day: 'Wed', views: 48000 },
    { day: 'Thu', views: 61000 },
    { day: 'Fri', views: 78000 },
    { day: 'Sat', views: 92000 },
    { day: 'Sun', views: 85000 },
  ];

  const deviceData = [
    { device: 'Smart TV', percentage: 35, color: 'bg-red-500' },
    { device: 'Mobile', percentage: 28, color: 'bg-orange-500' },
    { device: 'Desktop', percentage: 22, color: 'bg-yellow-500' },
    { device: 'Tablet', percentage: 15, color: 'bg-green-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Track performance and user engagement</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AnalyticsCard title="Total Views" value="1.25M" change="+12.5%" positive />
          <AnalyticsCard title="Watch Time" value="45K hrs" change="+8.2%" positive />
          <AnalyticsCard title="Avg. Session" value="42 min" change="-2.1%" positive={false} />
          <AnalyticsCard title="Completion Rate" value="68%" change="+5.3%" positive />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views Chart */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Views Over Time</h3>
            <div className="h-64 flex items-end gap-4">
              {viewsData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs text-gray-400">{(item.views / 1000).toFixed(0)}K</div>
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-red-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.views / 100000) * 100}%` }}
                  />
                  <span className="text-sm text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Device Breakdown</h3>
            <div className="space-y-6">
              {deviceData.map((item) => (
                <div key={item.device}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{item.device}</span>
                    <span className="text-white font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Content Table */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Content</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase">
                <th className="pb-4">Rank</th>
                <th className="pb-4">Content</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Views</th>
                <th className="pb-4">Watch Time</th>
                <th className="pb-4">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {[
                { rank: 1, title: 'IPL 2024 Final', type: 'Sports', views: '250K', time: '12K hrs', completion: '85%' },
                { rank: 2, title: 'Interstellar', type: 'Movie', views: '125K', time: '8.5K hrs', completion: '92%' },
                { rank: 3, title: 'Stranger Things S4', type: 'TV Show', views: '98K', time: '6.2K hrs', completion: '78%' },
                { rank: 4, title: 'The Dark Knight', type: 'Movie', views: '87K', time: '5.8K hrs', completion: '88%' },
                { rank: 5, title: 'F1 Monaco GP', type: 'Sports', views: '76K', time: '4.5K hrs', completion: '82%' },
              ].map((item) => (
                <tr key={item.rank}>
                  <td className="py-4">
                    <span className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-white">
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-medium text-white">{item.title}</span>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-gray-300">{item.type}</span>
                  </td>
                  <td className="py-4 text-gray-400">{item.views}</td>
                  <td className="py-4 text-gray-400">{item.time}</td>
                  <td className="py-4">
                    <span className="text-green-400 font-medium">{item.completion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function AnalyticsCard({ title, value, change, positive }: any) {
  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h4 className="text-2xl font-bold text-white mb-2">{value}</h4>
      <p className={`text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? '↑' : '↓'} {change} from last week
      </p>
    </div>
  );
}
