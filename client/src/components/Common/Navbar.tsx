import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { VILLAGES } from '../../data/mockData';
import type { Village } from '../../types';

interface NavbarProps {
  onSearch?: (query: string) => void;
  activeVillage?: Village | null;
  onSelectVillage?: (village: Village) => void;
}

export default function Navbar({ onSearch, activeVillage, onSelectVillage }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVillagePick = (v: Village) => {
    if (onSelectVillage) {
      onSelectVillage(v);
    }
    setShowLocationDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="container-primary">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">

          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                🌾
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary leading-tight">
                  Mandi
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide">
                  गाँव का बाज़ार • Hyperlocal
                </span>
              </div>
            </Link>

            {/* Location Selector (Desktop) */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors border border-gray-200"
              >
                <span className="text-primary">📍</span>
                <span>{activeVillage ? activeVillage.name : 'Near Rampur'}</span>
                <span className="text-[10px] text-gray-400">▼</span>
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-in-top">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Select Your Village
                  </div>
                  {VILLAGES.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleVillagePick(v)}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-green-50 transition-colors ${
                        activeVillage?.id === v.id ? 'font-bold text-primary bg-green-50/50' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🏡</span>
                        <span>{v.name}</span>
                      </span>
                      <span className="text-xs text-gray-400 font-normal">
                        {v.distance} km
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar (Desktop / Tablet) */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wheat, potatoes, tractor, milk, seeds..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">🔍</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); if (onSearch) onSearch(''); }}
                  className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-600 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </form>
          </div>

          {/* Action CTAs & Auth Menu */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Create Listing Button */}
            <Link
              to="/create-listing"
              className="flex items-center gap-1.5 bg-primary hover:bg-green-800 text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
            >
              <span className="text-base leading-none font-bold">+</span>
              <span className="hidden xs:inline">Post Ad</span>
              <span className="xs:hidden">Post</span>
            </Link>

            {/* Chat Icon Link */}
            <Link
              to="/chat"
              title="Messages"
              className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full relative transition-colors"
            >
              <span className="text-xl">💬</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
            </Link>

            {/* User Profile or Login */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-gray-200 hover:border-primary transition-all bg-gray-50"
                >
                  <span className="text-xs font-semibold text-gray-700 hidden md:inline max-w-[100px] truncate">
                    {user.name || 'Farmer'}
                  </span>
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary"
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-in-top">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.village || 'Rampur'} • {user.role || 'Member'}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary"
                    >
                      👤 My Profile & Listings
                    </Link>
                    <Link
                      to="/chat"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-primary"
                    >
                      💬 My Inquiries & Chat
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        navigate('/auth');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-secondary text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-full"
              >
                Login / Register
              </Link>
            )}
          </div>

        </div>

        {/* Mobile Search Bar Row */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search produce, machinery, seeds..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-100 border border-gray-200 rounded-full focus:bg-white focus:outline-none focus:border-primary"
            />
            <span className="absolute left-3 top-2 text-gray-400 text-xs">🔍</span>
          </form>
        </div>
      </div>
    </header>
  );
}
