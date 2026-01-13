import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

// Hexagonal Grid Cell
function HexCell({ data, index, isActive, onHover, onLeave }) {
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFillProgress(data.value);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [data.value, index]);

  return (
    <motion.div
      className={`hex-cell ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: 'spring' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ '--cell-color': data.color }}
    >
      <svg viewBox="0 0 100 115" className="hex-svg">
        {/* Hex outline */}
        <path
          d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
          className="hex-outline"
          style={{ stroke: data.color }}
        />

        {/* Fill progress */}
        <defs>
          <clipPath id={`hexClip-${index}`}>
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" />
          </clipPath>
        </defs>

        <motion.rect
          x="0"
          y={100 - fillProgress}
          width="100"
          height={fillProgress}
          fill={`${data.color}30`}
          clipPath={`url(#hexClip-${index})`}
          initial={{ y: 100 }}
          animate={{ y: 100 - fillProgress }}
          transition={{ duration: 1.5, delay: index * 0.1 }}
        />

        {/* Inner glow */}
        {isActive && (
          <path
            d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
            fill={`${data.color}20`}
            className="hex-inner-glow"
          />
        )}
      </svg>

      <div className="hex-content">
        <span className="hex-icon">{data.icon}</span>
        <span className="hex-value" style={{ color: data.color }}>{data.value}%</span>
        <span className="hex-label">{data.label}</span>
      </div>

      {/* Pulse effect on active */}
      {isActive && (
        <motion.div
          className="hex-pulse"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ borderColor: data.color }}
        />
      )}
    </motion.div>
  );
}

// Targeting Reticle Component
function TargetingReticle({ target, color }) {
  return (
    <motion.div
      className="targeting-reticle"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      style={{ '--reticle-color': color }}
    >
      <svg viewBox="0 0 200 200" className="reticle-svg">
        {/* Outer rotating ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="10 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        />

        {/* Middle ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="30 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        />

        {/* Inner targeting brackets */}
        <motion.g
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path d="M 60 40 L 40 40 L 40 60" fill="none" stroke={color} strokeWidth="3" />
          <path d="M 140 40 L 160 40 L 160 60" fill="none" stroke={color} strokeWidth="3" />
          <path d="M 160 140 L 160 160 L 140 160" fill="none" stroke={color} strokeWidth="3" />
          <path d="M 40 140 L 40 160 L 60 160" fill="none" stroke={color} strokeWidth="3" />
        </motion.g>

        {/* Crosshairs */}
        <line x1="100" y1="30" x2="100" y2="70" stroke={color} strokeWidth="1" />
        <line x1="100" y1="130" x2="100" y2="170" stroke={color} strokeWidth="1" />
        <line x1="30" y1="100" x2="70" y2="100" stroke={color} strokeWidth="1" />
        <line x1="130" y1="100" x2="170" y2="100" stroke={color} strokeWidth="1" />

        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill={color} />
      </svg>

      <div className="reticle-data">
        <span className="reticle-label">TARGET LOCKED</span>
        <span className="reticle-value" style={{ color }}>{target.label}</span>
      </div>
    </motion.div>
  );
}

