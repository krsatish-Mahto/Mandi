import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-24 sm:pb-12 border-t border-gray-800">
      <div className="container-primary">

        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-10 border-b border-gray-800">
          <div className="flex items-center gap-4 bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-primary flex items-center justify-center text-2xl">
              🌾
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Direct From Farmers</h4>
              <p className="text-xs text-gray-400">Zero middlemen. Genuine local produce directly from fields.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-2xl">
              📍
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Nearby Village Radius</h4>
              <p className="text-xs text-gray-400">Save travel time. Trade within 2 km, 5 km, or 10 km.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-800/60 p-4 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl">
              🤝
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Direct Negotiation</h4>
              <p className="text-xs text-gray-400">Chat and call directly. Agree on fair price without cuts.</p>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-bold text-white tracking-tight">Mandi</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Hyperlocal agricultural marketplace empowering rural producers, farmers, and buyers to trade directly in nearby village clusters.
            </p>
            <div className="flex items-center gap-2 text-xs text-green-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live in Rampur & nearby 6 villages
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-3">Categories</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/?category=grains" className="hover:text-green-400 text-gray-400">Wheat & Grains (गेहूं)</Link></li>
              <li><Link to="/?category=vegetables" className="hover:text-green-400 text-gray-400">Fresh Vegetables (सब्जी)</Link></li>
              <li><Link to="/?category=dairy" className="hover:text-green-400 text-gray-400">Milk, Ghee & Curd (दूध-घी)</Link></li>
              <li><Link to="/?category=livestock" className="hover:text-green-400 text-gray-400">Cow, Buffalo & Goats (पशु)</Link></li>
              <li><Link to="/?category=equipment" className="hover:text-green-400 text-gray-400">Tractor & Implements (ट्रैक्टर)</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-3">Quick Actions</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/create-listing" className="hover:text-green-400 text-gray-400">+ Post Free Listing</Link></li>
              <li><Link to="/auth" className="hover:text-green-400 text-gray-400">Farmer Registration</Link></li>
              <li><Link to="/chat" className="hover:text-green-400 text-gray-400">Direct Inquiries & Chat</Link></li>
              <li><Link to="/profile" className="hover:text-green-400 text-gray-400">My Listings Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-3">Kisan Sahayata</h5>
            <p className="text-xs text-gray-400 mb-2">Need help posting an ad in your local language?</p>
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <p className="text-[11px] text-gray-400">Kisan Toll-Free Helpline</p>
              <p className="text-sm font-bold text-green-400">1800-XXX-MANDI</p>
              <p className="text-[10px] text-gray-500 mt-1">Available 6:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Mandi Marketplace. Empowering Indian Agriculture & Villages.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Made with ❤️ for Indian Farmers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
