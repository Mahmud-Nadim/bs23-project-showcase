import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Solutions() {
  const [activeSolution, setActiveSolution] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const solutions = [
    {
      id: 'fintech', name: 'FINTECH & BANKING', icon: '🏦', color: '#00d4ff',
      description: 'Digital banking transformation with mobile banking, internet banking, wallet solutions, and payment gateways.',
      features: ['Mobile Banking', 'Internet Banking', 'Digital Wallets', 'Payment Gateway', 'KYC/eKYC', 'Core Banking'],
      stats: { projects: '50+', transactions: '$3B+' },
    },
    {
      id: 'ecommerce', name: 'E-COMMERCE', icon: '🛒', color: '#00ff88',
      description: 'Enterprise-scale e-commerce platforms with microservices architecture and AI recommendations.',
      features: ['Marketplace', 'Inventory Mgmt', 'Payment Integration', 'Analytics', 'Mobile Apps', 'ERP Integration'],
      stats: { projects: '100+', gmv: '$500M+' },
    },
    {
      id: 'healthcare', name: 'HEALTHCARE & PHARMA', icon: '🏥', color: '#ff4444',
      description: 'AI-powered healthcare solutions, pharma sales force automation, and medical device applications.',
      features: ['AI Diagnostics', 'mSFA', 'HCP Portals', 'Clinical Trials', 'Compliance', 'Analytics'],
      stats: { projects: '30+', lives: '1M+' },
    },
    {
      id: 'telecom', name: 'TELECOM', icon: '📡', color: '#9333ea',
      description: 'Enterprise telecom solutions serving millions of users with reliability and innovation.',
      features: ['Self-care Apps', 'BSS/OSS', 'CRM', 'Analytics', 'DevOps', 'API Gateway'],
      stats: { users: '100M+', uptime: '99.9%' },
    },
    {
      id: 'lms', name: 'LMS & EDTECH', icon: '📚', color: '#f59e0b',
      description: 'Moodle-certified solutions with AI proctoring, interview scheduling, and learning analytics.',
      features: ['Proctoring Pro', 'Live Classes', 'Assessments', 'Analytics', 'Integrations', 'Mobile LMS'],
      stats: { sites: '2157+', learners: '500K+' },
    },
    {
      id: 'cloud', name: 'CLOUD & DEVOPS', icon: '☁️', color: '#3b82f6',
      description: 'AWS Advanced Partner delivering cloud migration, infrastructure, and managed services.',
      features: ['AWS Migration', 'Kubernetes', 'CI/CD', 'Monitoring', 'Security', 'Cost Optimization'],
      stats: { migrations: '200+', savings: '40%' },
    },
  ];

  const techStack = [
    { name: 'React', category: 'Frontend', color: '#61dafb' },
    { name: 'Angular', category: 'Frontend', color: '#dd0031' },
    { name: 'Vue.js', category: 'Frontend', color: '#4fc08d' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: '.NET', category: 'Backend', color: '#512bd4' },
    { name: 'Java', category: 'Backend', color: '#007396' },
    { name: 'Python', category: 'AI/ML', color: '#3776ab' },
    { name: 'AWS', category: 'Cloud', color: '#ff9900' },
    { name: 'Azure', category: 'Cloud', color: '#0078d4' },
    { name: 'Kubernetes', category: 'DevOps', color: '#326ce5' },
    { name: 'TensorFlow', category: 'AI/ML', color: '#ff6f00' },
    { name: 'Flutter', category: 'Mobile', color: '#02569b' },
  ];

  const styles = {
    page: { minHeight: '100vh' },
    hero: { padding: '100px 60px 60px', textAlign: 'center' },
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '15px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' },
    highlight: { color: 'var(--accent-cyan)' },
    main: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', padding: '0 60px 100px', maxWidth: '1400px', margin: '0 auto' },
    solutionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px' },
    card: (color, isActive) => ({
      background: isActive ? `linear-gradient(135deg, ${color}15, transparent)` : 'var(--bg-card)',
      border: `1px solid ${isActive ? color : 'var(--border-default)'}`,
      padding: '30px', cursor: 'pointer', transition: 'all 0.4s',
    }),
    cardHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' },
    icon: { fontSize: '32px' },
    name: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' },
    projects: (color) => ({ fontFamily: 'var(--font-mono)', fontSize: '10px', color: color, letterSpacing: '1px' }),
    desc: { fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' },
    features: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' },
    feature: (color) => ({
      fontFamily: 'var(--font-mono)', fontSize: '10px', color: color,
      padding: '4px 10px', background: `${color}15`, border: `1px solid ${color}30`,
    }),
    techPanel: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '30px' },
    techTitle: { fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '30px' },
    techOrbs: { position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    centerOrb: {
      width: '80px', height: '80px',
      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-green))',
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--bg-primary)', zIndex: 10,
    },
    techOrb: (color, x, y, isHovered) => ({
      position: 'absolute', left: `calc(50% + ${x}px - 25px)`, top: `calc(50% + ${y}px - 25px)`,
      width: '50px', height: '50px', background: `${color}20`, border: `2px solid ${color}`,
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: '8px', color: color, cursor: 'pointer',
      transition: 'all 0.3s', transform: isHovered ? 'scale(1.3)' : 'scale(1)', zIndex: isHovered ? 100 : 1,
    }),
    hoveredInfo: { textAlign: 'center', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    partners: { marginTop: '30px', paddingTop: '30px', borderTop: '1px solid var(--border-default)' },
    partnerLabel: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '15px' },
    partnerBadges: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    partnerBadge: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)', padding: '6px 12px', background: 'var(--bg-card)', border: '1px solid var(--border-default)' },
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.label}>FULL-STACK CAPABILITIES</div>
          <h1 style={styles.title}>SOLUTIONS & <span style={styles.highlight}>EXPERTISE</span></h1>
        </motion.div>
      </section>

      <div style={styles.main}>
        <div style={styles.solutionsGrid}>
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={styles.card(solution.color, activeSolution === solution.id)}
              onClick={() => setActiveSolution(activeSolution === solution.id ? null : solution.id)}
            >
              <div style={styles.cardHeader}>
                <span style={styles.icon}>{solution.icon}</span>
                <div>
                  <div style={styles.name}>{solution.name}</div>
                  <div style={styles.projects(solution.color)}>{solution.stats.projects || Object.values(solution.stats)[0]} PROJECTS</div>
                </div>
              </div>
              <p style={styles.desc}>{solution.description}</p>
              {activeSolution === solution.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={styles.features}>
                    {solution.features.map((f) => (
                      <span key={f} style={styles.feature(solution.color)}>{f}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div style={styles.techPanel} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <h3 style={styles.techTitle}>TECHNOLOGY STACK</h3>
          <div style={styles.techOrbs}>
            <div style={styles.centerOrb}>BS23</div>
            {techStack.map((tech, i) => {
              const angle = (i / techStack.length) * 360;
              const radius = 110;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <div
                  key={tech.name}
                  style={styles.techOrb(tech.color, x, y, hoveredTech === tech.name)}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {tech.name.substring(0, 3).toUpperCase()}
                </div>
              );
            })}
          </div>
          <div style={styles.hoveredInfo}>
            {hoveredTech ? (
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{hoveredTech}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)', letterSpacing: '2px' }}>
                  {techStack.find(t => t.name === hoveredTech)?.category}
                </div>
              </div>
            ) : (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>HOVER TO EXPLORE</div>
            )}
          </div>
          <div style={styles.partners}>
            <div style={styles.partnerLabel}>CERTIFIED PARTNERSHIPS</div>
            <div style={styles.partnerBadges}>
              {['AWS', 'Microsoft', 'Google', 'Odoo', 'Moodle', 'Adobe'].map((p) => (
                <span key={p} style={styles.partnerBadge}>{p}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
