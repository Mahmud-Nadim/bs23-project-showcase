import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Project Modal Component with insane graphics
function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  const tabs = ['overview', 'tech stack', 'features', 'impact'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--modal-overlay)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}
    >
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [0, Math.sin(i) * 100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              width: '2px',
              height: `${20 + Math.random() * 30}px`,
              background: `linear-gradient(180deg, transparent, ${project.color}, transparent)`,
              borderRadius: '1px',
            }}
          />
        ))}
      </div>

      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, y: 50, rotateX: 15 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--modal-bg)',
          border: `2px solid ${project.color}50`,
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: `0 0 100px ${project.color}30, inset 0 0 100px ${project.color}05`,
        }}
      >
        {/* Glowing border effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg, transparent, ${project.color}30, transparent, ${project.color}10, transparent)`,
            pointerEvents: 'none',
          }}
        />

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            background: 'transparent',
            border: `2px solid ${project.color}`,
            color: project.color,
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ✕
        </motion.button>

        {/* Header */}
        <div style={{
          padding: '60px 60px 40px',
          borderBottom: `1px solid ${project.color}20`,
          position: 'relative',
        }}>
          {/* Category badge */}
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}50`,
              color: project.color,
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '2px',
              marginBottom: '20px',
            }}
          >
            {project.category}
          </motion.span>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
            {/* Animated Logo */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 30px ${project.color}40`,
                  `0 0 60px ${project.color}60`,
                  `0 0 30px ${project.color}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '100px',
                height: '100px',
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                border: `2px solid ${project.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                flexShrink: 0,
              }}
            >
              {project.icon}
            </motion.div>

            <div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  textShadow: `0 0 40px ${project.color}50`,
                }}
              >
                {project.name}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px',
                }}
              >
                {project.client}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: `1px solid ${project.color}20`,
          padding: '0 60px',
        }}>
          {tabs.map((tab, i) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '20px 30px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `3px solid ${project.color}` : '3px solid transparent',
                color: activeTab === tab ? project.color : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '40px 60px 60px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p style={{
                  fontSize: '18px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                }}>
                  {project.description}
                </p>

                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px',
                }}>
                  {Object.entries(project.stats).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      style={{
                        padding: '25px',
                        background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                        border: `1px solid ${project.color}30`,
                        textAlign: 'center',
                      }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '28px',
                        fontWeight: 700,
                        color: project.color,
                        textShadow: `0 0 30px ${project.color}50`,
                      }}>{value}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        letterSpacing: '1px',
                        marginTop: '8px',
                        textTransform: 'uppercase',
                      }}>{key}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tech stack' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  marginBottom: '30px',
                }}>
                  Technologies Used
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  {project.techStack.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.05 * i, type: 'spring' }}
                      whileHover={{
                        scale: 1.1,
                        y: -10,
                        boxShadow: `0 20px 40px ${tech.color}40`,
                      }}
                      style={{
                        padding: '15px 25px',
                        background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}05)`,
                        border: `1px solid ${tech.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{tech.icon}</span>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: tech.color,
                        }}>{tech.name}</div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-muted)',
                        }}>{tech.type}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Architecture diagram placeholder */}
                <div style={{
                  marginTop: '40px',
                  padding: '40px',
                  background: `linear-gradient(135deg, ${project.color}05, transparent)`,
                  border: `1px solid ${project.color}20`,
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    letterSpacing: '2px',
                  }}>ARCHITECTURE OVERVIEW</div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '30px',
                    marginTop: '30px',
                    flexWrap: 'wrap',
                  }}>
                    {['Frontend', 'API Gateway', 'Backend', 'Database', 'Cloud'].map((layer, i) => (
                      <React.Fragment key={layer}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ scale: 1.1 }}
                          style={{
                            padding: '20px 30px',
                            background: `${project.color}15`,
                            border: `1px solid ${project.color}50`,
                          }}
                        >
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: project.color,
                          }}>{layer}</div>
                        </motion.div>
                        {i < 4 && (
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ color: project.color, fontSize: '20px' }}
                          >
                            →
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                }}>
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ x: 10, borderColor: project.color }}
                      style={{
                        padding: '20px 25px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-default)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    >
                      <span style={{
                        color: project.color,
                        fontSize: '18px',
                        textShadow: `0 0 20px ${project.color}`,
                      }}>✦</span>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                      }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '30px',
                }}>
                  {project.impact.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * i, type: 'spring' }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: '30px',
                        background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                        border: `1px solid ${project.color}30`,
                        textAlign: 'center',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        style={{ fontSize: '40px', marginBottom: '15px' }}
                      >
                        {item.icon}
                      </motion.div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: project.color,
                        marginBottom: '8px',
                      }}>{item.value}</div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        letterSpacing: '1px',
                      }}>{item.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Floating 3D Card Component
function ProjectCard({ project, index, onClick, isHovered, onHover, onLeave }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => {
        onLeave();
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      onClick={() => onClick(project)}
      style={{
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.05 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          background: `linear-gradient(135deg, ${project.color}08, transparent)`,
          border: `1px solid ${isHovered ? project.color : 'var(--border-default)'}`,
          padding: '35px',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 30px 60px ${project.color}30, 0 0 40px ${project.color}20`
            : 'none',
        }}
      >
        {/* Spotlight effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered
              ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${project.color}20, transparent 50%)`
              : 'transparent',
            pointerEvents: 'none',
            transition: 'background 0.1s',
          }}
        />

        {/* Animated corner accents */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40px',
            height: '40px',
            borderTop: `2px solid ${project.color}`,
            borderLeft: `2px solid ${project.color}`,
          }}
        />
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '40px',
            height: '40px',
            borderBottom: `2px solid ${project.color}`,
            borderRight: `2px solid ${project.color}`,
          }}
        />

        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <motion.div
            animate={{
              boxShadow: isHovered
                ? `0 0 30px ${project.color}60, 0 0 60px ${project.color}30`
                : 'none',
            }}
            style={{
              width: '60px',
              height: '60px',
              background: `linear-gradient(135deg, ${project.color}30, transparent)`,
              border: `1px solid ${project.color}50`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            {project.icon}
          </motion.div>
          <div>
            <motion.div
              animate={{ color: isHovered ? project.color : 'var(--text-primary)' }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '22px',
                fontWeight: 700,
              }}
            >
              {project.name}
            </motion.div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
            }}>{project.client}</div>
          </div>
        </div>

        {/* Category Badge */}
        <motion.span
          animate={{ background: isHovered ? `${project.color}25` : `${project.color}15` }}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: project.color,
            padding: '6px 14px',
            border: `1px solid ${project.color}30`,
            letterSpacing: '1px',
            marginBottom: '15px',
          }}
        >
          {project.category}
        </motion.span>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '25px',
        }}>
          {project.description}
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '25px',
          paddingTop: '20px',
          borderTop: `1px solid ${isHovered ? project.color + '30' : 'var(--border-default)'}`,
        }}>
          {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <motion.span
                animate={{
                  textShadow: isHovered ? `0 0 20px ${project.color}` : 'none',
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: project.color,
                }}
              >{value}</motion.span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>{key}</span>
            </div>
          ))}
        </div>

        {/* View Details indicator */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          style={{
            position: 'absolute',
            bottom: '15px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: project.color,
            letterSpacing: '1px',
          }}
        >
          VIEW DETAILS
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >→</motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  const filters = ['ALL', 'FINTECH', 'E-COMMERCE', 'TELECOM', 'HEALTHCARE', 'LMS', 'PRODUCTS'];

  // Enhanced projects data with tech stacks and more details
  const projects = [
    {
      id: 1, name: 'CityTouch', client: 'City Bank', category: 'FINTECH', icon: '🏦',
      description: 'Bangladesh\'s leading digital banking platform revolutionizing the way millions interact with their finances. A comprehensive mobile and internet banking solution.',
      stats: { transactions: '$3B+', users: '446K+', uptime: '99.9%', rating: '4.8' }, color: '#00d4ff',
      techStack: [
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'Redis', type: 'Cache', icon: '🔴', color: '#dc382d' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
        { name: 'Kafka', type: 'Messaging', icon: '📨', color: '#231f20' },
      ],
      features: ['Real-time transactions', 'Bill payments', 'QR payments', 'Card management', 'Investment services', 'Loan applications', 'Biometric login', 'Multi-factor auth'],
      impact: [
        { icon: '💰', value: '$3B+', title: 'Transactions Processed' },
        { icon: '👥', value: '446K+', title: 'Active Users' },
        { icon: '⏱️', value: '99.9%', title: 'Uptime Guaranteed' },
        { icon: '🚀', value: '3x', title: 'Performance Boost' },
      ],
    },
    {
      id: 2, name: 'Shwapno', client: 'Shwapno Retail', category: 'E-COMMERCE', icon: '🛒',
      description: 'E-commerce platform for Bangladesh\'s #1 supermarket chain. Bringing grocery shopping to the digital age with doorstep delivery.',
      stats: { downloads: '100K+', gmv: '$50M+', orders: '1M+', stores: '200+' }, color: '#00ff88',
      techStack: [
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: '.NET Core', type: 'Backend', icon: '🔷', color: '#512bd4' },
        { name: 'MongoDB', type: 'Database', icon: '🍃', color: '#47a248' },
        { name: 'Elasticsearch', type: 'Search', icon: '🔍', color: '#fed10a' },
        { name: 'Azure', type: 'Cloud', icon: '☁️', color: '#0089d6' },
      ],
      features: ['Real-time inventory', 'Same-day delivery', 'Loyalty programs', 'Smart recommendations', 'Voice search', 'AR product preview'],
      impact: [
        { icon: '📱', value: '100K+', title: 'App Downloads' },
        { icon: '💳', value: '$50M+', title: 'GMV Processed' },
        { icon: '📦', value: '1M+', title: 'Orders Fulfilled' },
        { icon: '🏪', value: '200+', title: 'Stores Connected' },
      ],
    },
    {
      id: 3, name: 'Othoba', client: 'PRAN-RFL', category: 'E-COMMERCE', icon: '🌾',
      description: 'Marketplace connecting rural Bangladesh to the digital economy. Empowering local merchants and bringing quality products nationwide.',
      stats: { growth: '50X', merchants: '10K+', products: '500K+', coverage: '64' }, color: '#ff6b35',
      techStack: [
        { name: 'Vue.js', type: 'Frontend', icon: '💚', color: '#4fc08d' },
        { name: 'Laravel', type: 'Backend', icon: '🔴', color: '#ff2d20' },
        { name: 'MySQL', type: 'Database', icon: '🐬', color: '#4479a1' },
        { name: 'RabbitMQ', type: 'Messaging', icon: '🐰', color: '#ff6600' },
      ],
      features: ['Merchant onboarding', 'Multi-vendor support', 'Logistics integration', 'Payment gateway', 'Analytics dashboard', 'Mobile app'],
      impact: [
        { icon: '📈', value: '50X', title: 'Growth Rate' },
        { icon: '🏪', value: '10K+', title: 'Merchants' },
        { icon: '📦', value: '500K+', title: 'Products Listed' },
        { icon: '🗺️', value: '64', title: 'Districts Covered' },
      ],
    },
    {
      id: 4, name: 'MyGP', client: 'Grameenphone', category: 'TELECOM', icon: '📱',
      description: 'Self-care app for 80M+ subscribers. The most downloaded telecom app in Bangladesh offering seamless digital experience.',
      stats: { users: '30M+', rating: '4.5', downloads: '50M+', features: '100+' }, color: '#9333ea',
      techStack: [
        { name: 'Flutter', type: 'Mobile', icon: '🐦', color: '#02569b' },
        { name: 'Spring Boot', type: 'Backend', icon: '🍃', color: '#6db33f' },
        { name: 'Oracle', type: 'Database', icon: '🔶', color: '#f80000' },
        { name: 'Kubernetes', type: 'Infrastructure', icon: '☸️', color: '#326ce5' },
      ],
      features: ['Balance management', 'Bundle purchases', 'Bill payments', 'Data usage tracking', 'Customer support', 'Rewards program'],
      impact: [
        { icon: '👥', value: '30M+', title: 'Active Users' },
        { icon: '⭐', value: '4.5', title: 'App Store Rating' },
        { icon: '📥', value: '50M+', title: 'Total Downloads' },
        { icon: '🔧', value: '100+', title: 'Features' },
      ],
    },
    {
      id: 5, name: 'Proctoring Pro', client: 'Moodle', category: 'LMS', icon: '🎓',
      description: 'AI-powered exam proctoring for online learning. Ensuring academic integrity with advanced computer vision and machine learning.',
      stats: { sites: '2157+', learners: '500K+', exams: '2M+', accuracy: '98%' }, color: '#f59e0b',
      techStack: [
        { name: 'Python', type: 'AI/ML', icon: '🐍', color: '#3776ab' },
        { name: 'TensorFlow', type: 'ML Framework', icon: '🧠', color: '#ff6f00' },
        { name: 'PHP', type: 'Backend', icon: '🐘', color: '#777bb4' },
        { name: 'WebRTC', type: 'Streaming', icon: '📹', color: '#333333' },
      ],
      features: ['Face detection', 'Eye tracking', 'Audio monitoring', 'Screen recording', 'ID verification', 'Behavior analysis'],
      impact: [
        { icon: '🌐', value: '2157+', title: 'Moodle Sites' },
        { icon: '👨‍🎓', value: '500K+', title: 'Learners Protected' },
        { icon: '📝', value: '2M+', title: 'Exams Proctored' },
        { icon: '✅', value: '98%', title: 'Detection Accuracy' },
      ],
    },
    {
      id: 6, name: 'Cambridge ECG', client: 'Cambridge Heartwear', category: 'HEALTHCARE', icon: '❤️',
      description: 'AI-powered cardiac monitoring device. Award-winning healthcare innovation detecting heart conditions with clinical-grade accuracy.',
      stats: { accuracy: '98%', award: 'BIMA', patients: '50K+', countries: '10+' }, color: '#ff4444',
      techStack: [
        { name: 'Python', type: 'AI/ML', icon: '🐍', color: '#3776ab' },
        { name: 'PyTorch', type: 'Deep Learning', icon: '🔥', color: '#ee4c2c' },
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'HL7 FHIR', type: 'Healthcare API', icon: '🏥', color: '#ff5722' },
      ],
      features: ['Real-time ECG analysis', 'Arrhythmia detection', 'Cloud sync', 'Doctor dashboard', 'Emergency alerts', 'Historical trends'],
      impact: [
        { icon: '🎯', value: '98%', title: 'Accuracy Rate' },
        { icon: '🏆', value: 'BIMA', title: 'Award Winner' },
        { icon: '💗', value: '50K+', title: 'Patients Monitored' },
        { icon: '🌍', value: '10+', title: 'Countries' },
      ],
    },
    {
      id: 7, name: 'Wallet23', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💳',
      description: 'Enterprise digital wallet solution. White-label platform enabling businesses to launch their own digital payment ecosystem.',
      stats: { transactions: '$100M+', clients: '20+', uptime: '99.99%', apis: '50+' }, color: '#3b82f6',
      techStack: [
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: 'Go', type: 'Backend', icon: '🔵', color: '#00add8' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'gRPC', type: 'API', icon: '🔗', color: '#4285f4' },
      ],
      features: ['Multi-currency support', 'P2P transfers', 'Merchant payments', 'Bill payments', 'QR payments', 'API integration'],
      impact: [
        { icon: '💰', value: '$100M+', title: 'Transactions' },
        { icon: '🏢', value: '20+', title: 'Enterprise Clients' },
        { icon: '⏱️', value: '99.99%', title: 'Uptime' },
        { icon: '🔌', value: '50+', title: 'API Endpoints' },
      ],
    },
    {
      id: 8, name: 'Remity', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💸',
      description: 'Cross-border payment and remittance platform. Enabling fast, secure, and affordable international money transfers.',
      stats: { volume: '$50M+', corridors: '30+', speed: '< 24hrs', fee: '< 1%' }, color: '#00d4ff',
      techStack: [
        { name: 'Angular', type: 'Frontend', icon: '🅰️', color: '#dd0031' },
        { name: 'Java', type: 'Backend', icon: '☕', color: '#007396' },
        { name: 'Cassandra', type: 'Database', icon: '👁️', color: '#1287b1' },
        { name: 'SWIFT', type: 'Banking', icon: '🏦', color: '#00205b' },
      ],
      features: ['KYC/AML compliance', 'Real-time rates', 'Multi-channel', 'Agent network', 'Mobile app', 'API access'],
      impact: [
        { icon: '💵', value: '$50M+', title: 'Transfer Volume' },
        { icon: '🌐', value: '30+', title: 'Corridors' },
        { icon: '⚡', value: '< 24hrs', title: 'Transfer Speed' },
        { icon: '💎', value: '< 1%', title: 'Transfer Fee' },
      ],
    },
    {
      id: 9, name: 'MyBL', client: 'Banglalink', category: 'TELECOM', icon: '📞',
      description: 'Digital self-service platform for Banglalink subscribers. Comprehensive mobile app for managing telecom services.',
      stats: { downloads: '10M+', transactions: '$100M+', users: '8M+', nps: '72' }, color: '#ff6b35',
      techStack: [
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'Redis', type: 'Cache', icon: '🔴', color: '#dc382d' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
      ],
      features: ['Balance check', 'Package purchase', 'Bill payment', 'Data tracking', 'Offers', 'Customer support'],
      impact: [
        { icon: '📥', value: '10M+', title: 'Downloads' },
        { icon: '💰', value: '$100M+', title: 'Transactions' },
        { icon: '👥', value: '8M+', title: 'Active Users' },
        { icon: '❤️', value: '72', title: 'NPS Score' },
      ],
    },
    {
      id: 10, name: 'Omnizia', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💊',
      description: 'Pharma engagement platform connecting pharmaceutical companies with healthcare professionals for better patient outcomes.',
      stats: { hcps: '50K+', pharma: '15+', reach: '5M+', compliance: '100%' }, color: '#9333ea',
      techStack: [
        { name: 'Vue.js', type: 'Frontend', icon: '💚', color: '#4fc08d' },
        { name: '.NET Core', type: 'Backend', icon: '🔷', color: '#512bd4' },
        { name: 'SQL Server', type: 'Database', icon: '📊', color: '#cc2927' },
        { name: 'Power BI', type: 'Analytics', icon: '📈', color: '#f2c811' },
      ],
      features: ['HCP engagement', 'Content delivery', 'Event management', 'Analytics', 'Compliance tracking', 'CRM integration'],
      impact: [
        { icon: '👨‍⚕️', value: '50K+', title: 'HCPs Engaged' },
        { icon: '💊', value: '15+', title: 'Pharma Partners' },
        { icon: '🎯', value: '5M+', title: 'Patient Reach' },
        { icon: '✅', value: '100%', title: 'Compliance' },
      ],
    },
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '100px 60px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Animated background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: ['100vh', '-10vh'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                width: '1px',
                height: `${50 + Math.random() * 100}px`,
                background: `linear-gradient(180deg, transparent, ${['#00d4ff', '#00ff88', '#9333ea'][Math.floor(Math.random() * 3)]}40, transparent)`,
              }}
            />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
            }}
          >
            <span>◆</span> OUR WORK <span>◆</span>
          </motion.div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 8vw, 80px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}>
            FLAGSHIP{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #00ff88, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>PROJECTS</span>
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 20px',
          }}>
            Transforming industries with cutting-edge solutions. Click on any project to explore the technology behind it.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 60px 40px',
      }}>
        {filters.map((filter, i) => (
          <motion.button
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '12px 28px',
              background: activeFilter === filter
                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 255, 136, 0.1))'
                : 'transparent',
              border: `1px solid ${activeFilter === filter ? 'rgba(0, 212, 255, 0.5)' : 'var(--border-default)'}`,
              color: activeFilter === filter ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: activeFilter === filter ? '0 0 30px rgba(0, 212, 255, 0.2)' : 'none',
            }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '30px',
          padding: '0 60px 100px',
          maxWidth: '1500px',
          margin: '0 auto',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                index={i}
                onClick={setSelectedProject}
                isHovered={hoveredProject === project.id}
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
