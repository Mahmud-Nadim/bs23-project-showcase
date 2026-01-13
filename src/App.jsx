import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// Global Click Effects Context
const ClickEffectsContext = React.createContext(null);

export function useClickEffects() {
  return React.useContext(ClickEffectsContext);
}

// Global Click Effect Component
function GlobalClickEffects() {
  const [effects, setEffects] = useState([]);
  const colors = ['#00d4ff', '#00ff88', '#9333ea', '#ffd700', '#ff6b35', '#ff4444', '#3b82f6'];

  const handleClick = useCallback((e) => {
    // Don't trigger on buttons, links, or interactive elements
    if (e.target.closest('button, a, input, textarea, select, [role="button"]')) {
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const newEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      color,
      type: Math.random() > 0.5 ? 'explosion' : 'ripple',
      particles: Array.from({ length: 8 }, (_, i) => ({
        angle: (i * 45) * (Math.PI / 180),
        distance: 40 + Math.random() * 60,
        size: 3 + Math.random() * 6,
        delay: Math.random() * 0.1,
      })),
    };

    setEffects(prev => [...prev, newEffect]);

    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1200);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 99999,
      overflow: 'hidden',
    }}>
      <AnimatePresence>
        {effects.map((effect) => (
          <React.Fragment key={effect.id}>
            {effect.type === 'explosion' ? (
              <>
                {/* Central flash */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    position: 'fixed',
                    left: effect.x,
                    top: effect.y,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${effect.color}, transparent)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Expanding ring */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'fixed',
                    left: effect.x,
                    top: effect.y,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: `2px solid ${effect.color}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Particles */}
                {effect.particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      x: effect.x,
                      y: effect.y,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x: effect.x + Math.cos(particle.angle) * particle.distance,
                      y: effect.y + Math.sin(particle.angle) * particle.distance,
                      scale: 0,
                      opacity: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6 + particle.delay,
                      ease: 'easeOut',
                      delay: particle.delay,
                    }}
                    style={{
                      position: 'fixed',
                      width: particle.size,
                      height: particle.size,
                      borderRadius: '50%',
                      background: effect.color,
                      boxShadow: `0 0 8px ${effect.color}, 0 0 16px ${effect.color}`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Cross sparkle */}
                {[0, 45, 90, 135].map((angle, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    style={{
                      position: 'fixed',
                      left: effect.x,
                      top: effect.y,
                      width: '2px',
                      height: '30px',
                      background: `linear-gradient(180deg, transparent, ${effect.color}, transparent)`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      transformOrigin: 'center center',
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                {/* Ripple effect */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`ripple-${i}`}
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 3 + i, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 + i * 0.15, delay: i * 0.1, ease: 'easeOut' }}
                    style={{
                      position: 'fixed',
                      left: effect.x,
                      top: effect.y,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `1.5px solid ${effect.color}`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 0, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'fixed',
                    left: effect.x,
                    top: effect.y,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: effect.color,
                    boxShadow: `0 0 15px ${effect.color}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Floating sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`float-${i}`}
                    initial={{
                      x: effect.x,
                      y: effect.y,
                      opacity: 1,
                      scale: 1,
                    }}
                    animate={{
                      x: effect.x + (Math.random() - 0.5) * 80,
                      y: effect.y - 40 - Math.random() * 40,
                      opacity: 0,
                      scale: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                    style={{
                      position: 'fixed',
                      fontSize: '12px',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    ✦
                  </motion.div>
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Mouse Trail Effect
function MouseTrail() {
  const [trail, setTrail] = useState([]);
  const frameRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastPosRef.current.x, 2) +
        Math.pow(e.clientY - lastPosRef.current.y, 2)
      );

      if (distance > 15) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        const newDot = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
        };

        setTrail(prev => [...prev.slice(-15), newDot]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (trail.length === 0) return;

    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(1));
    }, 50);

    return () => clearInterval(cleanup);
  }, [trail.length]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 99998,
    }}>
      {trail.map((dot, i) => (
        <motion.div
          key={dot.id}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            left: dot.x,
            top: dot.y,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: dot.color,
            boxShadow: `0 0 10px ${dot.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

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
        {/* Global Click Effects */}
        <GlobalClickEffects />
        <MouseTrail />

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
