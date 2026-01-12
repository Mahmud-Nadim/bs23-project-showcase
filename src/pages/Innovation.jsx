import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Innovation() {
  const [activeYear, setActiveYear] = useState('ALL');
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  const timeline = [
    { year: 2006, title: 'INCEPTION', desc: 'Brain Station 23 founded in Dhaka, Bangladesh', type: 'milestone', icon: '🚀' },
    { year: 2012, title: 'FINTECH PIONEER', desc: 'First banking solution delivered - Beginning of fintech journey', type: 'milestone', icon: '🏦' },
    { year: 2013, title: 'HSBC EXCELLENCE AWARD', desc: 'Top SME Exporter recognition for global IT contributions', type: 'award', icon: '🏆' },
    { year: 2018, title: 'BASIS ICT AWARDS', desc: 'Top honors in Fintech, Real Estate & Transportation', type: 'award', icon: '🏅' },
    { year: 2019, title: 'GOOGLE AI KAGGLE BRONZE', desc: 'Machine Learning competition recognition globally', type: 'award', icon: '🥉' },
    { year: 2019, title: 'CAMBRIDGE HEARTWEAR', desc: 'BIMA Award-winning AI healthcare device - World Changing Ideas', type: 'innovation', icon: '❤️' },
    { year: 2022, title: 'CITYTOUCH MILESTONE', desc: '$3B+ transactions, 446K+ users - Bangladesh\'s leading digital bank', type: 'milestone', icon: '📱' },
    { year: 2023, title: 'SHWAPNO TRANSFORMATION', desc: 'Bangladesh\'s #1 supermarket goes digital with microservices', type: 'innovation', icon: '🛒' },
    { year: 2024, title: 'MOODLE CERTIFIED PARTNER', desc: 'Official Moodle Integration Partner - Proctoring Pro on 2157+ sites', type: 'milestone', icon: '📚' },
    { year: 2024, title: 'PUBLIC LISTING', desc: 'Brain Station 23 PLC - Listed on Stock Exchange', type: 'milestone', icon: '📈' },
  ];

  const innovations = [
    { name: 'AI/ML SOLUTIONS', icon: '🧠', desc: 'Deep learning models for healthcare, fraud detection & recommendations', projects: ['Cambridge ECG', 'Credit Scoring', 'Product Recommendations'], color: '#9333ea' },
    { name: 'AR/VR EXPERIENCES', icon: '👓', desc: 'Immersive experiences for real estate, training & retail', projects: ['Fire Safety VR', 'Real Estate Tours', 'Product Visualization'], color: '#f59e0b' },
    { name: 'BLOCKCHAIN', icon: '⛓️', desc: 'Decentralized solutions for supply chain & digital identity', projects: ['Supply Chain Tracking', 'Digital Certificates', 'Smart Contracts'], color: '#3b82f6' },
    { name: 'CLOUD NATIVE', icon: '☁️', desc: 'AWS Advanced Partner - 200+ cloud migrations completed', projects: ['Kubernetes', 'Serverless', 'DevOps Automation'], color: '#00ff88' },
  ];

  const typeColors = { milestone: '#00d4ff', award: '#ffd700', innovation: '#00ff88' };
  const years = [...new Set(timeline.map(t => t.year))].sort((a, b) => b - a);
  const filteredTimeline = activeYear === 'ALL' ? timeline : timeline.filter(t => t.year === activeYear);

  const styles = {
    page: { minHeight: '100vh', position: 'relative' },
    particles: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' },
    particle: (left, delay, duration) => ({
      position: 'absolute', left: `${left}%`, width: '2px', height: `${20 + Math.random() * 40}px`,
      background: `linear-gradient(180deg, transparent, ${['#00d4ff', '#00ff88', '#9333ea'][Math.floor(Math.random() * 3)]}40, transparent)`,
      animation: `dataFlow ${duration}s linear infinite`, animationDelay: `${delay}s`,
    }),
    header: { padding: '100px 60px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '8px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 700, color: 'var(--text-primary)' },
    highlight: { color: 'var(--accent-cyan)' },
    stats: { display: 'flex', gap: '30px' },
    stat: (color) => ({ textAlign: 'center' }),
    statValue: (color) => ({ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: color }),
    statLabel: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px' },
    main: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', padding: '0 60px 100px' },
    yearFilters: { display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' },
    yearBtn: (isActive) => ({
      background: isActive ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
      border: `1px solid ${isActive ? 'rgba(0, 212, 255, 0.5)' : 'var(--border-default)'}`,
      padding: '8px 16px', color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)', fontSize: '11px', cursor: 'pointer', transition: 'all 0.3s',
    }),
    timeline: { position: 'relative' },
    timelineLine: { position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.3), rgba(0, 255, 136, 0.1))' },
    timelineItem: (typeColor, isHovered) => ({
      display: 'flex', gap: '30px', marginBottom: '30px', paddingLeft: '50px', position: 'relative',
      transition: 'all 0.4s', transform: isHovered ? 'translateX(10px)' : 'translateX(0)', cursor: 'pointer',
    }),
    dot: (color) => ({ position: 'absolute', left: '12px', top: '5px', width: '18px', height: '18px', background: color, borderRadius: '50%', border: '3px solid var(--bg-primary)', zIndex: 2 }),
    year: (color) => ({ minWidth: '60px', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: color }),
    content: (color, isHovered) => ({
      flex: 1, background: isHovered ? `linear-gradient(135deg, ${color}10, transparent)` : 'var(--bg-card)',
      border: `1px solid ${isHovered ? color : 'var(--border-default)'}`, padding: '20px', transition: 'all 0.3s',
    }),
    typeLabel: (color) => ({ fontFamily: 'var(--font-mono)', fontSize: '9px', color: color, letterSpacing: '2px', textTransform: 'uppercase' }),
    itemTitle: { fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
    itemDesc: { fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 },
    innovationCards: { display: 'flex', flexDirection: 'column', gap: '20px' },
    sectionTitle: { fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' },
    innovationCard: (color) => ({
      background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '25px',
      cursor: 'pointer', transition: 'all 0.4s',
    }),
    cardHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' },
    cardIcon: (color) => ({
      width: '50px', height: '50px', background: `${color}20`, border: `1px solid ${color}50`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
    }),
    cardName: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' },
    cardDesc: { fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '15px' },
    projects: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
    project: (color) => ({
      fontFamily: 'var(--font-mono)', fontSize: '9px', color: color, padding: '4px 8px',
      background: `${color}10`, border: `1px solid ${color}30`,
    }),
    certs: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '25px', marginTop: '20px' },
    certsTitle: { fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '15px' },
    certBadges: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    certBadge: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)', padding: '8px 12px', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)' },
  };

  return (
    <div style={styles.page}>
      <style>{`@keyframes dataFlow { 0% { transform: translateY(100vh); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }`}</style>
      <div style={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={styles.particle(Math.random() * 100, Math.random() * 5, 3 + Math.random() * 4)} />
        ))}
      </div>

      <header style={styles.header}>
        <div>
          <div style={styles.label}>18+ YEARS OF EXCELLENCE</div>
          <h1 style={styles.title}>INNOVATION <span style={styles.highlight}>LAB</span></h1>
        </div>
        <div style={styles.stats}>
          {[{ value: '8+', label: 'Awards Won', color: '#ffd700' }, { value: '15+', label: 'Tech Partners', color: '#00d4ff' }, { value: '4', label: 'R&D Verticals', color: '#00ff88' }].map((s) => (
            <div key={s.label} style={styles.stat(s.color)}>
              <div style={styles.statValue(s.color)}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      <main style={styles.main}>
        <div>
          <div style={styles.yearFilters}>
            <button style={styles.yearBtn(activeYear === 'ALL')} onClick={() => setActiveYear('ALL')}>ALL</button>
            {years.slice(0, 8).map((year) => (
              <button key={year} style={styles.yearBtn(activeYear === year)} onClick={() => setActiveYear(year)}>{year}</button>
            ))}
          </div>

          <div style={styles.timeline}>
            <div style={styles.timelineLine} />
            {filteredTimeline.sort((a, b) => b.year - a.year).map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={styles.timelineItem(typeColors[item.type], hoveredMilestone === item.title)}
                onMouseEnter={() => setHoveredMilestone(item.title)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                <div style={styles.dot(typeColors[item.type])} />
                <div style={styles.year(typeColors[item.type])}>{item.year}</div>
                <div style={styles.content(typeColors[item.type], hoveredMilestone === item.title)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <div>
                      <span style={styles.typeLabel(typeColors[item.type])}>{item.type}</span>
                      <h3 style={styles.itemTitle}>{item.title}</h3>
                    </div>
                  </div>
                  <p style={styles.itemDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={styles.innovationCards}>
          <h3 style={styles.sectionTitle}>R&D FOCUS AREAS</h3>
          {innovations.map((inn, i) => (
            <motion.div key={inn.name} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={styles.innovationCard(inn.color)}>
              <div style={styles.cardHeader}>
                <div style={styles.cardIcon(inn.color)}>{inn.icon}</div>
                <div style={styles.cardName}>{inn.name}</div>
              </div>
              <p style={styles.cardDesc}>{inn.desc}</p>
              <div style={styles.projects}>
                {inn.projects.map((p) => <span key={p} style={styles.project(inn.color)}>{p}</span>)}
              </div>
            </motion.div>
          ))}

          <div style={styles.certs}>
            <h4 style={styles.certsTitle}>CERTIFICATIONS & COMPLIANCE</h4>
            <div style={styles.certBadges}>
              {['CMMI Level 3', 'ISO 9001', 'ISO 27001', 'AWS Advanced', 'Moodle Certified'].map((c) => (
                <span key={c} style={styles.certBadge}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
