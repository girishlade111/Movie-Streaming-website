import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { useDebounce } from '../hooks';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { setSearchQuery: setGlobalSearchQuery } = useAppStore();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      setGlobalSearchQuery(debouncedSearch);
    }
  }, [debouncedSearch, setGlobalSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/browse/tv-shows' },
    { name: 'Movies', path: '/browse/movies' },
    { name: 'Sports', path: '/sports' },
    { name: 'Premium', path: '/premium' },
  ];

  const notifications = [
    { id: 1, title: 'New Episode Available', message: 'Stranger Things S4E5 is now streaming', time: '2h ago', unread: true },
    { id: 2, title: 'New Movie Added', message: 'The Matrix Resurrections is now available', time: '1d ago', unread: true },
    { id: 3, title: 'Continue Watching', message: 'You have 3 shows waiting for you', time: '2d ago', unread: false },
  ];

  return (
    <>
      {/* Header - Fixed position, z-index 50 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#141414]/90 backdrop-blur-md' : 'bg-gradient-to-b from-[#141414] to-transparent'
        }`}
        style={{ height: '68px' }}
      >
        <div className="container mx-auto px-4 md:px-12 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#e5e5e5] hover:text-white transition-colors duration-200"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo - height 32px */}
              <Link to="/" className="flex items-center">
                <div className="h-8 w-auto text-[#E50914] font-bold text-2xl tracking-tight">
                  StreamFlix
                </div>
              </Link>

              {/* Desktop Navigation - gap 20px, font-size 14px */}
              <nav className="hidden md:flex items-center gap-5 ml-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-[#e5e5e5] hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search - 24px icon, hover scale 1.1 */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-[#e5e5e5] hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label="Search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, people, genres"
                    className="absolute right-0 top-full mt-2 w-72 px-4 py-2 bg-[#1f1f1f] border border-[#404040] rounded text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#E50914]"
                    autoFocus
                  />
                )}
              </div>

              {/* Notification Bell - 24px with red dot (8px) */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-[#e5e5e5] hover:text-white hover:scale-110 transition-all duration-200 relative"
                  aria-label="Notifications"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#E50914] rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#1f1f1f] border border-[#333333] rounded-md shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-[#333333]">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-[#333333] hover:bg-[#2a2a2a] transition-colors cursor-pointer ${
                            notification.unread ? 'bg-[#2a2a2a]/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${notification.unread ? 'bg-[#E50914]' : 'bg-transparent'}`} />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                              <p className="text-xs text-[#b3b3b3] mt-1">{notification.message}</p>
                              <span className="text-xs text-[#737373] mt-2 block">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar - 32px circle */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E50914] to-[#ff4757] flex items-center justify-center text-white text-sm font-semibold border-2 border-transparent hover:border-[#e5e5e5] transition-colors duration-200"
                >
                  U
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1f1f1f] border border-[#333333] rounded-md shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-[#333333]">
                      <p className="text-sm font-medium text-white">User</p>
                      <p className="text-xs text-[#b3b3b3]">user@example.com</p>
                    </div>
                    <div className="py-2">
                      <Link to="/my-list" className="flex items-center gap-3 px-4 py-2 text-sm text-[#e5e5e5] hover:bg-[#2a2a2a] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        My List
                      </Link>
                      <Link to="/continue-watching" className="flex items-center gap-3 px-4 py-2 text-sm text-[#e5e5e5] hover:bg-[#2a2a2a] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Continue Watching
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-[#e5e5e5] hover:bg-[#2a2a2a] hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                    </div>
                    <div className="py-2 border-t border-[#333333]">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#E50914] hover:bg-[#2a2a2a] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full screen, slide from left */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel - slide from left */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#181818] transform transition-transform duration-300">
            <div className="p-6 border-b border-[#333333]">
              <div className="flex items-center justify-between">
                <div className="h-8 text-[#E50914] font-bold text-2xl tracking-tight">
                  StreamFlix
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#e5e5e5] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-[#e5e5e5] hover:bg-[#2a2a2a] hover:text-white rounded-md transition-colors"
                >
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
