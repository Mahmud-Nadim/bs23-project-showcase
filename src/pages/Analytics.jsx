import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

function StatCard({ value, label, color, suffix = '', index }) {
  const { count, start } = useCounter(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onViewportEnter={start}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        padding: '30px',
        textAlign: 'center',
        transition: 'all 0.3s',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '48px',
        fontWeight: 700,
        color: color,
        textShadow: `0 0 30px ${color}50`,
      }}>{count}{suffix}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--text-muted)',
        letterSpacing: '2px',
        marginTop: '10px',
      }}>{label}</div>
    </motion.div>
  );
}

function BarChart({ data, title }) {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-default)',
      padding: '30px',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '25px',
      }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {data.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: item.color }}>{item.value}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                style={{ height: '100%', background: item.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ percentage, label, color }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r="45" fill="none" stroke="var(--bg-tertiary)" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </svg>
      <div style={{ marginTop: '-80px', paddingTop: '35px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: color }}>{percentage}%</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '5px' }}>{label}</div>
      </div>
    </div>
  );
}

export default function Analytics() {
  const stats = [
    { value: 2500, suffix: '+', label: 'PROJECTS DELIVERED', color: '#00d4ff' },
    { value: 800, suffix: '+', label: 'TECH PROFESSIONALS', color: '#00ff88' },
    { value: 25, suffix: '+', label: 'COUNTRIES SERVED', color: '#9333ea' },
    { value: 18, suffix: '+', label: 'YEARS OF EXCELLENCE', color: '#ffd700' },
    { value: 100, suffix: '+', label: 'ENTERPRISE CLIENTS', color: '#ff6b35' },
    { value: 99, suffix: '.9%', label: 'UPTIME SLA', color: '#3b82f6' },
  ];

  const industryData = [
    { label: 'Fintech & Banking', value: 30, color: '#00d4ff' },
    { label: 'E-Commerce', value: 25, color: '#00ff88' },
    { label: 'Telecom', value: 20, color: '#9333ea' },
    { label: 'Healthcare', value: 15, color: '#ff4444' },
    { label: 'LMS & EdTech', value: 10, color: '#f59e0b' },
  ];

  const techData = [
    { label: 'React/Angular/Vue', value: 40, color: '#61dafb' },
    { label: 'Node.js/.NET/Java', value: 35, color: '#339933' },
    { label: 'Python/AI/ML', value: 15, color: '#3776ab' },
    { label: 'Mobile (Flutter/Native)', value: 10, color: '#02569b' },
  ];

  const metrics = [
    { percentage: 95, label: 'CLIENT SATISFACTION', color: '#00d4ff' },
    { percentage: 40, label: 'COST REDUCTION', color: '#00ff88' },
    { percentage: 99, label: 'DELIVERY SUCCESS', color: '#9333ea' },
    { percentage: 85, label: 'REPEAT BUSINESS', color: '#ffd700' },
  ];

  const styles = {
    page: { minHeight: '100vh' },
    hero: { padding: '100px 60px 60px', textAlign: 'center' },
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '15px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' },
    highlight: { color: 'var(--accent-cyan)' },
    description: { fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', padding: '0 60px 60px', maxWidth: '1400px', margin: '0 auto' },
    chartsSection: { padding: '60px', background: 'var(--bg-secondary)' },
    chartsContainer: { maxWidth: '1400px', margin: '0 auto' },
    chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '60px' },
    metricsSection: { padding: '60px', maxWidth: '1200px', margin: '0 auto' },
    metricsTitle: { textAlign: 'center', marginBottom: '40px' },
    metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '50px' },
    footer: { padding: '60px', textAlign: 'center' },
    footerText: { fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '2px' },
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.label}>REAL-TIME DATA</div>
          <h1 style={styles.title}>COMPANY <span style={styles.highlight}>ANALYTICS</span></h1>
          <p style={styles.description}>A data-driven view of our growth, capabilities, and impact across industries.</p>
        </motion.div>
      </section>

      <div style={styles.statsGrid}>
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <section style={styles.chartsSection}>
        <div style={styles.chartsContainer}>
          <div style={styles.chartsGrid}>
            <BarChart data={industryData} title="INDUSTRY DISTRIBUTION" />
            <BarChart data={techData} title="TECHNOLOGY STACK" />
          </div>
        </div>
      </section>

      <section style={styles.metricsSection}>
        <div style={styles.metricsTitle}>
          <div style={styles.label}>KEY PERFORMANCE</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>
            SUCCESS <span style={styles.highlight}>METRICS</span>
          </h2>
        </div>
        <div style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <DonutChart key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      <section style={styles.footer}>
        <p style={styles.footerText}>DATA UPDATED IN REAL-TIME FROM OUR OPERATIONS DASHBOARD</p>
      </section>
    </div>
  );
}
