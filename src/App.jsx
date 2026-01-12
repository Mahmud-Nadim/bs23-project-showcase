import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Solutions from './pages/Solutions';
import Clients from './pages/Clients';
import Innovation from './pages/Innovation';
import Analytics from './pages/Analytics';
import Contact from './pages/Contact';

// Styles
import './App.css';
import './pages/pages.css';

// Background Effects
function BackgroundEffects() {
  return (
    <>
      <div className="background-grid" />
      <div className="scan-line" />
      <Particles />
    </>
  );
}

function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Navigation
function Navigation({ theme, toggleTheme }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/clients', label: 'Clients' },
    { path: '/innovation', label: 'Innovation' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <span className="logo-number">23</span>
          </div>
          <div className="logo-text">
            <span className="logo-title">BRAIN STATION</span>
            <span className="logo-subtitle">DIGITAL TRANSFORMATION</span>
          </div>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <div className="certifications">
            {['CMMI L3', 'ISO 27001', 'AWS'].map((cert) => (
              <span key={cert} className="cert-badge">{cert}</span>
            ))}
          </div>

          <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-icon sun-icon">☀️</span>
            <span className="theme-icon moon-icon">🌙</span>
          </button>

          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon" />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <span className="footer-logo-number">23</span>
            </div>
            <span className="footer-logo-text">BRAIN STATION 23</span>
          </div>
          <p className="footer-description">
            Bangladesh's leading software development company since 2006.
            Empowering enterprises globally with digital transformation solutions.
          </p>
          <div className="footer-social">
            <a href="https://linkedin.com/company/brainstation23" className="social-link" target="_blank" rel="noopener noreferrer">in</a>
            <a href="https://facebook.com/brainstation23" className="social-link" target="_blank" rel="noopener noreferrer">f</a>
            <a href="https://twitter.com/brainstation23" className="social-link" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://github.com/brainstation-23" className="social-link" target="_blank" rel="noopener noreferrer">GH</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>SOLUTIONS</h4>
          <div className="footer-links">
            <Link to="/solutions" className="footer-link">Fintech & Banking</Link>
            <Link to="/solutions" className="footer-link">E-Commerce</Link>
            <Link to="/solutions" className="footer-link">Healthcare</Link>
            <Link to="/solutions" className="footer-link">Telecom</Link>
            <Link to="/solutions" className="footer-link">LMS & EdTech</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>COMPANY</h4>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/projects" className="footer-link">Projects</Link>
            <Link to="/clients" className="footer-link">Clients</Link>
            <Link to="/innovation" className="footer-link">Innovation Lab</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>CONTACT</h4>
          <div className="footer-links">
            <span className="footer-link">Dhaka, Bangladesh</span>
            <span className="footer-link">+880 1404-055226</span>
            <span className="footer-link">sales@brainstation-23.com</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">
          © 2024 Brain Station 23 PLC. All rights reserved.
        </span>
        <div className="footer-certs">
          <span className="footer-cert">CMMI Level 3</span>
          <span className="footer-cert">ISO 9001</span>
          <span className="footer-cert">ISO 27001</span>
        </div>
      </div>
    </footer>
  );
}

// Page Wrapper with Animation
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Animated Routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/solutions" element={<PageWrapper><Solutions /></PageWrapper>} />
        <Route path="/clients" element={<PageWrapper><Clients /></PageWrapper>} />
        <Route path="/innovation" element={<PageWrapper><Innovation /></PageWrapper>} />
        <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Loading Screen
function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-number">23</span>
        </div>
        <div className="loading-text">BRAIN STATION</div>
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
      </div>
    </div>
  );
}

// Main App
function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check stored theme
    const stored = localStorage.getItem('bs23-theme');
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }

    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('bs23-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="app">
        <BackgroundEffects />
        <Navigation theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
