import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CodeAnimation from '../components/CodeAnimation';
import GlobalPresence from '../components/GlobalPresence';
import HolographicGallery from '../components/HolographicGallery';
import './Landing.css';

// Counter Hook
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

// Hero Section
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-label"
        >
          BANGLADESH'S #1 SOFTWARE COMPANY
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-title"
        >
          <span className="gradient-text">DIGITAL</span>
          <br />
          TRANSFORMATION
          <br />
          <span className="gradient-text">ARCHITECTS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-subtitle"
        >
          Empowering enterprises globally since 2006
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hero-buttons"
        >
          <Link to="/projects" className="btn btn-primary">
            Explore Projects
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Our Story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="hero-badges"
        >
          {['CMMI Level 3', 'ISO 27001', 'AWS Partner', 'Microsoft', 'Moodle'].map((badge, i) => (
            <motion.span
              key={badge}
              className="hero-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="hero-watermark">23</div>
    </section>
  );
}

// Metrics Section - Updated with latest data
function Metrics() {
  const metrics = [
    { value: 2500, suffix: '+', label: 'Projects Delivered', color: '#00d4ff' },
    { value: 850, suffix: '+', label: 'Tech Professionals', color: '#00ff88' },
    { value: 30, suffix: '+', label: 'Countries Served', color: '#9333ea' },
    { value: 19, suffix: '+', label: 'Years of Innovation', color: '#ffd700' },
  ];

  return (
    <section className="metrics">
      <div className="metrics-container">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </section>
  );
}

function MetricCard({ metric, index }) {
  const { count, start } = useCounter(metric.value);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onViewportEnter={start}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="metric-card"
      style={{
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${metric.color}30` : 'none',
        borderColor: isHovered ? metric.color : 'var(--border-default)',
      }}
    >
      <motion.div
        className="metric-value"
        style={{
          color: metric.color,
          textShadow: isHovered ? `0 0 40px ${metric.color}` : `0 0 30px ${metric.color}50`,
        }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {count}{metric.suffix}
      </motion.div>
      <div className="metric-label" style={{ color: isHovered ? metric.color : undefined }}>
        {metric.label}
      </div>
    </motion.div>
  );
}

// Industries Section
function Industries() {
  const [activeIndustry, setActiveIndustry] = useState(null);

  const industries = [
    { id: 'fintech', name: 'FINTECH', icon: '🏦', color: '#00d4ff', x: 20, y: 30 },
    { id: 'ecommerce', name: 'E-COMMERCE', icon: '🛒', color: '#00ff88', x: 80, y: 25 },
    { id: 'healthcare', name: 'HEALTHCARE', icon: '🏥', color: '#ff4444', x: 15, y: 70 },
    { id: 'telecom', name: 'TELECOM', icon: '📡', color: '#9333ea', x: 85, y: 65 },
    { id: 'lms', name: 'LMS', icon: '📚', color: '#ff6b35', x: 50, y: 85 },
    { id: 'cloud', name: 'CLOUD', icon: '☁️', color: '#3b82f6', x: 50, y: 15 },
  ];

  return (
    <section className="industries">
      <div className="section-header">
        <span className="section-label">Our Expertise</span>
        <h2 className="section-title">
          INDUSTRIES WE <span className="highlight">TRANSFORM</span>
        </h2>
      </div>

      <div className="industries-network">
        {/* Central Node */}
        <div className="network-center">
          <div className="center-logo">23</div>
          <span className="center-label">BS23</span>
        </div>

        {/* Connection Lines SVG */}
        <svg className="network-lines">
          {industries.map((industry) => (
            <line
              key={industry.id}
              x1="50%"
              y1="50%"
              x2={`${industry.x}%`}
              y2={`${industry.y}%`}
              className={`network-line ${activeIndustry === industry.id ? 'active' : ''}`}
              style={{ stroke: activeIndustry === industry.id ? industry.color : undefined }}
            />
          ))}
        </svg>

        {/* Industry Nodes */}
        {industries.map((industry, index) => (
          <motion.div
            key={industry.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`industry-node ${activeIndustry === industry.id ? 'active' : ''}`}
            style={{
              left: `${industry.x}%`,
              top: `${industry.y}%`,
              '--node-color': industry.color,
            }}
            onMouseEnter={() => setActiveIndustry(industry.id)}
            onMouseLeave={() => setActiveIndustry(null)}
          >
            <div className="node-icon">{industry.icon}</div>
            <div className="node-label">{industry.name}</div>
            <div className="node-pulse" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Featured Projects Section
function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      name: 'CityTouch',
      client: 'City Bank',
      stat: '$3B+ transactions',
      color: '#00d4ff',
    },
    {
      id: 2,
      name: 'Shwapno',
      client: 'Shwapno Retail',
      stat: '100K+ downloads',
      color: '#00ff88',
    },
    {
      id: 3,
      name: 'Othoba',
      client: 'PRAN-RFL',
      stat: '50X growth',
      color: '#ff6b35',
    },
    {
      id: 4,
      name: 'Proctoring Pro',
      client: 'Moodle',
      stat: '2157+ sites',
      color: '#9333ea',
    },
  ];

  return (
    <section className="featured-projects">
      <div className="section-header">
        <span className="section-label">Flagship Work</span>
        <h2 className="section-title">
          FEATURED <span className="highlight">PROJECTS</span>
        </h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="project-card"
            style={{ '--project-color': project.color }}
          >
            <div className="project-icon">{project.name.substring(0, 2).toUpperCase()}</div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-client">{project.client}</p>
            <div className="project-stat">{project.stat}</div>
          </motion.div>
        ))}
      </div>

      <div className="projects-cta">
        <Link to="/projects" className="btn btn-secondary">
          View All Projects
        </Link>
      </div>
    </section>
  );
}

// Enhanced Clients Marquee with Click Flair
function ClientsMarquee() {
  const [clickEffects, setClickEffects] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const marqueeRef = useRef(null);

  const clients = [
    'City Bank', 'Grameenphone', 'Shwapno', 'HSBC', 'Robi',
    'Othoba', 'British Telecom', 'Incepta', 'PayPal', 'MetLife',
    'Banglalink', 'Cambridge', 'BAT', 'Unilever', 'Telenor'
  ];

  const colors = ['#00d4ff', '#00ff88', '#9333ea', '#ffd700', '#ff6b35', '#ff4444'];

  const handleClick = (e) => {
    const rect = marqueeRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create explosion effect
    const newEffect = {
      id: Date.now(),
      x,
      y,
      color,
      particles: Array.from({ length: 12 }, (_, i) => ({
        angle: (i * 30) * (Math.PI / 180),
        distance: 50 + Math.random() * 50,
        size: 4 + Math.random() * 8,
        delay: Math.random() * 0.1,
      })),
    };

    setClickEffects(prev => [...prev, newEffect]);

    // Remove effect after animation
    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1500);
  };

  const handleItemClick = (e, client) => {
    e.stopPropagation();
    handleClick(e);

    // Create ripple text effect
    const rect = e.target.getBoundingClientRect();
    const parentRect = marqueeRef.current?.getBoundingClientRect();
    if (!parentRect) return;

    const floatingText = {
      id: Date.now() + 1,
      text: client,
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setClickEffects(prev => [...prev, { ...floatingText, isText: true }]);

    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== floatingText.id));
    }, 1000);
  };

  return (
    <section
      className="clients-marquee"
      ref={marqueeRef}
      onClick={handleClick}
      style={{ position: 'relative', cursor: 'crosshair', overflow: 'hidden' }}
    >
      {/* Click effect layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}>
        <AnimatePresence>
          {clickEffects.map((effect) => (
            effect.isText ? (
              // Floating text effect
              <motion.div
                key={effect.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -80, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: effect.x,
                  top: effect.y,
                  transform: 'translateX(-50%)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: effect.color,
                  textShadow: `0 0 30px ${effect.color}, 0 0 60px ${effect.color}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {effect.text}
              </motion.div>
            ) : (
              // Particle explosion effect
              <React.Fragment key={effect.id}>
                {/* Central burst */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    left: effect.x,
                    top: effect.y,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${effect.color}, transparent)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Ring effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
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
                      opacity: 1
                    }}
                    animate={{
                      x: effect.x + Math.cos(particle.angle) * particle.distance,
                      y: effect.y + Math.sin(particle.angle) * particle.distance,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.8 + particle.delay,
                      ease: 'easeOut',
                      delay: particle.delay,
                    }}
                    style={{
                      position: 'absolute',
                      width: particle.size,
                      height: particle.size,
                      borderRadius: '50%',
                      background: effect.color,
                      boxShadow: `0 0 10px ${effect.color}, 0 0 20px ${effect.color}`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Sparkle lines */}
                {[0, 45, 90, 135].map((angle, i) => (
                  <motion.div
                    key={`line-${i}`}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{
                      position: 'absolute',
                      left: effect.x,
                      top: effect.y,
                      width: '2px',
                      height: '40px',
                      background: `linear-gradient(180deg, transparent, ${effect.color}, transparent)`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      transformOrigin: 'center center',
                    }}
                  />
                ))}
              </React.Fragment>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Track 1 */}
      <div className="marquee-track">
        <div className="marquee-content">
          {[...clients, ...clients].map((client, index) => (
            <motion.span
              key={index}
              className="marquee-item"
              onClick={(e) => handleItemClick(e, client)}
              onMouseEnter={() => setHoveredItem(`1-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.2, color: colors[index % colors.length] }}
              whileTap={{ scale: 0.9 }}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'relative',
                textShadow: hoveredItem === `1-${index}`
                  ? `0 0 20px ${colors[index % colors.length]}`
                  : 'none',
              }}
            >
              {client}
              {hoveredItem === `1-${index}` && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    fontSize: '12px',
                  }}
                >
                  ✦
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Track 2 (reverse) */}
      <div className="marquee-track reverse">
        <div className="marquee-content">
          {[...clients, ...clients].reverse().map((client, index) => (
            <motion.span
              key={index}
              className="marquee-item"
              onClick={(e) => handleItemClick(e, client)}
              onMouseEnter={() => setHoveredItem(`2-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.2, color: colors[index % colors.length] }}
              whileTap={{ scale: 0.9 }}
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'relative',
                textShadow: hoveredItem === `2-${index}`
                  ? `0 0 20px ${colors[index % colors.length]}`
                  : 'none',
              }}
            >
              {client}
              {hoveredItem === `2-${index}` && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    fontSize: '12px',
                  }}
                >
                  ✦
                </motion.span>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Instruction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '2px',
          pointerEvents: 'none',
        }}
      >
        CLICK FOR MAGIC ✨
      </motion.div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="cta-content"
      >
        <h2 className="cta-title">Ready to Transform Your Business?</h2>
        <p className="cta-description">
          Let's build something extraordinary together
        </p>
        <Link to="/contact" className="btn btn-primary cta-button">
          Start Your Journey
        </Link>
      </motion.div>

      <div className="cta-orbs">
        <div className="cta-orb orb-1" />
        <div className="cta-orb orb-2" />
        <div className="cta-orb orb-3" />
      </div>
    </section>
  );
}

// Main Landing Component
export default function Landing() {
  return (
    <div className="landing-page">
      <Hero />
      <Metrics />
      <HolographicGallery />
      <Industries />
      <GlobalPresence />
      <CodeAnimation />
      <FeaturedProjects />
      <ClientsMarquee />
      <CTASection />
    </div>
  );
}
