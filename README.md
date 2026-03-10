# StreamFlix - Movie Streaming Platform

[![CI/CD](https://github.com/girishlade111/Movie-Streaming-website/actions/workflows/ci.yml/badge.svg)](https://github.com/girishlade111/Movie-Streaming-website/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)

A modern, full-featured movie streaming platform built with React, TypeScript, and Tailwind CSS.

## 🎬 Features

### User Features
- **Browse & Search**: Discover movies, TV shows, and live sports
- **Video Player**: Premium player with quality selection, subtitles, and keyboard shortcuts
- **My List**: Save content for later viewing
- **Continue Watching**: Pick up where you left off
- **Live TV**: Watch live channels with EPG guide
- **Sports**: Live events, scores, and highlights
- **Responsive Design**: Works on all devices

### Admin Features
- **Dashboard**: Analytics and content overview
- **Content Management**: Add/edit movies and TV shows
- **Analytics**: Track views, engagement, and performance
- **Settings**: Configure platform settings

### Technical Features
- **PWA Support**: Install as native app
- **Offline Mode**: Watch downloaded content offline
- **Code Splitting**: Optimized bundle sizes
- **Service Worker**: Intelligent caching
- **TypeScript**: Full type safety
- **Testing**: Unit, integration, and E2E tests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/Movie-Streaming-website.git
cd "Movie streaming website"

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Admin Dashboard

Visit `http://localhost:5173/admin/login`

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

## 📁 Project Structure

```
Movie streaming website/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── layouts/          # Layout components
│   ├── hooks/            # Custom hooks
│   ├── store/            # State management
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants and mock data
│   ├── styles/           # CSS styles
│   ├── tests/            # Unit tests
│   └── main.tsx          # Entry point
├── cypress/              # E2E tests
├── .github/workflows/    # CI/CD configuration
└── package.json
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Open Cypress UI
npm run test:e2e:open
```

## 🐳 Docker

```bash
# Build and run production container
docker-compose up streamflix

# Run development server
docker-compose up dev
```

## 📦 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 🌍 Deployment

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_CDN_URL=https://cdn.example.com
VITE_ENABLE_PWA=true
```

### Platforms

- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repository
- **Docker**: `docker-compose up -d`
- **AWS**: Use provided deployment scripts

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Routing**: React Router v7
- **Video**: Video.js
- **Testing**: Jest, React Testing Library, Cypress
- **Build**: Vite, TypeScript

## 📱 PWA Features

- Installable on mobile/desktop
- Offline support
- Push notifications ready
- App manifest
- Service Worker caching

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management
- Reduced motion support

## 📊 Performance

- Lighthouse score: 90+
- Code splitting
- Lazy loading
- Image optimization
- Service Worker caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Girish Lade**
- GitHub: [@girishlade111](https://github.com/girishlade111)
- Repository: [Movie-Streaming-website](https://github.com/girishlade111/Movie-Streaming-website)

## 🙏 Acknowledgments

- Movie data from [TMDB](https://www.themoviedb.org/)
- Video player by [Video.js](https://videojs.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

<div align="center">

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

</div>
