import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Epic 3D Components
import NeuralHero3D from '../components/NeuralHero3D';
import '../components/NeuralHero3D.css';

// Apple-style Scroll Sections
import AppleScrollSections from '../components/AppleScrollSections';
import '../components/AppleScrollSections.css';

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

// Enhanced Clients Marquee with Click Flair
function ClientsMarquee() {
  const [clickEffects, setClickEffects] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const marqueeRef = useRef(null);

  const clients = [
    'City Bank', 'Grameenphone', 'Shwapno', 'HSBC', 'Robi', 'PayPal',
    'British Telecom', 'Incepta', 'MetLife', 'Banglalink', 'Telenor',
    'BAT', 'Unilever', 'Nissan', 'Cambridge', 'JTI', 'Aristopharma'
  ];

  const colors = ['#00d4ff', '#00ff88', '#9333ea', '#ffd700', '#ff6b35', '#ff4444'];

  const handleClick = (e) => {
    const rect = marqueeRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = colors[Math.floor(Math.random() * colors.length)];

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

    setTimeout(() => {
      setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 1500);
  };

  const handleItemClick = (e, client) => {
    e.stopPropagation();
    handleClick(e);

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
      className="clients-marquee-enhanced"
      ref={marqueeRef}
      onClick={handleClick}
    >
      <div className="marquee-header">
        <span className="marquee-label">TRUSTED BY INDUSTRY LEADERS</span>
      </div>

      {/* Click effect layer */}
      <div className="click-effects-layer">
        <AnimatePresence>
          {clickEffects.map((effect) => (
            effect.isText ? (
              <motion.div
                key={effect.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -80, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="floating-text-effect"
                style={{
                  left: effect.x,
                  top: effect.y,
                  color: effect.color,
                  textShadow: `0 0 30px ${effect.color}`,
                }}
              >
                {effect.text}
              </motion.div>
            ) : (
              <React.Fragment key={effect.id}>
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="burst-effect"
                  style={{
                    left: effect.x,
                    top: effect.y,
                    background: `radial-gradient(circle, ${effect.color}, transparent)`,
                  }}
                />
                {effect.particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: effect.x, y: effect.y, scale: 1, opacity: 1 }}
                    animate={{
                      x: effect.x + Math.cos(particle.angle) * particle.distance,
                      y: effect.y + Math.sin(particle.angle) * particle.distance,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.8, delay: particle.delay }}
                    className="particle-effect"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      background: effect.color,
                      boxShadow: `0 0 10px ${effect.color}`,
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
            >
              {client}
              {hoveredItem === `1-${index}` && (
                <motion.span
                  className="hover-sparkle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  *
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
            >
              {client}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        className="marquee-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        CLICK FOR MAGIC
      </motion.div>
    </section>
  );
}

// Main Landing Component
export default function Landing() {
  return (
    <div className="landing-page-epic">
      {/* Epic 3D Neural Hero Section */}
      <NeuralHero3D />

      {/* Apple-Style Scroll Animated Sections (includes Our Core Beliefs, Tech Spider Web, Globe) */}
      <AppleScrollSections />

      {/* Client Marquee */}
      <ClientsMarquee />
    </div>
  );
}
