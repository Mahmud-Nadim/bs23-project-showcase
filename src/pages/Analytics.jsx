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


export default function Analytics() {
  // Updated with latest scraped data from brainstation-23.com
  const stats = [
    { value: 2500, suffix: '+', label: 'PROJECTS DELIVERED', color: '#00d4ff', icon: '🚀' },
    { value: 800, suffix: '+', label: 'TECH PROFESSIONALS', color: '#00ff88', icon: '👨‍💻' },
    { value: 30, suffix: '+', label: 'COUNTRIES SERVED', color: '#9333ea', icon: '🌍' },
    { value: 19, suffix: '+', label: 'YEARS OF EXCELLENCE', color: '#ffd700', icon: '⭐' },
    { value: 130, suffix: '+', label: 'SECTORS SERVED', color: '#ff6b35', icon: '🏢' },
    { value: 5, suffix: '', label: 'GLOBAL OFFICES', color: '#3b82f6', icon: '🏢' },
  ];

  const industryData = [
    { label: 'Fintech & Banking', value: 30, color: '#00d4ff' },
    { label: 'E-Commerce & Retail', value: 25, color: '#00ff88' },
    { label: 'Telecom & Communication', value: 20, color: '#9333ea' },
    { label: 'Healthcare & Pharma', value: 15, color: '#ff4444' },
    { label: 'LMS & EdTech', value: 10, color: '#f59e0b' },
  ];

  const techData = [
    { label: 'React / Angular / Vue', value: 40, color: '#61dafb' },
    { label: 'Node.js / .NET / Java', value: 35, color: '#339933' },
    { label: 'Python / AI / ML', value: 15, color: '#3776ab' },
    { label: 'Flutter / Mobile Native', value: 10, color: '#02569b' },
  ];

  const metrics = [
    { percentage: 95, label: 'CLIENT SATISFACTION', color: '#00d4ff', icon: '😊' },
    { percentage: 40, label: 'COST REDUCTION', color: '#00ff88', icon: '💰' },
    { percentage: 99, label: 'DELIVERY SUCCESS', color: '#9333ea', icon: '✅' },
    { percentage: 85, label: 'REPEAT BUSINESS', color: '#ffd700', icon: '🔄' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '100px 60px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Floating particles background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                bottom: 0,
                width: '4px',
                height: '4px',
                background: `hsl(${180 + Math.random() * 60}, 100%, 50%)`,
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
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
              padding: '8px 20px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
          >
            <span style={{ animation: 'pulse 2s infinite' }}>●</span>
            REAL-TIME DATA
            <span style={{ animation: 'pulse 2s infinite' }}>●</span>
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}>
            SUCCESS{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(0, 212, 255, 0.5)',
            }}>METRICS</span>
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            A data-driven view of our growth, capabilities, and impact across industries.
          </p>
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

      {/* Footer */}
      <section style={{ padding: '60px', textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}
        >
          DATA UPDATED IN REAL-TIME FROM OUR OPERATIONS DASHBOARD
        </motion.p>
      </section>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
