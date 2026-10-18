import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getStoredListings, INITIAL_USERS } from '../data/mockData';
import ListingCard from '../components/Listings/ListingCard';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'listings' | 'about'>('listings');

  const currentUser = user || INITIAL_USERS[0];
  const allListings = getStoredListings();
  const myListings = allListings.filter(
    (l) => l.seller?.name === currentUser.name || l.seller?.id === currentUser.id
  );

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="bg-gray-50 py-8 sm:py-12 pb-24 sm:pb-16">
      <div className="container-primary max-w-5xl">

        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-green-50 shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                <span className="bg-green-100 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                  ✓ Verified Village Member
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                📍 {currentUser.village || 'Rampur'} Village • {currentUser.role || 'Farmer'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <span className="text-amber-500 font-bold">★ {currentUser.rating || 4.9}</span>
                  <span>({currentUser.reviewsCount || 24} ratings)</span>
                </div>
                <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  📞 {currentUser.phone || '+91 98765 43210'}
                </div>
                <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  🗓️ Member since {currentUser.memberSince || '2024'}
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Link
                  to="/create-listing"
                  className="btn-primary text-xs sm:text-sm py-2 px-4 rounded-full"
                >
                  + Post New Listing
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn-secondary text-xs sm:text-sm py-2 px-4 rounded-full text-error border-error hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: My Listings / Profile Info */}
        <div className="flex items-center gap-4 border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            My Active Ads ({myListings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            About & Village Network
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div>
            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((item) => (
                  <ListingCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <span className="text-4xl mb-2 block">🌾</span>
                <h3 className="text-lg font-bold text-gray-800 mb-1">You have no active listings</h3>
                <p className="text-xs text-gray-500 mb-4">Post crops, dairy products, or tractor services to start receiving inquiries.</p>
                <Link to="/create-listing" className="btn-primary inline-block text-xs py-2 px-5 rounded-full">
                  + Post Free Ad Now
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-gray-900">About Farmer Profile</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentUser.bio || 'Verified agricultural producer in Rampur cluster with clean direct-to-consumer trading record.'}
            </p>
            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="font-bold text-gray-800 mb-1">✅ Identity Verification</p>
                <p className="text-gray-500">Aadhaar & Mobile verified through local village panchayat records.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="font-bold text-gray-800 mb-1">🚜 Equipment & Land</p>
                <p className="text-gray-500">12 Acres organic farmland in Rampur & Sonpur river basin.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
