import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { id: 1, src: '/images/Hero-Img-v3.2.webp', title: 'Innovation Hub', color: '#00d4ff' },
  { id: 2, src: '/images/AIDSecI.webp', title: 'AI & Security', color: '#9333ea' },
  { id: 3, src: '/images/Service-Card-4.webp', title: 'Digital Services', color: '#00ff88' },
  { id: 4, src: '/images/bs-212.webp', title: 'Our Legacy', color: '#ffd700' },
  { id: 5, src: '/images/ctaimg-1.webp', title: 'Future Forward', color: '#ff6b35' },
];

function HolographicGallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color: images[Math.floor(Math.random() * images.length)].color,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  // Calculate 3D positions for pentagon layout
  const getImagePosition = (index, total) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 38;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  };

  return (
    <section className="holographic-gallery-section">
      <div className="section-header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Visual Excellence
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          OUR <span className="highlight">VISION</span> IN MOTION
        </motion.h2>
      </div>

      <div
        ref={containerRef}
        className="holographic-container"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
      >
        {/* Animated Background Grid */}
        <div className="holo-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="grid-line horizontal" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="grid-line vertical" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="particles-layer">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="holo-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                background: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Central Nexus */}
        <motion.div
          className="central-nexus"
          animate={{
            rotateX: mousePosition.y * 20,
            rotateY: mousePosition.x * 20,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="nexus-core">
            <span className="nexus-text">BS</span>
            <span className="nexus-number">23</span>
          </div>
          <div className="nexus-ring ring-1" />
          <div className="nexus-ring ring-2" />
          <div className="nexus-ring ring-3" />
        </motion.div>

        {/* Connection Lines SVG */}
        <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {images.map((_, index) => {
            const pos = getImagePosition(index, images.length);
            return (
              <motion.line
                key={`line-${index}`}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke={images[index].color}
                strokeWidth="0.15"
                strokeDasharray="2 2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={activeImage === index ? 'active-line' : ''}
              />
            );
          })}
        </svg>

        {/* Holographic Image Cards */}
        {images.map((image, index) => {
          const pos = getImagePosition(index, images.length);
          const isActive = activeImage === index;

          return (
            <motion.div
              key={image.id}
              className={`holo-card ${isActive ? 'active' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                '--card-color': image.color,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
              animate={{
                x: mousePosition.x * (20 + index * 5) * (isHovering ? 1 : 0),
                y: mousePosition.y * (20 + index * 5) * (isHovering ? 1 : 0),
                rotateX: mousePosition.y * -15,
                rotateY: mousePosition.x * 15,
                scale: isActive ? 1.15 : 1,
                zIndex: isActive ? 100 : 10,
              }}
              onMouseEnter={() => setActiveImage(index)}
              onMouseLeave={() => setActiveImage(null)}
              whileHover={{ scale: 1.1 }}
            >
              {/* Holographic Frame */}
              <div className="holo-frame">
                <div className="frame-corner corner-tl" />
                <div className="frame-corner corner-tr" />
                <div className="frame-corner corner-bl" />
                <div className="frame-corner corner-br" />
              </div>

              {/* Image Container */}
              <div className="holo-image-wrapper">
                <img src={image.src} alt={image.title} className="holo-image" />

                {/* Scanline Effect */}
                <div className="scanlines" />

                {/* Holographic Overlay */}
                <div className="holo-overlay" />

                {/* Glitch Effect on Hover */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="glitch-layer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Title Bar */}
              <motion.div
                className="holo-title-bar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 5 }}
              >
                <span className="holo-index">0{index + 1}</span>
                <span className="holo-title">{image.title}</span>
              </motion.div>

              {/* Energy Glow */}
              <div className="energy-glow" />

              {/* Data Stream Effect */}
              <div className="data-stream">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="data-bit" style={{ animationDelay: `${i * 0.2}s` }}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Floating Tech Labels */}
        <motion.div
          className="floating-label label-1"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          &lt;innovation/&gt;
        </motion.div>
        <motion.div
          className="floating-label label-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {'{transform}'}
        </motion.div>
        <motion.div
          className="floating-label label-3"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          [excellence]
        </motion.div>
      </div>

      {/* Interactive Hint */}
      <motion.p
        className="gallery-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >
        HOVER TO EXPLORE THE HOLOGRAPHIC DIMENSION
      </motion.p>
    </section>
  );
}

export default HolographicGallery;
