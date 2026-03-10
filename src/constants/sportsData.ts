import type { LiveEvent, Tournament, TVChannel, Highlight } from '../types/sports';

// Mock Live Events
export const liveEvents: LiveEvent[] = [
  {
    id: 'live-1',
    sport: 'cricket',
    tournament: 'IPL 2024',
    homeTeam: {
      id: 'mi',
      name: 'Mumbai Indians',
      shortName: 'MI',
      logo: 'https://via.placeholder.com/60x60/004BA0/FFFFFF?text=MI',
      colors: ['#004BA0', '#D1AB3E'],
      form: ['W', 'W', 'L', 'W', 'L'],
    },
    awayTeam: {
      id: 'csk',
      name: 'Chennai Super Kings',
      shortName: 'CSK',
      logo: 'https://via.placeholder.com/60x60/FDB913/000000?text=CSK',
      colors: ['#FDB913', '#004BA0'],
      form: ['W', 'L', 'W', 'W', 'W'],
    },
    startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    status: 'live',
    currentScore: {
      home: '185/4',
      away: '142/6',
      overs: '16.3',
      innings: '2nd Innings',
    },
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    multiCamera: true,
    commentaryLanguages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    venue: 'Wankhede Stadium, Mumbai',
    isLive: true,
    viewers: '2.5M watching',
    minute: 99,
  },
  {
    id: 'live-2',
    sport: 'football',
    tournament: 'Premier League',
    homeTeam: {
      id: 'mun',
      name: 'Manchester United',
      shortName: 'MUN',
      logo: 'https://via.placeholder.com/60x60/DA291C/FFFFFF?text=MUN',
      colors: ['#DA291C', '#FBE122'],
      form: ['W', 'D', 'L', 'W', 'W'],
    },
    awayTeam: {
      id: 'liv',
      name: 'Liverpool',
      shortName: 'LIV',
      logo: 'https://via.placeholder.com/60x60/C8102E/FFFFFF?text=LIV',
      colors: ['#C8102E', '#00B2A9'],
      form: ['W', 'W', 'W', 'D', 'W'],
    },
    startTime: new Date(Date.now() - 2700000).toISOString(), // 45 min ago
    status: 'live',
    currentScore: {
      home: 2,
      away: 1,
      period: '2nd Half',
    },
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    multiCamera: true,
    commentaryLanguages: ['English', 'Spanish', 'Arabic'],
    venue: 'Old Trafford, Manchester',
    isLive: true,
    viewers: '3.8M watching',
    minute: 67,
  },
  {
    id: 'live-3',
    sport: 'tennis',
    tournament: 'Wimbledon',
    homeTeam: {
      id: 'player1',
      name: 'Novak Djokovic',
      shortName: 'DJO',
      logo: 'https://via.placeholder.com/60x60/0085C7/FFFFFF?text=DJO',
      colors: ['#0085C7'],
    },
    awayTeam: {
      id: 'player2',
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logo: 'https://via.placeholder.com/60x60/FF6B00/FFFFFF?text=ALC',
      colors: ['#FF6B00'],
    },
    startTime: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
    status: 'live',
    currentScore: {
      home: '2',
      away: '1',
      period: '4th Set',
    },
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    multiCamera: true,
    commentaryLanguages: ['English'],
    venue: 'Centre Court, London',
    isLive: true,
    viewers: '1.2M watching',
    minute: 150,
  },
];

