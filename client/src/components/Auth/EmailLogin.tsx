import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { INITIAL_USERS } from '../../data/mockData';
import type { User } from '../../types';

export default function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Find matching or create dummy
      const user: User = INITIAL_USERS.find((u) => u.email?.toLowerCase() === email.toLowerCase()) || {
        id: `u-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'Farmer',
        village: 'Rampur',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        verified: true,
      };

      login(`token-${Date.now()}`, user);
      navigate('/');
    }, 600);
  };

  const handleQuickLogin = (user: User) => {
    setEmail(user.email || '');
    setPassword('demo123');
    login(`token-${Date.now()}`, user);
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="form-label">Email Address / ईमेल</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="farmer@example.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="form-label mb-0">Password / पासवर्ड</label>
            <button type="button" className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-field"
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="spinner w-4 h-4 border-2"></span>
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In (लॉग इन करें)</span>
          )}
        </button>
      </form>

      {/* Quick Demo Logins for fast testing */}
      <div className="pt-3 border-t border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
          ⚡ One-Click Demo Profiles
        </p>
        <div className="grid grid-cols-2 gap-2">
          {INITIAL_USERS.slice(0, 2).map((demoUser) => (
            <button
              key={demoUser.id}
              type="button"
              onClick={() => handleQuickLogin(demoUser)}
              className="p-2 border border-gray-200 hover:border-primary hover:bg-green-50/50 rounded-lg text-left transition-all group"
            >
              <div className="flex items-center gap-2">
                <img
                  src={demoUser.avatar}
                  alt={demoUser.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-primary truncate">
                    {demoUser.name}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {demoUser.village} • {demoUser.role}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