// Circular Dial with scanning effect
function ScanningDial({ data, delay = 0 }) {
  const [scanned, setScanned] = useState(false);
  const circumference = 2 * Math.PI * 70;

  useEffect(() => {
    const timer = setTimeout(() => setScanned(true), delay * 1000 + 500);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className="scanning-dial"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <svg viewBox="0 0 180 180" className="dial-svg">
        {/* Background */}
        <circle cx="90" cy="90" r="80" fill="rgba(0,0,0,0.3)" />

        {/* Outer ring with ticks */}
        <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* Tick marks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * 360;
          const isMajor = i % 5 === 0;
          const length = isMajor ? 10 : 5;
          const x1 = 90 + Math.cos((angle - 90) * Math.PI / 180) * 70;
          const y1 = 90 + Math.sin((angle - 90) * Math.PI / 180) * 70;
          const x2 = 90 + Math.cos((angle - 90) * Math.PI / 180) * (70 - length);
          const y2 = 90 + Math.sin((angle - 90) * Math.PI / 180) * (70 - length);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={data.color}
              strokeWidth={isMajor ? 2 : 1}
              opacity={isMajor ? 0.8 : 0.3}
            />
          );
        })}

        {/* Scanning beam */}
        <motion.g
          animate={{ rotate: scanned ? 360 : 0 }}
          transition={{ duration: 2, ease: 'linear' }}
          style={{ transformOrigin: '90px 90px' }}
        >
          <defs>
            <linearGradient id={`scanGrad-${data.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={data.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={data.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 90 90 L 90 20 A 70 70 0 0 1 145 55 Z"
            fill={`url(#scanGrad-${data.id})`}
          />
        </motion.g>

        {/* Progress arc */}
        <motion.circle
          cx="90"
          cy="90"
          r="60"
          fill="none"
          stroke={data.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: scanned ? circumference - (data.value / 100) * circumference : circumference }}
          transition={{ duration: 1.5, delay: 2 }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '90px 90px' }}
        />

        {/* Center content */}
        <circle cx="90" cy="90" r="45" fill="rgba(0,0,0,0.5)" />
      </svg>

      <div className="dial-center">
        <motion.span
          className="dial-icon"
          animate={{ scale: scanned ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {data.icon}
        </motion.span>
        <motion.span
          className="dial-value"
          style={{ color: data.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scanned ? 1 : 0 }}
          transition={{ delay: 2.5 }}
        >
          {data.value}%
        </motion.span>
        <span className="dial-label">{data.label}</span>
      </div>

      {/* Scan complete indicator */}
      {scanned && (
        <motion.div
          className="scan-complete"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          style={{ color: data.color }}
        >
          SCAN COMPLETE
        </motion.div>
      )}
    </motion.div>
  );
}

