import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Pages (to be created)
// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
// import ListingDetailPage from './pages/ListingDetailPage';
// import ChatPage from './pages/ChatPage';
// import ProfilePage from './pages/ProfilePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <div>Auth Page (TODO)</div>} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <div>Home Page (TODO)</div> : <Navigate to="/auth" />} />
        <Route path="/listings/:id" element={isAuthenticated ? <div>Listing Detail (TODO)</div> : <Navigate to="/auth" />} />
        <Route path="/chat" element={isAuthenticated ? <div>Chat Page (TODO)</div> : <Navigate to="/auth" />} />
        <Route path="/profile" element={isAuthenticated ? <div>Profile Page (TODO)</div> : <Navigate to="/auth" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
