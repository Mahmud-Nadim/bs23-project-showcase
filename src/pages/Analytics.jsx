import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIShowcase from '../components/AIShowcase';
import CyberpunkCommandCenter from '../components/CyberpunkCommandCenter';
import DataGalaxy from '../components/DataGalaxy';
import HolographicHUD from '../components/HolographicHUD';
import './Analytics.css';

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, hasStarted]);

  return { count, start: () => setHasStarted(true) };
}

function StatCard({ value, label, color, suffix = '', index, icon }) {
  const { count, start } = useCounter(value);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onViewportEnter={start}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(135deg, ${color}08, ${color}03)`,
        border: `1px solid ${isHovered ? color : 'var(--border-default)'}`,
        padding: '40px 30px',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? `0 20px 60px ${color}30, 0 0 40px ${color}20` : 'none',
      }}
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${color}, transparent)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div style={{
        fontSize: '32px',
        marginBottom: '15px',
        filter: isHovered ? `drop-shadow(0 0 20px ${color})` : 'none',
        transition: 'all 0.3s',
      }}>
        {icon}
      </div>

      {/* Value */}
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '52px',
          fontWeight: 700,
          color: color,
          textShadow: `0 0 40px ${color}60, 0 0 80px ${color}30`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {count}{suffix}
      </motion.div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: isHovered ? color : 'var(--text-muted)',
        letterSpacing: '2px',
        marginTop: '12px',
        transition: 'color 0.3s',
        position: 'relative',
        zIndex: 1,
      }}>{label}</div>

      {/* Animated border glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(from 0deg, transparent, ${color}20, transparent, ${color}10, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
}

function BarChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'linear-gradient(135deg, var(--bg-card), transparent)',
        border: '1px solid var(--border-default)',
        padding: '35px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,212,255,0.02) 50px, rgba(0,212,255,0.02) 51px)',
        pointerEvents: 'none',
      }} />

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '30px',
        position: 'relative',
      }}>
        {title}
        <span style={{
          position: 'absolute',
          bottom: '-8px',
          left: 0,
          width: '50px',
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent-cyan), transparent)',
        }} />
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', position: 'relative' }}>
        {data.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: hoveredIndex === i ? item.color : 'var(--text-secondary)',
                transition: 'color 0.3s',
                fontWeight: hoveredIndex === i ? 600 : 400,
              }}>{item.label}</span>
              <motion.span
                animate={{ scale: hoveredIndex === i ? 1.2 : 1 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: item.color,
                  fontWeight: 700,
                  textShadow: hoveredIndex === i ? `0 0 20px ${item.color}` : 'none',
                }}
              >{item.value}%</motion.span>
            </div>
            <div style={{
              height: '10px',
              background: 'var(--bg-tertiary)',
              overflow: 'hidden',
              borderRadius: '5px',
              position: 'relative',
            }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                  borderRadius: '5px',
                  boxShadow: hoveredIndex === i ? `0 0 20px ${item.color}60` : 'none',
                  transition: 'box-shadow 0.3s',
                  position: 'relative',
                }}
              >
                {/* Animated shimmer */}
                <motion.div
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DonutChart({ percentage, label, color, icon }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ textAlign: 'center', cursor: 'pointer' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="70" cy="70" r="45"
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="12"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="70" cy="70" r="45"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              filter: isHovered ? `drop-shadow(0 0 15px ${color})` : 'none',
            }}
          />
          {/* Glowing dot at end */}
          <motion.circle
            cx="70"
            cy="25"
            r="6"
            fill={color}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
              transformOrigin: '70px 70px',
              transform: `rotate(${(percentage / 100) * 360}deg)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '5px',
            filter: isHovered ? `drop-shadow(0 0 15px ${color})` : 'none',
          }}>{icon}</div>
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              color: color,
              textShadow: `0 0 30px ${color}50`,
            }}
          >{percentage}%</motion.div>
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: isHovered ? color : 'var(--text-muted)',
        letterSpacing: '1px',
        marginTop: '15px',
        transition: 'color 0.3s',
      }}>{label}</div>
    </motion.div>
  );
}


// Particle Background Component
function ParticleField() {
  return (
    <div className="particle-field">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * 500,
            opacity: 0,
          }}
          animate={{
            y: [null, -500],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: ['#00d4ff', '#00ff88', '#9333ea', '#ffd700'][Math.floor(Math.random() * 4)],
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px currentColor',
          }}
        />
      ))}
    </div>
  );
}

