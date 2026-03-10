# StreamFlix - Movie Streaming Platform

A modern, full-featured movie streaming web application built with React, TypeScript, and Tailwind CSS. Inspired by platforms like Netflix, JioHotstar, and Amazon Prime Video.

![StreamFlix Banner](https://img.shields.io/badge/StreamFlix-Movie%20Streaming-blueviolet)

## 🎬 Features

### Phase 1 - Core Features (Completed)
- ✅ Modern React 18+ with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Custom theme configuration
- ✅ State management with Zustand
- ✅ React Router v6 for navigation
- ✅ Video.js integration for video playback
- ✅ Hero banner with featured content
- ✅ Movie cards with hover effects
- ✅ Content rows with horizontal scrolling
- ✅ Search functionality with debouncing
- ✅ Movie detail pages
- ✅ Video player with custom controls
- ✅ Authentication UI (Login/Register)
- ✅ Keyboard shortcuts for video player

### Upcoming Features
- 🔄 Backend API with Node.js & Express
- 🔄 User authentication with JWT
- 🔄 MongoDB database integration
- 🔄 Movie/TV show CRUD operations
- 🔄 User watchlist & watch history
- 🔄 Subscription plans & payments
- 🔄 Admin dashboard
- 🔄 Video upload & transcoding
- 🔄 Real-time analytics

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.3.1
- **Styling:** Tailwind CSS 3.x
- **State Management:** Zustand
- **Routing:** React Router v6
- **Video Player:** Video.js

### Backend (Planned)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Storage:** Cloudinary / AWS S3

## 📁 Project Structure

```
Movie streaming website/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, fonts
│   │   ├── images/
│   │   └── videos/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MovieCard.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── ContentRow.tsx
│   │   └── index.ts
│   ├── constants/         # App constants & config
│   │   └── index.ts
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── layouts/           # Page layouts
│   │   ├── MainLayout.tsx
│   │   ├── PlayerLayout.tsx
│   │   └── index.ts
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── WatchPage.tsx
│   │   ├── MovieDetail.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SearchPage.tsx
│   │   └── index.ts
│   ├── services/          # API services
│   ├── store/             # Zustand stores
│   │   ├── authStore.ts
│   │   ├── movieStore.ts
│   │   ├── playerStore.ts
│   │   └── index.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── .env.example           # Environment variables template
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/girishlade111/Movie-Streaming-website.git
   cd "Movie streaming website"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* ... */ },
      dark: { /* ... */ },
      accent: {
        red: '#e50914',
        purple: '#7c3aed',
      }
    },
  },
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Import and use in your layout

## 🔌 API Integration

### Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_IMAGE_URL=https://image.tmdb.org/t/p
```

### Making API Calls

```typescript
import { API_BASE_URL } from './constants';

async function fetchMovies() {
  const response = await fetch(`${API_BASE_URL}/movies`);
  return response.json();
}
```

## 📱 Responsive Breakpoints

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `K` | Play/Pause |
| `M` | Mute/Unmute |
| `↑` | Volume Up |
| `↓` | Volume Down |
| `F` | Fullscreen |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Girish Lade**
- GitHub: [@girishlade111](https://github.com/girishlade111)
- Repository: [Movie-Streaming-website](https://github.com/girishlade111/Movie-Streaming-website)

## 🙏 Acknowledgments

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Video player powered by [Video.js](https://videojs.com/)
- UI inspired by Netflix, JioHotstar, and Amazon Prime Video

## 📞 Support

For support, email girishlade111@gmail.com or open an issue in the repository.

---

<div align="center">

**Made with ❤️ using React, TypeScript, and Tailwind CSS**

</div>
