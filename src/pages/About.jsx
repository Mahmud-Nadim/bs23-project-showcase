import React, { useState } from 'react';
import { motion } from 'framer-motion';

const styles = {
  page: {
    minHeight: '100vh',
  },
  hero: {
    padding: '100px 60px',
    textAlign: 'center',
    position: 'relative',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--accent-cyan)',
    letterSpacing: '4px',
    marginBottom: '15px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 6vw, 64px)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '20px',
  },
  highlight: {
    color: 'var(--accent-cyan)',
  },
  description: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: 1.8,
  },
  section: {
    padding: '80px 60px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-default)',
    padding: '40px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  cardHover: {
    borderColor: 'var(--border-hover)',
    transform: 'translateY(-5px)',
  },
  timeline: {
    position: 'relative',
    maxWidth: '800px',
    margin: '40px auto 0',
  },
  timelineLine: {
    position: 'absolute',
    left: '20px',
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-green))',
  },
  timelineItem: {
    paddingLeft: '60px',
    paddingBottom: '40px',
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: '12px',
    top: '5px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: 'var(--accent-cyan)',
    border: '3px solid var(--bg-primary)',
    zIndex: 2,
  },
  year: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    color: 'var(--accent-cyan)',
    marginBottom: '10px',
  },
  itemTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '5px',
  },
  itemDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  leaderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginTop: '40px',
  },
  leaderCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-default)',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontSize: '28px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    color: 'var(--bg-primary)',
  },
  leaderName: {
    fontFamily: 'var(--font-display)',
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '5px',
  },
  leaderRole: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--accent-cyan)',
    letterSpacing: '1px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },
  valueCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-default)',
    padding: '30px',
    textAlign: 'center',
  },
  valueIcon: {
    fontSize: '40px',
    marginBottom: '15px',
  },
  valueName: {
    fontFamily: 'var(--font-display)',
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '2px',
  },
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const timeline = [
    { year: '2006', title: 'INCEPTION', desc: 'Brain Station 23 founded in Dhaka, Bangladesh with a vision to become a global technology leader.' },
    { year: '2012', title: 'FINTECH PIONEER', desc: 'Delivered first banking solution, marking the beginning of our fintech journey.' },
    { year: '2018', title: 'BASIS ICT AWARDS', desc: 'Won top honors in Fintech, Real Estate & Transportation sectors.' },
    { year: '2019', title: 'CAMBRIDGE HEARTWEAR', desc: 'BIMA Award-winning AI healthcare device - World Changing Ideas finalist.' },
    { year: '2022', title: 'CITYTOUCH MILESTONE', desc: '$3B+ transactions, 446K+ users - Bangladesh\'s leading digital banking platform.' },
    { year: '2024', title: 'PUBLIC LISTING', desc: 'Brain Station 23 PLC - Listed on Dhaka Stock Exchange.' },
  ];

  const leadership = [
    { name: 'Raisul Kabir', role: 'CEO & FOUNDER', initials: 'RK' },
    { name: 'Wahid Sadique', role: 'COO', initials: 'WS' },
    { name: 'Akhlaqur Rahman', role: 'CTO', initials: 'AR' },
    { name: 'Mashfiqur Rahman', role: 'VP ENGINEERING', initials: 'MR' },
  ];

  const values = [
    { icon: '🎯', name: 'INNOVATION' },
    { icon: '🤝', name: 'INTEGRITY' },
    { icon: '🚀', name: 'EXCELLENCE' },
    { icon: '💡', name: 'COLLABORATION' },
    { icon: '🌍', name: 'GLOBAL IMPACT' },
    { icon: '❤️', name: 'CUSTOMER FIRST' },
  ];

  const stats = [
    { value: '18+', label: 'Years of Excellence' },
    { value: '800+', label: 'Tech Professionals' },
    { value: '2500+', label: 'Projects Delivered' },
    { value: '25+', label: 'Countries Served' },
  ];

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.label}>WHO WE ARE</div>
          <h1 style={styles.title}>
            OUR <span style={styles.highlight}>STORY</span>
          </h1>
          <p style={styles.description}>
            Since 2006, Brain Station 23 has been at the forefront of digital transformation,
            empowering enterprises globally with innovative software solutions. From a small
            team with big dreams to Bangladesh's leading technology company.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ ...styles.section, background: 'var(--bg-secondary)', maxWidth: '100%' }}>
        <div style={{ ...styles.grid, maxWidth: '1200px', margin: '0 auto', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={styles.label}>OUR JOURNEY</div>
          <h2 style={{ ...styles.title, fontSize: '36px' }}>
            MILESTONES & <span style={styles.highlight}>ACHIEVEMENTS</span>
          </h2>
        </div>
        <div style={styles.timeline}>
          <div style={styles.timelineLine} />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={styles.timelineItem}
            >
              <div style={styles.timelineDot} />
              <div style={styles.year}>{item.year}</div>
              <div style={styles.itemTitle}>{item.title}</div>
              <div style={styles.itemDesc}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section style={{ ...styles.section, background: 'var(--bg-secondary)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={styles.label}>THE TEAM</div>
            <h2 style={{ ...styles.title, fontSize: '36px' }}>
              LEADERSHIP <span style={styles.highlight}>TEAM</span>
            </h2>
          </div>
          <div style={styles.leaderGrid}>
            {leadership.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={styles.leaderCard}
              >
                <div style={styles.avatar}>{leader.initials}</div>
                <div style={styles.leaderName}>{leader.name}</div>
                <div style={styles.leaderRole}>{leader.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={styles.section}>
        <div style={{ textAlign: 'center' }}>
          <div style={styles.label}>WHAT DRIVES US</div>
          <h2 style={{ ...styles.title, fontSize: '36px' }}>
            OUR <span style={styles.highlight}>VALUES</span>
          </h2>
        </div>
        <div style={styles.valuesGrid}>
          {values.map((value, i) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={styles.valueCard}
            >
              <div style={styles.valueIcon}>{value.icon}</div>
              <div style={styles.valueName}>{value.name}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