// AR-style floating annotation
function FloatingAnnotation({ data, position, delay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      className="floating-annotation"
      style={{
        left: position.x,
        top: position.y,
        '--annotation-color': data.color,
      }}
      initial={{ opacity: 0, scale: 0, x: -20 }}
      animate={visible ? { opacity: 1, scale: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="annotation-line" />
      <div className="annotation-content">
        <div className="annotation-header">
          <span className="annotation-icon">{data.icon}</span>
          <span className="annotation-label">{data.label}</span>
        </div>
        <div className="annotation-value" style={{ color: data.color }}>
          {data.value}
        </div>
        <div className="annotation-bar">
          <motion.div
            className="bar-fill"
            style={{ background: data.color }}
            initial={{ width: 0 }}
            animate={visible ? { width: `${data.percentage}%` } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Main HUD Component
export default function HolographicHUD() {
  const [activeHex, setActiveHex] = useState(null);
  const [scanActive, setScanActive] = useState(false);

  const hexData = [
    { id: 1, label: 'React', value: 95, color: '#61dafb', icon: '⚛️' },
    { id: 2, label: 'Node.js', value: 90, color: '#339933', icon: '🟢' },
    { id: 3, label: 'Python', value: 85, color: '#3776ab', icon: '🐍' },
    { id: 4, label: 'Cloud', value: 92, color: '#ff9900', icon: '☁️' },
    { id: 5, label: 'AI/ML', value: 78, color: '#9333ea', icon: '🤖' },
    { id: 6, label: 'Mobile', value: 88, color: '#00d4ff', icon: '📱' },
    { id: 7, label: 'DevOps', value: 94, color: '#00ff88', icon: '🔄' },
  ];

  const scanDialData = [
    { id: 1, label: 'Performance', value: 96, color: '#00d4ff', icon: '⚡' },
    { id: 2, label: 'Security', value: 99, color: '#00ff88', icon: '🛡️' },
    { id: 3, label: 'Reliability', value: 99.9, color: '#9333ea', icon: '✓' },
  ];

  const annotations = [
    { label: 'Active Users', value: '2.4M+', percentage: 85, color: '#00d4ff', icon: '👥' },
    { label: 'API Calls/Day', value: '50M+', percentage: 92, color: '#00ff88', icon: '📡' },
    { label: 'Response Time', value: '< 50ms', percentage: 98, color: '#ffd700', icon: '⏱️' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setScanActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="holographic-hud-section">
      {/* Scan lines effect */}
      <div className="hud-scanlines" />

      {/* Header */}
      <div className="hud-header">
        <motion.div
          className="header-badge"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="badge-icon">◎</span>
          HEADS-UP DISPLAY
        </motion.div>

        <motion.h2
          className="hud-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          HOLOGRAPHIC <span className="highlight">INTERFACE</span>
        </motion.h2>
      </div>

      {/* Main HUD Container */}
      <div className="hud-container">
        {/* Left Panel - Hexagonal Grid */}
        <div className="hud-panel panel-left">
          <div className="panel-header">
            <span className="header-icon">⬡</span>
            TECH PROFICIENCY MATRIX
          </div>
          <div className="hex-grid">
            {hexData.map((data, index) => (
              <HexCell
                key={data.id}
                data={data}
                index={index}
                isActive={activeHex === data.id}
                onHover={() => setActiveHex(data.id)}
                onLeave={() => setActiveHex(null)}
              />
            ))}
          </div>

          {/* Targeting reticle overlay */}
          <AnimatePresence>
            {activeHex && (
              <TargetingReticle
                target={hexData.find(h => h.id === activeHex)}
                color={hexData.find(h => h.id === activeHex)?.color}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Center Panel - Scanning Dials */}
        <div className="hud-panel panel-center">
          <div className="panel-header">
            <span className="header-icon">◉</span>
            SYSTEM DIAGNOSTICS
          </div>
          <div className="scanning-dials">
            {scanDialData.map((data, index) => (
              <ScanningDial key={data.id} data={data} delay={index * 0.5} />
            ))}
          </div>

          {/* Central HUD element */}
          <div className="central-hud">
            <motion.div
              className="hud-core"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(0, 212, 255, 0.3)',
                  '0 0 60px rgba(0, 212, 255, 0.5)',
                  '0 0 30px rgba(0, 212, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="core-text">BS23</span>
              <span className="core-status">SYSTEMS ACTIVE</span>
            </motion.div>

            {/* Orbiting elements */}
            <motion.div
              className="orbit-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="orbit-dot"
                  style={{ transform: `rotate(${angle}deg) translateX(80px)` }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Panel - AR Annotations */}
        <div className="hud-panel panel-right">
          <div className="panel-header">
            <span className="header-icon">◈</span>
            LIVE METRICS
          </div>
          <div className="annotations-container">
            {annotations.map((data, index) => (
              <FloatingAnnotation
                key={index}
                data={data}
                position={{ x: '10%', y: `${20 + index * 30}%` }}
                delay={1000 + index * 500}
              />
            ))}
          </div>

          {/* Audio visualizer bars */}
          <div className="audio-visualizer">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="viz-bar"
                animate={{
                  height: [
                    20 + Math.random() * 30,
                    40 + Math.random() * 40,
                    20 + Math.random() * 30,
                  ],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
                style={{
                  background: `linear-gradient(to top, #00d4ff, #00ff88)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        className="hud-status-bar"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="status-section">
          <span className="status-label">DISPLAY MODE</span>
          <span className="status-value">HOLOGRAPHIC</span>
        </div>
        <div className="status-section">
          <span className="status-label">RESOLUTION</span>
          <span className="status-value">8K ULTRA</span>
        </div>
        <div className="status-section">
          <span className="status-label">REFRESH RATE</span>
          <span className="status-value">120 HZ</span>
        </div>
        <div className="status-section">
          <span className="status-label">LATENCY</span>
          <span className="status-value">{'<'}1MS</span>
        </div>
      </motion.div>
    </section>
  );
}
