// Admin Dashboard Types

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'super-admin' | 'admin' | 'editor' | 'viewer';
  lastLogin?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalMovies: number;
  totalTVShows: number;
  totalEpisodes: number;
  totalSports: number;
  totalChannels: number;
  storageUsed: number; // GB
  storageTotal: number; // GB
  bandwidthUsed: number; // GB
  activeUsers: number;
  totalViews: number;
}

export interface ContentItem {
  _id: string;
  type: 'movie' | 'show' | 'sport' | 'channel';
  title: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  views: number;
  thumbnail: string;
}

export interface AnalyticsData {
  viewsByDate: { date: string; views: number }[];
  topContent: { id: string; title: string; views: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  qualityDistribution: { quality: string; percentage: number }[];
  watchTimeByHour: { hour: number; minutes: number }[];
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  apiResponseTime: number; // ms
  databaseStatus: 'connected' | 'disconnected';
  storageStatus: 'healthy' | 'warning' | 'full';
  cdnStatus: 'active' | 'degraded' | 'offline';
  lastBackup?: string;
}

export interface UploadProgress {
  id: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  size: number;
  uploadedAt?: string;
}
