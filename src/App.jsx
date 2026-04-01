// src/App.jsx — main app with routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PasswordChecker from './pages/PasswordChecker';
import UrlChecker from './pages/UrlChecker';
import Blog from './pages/Blog';
import CustomCursor from './components/CustomCursor';

// Protected route — redirects to login if not logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/password-checker" element={
          <ProtectedRoute><PasswordChecker /></ProtectedRoute>
        } />
        <Route path="/url-checker" element={
          <ProtectedRoute><UrlChecker /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomCursor />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
