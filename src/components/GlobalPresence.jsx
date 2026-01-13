import React from 'react';
import { motion } from 'framer-motion';
import WorldMap from './WorldMap';

export default function GlobalPresence() {
  const stats = [
    { value: '6', label: 'Global Offices', color: '#00d4ff' },
    { value: '30+', label: 'Countries Served', color: '#00ff88' },
    { value: '850+', label: 'Team Members', color: '#9333ea' },
    { value: '24/7', label: 'Support', color: '#ffd700' },
  ];

  return (
    <section className="global-presence-section">
      <div className="global-presence-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">WORLDWIDE NETWORK</span>
          <h2 className="section-title">
            GLOBAL <span className="highlight">PRESENCE</span>
          </h2>
          <p className="section-description">
            Delivering excellence across continents with strategically located offices
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="global-stats"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="global-stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: `0 20px 40px ${stat.color}30`
              }}
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="world-map-wrapper"
        >
          <WorldMap />
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="global-message"
        >
          <span className="message-icon">🌍</span>
          <span className="message-text">
            From Dhaka to the World — Empowering enterprises across 30+ countries
          </span>
        </motion.div>
      </div>
    </section>
  );
}
