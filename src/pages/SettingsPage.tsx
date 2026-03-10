import { useState } from 'react';
import { usePreferences } from '../store/hooks';

export default function SettingsPage() {
  const { preferences, updatePreferences, resetPreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState<'playback' | 'subtitles' | 'notifications' | 'account'>('playback');

  const handleToggle = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] } as any);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-neutral-800 mb-8">
          {(['playback', 'subtitles', 'notifications', 'account'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-medium transition-colors relative capitalize ${
                activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Playback Settings */}
        {activeTab === 'playback' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Playback</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autoplay</h3>
                    <p className="text-sm text-gray-400">Automatically start playing content</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoPlay')}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.autoPlay ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.autoPlay ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autoplay Next Episode</h3>
                    <p className="text-sm text-gray-400">Automatically play next episode</p>
                  </div>
                  <button
                    onClick={() => handleToggle('autoPlayNextEpisode')}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.autoPlayNextEpisode ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.autoPlayNextEpisode ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Default Quality</h3>
                    <p className="text-sm text-gray-400">Preferred streaming quality</p>
                  </div>
                  <select
                    value={preferences.playbackQuality}
                    onChange={(e) => updatePreferences({ playbackQuality: e.target.value as any })}
                    className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="auto">Auto</option>
                    <option value="4K">4K Ultra HD</option>
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Downloads</h2>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Download Quality</h3>
                  <p className="text-sm text-gray-400">Quality for downloaded content</p>
                </div>
                <select
                  value={preferences.downloadQuality}
                  onChange={(e) => updatePreferences({ downloadQuality: e.target.value as any })}
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Subtitles Settings */}
        {activeTab === 'subtitles' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Subtitles</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Subtitles</h3>
                    <p className="text-sm text-gray-400">Show subtitles by default</p>
                  </div>
                  <button
                    onClick={() => updatePreferences({ subtitles: { ...preferences.subtitles, enabled: !preferences.subtitles.enabled } })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.subtitles.enabled ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.subtitles.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Subtitle Language</h3>
                    <p className="text-sm text-gray-400">Preferred subtitle language</p>
                  </div>
                  <select
                    value={preferences.subtitles.language}
                    onChange={(e) => updatePreferences({ subtitles: { ...preferences.subtitles, language: e.target.value } })}
                    className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Font Size</h3>
                    <p className="text-sm text-gray-400">Subtitle text size</p>
                  </div>
                  <select
                    value={preferences.subtitles.fontSize}
                    onChange={(e) => updatePreferences({ subtitles: { ...preferences.subtitles, fontSize: e.target.value as any } })}
                    className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => updatePreferences({ notifications: { ...preferences.notifications, email: !preferences.notifications.email } })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.notifications.email ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.email ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Releases</h3>
                    <p className="text-sm text-gray-400">Get notified about new content</p>
                  </div>
                  <button
                    onClick={() => updatePreferences({ notifications: { ...preferences.notifications, newReleases: !preferences.notifications.newReleases } })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.notifications.newReleases ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.newReleases ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Recommendations</h3>
                    <p className="text-sm text-gray-400">Personalized content suggestions</p>
                  </div>
                  <button
                    onClick={() => updatePreferences({ notifications: { ...preferences.notifications, recommendations: !preferences.notifications.recommendations } })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      preferences.notifications.recommendations ? 'bg-red-600' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.notifications.recommendations ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Account</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Data</h2>
              
              <div className="space-y-4">
                <button
                  onClick={resetPreferences}
                  className="w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg font-medium transition-colors"
                >
                  Reset All Preferences
                </button>
                <button className="w-full px-4 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg font-medium transition-colors">
                  Clear Watch History
                </button>
                <button className="w-full px-4 py-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-lg font-medium transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
