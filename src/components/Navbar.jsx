// components/Navbar.jsx — top navigation bar
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Password Checker', path: '/password-checker' },
    { name: 'URL Checker', path: '/url-checker' },
    { name: 'Awareness', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-[#00f5ff] group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] transition-all duration-300" />
          <span className="font-bold text-lg tracking-widest text-white">
            SECURE<span className="text-[#00f5ff]">NET</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-wider transition-all duration-300 hover:text-[#00f5ff] ${
                isActive(link.path)
                  ? 'text-[#00f5ff]'
                  : 'text-[#4a4a6a]'
              }`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-[#4a4a6a] hover:text-[#00f5ff] transition-colors duration-300"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="tracking-wider">DASHBOARD</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border border-[#1e1e2e] text-[#4a4a6a] hover:border-red-500 hover:text-red-500 px-4 py-2 rounded-lg text-sm transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-[#4a4a6a] hover:text-white tracking-wider transition-colors duration-300"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="cyber-btn-primary text-sm py-2 px-5"
              >
                GET STARTED
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#4a4a6a] hover:text-[#00f5ff] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e2e] bg-[#0a0a0f] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-wider transition-colors duration-300 ${
                isActive(link.path) ? 'text-[#00f5ff]' : 'text-[#4a4a6a]'
              }`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-[#4a4a6a] tracking-wider">DASHBOARD</Link>
              <button onClick={handleLogout} className="text-left text-sm text-red-500 tracking-wider">LOGOUT</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#4a4a6a] tracking-wider">LOGIN</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="cyber-btn-primary text-sm py-2 px-5 text-center">GET STARTED</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;