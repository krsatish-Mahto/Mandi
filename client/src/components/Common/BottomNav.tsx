import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
          isActive('/') ? 'text-primary font-bold' : 'text-gray-500'
        }`}
      >
        <span className="text-xl leading-none">🏡</span>
        <span className="text-[10px] mt-1">Mandi</span>
      </Link>

      {/* Explore / Feed */}
      <Link
        to="/?filter=explore"
        className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
          isActive('/?filter=explore') ? 'text-primary font-bold' : 'text-gray-500'
        }`}
      >
        <span className="text-xl leading-none">🔍</span>
        <span className="text-[10px] mt-1">Explore</span>
      </Link>

      {/* Central Post Action CTA */}
      <Link
        to="/create-listing"
        className="flex flex-col items-center justify-center -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-4 border-white hover:scale-105 transition-transform">
          <span className="text-2xl font-bold leading-none">+</span>
        </div>
        <span className="text-[10px] mt-0.5 font-bold text-primary">Post</span>
      </Link>

      {/* Chat */}
      <Link
        to="/chat"
        className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg relative transition-colors ${
          isActive('/chat') ? 'text-primary font-bold' : 'text-gray-500'
        }`}
      >
        <span className="text-xl leading-none">💬</span>
        <span className="absolute top-1 right-3 w-2 h-2 bg-primary rounded-full"></span>
        <span className="text-[10px] mt-1">Chat</span>
      </Link>

      {/* Profile */}
      <Link
        to={user ? '/profile' : '/auth'}
        className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
          isActive('/profile') || isActive('/auth') ? 'text-primary font-bold' : 'text-gray-500'
        }`}
      >
        <span className="text-xl leading-none">👤</span>
        <span className="text-[10px] mt-1">{user ? 'Profile' : 'Login'}</span>
      </Link>
    </nav>
  );
}
