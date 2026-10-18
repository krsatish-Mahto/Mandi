import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Common/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import { VILLAGES } from './data/mockData';
import type { Village } from './types';

function App() {
  const [activeVillage, setActiveVillage] = useState<Village>(VILLAGES[0]);
  const [globalSearch, setGlobalSearch] = useState('');

  return (
    <Router>
      <Layout
        activeVillage={activeVillage}
        onSelectVillage={setActiveVillage}
        onSearch={setGlobalSearch}
      >
        <Routes>
          {/* Main Feed / Home */}
          <Route
            path="/"
            element={
              <HomePage
                searchQuery={globalSearch}
                activeVillage={activeVillage}
              />
            }
          />

          {/* Listing Details */}
          <Route path="/listings/:id" element={<ListingDetailPage />} />

          {/* Create New Listing */}
          <Route path="/create-listing" element={<CreateListingPage />} />

          {/* Authentication */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Real-time / Mock Chat */}
          <Route path="/chat" element={<ChatPage />} />

          {/* User Profile & My Ads */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
