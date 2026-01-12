import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// Metrics Section
function Metrics() {
  const metrics = [
    { value: 2500, suffix: '+', label: 'Projects Delivered' },
    { value: 800, suffix: '+', label: 'Tech Professionals' },
    { value: 25, suffix: '+', label: 'Countries Served' },
    { value: 18, suffix: '+', label: 'Years of Innovation' },
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onViewportEnter={start}
      className="metric-card"
    >
      <div className="metric-value">
        {count}{metric.suffix}
      </div>
      <div className="metric-label">{metric.label}</div>
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

// Clients Marquee
function ClientsMarquee() {
  const clients = [
    'City Bank', 'Grameenphone', 'Shwapno', 'HSBC', 'Robi',
    'Othoba', 'British Telecom', 'Incepta', 'PayPal', 'MetLife',
    'Banglalink', 'Cambridge', 'BAT', 'Unilever', 'Telenor'
  ];

  return (
    <section className="clients-marquee">
      <div className="marquee-track">
        <div className="marquee-content">
          {[...clients, ...clients].map((client, index) => (
            <span key={index} className="marquee-item">{client}</span>
          ))}
        </div>
      </div>
      <div className="marquee-track reverse">
        <div className="marquee-content">
          {[...clients, ...clients].reverse().map((client, index) => (
            <span key={index} className="marquee-item">{client}</span>
          ))}
        </div>
      </div>
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
      <Industries />
      <FeaturedProjects />
      <ClientsMarquee />
      <CTASection />
    </div>
  );
}
