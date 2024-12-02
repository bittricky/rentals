import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import ListingProfile from './pages/ListingProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Agents from './pages/Agents';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/listing/:id/profile" element={<ListingProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agents" element={<Agents />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/sell" element={<div>Sell Page</div>} />
      </Routes>
    </Layout>
  );
}

export default App;