// Hexagon Grid Background
function HexagonBackground() {
  return (
    <div className="hexagon-bg">
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.03 }}>
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="#00d4ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

export default function Analytics() {
  // Updated with real Brain Station 23 data (scraped January 2025)
  const stats = [
    { value: 2500, suffix: '+', label: 'PROJECTS DELIVERED', color: '#00d4ff', icon: '🚀' },
    { value: 889, suffix: '', label: 'TECH PROFESSIONALS', color: '#00ff88', icon: '👨‍💻' },
    { value: 30, suffix: '+', label: 'COUNTRIES SERVED', color: '#9333ea', icon: '🌍' },
    { value: 19, suffix: '+', label: 'YEARS OF EXCELLENCE', color: '#ffd700', icon: '⭐' },
    { value: 130, suffix: '+', label: 'INDUSTRIES SERVED', color: '#ff6b35', icon: '🏢' },
    { value: 6, suffix: '', label: 'GLOBAL OFFICES', color: '#3b82f6', icon: '🌐' },
  ];

  // Real industry distribution data
  const industryData = [
    { label: 'Fintech & Banking', value: 30, color: '#00d4ff' },
    { label: 'E-Commerce & Retail', value: 25, color: '#00ff88' },
    { label: 'Telecom & Communication', value: 18, color: '#9333ea' },
    { label: 'Healthcare & Pharma', value: 15, color: '#ff4444' },
    { label: 'LMS & EdTech', value: 12, color: '#f59e0b' },
  ];

  // Real technology stack distribution
  const techData = [
    { label: 'React / Angular / Vue', value: 35, color: '#61dafb' },
    { label: 'Node.js / .NET / Java', value: 30, color: '#339933' },
    { label: 'Python / AI / ML', value: 20, color: '#3776ab' },
    { label: 'Flutter / Mobile Native', value: 15, color: '#02569b' },
  ];

  // Real success metrics
  const metrics = [
    { percentage: 95, label: 'CLIENT SATISFACTION', color: '#00d4ff', icon: '😊' },
    { percentage: 40, label: 'COST REDUCTION', color: '#00ff88', icon: '💰' },
    { percentage: 99, label: 'ON-TIME DELIVERY', color: '#9333ea', icon: '✅' },
    { percentage: 85, label: 'REPEAT BUSINESS', color: '#ffd700', icon: '🔄' },
  ];

  // Key achievements timeline
  const achievements = [
    { year: '2006', title: 'Founded', description: 'Brain Station 23 established in Dhaka, Bangladesh' },
    { year: '2012', title: 'Fintech Pioneer', description: 'Started transforming Bangladesh banking sector' },
    { year: '2019', title: 'AI Recognition', description: 'Bronze Winner - Google AI Competition (Kaggle)' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded to 6 offices across 5 continents' },
    { year: '2024', title: 'Enterprise Scale', description: 'Reached 2500+ projects, 889+ professionals' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Global Visual Effects */}
      <HexagonBackground />

      {/* Hero Section */}
      <section style={{ padding: '100px 60px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Enhanced Floating particles background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -200],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
              className="floating-particle"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                bottom: 0,
                width: 3 + Math.random() * 5 + 'px',
                height: 3 + Math.random() * 5 + 'px',
                background: 'var(--accent-cyan)',
                borderRadius: '50%',
                filter: 'blur(1px)',
                boxShadow: '0 0 15px currentColor',
              }}
            />
          ))}
        </div>

        {/* Animated grid lines */}
        <div className="animated-grid-lines" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            className="header-badge"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-cyan)',
              letterSpacing: '4px',
              marginBottom: '15px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 25px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-hover)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: 'var(--accent-green)' }}
            >●</motion.span>
            BRAIN STATION 23 ANALYTICS
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              style={{ color: 'var(--accent-green)' }}
            >●</motion.span>
            {/* Shine effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, var(--bg-card-hover), transparent)',
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '20px',
              position: 'relative',
            }}
          >
            SUCCESS{' '}
            <span className="gradient-text" style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple), var(--accent-green))',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 5s ease infinite',
            }}>METRICS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '17px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Real-time data showcasing 19+ years of excellence — from transforming Bangladesh's fintech sector
            to delivering 2500+ projects across 30+ countries with 889 world-class professionals.
          </motion.p>

          {/* Quick Stats Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Founded', value: '2006', icon: '🎯' },
              { label: 'CMMI Level', value: '3', icon: '📊' },
              { label: 'ISO Certified', value: '27001', icon: '🛡️' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="quick-stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{item.value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' }}>{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Grid - FIXED RESPONSIVE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        padding: '0 60px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* AI-First Development Showcase */}
      <AIShowcase />

      {/* Cyberpunk Command Center */}
      <CyberpunkCommandCenter />

      {/* 3D Data Galaxy */}
      <DataGalaxy />

      {/* Holographic HUD Interface */}
      <HolographicHUD />

      {/* Charts Section */}
      <section style={{ padding: '80px 60px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px',
            marginBottom: '60px',
          }}>
            <BarChart data={industryData} title="INDUSTRY DISTRIBUTION" />
            <BarChart data={techData} title="TECHNOLOGY STACK" />
          </div>
        </div>
      </section>

      {/* Success Metrics Donuts - FIXED RESPONSIVE */}
      <section style={{ padding: '80px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent-cyan)',
            letterSpacing: '4px',
            marginBottom: '15px',
          }}>KEY PERFORMANCE</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>
            SUCCESS <span style={{ color: 'var(--accent-cyan)' }}>METRICS</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            background: 'linear-gradient(135deg, var(--bg-card), transparent)',
            border: '1px solid var(--border-default)',
            padding: '60px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative corner accents */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100px',
            height: '100px',
            borderTop: '2px solid var(--accent-cyan)',
            borderLeft: '2px solid var(--accent-cyan)',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100px',
            height: '100px',
            borderBottom: '2px solid var(--accent-green)',
            borderRight: '2px solid var(--accent-green)',
            opacity: 0.5,
          }} />

          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <DonutChart {...metric} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Certifications Section */}
      <section style={{
        padding: '80px 60px',
        background: 'var(--bg-secondary)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent-cyan)',
            letterSpacing: '4px',
            marginBottom: '15px',
          }}>CERTIFICATIONS & PARTNERSHIPS</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '40px',
          }}>
            TRUSTED <span style={{ color: 'var(--accent-cyan)' }}>GLOBALLY</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {[
            { name: 'ISO 27001', icon: '🛡️', color: '#00d4ff' },
            { name: 'CMMI Level 3', icon: '📊', color: '#00ff88' },
            { name: 'AWS Partner', icon: '☁️', color: '#ff9900' },
            { name: 'Microsoft', icon: '🪟', color: '#00a4ef' },
            { name: 'Google Cloud', icon: '🔮', color: '#4285f4' },
            { name: 'Moodle', icon: '📚', color: '#f98012' },
            { name: 'Salesforce', icon: '☁️', color: '#00a1e0' },
          ].map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -10,
                boxShadow: `0 20px 40px ${cert.color}30`,
              }}
              style={{
                padding: '20px 30px',
                background: 'var(--bg-card)',
                border: `1px solid ${cert.color}30`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: '24px' }}>{cert.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                letterSpacing: '1px',
              }}>{cert.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievement Timeline Section */}
      <section style={{
        padding: '80px 60px',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(0, 20, 40, 0.5) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-cyan)',
              letterSpacing: '4px',
              marginBottom: '15px',
            }}>MILESTONES</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}>
              OUR <span style={{ color: 'var(--accent-cyan)' }}>JOURNEY</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), var(--accent-cyan), transparent)',
              zIndex: 0,
            }} />

            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05, y: -10 }}
                style={{
                  flex: '1 1 180px',
                  maxWidth: '200px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                  cursor: 'pointer',
                }}
              >
                {/* Year bubble */}
                <motion.div
                  whileHover={{
                    boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
                  }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(147, 51, 234, 0.2))',
                    border: '2px solid var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    position: 'relative',
                  }}
                >
                  {achievement.year}
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: '1px solid var(--accent-cyan)',
                      borderRadius: '50%',
                    }}
                  />
                </motion.div>

                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}>{achievement.title}</div>

                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>{achievement.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section style={{ padding: '60px', textAlign: 'center', position: 'relative' }}>
        {/* Animated border top */}
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #00d4ff, #9333ea, #00ff88, transparent)',
            backgroundSize: '200% 100%',
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>
            Brain Station 23
          </div>

          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {['Bangladesh', 'USA', 'Germany', 'Malaysia', 'UAE', 'Japan'].map((office, i) => (
              <motion.span
                key={office}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px',
                }}
              >
                {office}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#00ff88' }}
            >●</motion.span>
            LIVE DATA FROM OPERATIONS DASHBOARD
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{ color: '#00ff88' }}
            >●</motion.span>
          </motion.p>
        </motion.div>
      </section>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hexagon-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .particle-field {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
