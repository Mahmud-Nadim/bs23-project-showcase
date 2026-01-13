import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Matrix-style data rain
function DataRain({ color = '#00d4ff' }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const cols = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i / 30) * 100,
      chars: Array.from({ length: 15 + Math.floor(Math.random() * 10) }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ),
      speed: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
    setColumns(cols);
  }, []);

  return (
    <div className="data-rain">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="rain-column"
          style={{ left: `${col.x}%` }}
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{
            duration: col.speed,
            repeat: Infinity,
            delay: col.delay,
            ease: 'linear',
          }}
        >
          {col.chars.map((char, i) => (
            <span
              key={i}
              style={{
                opacity: 1 - (i / col.chars.length) * 0.8,
                color: i === 0 ? '#fff' : color,
                textShadow: i === 0 ? `0 0 20px ${color}` : 'none',
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Radar Pulse Component
function RadarPulse({ size = 200, color = '#00d4ff' }) {
  return (
    <div className="radar-container" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="radar-svg">
        {/* Grid lines */}
        <circle cx="100" cy="100" r="90" className="radar-ring" />
        <circle cx="100" cy="100" r="60" className="radar-ring" />
        <circle cx="100" cy="100" r="30" className="radar-ring" />
        <line x1="100" y1="10" x2="100" y2="190" className="radar-line" />
        <line x1="10" y1="100" x2="190" y2="100" className="radar-line" />

        {/* Sweeping beam */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <defs>
            <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 100 100 L 100 10 A 90 90 0 0 1 170 50 Z"
            fill="url(#sweepGradient)"
          />
          <line x1="100" y1="100" x2="100" y2="10" stroke={color} strokeWidth="2" />
        </motion.g>

        {/* Blips */}
        {[
          { x: 130, y: 70, delay: 0 },
          { x: 60, y: 130, delay: 1 },
          { x: 150, y: 120, delay: 2 },
        ].map((blip, i) => (
          <motion.circle
            key={i}
            cx={blip.x}
            cy={blip.y}
            r="4"
            fill={color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: blip.delay }}
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        ))}
      </svg>
    </div>
  );
}

// Holographic Screen Component
function HoloScreen({ title, children, color = '#00d4ff', delay = 0 }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`holo-screen ${glitch ? 'glitching' : ''}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      style={{ '--screen-color': color }}
    >
      <div className="screen-header">
        <div className="screen-title">
          <span className="title-icon">◆</span>
          {title}
        </div>
        <div className="screen-status">
          <span className="status-dot" />
          ONLINE
        </div>
      </div>
      <div className="screen-content">
        {children}
      </div>
      <div className="screen-scanline" />
      <div className="screen-flicker" />

      {/* Corner accents */}
      <svg className="screen-corners" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke={color} strokeWidth="2" />
        <path d="M 80 0 L 100 0 L 100 20" fill="none" stroke={color} strokeWidth="2" />
        <path d="M 100 80 L 100 100 L 80 100" fill="none" stroke={color} strokeWidth="2" />
        <path d="M 20 100 L 0 100 L 0 80" fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </motion.div>
  );
}

// Live Data Stream
function LiveDataStream({ data }) {
  const [streamData, setStreamData] = useState([]);
  const streamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type: ['INFO', 'DATA', 'SYNC', 'UPDATE'][Math.floor(Math.random() * 4)],
        message: data[Math.floor(Math.random() * data.length)],
      };
      setStreamData(prev => [...prev.slice(-8), newEntry]);
    }, 1500);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [streamData]);

  return (
    <div className="live-stream" ref={streamRef}>
      <AnimatePresence>
        {streamData.map((entry) => (
          <motion.div
            key={entry.id}
            className="stream-entry"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="stream-time">[{entry.timestamp}]</span>
            <span className={`stream-type type-${entry.type.toLowerCase()}`}>{entry.type}</span>
            <span className="stream-message">{entry.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="stream-cursor">_</div>
    </div>
  );
}

// Circular Progress Dial
function ProgressDial({ value, label, color, icon }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="progress-dial"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <svg viewBox="0 0 100 100" className="dial-svg">
        {/* Outer decorative ring */}
        <circle cx="50" cy="50" r="48" className="dial-outer" />

        {/* Tick marks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="5"
            x2="50"
            y2="10"
            className="dial-tick"
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: '50px 50px',
            }}
          />
        ))}

        {/* Background circle */}
        <circle cx="50" cy="50" r="40" className="dial-bg" />

        {/* Progress arc */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          className="dial-progress"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            filter: isHovered ? `drop-shadow(0 0 10px ${color})` : 'none',
          }}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        {/* Center glow */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill={`${color}10`}
          className="dial-center-glow"
        />
      </svg>

      <div className="dial-content">
        <span className="dial-icon" style={{ color }}>{icon}</span>
        <span className="dial-value" style={{ color }}>{value}%</span>
      </div>

      <div className="dial-label">{label}</div>

      {/* Rotating outer ring on hover */}
      <motion.div
        className="dial-ring-outer"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ borderColor: color }}
      />
    </motion.div>
  );
}

// Main Command Center Component
export default function CyberpunkCommandCenter() {
  const [activeAlert, setActiveAlert] = useState(null);

  const alerts = [
    'Project CityTouch: 99.9% uptime maintained',
    'New deployment: Shwapno v3.2.1 successful',
    'Security scan complete: 0 vulnerabilities',
    'Performance optimization: +23% improvement',
  ];

  const streamMessages = [
    'Syncing project database...',
    'Client satisfaction: 95%',
    'Active deployments: 47',
    'Code commits today: 234',
    'Tests passing: 99.8%',
    'Server health: Optimal',
    'API response: 45ms avg',
    'Memory usage: 62%',
  ];

  const systemStats = [
    { label: 'CPU Load', value: 67, color: '#00d4ff', icon: '⚡' },
    { label: 'Memory', value: 82, color: '#00ff88', icon: '💾' },
    { label: 'Network', value: 94, color: '#9333ea', icon: '📡' },
    { label: 'Security', value: 100, color: '#ffd700', icon: '🛡️' },
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setActiveAlert(alerts[index]);
      index = (index + 1) % alerts.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="command-center-section">
      {/* Background Effects */}
      <div className="command-bg">
        <DataRain color="#00d4ff" />
        <div className="grid-overlay" />
      </div>

      {/* Section Header */}
      <div className="command-header">
        <motion.div
          className="header-badge"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="badge-icon">⌘</span>
          COMMAND CENTER
        </motion.div>

        <motion.h2
          className="command-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          MISSION <span className="highlight">CONTROL</span>
        </motion.h2>

        {/* Alert Ticker */}
        <motion.div
          className="alert-ticker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="ticker-icon">⚠</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeAlert}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="ticker-text"
            >
              {activeAlert}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="command-grid">
        {/* Left Panel - Radar & Status */}
        <div className="command-panel panel-left">
          <HoloScreen title="THREAT MONITOR" color="#00d4ff" delay={0}>
            <div className="radar-wrapper">
              <RadarPulse size={180} color="#00d4ff" />
              <div className="radar-stats">
                <div className="radar-stat">
                  <span className="stat-label">THREATS</span>
                  <span className="stat-value safe">0</span>
                </div>
                <div className="radar-stat">
                  <span className="stat-label">SCANNED</span>
                  <span className="stat-value">2.4K</span>
                </div>
              </div>
            </div>
          </HoloScreen>

          <HoloScreen title="LIVE FEED" color="#00ff88" delay={0.2}>
            <LiveDataStream data={streamMessages} />
          </HoloScreen>
        </div>

        {/* Center Panel - Main Stats */}
        <div className="command-panel panel-center">
          <HoloScreen title="SYSTEM DIAGNOSTICS" color="#9333ea" delay={0.1}>
            <div className="dials-grid">
              {systemStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <ProgressDial {...stat} />
                </motion.div>
              ))}
            </div>
          </HoloScreen>
        </div>

        {/* Right Panel - Metrics */}
        <div className="command-panel panel-right">
          <HoloScreen title="PROJECT METRICS" color="#ff6b35" delay={0.3}>
            <div className="metrics-list">
              {[
                { label: 'Active Projects', value: '127', trend: '+12%', up: true },
                { label: 'Team Members', value: '850+', trend: '+5%', up: true },
                { label: 'Deployments/Day', value: '34', trend: '+8%', up: true },
                { label: 'Bug Resolution', value: '4.2h', trend: '-15%', up: true },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="metric-row"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="metric-label">{metric.label}</span>
                  <div className="metric-value-wrapper">
                    <span className="metric-value">{metric.value}</span>
                    <span className={`metric-trend ${metric.up ? 'up' : 'down'}`}>
                      {metric.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloScreen>

          <HoloScreen title="GLOBAL STATUS" color="#3b82f6" delay={0.4}>
            <div className="status-grid">
              {[
                { region: 'ASIA', status: 'ONLINE', latency: '12ms' },
                { region: 'EUROPE', status: 'ONLINE', latency: '45ms' },
                { region: 'AMERICAS', status: 'ONLINE', latency: '38ms' },
              ].map((region, i) => (
                <div key={region.region} className="status-row">
                  <span className="region-name">{region.region}</span>
                  <span className="region-status">{region.status}</span>
                  <span className="region-latency">{region.latency}</span>
                </div>
              ))}
            </div>
          </HoloScreen>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <motion.div
        className="command-status-bar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="status-item">
          <span className="status-dot online" />
          ALL SYSTEMS OPERATIONAL
        </div>
        <div className="status-item">
          UPTIME: 99.99%
        </div>
        <div className="status-item">
          LAST SYNC: {new Date().toLocaleTimeString()}
        </div>
      </motion.div>
    </section>
  );
}