// Mock Upcoming Events
export const upcomingEvents: LiveEvent[] = [
  {
    id: 'upcoming-1',
    sport: 'cricket',
    tournament: 'IPL 2024',
    homeTeam: {
      id: 'rcb',
      name: 'Royal Challengers Bangalore',
      shortName: 'RCB',
      logo: 'https://via.placeholder.com/60x60/EC1C24/FFFFFF?text=RCB',
      colors: ['#EC1C24', '#FFD700'],
      form: ['L', 'W', 'L', 'L', 'W'],
    },
    awayTeam: {
      id: 'kkr',
      name: 'Kolkata Knight Riders',
      shortName: 'KKR',
      logo: 'https://via.placeholder.com/60x60/3A225D/FFFFFF?text=KKR',
      colors: ['#3A225D', '#B3A123'],
      form: ['W', 'W', 'W', 'L', 'W'],
    },
    startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    status: 'upcoming',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    multiCamera: true,
    commentaryLanguages: ['English', 'Hindi'],
    venue: 'M. Chinnaswamy Stadium, Bangalore',
  },
  {
    id: 'upcoming-2',
    sport: 'football',
    tournament: 'La Liga',
    homeTeam: {
      id: 'rm',
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://via.placeholder.com/60x60/FEBE10/000000?text=RMA',
      colors: ['#FEBE10', '#00529F'],
      form: ['W', 'W', 'D', 'W', 'W'],
    },
    awayTeam: {
      id: 'bar',
      name: 'Barcelona',
      shortName: 'BAR',
      logo: 'https://via.placeholder.com/60x60/004D98/FFFFFF?text=BAR',
      colors: ['#004D98', '#A50044'],
      form: ['W', 'L', 'W', 'W', 'D'],
    },
    startTime: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
    status: 'upcoming',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    multiCamera: true,
    commentaryLanguages: ['English', 'Spanish'],
    venue: 'Santiago Bernabéu, Madrid',
  },
];

// Mock Completed Events
export const completedEvents: LiveEvent[] = [
  {
    id: 'completed-1',
    sport: 'cricket',
    tournament: 'IPL 2024',
    homeTeam: {
      id: 'srh',
      name: 'Sunrisers Hyderabad',
      shortName: 'SRH',
      logo: 'https://via.placeholder.com/60x60/F7A721/000000?text=SRH',
      colors: ['#F7A721', '#000000'],
    },
    awayTeam: {
      id: 'dc',
      name: 'Delhi Capitals',
      shortName: 'DC',
      logo: 'https://via.placeholder.com/60x60/004C93/FFFFFF?text=DC',
      colors: ['#004C93', '#EF1B23'],
    },
    startTime: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'completed',
    currentScore: {
      home: '201/5',
      away: '189/7',
      innings: 'Match Complete',
    },
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    commentaryLanguages: ['English', 'Hindi'],
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
  },
];

