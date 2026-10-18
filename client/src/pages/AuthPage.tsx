import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneAuth from '../components/Auth/PhoneAuth';
import EmailLogin from '../components/Auth/EmailLogin';
import RegisterForm from '../components/Auth/RegisterForm';

type AuthTab = 'phone' | 'email' | 'register';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('phone');

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 grid grid-cols-1 md:grid-cols-12">

        {/* Left Brand Panel (Desktop) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-green-900 via-primary to-green-950 p-8 flex-col justify-between text-white relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl font-bold">
                🌾
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Mandi</span>
            </Link>

            <h2 className="text-2xl font-bold text-white leading-snug mb-3">
              Direct Mandi in your village radius.
            </h2>
            <p className="text-sm text-green-100/80 leading-relaxed">
              Eliminate middleman margins. Sell produce, buy livestock, and book tractors directly from neighbors.
            </p>
          </div>

          <div className="relative z-10 space-y-3 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-xs text-green-100">
              <span className="text-base">✓</span>
              <span>100% Free & Zero commission</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-green-100">
              <span className="text-base">✓</span>
              <span>Hyperlocal 2km - 10km radius filters</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-green-100">
              <span className="text-base">✓</span>
              <span>Direct Phone & WhatsApp negotiation</span>
            </div>
          </div>
        </div>

        {/* Right Auth Forms Panel */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 md:hidden mb-2">
              <span className="text-2xl">🌾</span>
              <span className="text-2xl font-bold text-primary">Mandi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Welcome to Mandi
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select login method or register your village profile
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('phone')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'phone'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              📱 Mobile OTP
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'email'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              ✉️ Email
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-primary shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              📝 Register
            </button>
          </div>

          {/* Active Tab Component */}
          <div className="min-h-[260px]">
            {activeTab === 'phone' && <PhoneAuth />}
            {activeTab === 'email' && <EmailLogin />}
            {activeTab === 'register' && <RegisterForm />}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link to="/" className="text-xs text-primary font-medium hover:underline">
              ← Continue browsing as Guest (अतिथि के रूप में ब्राउज़ करें)
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
