import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'StreamFlix',
    tagline: 'Watch Unlimited Movies & TV Shows',
    themeColor: '#E50914',
    defaultLanguage: 'en',
    defaultQuality: 'auto',
    autoPlay: true,
    autoPlayNext: true,
    enableDownloads: true,
    maxStreamingQuality: '4K',
    enableSubtitles: true,
    defaultSubtitleLanguage: 'en',
    enableNotifications: true,
    enableEmailAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Configure your platform settings</p>
          </div>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* General Settings */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Platform Name</label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme Color</label>
              <div className="flex gap-4">
                <input
                  type="color"
                  value={settings.themeColor}
                  onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                  className="w-16 h-10 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.themeColor}
                  onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                  className="flex-1 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playback Settings */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Playback Settings</h3>
          <div className="space-y-4">
            <ToggleSetting
              label="Autoplay"
              description="Automatically start playing content"
              enabled={settings.autoPlay}
              onChange={(v: boolean) => setSettings({ ...settings, autoPlay: v })}
            />
            <ToggleSetting
              label="Autoplay Next Episode"
              description="Automatically play next episode after current ends"
              enabled={settings.autoPlayNext}
              onChange={(v: boolean) => setSettings({ ...settings, autoPlayNext: v })}
            />
            <ToggleSetting
              label="Enable Downloads"
              description="Allow users to download content for offline viewing"
              enabled={settings.enableDownloads}
              onChange={(v: boolean) => setSettings({ ...settings, enableDownloads: v })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Max Streaming Quality</label>
              <select
                value={settings.maxStreamingQuality}
                onChange={(e) => setSettings({ ...settings, maxStreamingQuality: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="4K">4K Ultra HD</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subtitle Settings */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Subtitle Settings</h3>
          <div className="space-y-4">
            <ToggleSetting
              label="Enable Subtitles"
              description="Allow subtitles on all content"
              enabled={settings.enableSubtitles}
              onChange={(v: boolean) => setSettings({ ...settings, enableSubtitles: v })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Default Subtitle Language</label>
              <select
                value={settings.defaultSubtitleLanguage}
                onChange={(e) => setSettings({ ...settings, defaultSubtitleLanguage: e.target.value })}
                className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Notification Settings</h3>
          <div className="space-y-4">
            <ToggleSetting
              label="Enable Notifications"
              description="Send push notifications to users"
              enabled={settings.enableNotifications}
              onChange={(v: boolean) => setSettings({ ...settings, enableNotifications: v })}
            />
            <ToggleSetting
              label="Email Alerts"
              description="Send email alerts for system events"
              enabled={settings.enableEmailAlerts}
              onChange={(v: boolean) => setSettings({ ...settings, enableEmailAlerts: v })}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function ToggleSetting({ label, description, enabled, onChange }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <h4 className="font-medium text-white">{label}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          enabled ? 'bg-red-600' : 'bg-neutral-700'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