// Mock TV Channels
export const tvChannels: TVChannel[] = [
  {
    id: 'sports-hd',
    name: 'Sports HD',
    logo: 'https://via.placeholder.com/120x40/004BA0/FFFFFF?text=Sports+HD',
    category: 'sports',
    language: 'English',
    isHD: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    epg: [
      {
        id: 'prog-1',
        title: 'Live: IPL 2024',
        description: 'Mumbai Indians vs Chennai Super Kings',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date(Date.now() + 7200000).toISOString(),
        genre: 'Cricket',
        isLive: true,
      },
      {
        id: 'prog-2',
        title: 'Premier League Weekly',
        description: 'Highlights and analysis from the latest matchweek',
        startTime: new Date(Date.now() + 7200000).toISOString(),
        endTime: new Date(Date.now() + 10800000).toISOString(),
        genre: 'Football',
      },
    ],
  },
  {
    id: 'movies-hd',
    name: 'Movies HD',
    logo: 'https://via.placeholder.com/120x40/8B0000/FFFFFF?text=Movies+HD',
    category: 'movies',
    language: 'English',
    isHD: true,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    epg: [
      {
        id: 'prog-3',
        title: 'The Dark Knight',
        description: 'Batman faces the Joker in this epic showdown',
        startTime: new Date(Date.now() - 1800000).toISOString(),
        endTime: new Date(Date.now() + 9000000).toISOString(),
        genre: 'Action',
        rating: 'PG-13',
      },
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment Plus',
    logo: 'https://via.placeholder.com/120x40/800080/FFFFFF?text=Entertainment',
    category: 'entertainment',
    language: 'Hindi',
    isHD: false,
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    epg: [
      {
        id: 'prog-4',
        title: 'Bigg Boss',
        description: 'Reality show with celebrity contestants',
        startTime: new Date(Date.now() - 1800000).toISOString(),
        endTime: new Date(Date.now() + 5400000).toISOString(),
        genre: 'Reality',
        isLive: true,
      },
    ],
  },
];

// Mock Tournaments
export const tournaments: Tournament[] = [
  {
    id: 'ipl-2024',
    name: 'Indian Premier League 2024',
    sport: 'cricket',
    logo: 'https://via.placeholder.com/100x100/19388C/FFFFFF?text=IPL',
    season: '2024',
    standings: [
      { team: { id: 'kkr', name: 'KKR', shortName: 'KKR', logo: '', colors: [] }, played: 10, won: 7, drawn: 0, lost: 3, goalsFor: 0, goalsAgainst: 0, points: 14, form: ['W', 'W', 'L', 'W', 'W'] },
      { team: { id: 'srh', name: 'SRH', shortName: 'SRH', logo: '', colors: [] }, played: 10, won: 6, drawn: 0, lost: 4, goalsFor: 0, goalsAgainst: 0, points: 12, form: ['W', 'L', 'W', 'W', 'L'] },
      { team: { id: 'csk', name: 'CSK', shortName: 'CSK', logo: '', colors: [] }, played: 10, won: 5, drawn: 0, lost: 5, goalsFor: 0, goalsAgainst: 0, points: 10, form: ['L', 'W', 'W', 'L', 'W'] },
      { team: { id: 'mi', name: 'MI', shortName: 'MI', logo: '', colors: [] }, played: 10, won: 4, drawn: 0, lost: 6, goalsFor: 0, goalsAgainst: 0, points: 8, form: ['L', 'L', 'W', 'L', 'W'] },
    ],
  },
  {
    id: 'premier-league',
    name: 'Premier League',
    sport: 'football',
    logo: 'https://via.placeholder.com/100x100/3D195B/FFFFFF?text=EPL',
    season: '2023-24',
    standings: [
      { team: { id: 'mci', name: 'Man City', shortName: 'MCI', logo: '', colors: [] }, played: 28, won: 20, drawn: 5, lost: 3, goalsFor: 65, goalsAgainst: 28, points: 65, form: ['W', 'W', 'W', 'D', 'W'] },
      { team: { id: 'liv', name: 'Liverpool', shortName: 'LIV', logo: '', colors: [] }, played: 28, won: 19, drawn: 7, lost: 2, goalsFor: 64, goalsAgainst: 26, points: 64, form: ['W', 'W', 'D', 'W', 'W'] },
      { team: { id: 'ars', name: 'Arsenal', shortName: 'ARS', logo: '', colors: [] }, played: 28, won: 19, drawn: 4, lost: 5, goalsFor: 62, goalsAgainst: 24, points: 61, form: ['W', 'L', 'W', 'W', 'W'] },
    ],
  },
];

// Mock Highlights
export const highlights: Highlight[] = [
  {
    id: 'hl-1',
    eventId: 'live-1',
    title: 'Massive Six by Rohit Sharma',
    description: 'Rohit Sharma smashes it over long-on for a huge six',
    thumbnail: 'https://via.placeholder.com/320x180/004BA0/FFFFFF?text=Highlight',
    startTime: 120,
    endTime: 135,
    duration: 15,
    type: 'six',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'hl-2',
    eventId: 'live-2',
    title: 'GOAL! Bruno Fernandes scores',
    description: 'Brilliant strike from outside the box',
    thumbnail: 'https://via.placeholder.com/320x180/DA291C/FFFFFF?text=GOAL',
    startTime: 2700,
    endTime: 2730,
    duration: 30,
    type: 'goal',
    timestamp: new Date(Date.now() - 2700000).toISOString(),
  },
];

// Sports Categories
export const sportsCategories = [
  { id: 'cricket', name: 'Cricket', icon: '🏏' },
  { id: 'football', name: 'Football', icon: '⚽' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'formula1', name: 'Formula 1', icon: '🏎️' },
  { id: 'esports', name: 'Esports', icon: '🎮' },
  { id: 'hockey', name: 'Hockey', icon: '🏒' },
  { id: 'kabaddi', name: 'Kabaddi', icon: '🤼' },
  { id: 'badminton', name: 'Badminton', icon: '🏸' },
  { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
];
