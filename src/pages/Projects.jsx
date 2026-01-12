import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ['ALL', 'FINTECH', 'E-COMMERCE', 'TELECOM', 'HEALTHCARE', 'LMS'];

  const projects = [
    {
      id: 1, name: 'CityTouch', client: 'City Bank', category: 'FINTECH',
      description: 'Bangladesh\'s leading digital banking platform',
      stats: { transactions: '$3B+', users: '446K+' }, color: '#00d4ff',
    },
    {
      id: 2, name: 'Shwapno', client: 'Shwapno Retail', category: 'E-COMMERCE',
      description: 'E-commerce platform for Bangladesh\'s #1 supermarket chain',
      stats: { downloads: '100K+', gmv: '$50M+' }, color: '#00ff88',
    },
    {
      id: 3, name: 'Othoba', client: 'PRAN-RFL', category: 'E-COMMERCE',
      description: 'Marketplace connecting rural Bangladesh',
      stats: { growth: '50X', merchants: '10K+' }, color: '#ff6b35',
    },
    {
      id: 4, name: 'MyGP', client: 'Grameenphone', category: 'TELECOM',
      description: 'Self-care app for 80M+ subscribers',
      stats: { users: '30M+', rating: '4.5' }, color: '#9333ea',
    },
    {
      id: 5, name: 'Proctoring Pro', client: 'Moodle', category: 'LMS',
      description: 'AI-powered exam proctoring for online learning',
      stats: { sites: '2157+', learners: '500K+' }, color: '#f59e0b',
    },
    {
      id: 6, name: 'Cambridge ECG', client: 'Cambridge Heartwear', category: 'HEALTHCARE',
      description: 'AI-powered cardiac monitoring device',
      stats: { accuracy: '98%', award: 'BIMA' }, color: '#ff4444',
    },
    {
      id: 7, name: 'AB Bank IB', client: 'AB Bank', category: 'FINTECH',
      description: 'Comprehensive internet banking solution',
      stats: { features: '100+', uptime: '99.9%' }, color: '#3b82f6',
    },
    {
      id: 8, name: 'MyBL', client: 'Banglalink', category: 'TELECOM',
      description: 'Digital self-service platform',
      stats: { downloads: '10M+', transactions: '$100M+' }, color: '#00d4ff',
    },
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const styles = {
    page: { minHeight: '100vh' },
    hero: { padding: '100px 60px 60px', textAlign: 'center' },
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '15px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' },
    highlight: { color: 'var(--accent-cyan)' },
    filters: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 60px 40px' },
    filterBtn: (isActive) => ({
      padding: '10px 24px',
      background: isActive ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
      border: `1px solid ${isActive ? 'rgba(0, 212, 255, 0.5)' : 'var(--border-default)'}`,
      color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px',
      cursor: 'pointer', transition: 'all 0.3s',
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', padding: '0 60px 100px', maxWidth: '1400px', margin: '0 auto' },
    card: (color, isHovered) => ({
      background: 'var(--bg-card)',
      border: `1px solid ${isHovered ? color : 'var(--border-default)'}`,
      padding: '35px', cursor: 'pointer',
      transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      boxShadow: isHovered ? `0 20px 40px ${color}20` : 'none',
      transition: 'all 0.3s',
    }),
    cardHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' },
    icon: (color) => ({
      width: '50px', height: '50px',
      background: `linear-gradient(135deg, ${color}30, transparent)`,
      border: `1px solid ${color}50`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: color,
    }),
    name: { fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' },
    client: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' },
    category: (color) => ({
      fontFamily: 'var(--font-mono)', fontSize: '9px', color: color,
      padding: '4px 10px', background: `${color}15`, border: `1px solid ${color}30`,
    }),
    desc: { fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' },
    stats: { display: 'flex', gap: '25px', paddingTop: '20px', borderTop: '1px solid var(--border-default)' },
    stat: { display: 'flex', flexDirection: 'column', gap: '3px' },
    statValue: (color) => ({ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: color }),
    statLabel: { fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' },
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={styles.label}>OUR WORK</div>
          <h1 style={styles.title}>FLAGSHIP <span style={styles.highlight}>PROJECTS</span></h1>
        </motion.div>
      </section>

      <div style={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter}
            style={styles.filterBtn(activeFilter === filter)}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={styles.card(project.color, hoveredProject === project.id)}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.icon(project.color)}>{project.name.substring(0, 2).toUpperCase()}</div>
              <div>
                <div style={styles.name}>{project.name}</div>
                <div style={styles.client}>{project.client}</div>
              </div>
            </div>
            <span style={styles.category(project.color)}>{project.category}</span>
            <p style={{ ...styles.desc, marginTop: '15px' }}>{project.description}</p>
            <div style={styles.stats}>
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} style={styles.stat}>
                  <span style={styles.statValue(project.color)}>{value}</span>
                  <span style={styles.statLabel}>{key.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
