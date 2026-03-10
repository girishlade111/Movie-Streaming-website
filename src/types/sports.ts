// Sports & Live TV Types

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  colors: string[];
  form?: ('W' | 'L' | 'D')[]; // Last 5 matches
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  position: string;
  number?: number;
  nationality: string;
}

export interface Score {
  home: number | string;
  away: number | string;
  innings?: string;
  overs?: string;
  period?: string; // Q1, Q2, 1st Half, etc.
}

export interface MatchStats {
  possession?: number;
  shots?: number;
  shotsOnTarget?: number;
  corners?: number;
  fouls?: number;
  yellowCards?: number;
  redCards?: number;
  [key: string]: number | string | undefined;
}

export interface LiveEvent {
  id: string;
  sport: string;
  tournament: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string; // ISO date
  status: 'upcoming' | 'live' | 'completed' | 'postponed';
  currentScore?: Score;
  streamUrl: string;
  multiCamera?: boolean;
  commentaryLanguages: string[];
  venue?: string;
  stats?: MatchStats;
  minute?: number; // Current minute/period
  isLive?: boolean;
  viewers?: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  logo: string;
  season: string;
  standings?: Standing[];
  topScorers?: Player[];
  matches?: LiveEvent[];
}

export interface Standing {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form?: ('W' | 'L' | 'D')[];
}

export interface TVChannel {
  id: string;
  name: string;
  logo: string;
  category: string;
  language: string;
  isHD: boolean;
  streamUrl: string;
  epg: TVProgram[];
}

export interface TVProgram {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  genre: string;
  thumbnail?: string;
  isLive?: boolean;
  isRepeat?: boolean;
  rating?: string;
}

export interface Highlight {
  id: string;
  eventId: string;
  title: string;
  description: string;
  thumbnail: string;
  startTime: number; // seconds
  endTime: number; // seconds
  duration: number; // seconds
  type: 'goal' | 'wicket' | 'catch' | 'six' | 'four' | 'save' | 'other';
  timestamp: string; // ISO date
}

export interface SportsNotification {
  id: string;
  eventId: string;
  type: 'goal' | 'wicket' | 'match_start' | 'match_end' | 'half_time' | 'full_time';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export type SportCategory = 
  | 'cricket'
  | 'football'
  | 'tennis'
  | 'basketball'
  | 'formula1'
  | 'esports'
  | 'hockey'
  | 'kabaddi'
  | 'badminton'
  | 'volleyball'
  | 'more';
