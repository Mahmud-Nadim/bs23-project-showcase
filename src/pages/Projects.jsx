import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// ============================================================================
// THE NEXUS CONSTELLATION - An RPG-Style Project Showcase
// ============================================================================

// Cosmic Background with Nebula and Stars
function CosmicBackground({ activeColor = '#00d4ff' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const nebulaeRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Initialize stars
    particlesRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      color: ['#ffffff', '#00d4ff', '#00ff88', '#9333ea', '#ff6b35'][Math.floor(Math.random() * 5)],
    }));

    // Initialize nebulae
    nebulaeRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 300 + 200,
      color: activeColor,
      opacity: Math.random() * 0.1 + 0.05,
      drift: { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 },
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 15, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw nebulae
      nebulaeRef.current.forEach(nebula => {
        nebula.x += nebula.drift.x;
        nebula.y += nebula.drift.y;
        if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius;
        if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = height + nebula.radius;
        if (nebula.y > height + nebula.radius) nebula.y = -nebula.radius;

        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
        gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${nebula.color}${Math.floor(nebula.opacity * 128).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Draw and animate stars
      particlesRef.current.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) star.twinkleSpeed *= -1;
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Add glow to larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${Math.floor(star.opacity * 50).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// Particle Burst Effect
function ParticleBurst({ x, y, color, count = 20, active }) {
  if (!active) return null;

  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 100 }}>
      {[...Array(count)].map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        return (
          <motion.div
            key={i}
            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

// 3D Holographic Display Component
function HolographicDisplay({ children, color, size = 200, active = true }) {
  return (
    <motion.div
      animate={{
        rotateY: active ? [0, 360] : 0,
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Holographic rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            rotateX: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.5,
          }}
          style={{
            position: 'absolute',
            inset: 10 * i,
            border: `2px solid ${color}`,
            borderRadius: '50%',
            boxShadow: `0 0 20px ${color}50, inset 0 0 20px ${color}30`,
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
    </motion.div>
  );
}

// Cyber Grid Floor Effect
function CyberGridFloor({ color }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      background: `linear-gradient(to top, ${color}10, transparent)`,
      overflow: 'hidden',
      perspective: '500px',
      pointerEvents: 'none',
    }}>
      <motion.div
        animate={{ backgroundPositionY: ['0px', '50px'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          transform: 'rotateX(60deg)',
          transformOrigin: 'center top',
          backgroundImage: `
            linear-gradient(${color}40 1px, transparent 1px),
            linear-gradient(90deg, ${color}40 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// Hexagonal Artifact Node (Project Card)
function ArtifactNode({ project, index, onClick, isActive, totalProjects, isLightMode, themeColors }) {
  const nodeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [showBurst, setShowBurst] = useState(false);

  const handleMouseMove = (e) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleClick = () => {
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 800);
    onClick(project);
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -15 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 15 : 0;

  // Rarity based on project stats
  const getRarity = () => {
    const score = Object.values(project.stats).join('').length;
    if (score > 25) return { name: 'LEGENDARY', color: '#ffd700', glow: '0 0 40px #ffd700' };
    if (score > 20) return { name: 'EPIC', color: '#9333ea', glow: '0 0 30px #9333ea' };
    if (score > 15) return { name: 'RARE', color: '#00d4ff', glow: '0 0 25px #00d4ff' };
    return { name: 'COMMON', color: '#00ff88', glow: '0 0 20px #00ff88' };
  };

  const rarity = getRarity();

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: isHovered ? -20 : 0,
      }}
      exit={{ opacity: 0, scale: 0, rotate: 180 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        perspective: '1200px',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <ParticleBurst x="50%" y="50%" color={project.color} active={showBurst} />

      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          background: themeColors?.cardBg || `linear-gradient(135deg, rgba(10, 10, 30, 0.95), rgba(20, 20, 50, 0.9))`,
          border: `2px solid ${isHovered ? project.color : (themeColors?.cardBorder || 'rgba(255,255,255,0.1)')}`,
          borderRadius: '20px',
          padding: '30px',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 30px 60px ${isLightMode ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.5)'}, ${rarity.glow}, inset 0 0 60px ${project.color}15`
            : (themeColors?.cardShadow || '0 10px 40px rgba(0,0,0,0.3)'),
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Animated energy border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `conic-gradient(from 0deg, transparent, ${project.color}30, transparent, ${project.color}15, transparent)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
          }}
        />

        {/* Spotlight effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered
              ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${project.color}30, transparent 50%)`
              : 'transparent',
            pointerEvents: 'none',
            borderRadius: '18px',
          }}
        />

        {/* Rarity Badge */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.3 }}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '4px 10px',
            background: `${rarity.color}20`,
            border: `1px solid ${rarity.color}`,
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            fontWeight: 700,
            color: rarity.color,
            letterSpacing: '1px',
            textShadow: rarity.glow,
          }}
        >
          {rarity.name}
        </motion.div>

        {/* Animated Icon Container */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? [
                  `0 0 20px ${project.color}60, 0 0 40px ${project.color}40`,
                  `0 0 40px ${project.color}80, 0 0 60px ${project.color}60`,
                  `0 0 20px ${project.color}60, 0 0 40px ${project.color}40`,
                ]
              : 'none',
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
            border: `2px solid ${project.color}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          {project.icon}
          {/* Pulse ring */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 0, 0.5] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-5px',
              border: `2px solid ${project.color}`,
              borderRadius: '20px',
            }}
          />
        </motion.div>

        {/* Project Name */}
        <motion.h3
          animate={{ color: isHovered ? project.color : 'var(--text-primary)' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '8px',
            textShadow: isHovered ? `0 0 30px ${project.color}80` : 'none',
          }}
        >
          {project.name}
        </motion.h3>

        {/* Client & Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '1px',
          }}>
            {project.client}
          </span>
          <span style={{
            padding: '3px 8px',
            background: `${project.color}20`,
            border: `1px solid ${project.color}40`,
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: project.color,
            letterSpacing: '1px',
          }}>
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '20px',
          flex: 1,
        }}>
          {project.description.substring(0, 100)}...
        </p>

        {/* Stats Preview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          paddingTop: '15px',
          borderTop: `1px solid ${isHovered ? project.color + '40' : 'rgba(255,255,255,0.1)'}`,
        }}>
          {Object.entries(project.stats).slice(0, 2).map(([key, value], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + i * 0.1 + 0.4 }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                color: project.color,
                textShadow: isHovered ? `0 0 20px ${project.color}` : 'none',
              }}>{value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>{key}</div>
            </motion.div>
          ))}
        </div>

        {/* Explore prompt */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          style={{
            position: 'absolute',
            bottom: '15px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: project.color,
            letterSpacing: '2px',
          }}
        >
          BEGIN QUEST
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ fontSize: '14px' }}
          >
            ⚔️
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// ULTRA-PREMIUM PROJECT MODAL - Cinematic Case Study Presentation
// ============================================================================

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    let start = 0;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue, duration]);

  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const originalSuffix = value.match(/[^0-9.]*$/)?.[0] || '';
  return <span>{prefix}{count}{originalSuffix}{suffix}</span>;
}

// 3D Floating Orb Component
function FloatingOrb({ color, size = 100, delay = 0, x = '50%', y = '50%' }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
        y: [0, -20, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, delay }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}60, ${color}20, transparent)`,
        filter: `blur(${size / 4}px)`,
        pointerEvents: 'none',
      }}
    />
  );
}

// Severity Bar Component
function SeverityBar({ severity, color }) {
  return (
    <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${severity}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          borderRadius: '3px',
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}

// Timeline Node Component
function TimelineNode({ phase, duration, description, index, color, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      style={{ display: 'flex', gap: '20px', position: 'relative' }}
    >
      {/* Vertical line */}
      {!isLast && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          style={{
            position: 'absolute',
            left: '19px',
            top: '40px',
            width: '2px',
            background: `linear-gradient(180deg, ${color}, transparent)`,
          }}
        />
      )}

      {/* Node circle */}
      <motion.div
        whileHover={{ scale: 1.2, boxShadow: `0 0 30px ${color}` }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          border: `3px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: 700,
          color: color,
          flexShrink: 0,
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        {index + 1}
      </motion.div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>{phase}</span>
          <span style={{
            padding: '4px 12px',
            background: `${color}20`,
            border: `1px solid ${color}50`,
            borderRadius: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: color,
          }}>{duration}</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>{description}</p>
      </div>
    </motion.div>
  );
}

// Generate default case study data for projects without it
function getDefaultCaseStudy(project) {
  return {
    challenge: project.challenge || {
      title: `Transforming ${project.client}'s Digital Presence`,
      description: `${project.client} approached Brain Station 23 with ambitious goals to revolutionize their ${project.category.toLowerCase()} operations and deliver exceptional digital experiences to their users.`,
      painPoints: [
        { icon: '🎯', text: 'Need for modern, scalable digital infrastructure', severity: 85 },
        { icon: '⚡', text: 'Performance optimization requirements', severity: 80 },
        { icon: '🔐', text: 'Enhanced security and compliance needs', severity: 90 },
        { icon: '📈', text: 'Business growth demanding tech evolution', severity: 88 },
      ],
    },
    solution: project.solution || {
      title: 'World-Class Engineering Excellence',
      description: `Our team delivered a comprehensive solution leveraging cutting-edge technologies and agile methodologies to exceed all expectations and transform ${project.client}'s digital capabilities.`,
      approach: [
        { phase: 'Discovery', duration: '2-4 weeks', description: 'In-depth analysis of requirements, user needs, and technical landscape' },
        { phase: 'Design', duration: '4-6 weeks', description: 'Architecture design, UI/UX prototyping, and technical planning' },
        { phase: 'Development', duration: '12-20 weeks', description: 'Agile development with continuous integration and testing' },
        { phase: 'Launch', duration: '2-4 weeks', description: 'Deployment, monitoring, and optimization' },
      ],
    },
    services: project.services || [
      { name: 'Custom Development', icon: '💻', description: 'Tailored solutions built from the ground up' },
      { name: 'System Architecture', icon: '🏗️', description: 'Scalable, resilient infrastructure design' },
      { name: 'UI/UX Design', icon: '🎨', description: 'Beautiful, intuitive user experiences' },
      { name: 'Quality Assurance', icon: '✅', description: 'Comprehensive testing and validation' },
      { name: 'DevOps', icon: '🔄', description: 'Automated pipelines and monitoring' },
      { name: 'Support & Maintenance', icon: '🛠️', description: '24/7 support and continuous improvement' },
    ],
    transformation: project.transformation || {
      title: 'Measurable Business Impact',
      before: { label: 'Before', metrics: Object.entries(project.stats).slice(0, 4).map(([k, v]) => ({ label: k, value: 'Limited', icon: '📊' })) },
      after: { label: 'After', metrics: Object.entries(project.stats).slice(0, 4).map(([k, v]) => ({ label: k, value: v, icon: '🚀' })) },
    },
    testimonial: project.testimonial || {
      quote: `Brain Station 23's expertise and dedication transformed our vision into reality. They're not just developers—they're true technology partners.`,
      author: 'Technology Leader',
      role: 'Executive',
      company: project.client,
      avatar: '👨‍💼',
    },
    timeline: project.timeline || { started: '2023', launched: '2024', duration: '6-12 months' },
    teamSize: project.teamSize || 20,
  };
}

function ProjectModal({ project, onClose, isLightMode, themeColors }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Get case study data (use project's or generate defaults)
  const caseStudy = getDefaultCaseStudy(project);

  // Handle escape key and scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Handle scroll progress
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  return (
    <motion.div
      ref={modalRef}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={(e) => e.target === modalRef.current && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isLightMode ? 'rgba(248, 250, 252, 0.95)' : 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(30px)',
        outline: 'none',
      }}
    >
      {/* Cinematic Background Effects */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Floating orbs */}
        <FloatingOrb color={project.color} size={300} x="10%" y="20%" delay={0} />
        <FloatingOrb color={project.color} size={200} x="80%" y="60%" delay={1} />
        <FloatingOrb color="#00ff88" size={150} x="70%" y="15%" delay={2} />
        <FloatingOrb color="#9333ea" size={180} x="20%" y="70%" delay={1.5} />

        {/* Animated grid lines */}
        <motion.div
          animate={{ opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${project.color}15 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}15 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Radial gradient glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${project.color}15 0%, transparent 40%)`,
          }}
        />

        {/* Cyber grid floor */}
        <CyberGridFloor color={project.color} />
      </div>

      {/* Progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          zIndex: 10002,
        }}
      >
        <motion.div
          animate={{ scaleX: scrollProgress }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${project.color}, #00ff88, ${project.color})`,
            transformOrigin: 'left',
            boxShadow: `0 0 20px ${project.color}`,
          }}
        />
      </motion.div>

      {/* Close Button - Premium Design */}
      <motion.button
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0, rotate: 180 }}
        whileHover={{ scale: 1.15, rotate: 90, boxShadow: `0 0 50px ${project.color}` }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '25px',
          right: '25px',
          width: '56px',
          height: '56px',
          background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
          border: `2px solid ${project.color}`,
          borderRadius: '50%',
          color: project.color,
          fontSize: '24px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10003,
          boxShadow: `0 0 30px ${project.color}40`,
        }}
      >
        ✕
      </motion.button>

      {/* Main Modal Content */}
      <motion.div
        ref={contentRef}
        initial={{ scale: 0.85, y: 80, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 80, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        onScroll={handleScroll}
        style={{
          width: '92%',
          maxWidth: '1300px',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          background: isLightMode
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98))'
            : 'linear-gradient(180deg, rgba(8, 8, 20, 0.98), rgba(5, 5, 15, 0.98))',
          border: `2px solid ${project.color}40`,
          borderRadius: '32px',
          position: 'relative',
          zIndex: 10001,
          boxShadow: isLightMode
            ? `0 0 100px ${project.color}15, 0 50px 100px rgba(0,0,0,0.1)`
            : `0 0 120px ${project.color}25, 0 60px 120px rgba(0,0,0,0.6)`,
          scrollBehavior: 'smooth',
        }}
      >
        {/* ========== CINEMATIC HERO SECTION ========== */}
        <div style={{
          position: 'relative',
          padding: '80px 60px 60px',
          background: `linear-gradient(180deg, ${project.color}12, transparent)`,
          borderBottom: `1px solid ${project.color}20`,
          overflow: 'hidden',
        }}>
          {/* Animated energy lines */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-100%',
              right: '-30%',
              width: '100%',
              height: '300%',
              background: `conic-gradient(from 0deg, transparent 0deg, ${project.color}08 60deg, transparent 120deg)`,
            }}
          />

          {/* Project badge and quick stats */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '30px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{
                padding: '8px 20px',
                background: `${project.color}20`,
                border: `1px solid ${project.color}50`,
                borderRadius: '100px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: project.color,
                letterSpacing: '3px',
                fontWeight: 600,
              }}>
                {project.category}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
              }}>
                for <strong style={{ color: 'var(--text-primary)' }}>{project.client}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                🗓️ {caseStudy.timeline.duration}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                👥 {caseStudy.teamSize} Engineers
              </span>
            </div>
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
            {/* Holographic Project Icon */}
            <HolographicDisplay color={project.color} size={160}>
              <motion.div
                animate={{ textShadow: [`0 0 20px ${project.color}`, `0 0 50px ${project.color}`, `0 0 20px ${project.color}`] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '70px' }}
              >
                {project.icon}
              </motion.div>
            </HolographicDisplay>

            {/* Project Info */}
            <div style={{ flex: 1 }}>
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '15px',
                  textShadow: `0 0 60px ${project.color}40`,
                  lineHeight: 1.1,
                }}
              >
                {project.name}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '17px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  maxWidth: '650px',
                  marginBottom: '25px',
                }}
              >
                {project.description}
              </motion.p>

              {/* Quick action buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}
              >
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${project.color}` }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 28px',
                      background: project.color,
                      border: 'none',
                      borderRadius: '12px',
                      color: '#000',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    VIEW LIVE PROJECT ↗
                  </motion.a>
                )}
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: project.color }}
                  style={{
                    padding: '14px 28px',
                    background: 'transparent',
                    border: `2px solid ${isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  📄 CASE STUDY PDF
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========== CLIENT CHALLENGE SECTION ========== */}
        <div style={{ padding: '60px', background: isLightMode ? 'rgba(255,0,0,0.02)' : 'rgba(255,50,50,0.03)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 100, 100, 0.15)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ff6464',
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              🎯 THE CHALLENGE
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '15px',
            }}>
              {caseStudy.challenge.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {caseStudy.challenge.description}
            </p>
          </motion.div>

          {/* Pain Points with severity bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {caseStudy.challenge.painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '25px',
                  background: isLightMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isLightMode ? 'rgba(255,100,100,0.2)' : 'rgba(255,100,100,0.15)'}`,
                  borderRadius: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{point.icon}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{point.text}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <SeverityBar severity={point.severity} color="#ff6464" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ff6464', fontWeight: 600 }}>{point.severity}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== OUR SOLUTION SECTION ========== */}
        <div style={{ padding: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.color,
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              💡 OUR SOLUTION
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '15px',
            }}>
              {caseStudy.solution.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              {caseStudy.solution.description}
            </p>
          </motion.div>

          {/* Approach Timeline */}
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {caseStudy.solution.approach.map((step, i) => (
              <TimelineNode
                key={step.phase}
                phase={step.phase}
                duration={step.duration}
                description={step.description}
                index={i}
                color={project.color}
                isLast={i === caseStudy.solution.approach.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ========== SERVICES DELIVERED SECTION ========== */}
        <div style={{ padding: '60px', background: `linear-gradient(180deg, ${project.color}05, transparent)` }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(147, 51, 234, 0.15)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#9333ea',
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              🛠️ SERVICES DELIVERED
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}>
              World-Class Expertise
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {caseStudy.services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, boxShadow: `0 20px 40px ${project.color}20` }}
                style={{
                  padding: '30px 25px',
                  background: isLightMode ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isLightMode ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.2)'}`,
                  borderRadius: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                  style={{ fontSize: '40px', marginBottom: '15px' }}
                >
                  {service.icon}
                </motion.div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}>
                  {service.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== BUSINESS TRANSFORMATION SECTION ========== */}
        <div style={{ padding: '60px', background: isLightMode ? 'rgba(0,255,136,0.03)' : 'rgba(0,255,136,0.02)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '50px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(0, 255, 136, 0.15)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#00ff88',
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              📈 TRANSFORMATION
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}>
              {caseStudy.transformation.title}
            </h2>
          </motion.div>

          {/* Before/After Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '30px', maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '30px',
                background: isLightMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                border: '2px solid rgba(255,100,100,0.3)',
                borderRadius: '20px',
              }}
            >
              <div style={{
                textAlign: 'center',
                marginBottom: '25px',
                padding: '10px',
                background: 'rgba(255,100,100,0.1)',
                borderRadius: '10px',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ff6464', letterSpacing: '2px', fontWeight: 700 }}>
                  {caseStudy.transformation.before.label.toUpperCase()}
                </span>
              </div>
              {caseStudy.transformation.before.metrics.map((metric, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}` }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span>{metric.icon}</span> {metric.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#ff6464' }}>{metric.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              animate={{ x: [0, 10, 0] }}
              transition={{ x: { duration: 1.5, repeat: Infinity } }}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${project.color}, #00ff88)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#000',
                fontWeight: 'bold',
                boxShadow: `0 0 30px ${project.color}50`,
              }}
            >
              →
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '30px',
                background: isLightMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                border: '2px solid rgba(0,255,136,0.3)',
                borderRadius: '20px',
              }}
            >
              <div style={{
                textAlign: 'center',
                marginBottom: '25px',
                padding: '10px',
                background: 'rgba(0,255,136,0.1)',
                borderRadius: '10px',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#00ff88', letterSpacing: '2px', fontWeight: 700 }}>
                  {caseStudy.transformation.after.label.toUpperCase()}
                </span>
              </div>
              {caseStudy.transformation.after.metrics.map((metric, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}` }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span>{metric.icon}</span> {metric.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: '#00ff88' }}>{metric.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ========== IMPACT METRICS SECTION ========== */}
        <div style={{ padding: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.color,
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              ⚡ IMPACT METRICS
            </span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {project.impact.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -8, boxShadow: `0 25px 50px ${project.color}25` }}
                style={{
                  padding: '30px 20px',
                  background: `linear-gradient(135deg, ${project.color}12, ${project.color}05)`,
                  border: `2px solid ${project.color}30`,
                  borderRadius: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{ fontSize: '40px', marginBottom: '12px', filter: `drop-shadow(0 0 15px ${project.color})` }}
                >
                  {item.icon}
                </motion.div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: project.color,
                  marginBottom: '6px',
                  textShadow: `0 0 25px ${project.color}`,
                }}>
                  {item.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}>
                  {item.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== TECH STACK SECTION ========== */}
        <div style={{ padding: '60px', background: `linear-gradient(180deg, transparent, ${project.color}05)` }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.color,
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              ⚒️ TECHNOLOGY ARSENAL
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}>
              Built with the Best
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5, boxShadow: `0 15px 30px ${tech.color}30` }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}08)`,
                  border: `2px solid ${tech.color}50`,
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <span style={{ fontSize: '24px' }}>{tech.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: tech.color }}>{tech.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' }}>{tech.type}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== TESTIMONIAL SECTION ========== */}
        <div style={{ padding: '80px 60px', background: isLightMode ? 'rgba(147,51,234,0.03)' : 'rgba(147,51,234,0.05)' }}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Quote marks */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: '120px',
                color: project.color,
                opacity: 0.2,
                position: 'absolute',
                top: '-40px',
                left: '0',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
              }}
            >
              "
            </motion.div>

            <blockquote style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '30px',
              position: 'relative',
              zIndex: 1,
            }}>
              {caseStudy.testimonial.quote}
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${project.color}30, ${project.color}15)`,
                  border: `2px solid ${project.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}
              >
                {caseStudy.testimonial.avatar}
              </motion.div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {caseStudy.testimonial.author}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========== FEATURES SECTION ========== */}
        <div style={{ padding: '60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '100px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: project.color,
              letterSpacing: '3px',
              marginBottom: '20px',
            }}>
              ✨ KEY FEATURES
            </span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', maxWidth: '1000px', margin: '0 auto' }}>
            {project.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 10, borderColor: project.color, background: `${project.color}10` }}
                style={{
                  padding: '18px 20px',
                  background: isLightMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: `${project.color}20`,
                  border: `2px solid ${project.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: project.color,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>
                  ✓
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-secondary)' }}>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========== CINEMATIC FOOTER CTA ========== */}
        <div style={{
          padding: '80px 60px',
          textAlign: 'center',
          background: `linear-gradient(180deg, transparent, ${project.color}10)`,
          borderTop: `1px solid ${project.color}15`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated background glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />

          <motion.div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '60px', marginBottom: '20px' }}
            >
              🚀
            </motion.div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '15px',
            }}>
              Ready to Transform Your Business?
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0 auto 30px',
              lineHeight: 1.7,
            }}>
              Let's build something extraordinary together. Our team is ready to bring your vision to life.
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${project.color}` }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px 40px',
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                  border: 'none',
                  borderRadius: '12px',
                  color: '#000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                START YOUR PROJECT
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: project.color }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  padding: '16px 40px',
                  background: 'transparent',
                  border: `2px solid ${isLightMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                EXPLORE MORE PROJECTS
              </motion.button>
            </div>

            {/* Brain Station 23 branding */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                marginTop: '50px',
                padding: '20px',
                borderTop: `1px solid ${isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '2px',
              }}>
                CRAFTED BY
              </span>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${project.color}, #00ff88)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginTop: '8px',
              }}>
                Brain Station 23
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
              }}>
                Global Software Excellence
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PROJECTS COMPONENT
// ============================================================================

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeColor, setActiveColor] = useState('#00d4ff');
  const [isLightMode, setIsLightMode] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.getAttribute('data-theme') === 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const filters = ['ALL', 'FINTECH', 'E-COMMERCE', 'TELECOM', 'HEALTHCARE', 'LMS', 'PRODUCTS'];

  // Enhanced projects data with real Brain Station 23 projects - ULTRA DETAILED CASE STUDIES
  const projects = [
    {
      id: 1, name: 'CityTouch', client: 'City Bank', category: 'FINTECH', icon: '🏦',
      description: 'Bangladesh\'s leading digital banking platform revolutionizing the way millions interact with their finances. A comprehensive mobile and internet banking solution that set a new benchmark in fintech.',
      stats: { transactions: '$3B+', users: '446K+', uptime: '99.9%', rating: '4.8' }, color: '#00d4ff',
      link: 'https://www.thecitybank.com/citytouch',
      // ENHANCED CASE STUDY DATA
      challenge: {
        title: 'The Digital Banking Gap',
        description: 'City Bank faced a critical challenge: their existing digital infrastructure couldn\'t keep pace with Bangladesh\'s rapidly evolving fintech landscape. Customer expectations were soaring, but legacy systems created friction at every touchpoint.',
        painPoints: [
          { icon: '🐌', text: 'Transaction processing took 30+ seconds', severity: 90 },
          { icon: '📉', text: 'App crashes during peak hours affected 40% of users', severity: 85 },
          { icon: '🔒', text: 'Security vulnerabilities in legacy authentication', severity: 95 },
          { icon: '😤', text: 'Customer satisfaction score dropped to 2.8/5', severity: 80 },
        ],
      },
      solution: {
        title: 'A Complete Digital Transformation',
        description: 'We architected a cloud-native, microservices-based platform from the ground up, implementing cutting-edge security protocols and real-time processing capabilities that redefined what digital banking could be.',
        approach: [
          { phase: 'Discovery', duration: '4 weeks', description: 'Deep dive into user journeys, pain points, and competitive analysis' },
          { phase: 'Architecture', duration: '6 weeks', description: 'Designed scalable microservices architecture with 99.99% uptime target' },
          { phase: 'Development', duration: '24 weeks', description: 'Agile sprints with continuous integration and automated testing' },
          { phase: 'Launch', duration: '4 weeks', description: 'Phased rollout with real-time monitoring and instant rollback capability' },
        ],
      },
      services: [
        { name: 'Mobile App Development', icon: '📱', description: 'Cross-platform React Native app with 60fps animations' },
        { name: 'Backend Architecture', icon: '⚙️', description: 'Event-driven microservices handling 10K+ TPS' },
        { name: 'Security Implementation', icon: '🔐', description: 'Multi-factor auth, biometrics, and fraud detection AI' },
        { name: 'Cloud Infrastructure', icon: '☁️', description: 'Auto-scaling AWS infrastructure with multi-region failover' },
        { name: 'DevOps & CI/CD', icon: '🔄', description: 'Automated pipelines with 15-minute deployment cycles' },
        { name: 'Performance Optimization', icon: '⚡', description: 'Sub-second response times across all endpoints' },
      ],
      transformation: {
        title: 'From Legacy to Industry Leader',
        before: { label: 'Before BS23', metrics: [
          { label: 'Transaction Time', value: '30s', icon: '⏱️' },
          { label: 'App Rating', value: '2.8', icon: '⭐' },
          { label: 'Active Users', value: '50K', icon: '👥' },
          { label: 'Uptime', value: '95%', icon: '📊' },
        ]},
        after: { label: 'After BS23', metrics: [
          { label: 'Transaction Time', value: '0.8s', icon: '⚡' },
          { label: 'App Rating', value: '4.8', icon: '🌟' },
          { label: 'Active Users', value: '446K', icon: '🚀' },
          { label: 'Uptime', value: '99.9%', icon: '💎' },
        ]},
      },
      testimonial: {
        quote: 'Brain Station 23 didn\'t just build us an app—they transformed how we think about digital banking. The results exceeded every expectation.',
        author: 'Mahfuz Rahman',
        role: 'Head of Digital Banking',
        company: 'City Bank PLC',
        avatar: '👨‍💼',
      },
      timeline: { started: 'Jan 2021', launched: 'Nov 2021', duration: '10 months' },
      teamSize: 35,
      techStack: [
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'Redis', type: 'Cache', icon: '🔴', color: '#dc382d' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
        { name: 'Kafka', type: 'Messaging', icon: '📨', color: '#231f20' },
      ],
      features: ['Real-time transactions', 'Bill payments', 'QR payments', 'Card management', 'Investment services', 'Loan applications', 'Biometric login', 'Multi-factor auth'],
      impact: [
        { icon: '💰', value: '$3B+', title: 'Transactions Processed' },
        { icon: '👥', value: '446K+', title: 'Active Users' },
        { icon: '⏱️', value: '99.9%', title: 'Uptime Guaranteed' },
        { icon: '🚀', value: '3x', title: 'Performance Boost' },
      ],
    },
    {
      id: 2, name: 'Shwapno', client: 'ACI Logistics', category: 'E-COMMERCE', icon: '🛒',
      description: 'E-commerce platform for Bangladesh\'s #1 supermarket chain with 200+ stores. A microservice-based platform enabling seamless, scalable, and hyperlocal digital shopping experience.',
      stats: { downloads: '100K+', gmv: '$50M+', orders: '1M+', stores: '200+' }, color: '#00ff88',
      link: 'https://www.shwapno.com',
      challenge: {
        title: 'Bridging Offline to Online Retail',
        description: 'As Bangladesh\'s largest supermarket chain, Shwapno needed to rapidly digitize during the pandemic while maintaining the trust and quality their customers expected from in-store shopping.',
        painPoints: [
          { icon: '🏪', text: '200+ stores with no unified digital presence', severity: 95 },
          { icon: '📦', text: 'Manual inventory causing 15% stockout rate', severity: 88 },
          { icon: '🚚', text: 'No delivery infrastructure for e-commerce', severity: 92 },
          { icon: '🔄', text: 'Disconnected POS systems across locations', severity: 85 },
        ],
      },
      solution: {
        title: 'Hyperlocal Commerce Revolution',
        description: 'We built a unified commerce platform connecting all stores with real-time inventory, AI-powered demand forecasting, and a hyperlocal delivery network that turns every store into a fulfillment center.',
        approach: [
          { phase: 'Assessment', duration: '3 weeks', description: 'Mapped all store operations and identified digital touchpoints' },
          { phase: 'Platform Design', duration: '8 weeks', description: 'Created unified architecture for web, mobile, and in-store systems' },
          { phase: 'Development', duration: '20 weeks', description: 'Built microservices for inventory, orders, delivery, and payments' },
          { phase: 'Rollout', duration: '6 weeks', description: 'Phased launch across Dhaka, then nationwide expansion' },
        ],
      },
      services: [
        { name: 'E-commerce Platform', icon: '🛒', description: 'Full-featured web and mobile shopping experience' },
        { name: 'Inventory Management', icon: '📊', description: 'Real-time sync across 200+ stores with ML forecasting' },
        { name: 'Delivery Orchestration', icon: '🚚', description: 'Hyperlocal fulfillment with 2-hour delivery windows' },
        { name: 'Payment Integration', icon: '💳', description: 'Multiple payment gateways including bKash, Nagad, cards' },
        { name: 'Loyalty System', icon: '🎁', description: 'Points, rewards, and personalized offers engine' },
        { name: 'Analytics Dashboard', icon: '📈', description: 'Real-time business intelligence for all stakeholders' },
      ],
      transformation: {
        title: 'From Offline Giant to Omnichannel Leader',
        before: { label: 'Before BS23', metrics: [
          { label: 'Online Revenue', value: '$0', icon: '💰' },
          { label: 'Delivery Radius', value: '0 km', icon: '📍' },
          { label: 'Digital Orders', value: '0', icon: '📱' },
          { label: 'Inventory Accuracy', value: '78%', icon: '📦' },
        ]},
        after: { label: 'After BS23', metrics: [
          { label: 'Online Revenue', value: '$50M+', icon: '🚀' },
          { label: 'Delivery Radius', value: '64 districts', icon: '🗺️' },
          { label: 'Digital Orders', value: '1M+', icon: '📈' },
          { label: 'Inventory Accuracy', value: '98%', icon: '✅' },
        ]},
      },
      testimonial: {
        quote: 'Brain Station 23 helped us achieve in 10 months what we thought would take 3 years. They understood retail and technology equally well.',
        author: 'Sabbir Hasan Nasir',
        role: 'CEO',
        company: 'ACI Logistics (Shwapno)',
        avatar: '👨‍💼',
      },
      timeline: { started: 'Mar 2020', launched: 'Jan 2021', duration: '10 months' },
      teamSize: 42,
      techStack: [
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: '.NET Core', type: 'Backend', icon: '🔷', color: '#512bd4' },
        { name: 'MongoDB', type: 'Database', icon: '🍃', color: '#47a248' },
        { name: 'Elasticsearch', type: 'Search', icon: '🔍', color: '#fed10a' },
        { name: 'Azure', type: 'Cloud', icon: '☁️', color: '#0089d6' },
      ],
      features: ['Real-time inventory', 'Same-day delivery', 'Loyalty programs', 'Smart recommendations', 'Voice search', 'Hyperlocal fulfillment'],
      impact: [
        { icon: '📱', value: '100K+', title: 'App Downloads' },
        { icon: '💳', value: '$50M+', title: 'GMV Processed' },
        { icon: '📦', value: '1M+', title: 'Orders Fulfilled' },
        { icon: '🏪', value: '200+', title: 'Stores Connected' },
      ],
    },
    {
      id: 3, name: 'Othoba', client: 'PRAN-RFL', category: 'E-COMMERCE', icon: '🌾',
      description: 'Marketplace connecting rural Bangladesh to the digital economy. Empowering local merchants and bringing quality products nationwide with 64 districts coverage.',
      stats: { growth: '50X', merchants: '10K+', products: '500K+', coverage: '64' }, color: '#ff6b35',
      link: 'https://www.othoba.com',
      techStack: [
        { name: 'Vue.js', type: 'Frontend', icon: '💚', color: '#4fc08d' },
        { name: 'Laravel', type: 'Backend', icon: '🔴', color: '#ff2d20' },
        { name: 'MySQL', type: 'Database', icon: '🐬', color: '#4479a1' },
        { name: 'RabbitMQ', type: 'Messaging', icon: '🐰', color: '#ff6600' },
      ],
      features: ['Merchant onboarding', 'Multi-vendor support', 'Logistics integration', 'Payment gateway', 'Analytics dashboard', 'Mobile app'],
      impact: [
        { icon: '📈', value: '50X', title: 'Growth Rate' },
        { icon: '🏪', value: '10K+', title: 'Merchants' },
        { icon: '📦', value: '500K+', title: 'Products Listed' },
        { icon: '🗺️', value: '64', title: 'Districts Covered' },
      ],
    },
    {
      id: 4, name: 'MyGP', client: 'Grameenphone', category: 'TELECOM', icon: '📱',
      description: 'Self-care app for 80M+ subscribers. The most downloaded telecom app in Bangladesh offering seamless digital experience for managing telecom services.',
      stats: { users: '30M+', rating: '4.5', downloads: '50M+', features: '100+' }, color: '#9333ea',
      link: 'https://www.grameenphone.com/mygp',
      techStack: [
        { name: 'Flutter', type: 'Mobile', icon: '🐦', color: '#02569b' },
        { name: 'Spring Boot', type: 'Backend', icon: '🍃', color: '#6db33f' },
        { name: 'Oracle', type: 'Database', icon: '🔶', color: '#f80000' },
        { name: 'Kubernetes', type: 'Infrastructure', icon: '☸️', color: '#326ce5' },
      ],
      features: ['Balance management', 'Bundle purchases', 'Bill payments', 'Data usage tracking', 'Customer support', 'Rewards program'],
      impact: [
        { icon: '👥', value: '30M+', title: 'Active Users' },
        { icon: '⭐', value: '4.5', title: 'App Store Rating' },
        { icon: '📥', value: '50M+', title: 'Total Downloads' },
        { icon: '🔧', value: '100+', title: 'Features' },
      ],
    },
    {
      id: 5, name: 'Proctoring Pro', client: 'Moodle', category: 'LMS', icon: '🎓',
      description: 'AI-powered exam proctoring for online learning globally. Ensuring academic integrity with advanced computer vision and machine learning for 2157+ Moodle sites.',
      stats: { sites: '2157+', learners: '500K+', exams: '2M+', accuracy: '98%' }, color: '#f59e0b',
      link: 'https://moodle.org/plugins/quizaccess_proctoring',
      techStack: [
        { name: 'Python', type: 'AI/ML', icon: '🐍', color: '#3776ab' },
        { name: 'TensorFlow', type: 'ML Framework', icon: '🧠', color: '#ff6f00' },
        { name: 'PHP', type: 'Backend', icon: '🐘', color: '#777bb4' },
        { name: 'WebRTC', type: 'Streaming', icon: '📹', color: '#333333' },
      ],
      features: ['Face detection', 'Eye tracking', 'Audio monitoring', 'Screen recording', 'ID verification', 'Behavior analysis'],
      impact: [
        { icon: '🌐', value: '2157+', title: 'Moodle Sites' },
        { icon: '👨‍🎓', value: '500K+', title: 'Learners Protected' },
        { icon: '📝', value: '2M+', title: 'Exams Proctored' },
        { icon: '✅', value: '98%', title: 'Detection Accuracy' },
      ],
    },
    {
      id: 6, name: 'Cambridge ECG', client: 'Cambridge Heartwear', category: 'HEALTHCARE', icon: '❤️',
      description: 'AI-powered cardiac monitoring device. Award-winning (BIMA) healthcare innovation detecting heart conditions with clinical-grade accuracy across 10+ countries.',
      stats: { accuracy: '98%', award: 'BIMA', patients: '50K+', countries: '10+' }, color: '#ff4444',
      link: 'https://cambridgeheartwear.com',
      techStack: [
        { name: 'Python', type: 'AI/ML', icon: '🐍', color: '#3776ab' },
        { name: 'PyTorch', type: 'Deep Learning', icon: '🔥', color: '#ee4c2c' },
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'HL7 FHIR', type: 'Healthcare API', icon: '🏥', color: '#ff5722' },
      ],
      features: ['Real-time ECG analysis', 'Arrhythmia detection', 'Cloud sync', 'Doctor dashboard', 'Emergency alerts', 'Historical trends'],
      impact: [
        { icon: '🎯', value: '98%', title: 'Accuracy Rate' },
        { icon: '🏆', value: 'BIMA', title: 'Award Winner' },
        { icon: '💗', value: '50K+', title: 'Patients Monitored' },
        { icon: '🌍', value: '10+', title: 'Countries' },
      ],
    },
    {
      id: 7, name: 'Wallet23', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💳',
      description: 'Enterprise digital wallet solution. White-label platform enabling businesses to launch their own digital payment ecosystem with 99.99% uptime.',
      stats: { transactions: '$100M+', clients: '20+', uptime: '99.99%', apis: '50+' }, color: '#3b82f6',
      link: 'https://brainstation-23.com/fintech-solutions/',
      techStack: [
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: 'Go', type: 'Backend', icon: '🔵', color: '#00add8' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'gRPC', type: 'API', icon: '🔗', color: '#4285f4' },
      ],
      features: ['Multi-currency support', 'P2P transfers', 'Merchant payments', 'Bill payments', 'QR payments', 'API integration'],
      impact: [
        { icon: '💰', value: '$100M+', title: 'Transactions' },
        { icon: '🏢', value: '20+', title: 'Enterprise Clients' },
        { icon: '⏱️', value: '99.99%', title: 'Uptime' },
        { icon: '🔌', value: '50+', title: 'API Endpoints' },
      ],
    },
    {
      id: 8, name: 'Remity', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💸',
      description: 'Cross-border payment and remittance platform. Enabling fast, secure, and affordable international money transfers with <1% fees across 30+ corridors.',
      stats: { volume: '$50M+', corridors: '30+', speed: '< 24hrs', fee: '< 1%' }, color: '#00d4ff',
      link: 'https://brainstation-23.com/fintech-solutions/',
      techStack: [
        { name: 'Angular', type: 'Frontend', icon: '🅰️', color: '#dd0031' },
        { name: 'Java', type: 'Backend', icon: '☕', color: '#007396' },
        { name: 'Cassandra', type: 'Database', icon: '👁️', color: '#1287b1' },
        { name: 'SWIFT', type: 'Banking', icon: '🏦', color: '#00205b' },
      ],
      features: ['KYC/AML compliance', 'Real-time rates', 'Multi-channel', 'Agent network', 'Mobile app', 'API access'],
      impact: [
        { icon: '💵', value: '$50M+', title: 'Transfer Volume' },
        { icon: '🌐', value: '30+', title: 'Corridors' },
        { icon: '⚡', value: '< 24hrs', title: 'Transfer Speed' },
        { icon: '💎', value: '< 1%', title: 'Transfer Fee' },
      ],
    },
    {
      id: 9, name: 'MyBL', client: 'Banglalink', category: 'TELECOM', icon: '📞',
      description: 'Digital self-service platform for Banglalink subscribers with 10M+ downloads. Comprehensive mobile app for managing telecom services with NPS score of 72.',
      stats: { downloads: '10M+', transactions: '$100M+', users: '8M+', nps: '72' }, color: '#ff6b35',
      link: 'https://www.banglalink.net/en/mybl',
      techStack: [
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'Redis', type: 'Cache', icon: '🔴', color: '#dc382d' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
      ],
      features: ['Balance check', 'Package purchase', 'Bill payment', 'Data tracking', 'Offers', 'Customer support'],
      impact: [
        { icon: '📥', value: '10M+', title: 'Downloads' },
        { icon: '💰', value: '$100M+', title: 'Transactions' },
        { icon: '👥', value: '8M+', title: 'Active Users' },
        { icon: '❤️', value: '72', title: 'NPS Score' },
      ],
    },
    {
      id: 10, name: 'Omnizia', client: 'Brain Station 23', category: 'PRODUCTS', icon: '💊',
      description: 'Pharma engagement platform connecting pharmaceutical companies with healthcare professionals. 100% compliance with GDPR regulations across EU markets.',
      stats: { hcps: '50K+', pharma: '15+', reach: '5M+', compliance: '100%' }, color: '#9333ea',
      link: 'https://brainstation-23.com/industries/',
      techStack: [
        { name: 'Vue.js', type: 'Frontend', icon: '💚', color: '#4fc08d' },
        { name: '.NET Core', type: 'Backend', icon: '🔷', color: '#512bd4' },
        { name: 'SQL Server', type: 'Database', icon: '📊', color: '#cc2927' },
        { name: 'Power BI', type: 'Analytics', icon: '📈', color: '#f2c811' },
      ],
      features: ['HCP engagement', 'Content delivery', 'Event management', 'Analytics', 'Compliance tracking', 'CRM integration'],
      impact: [
        { icon: '👨‍⚕️', value: '50K+', title: 'HCPs Engaged' },
        { icon: '💊', value: '15+', title: 'Pharma Partners' },
        { icon: '🎯', value: '5M+', title: 'Patient Reach' },
        { icon: '✅', value: '100%', title: 'Compliance' },
      ],
    },
    {
      id: 11, name: 'UCBL Digital Banking', client: 'United Commercial Bank', category: 'FINTECH', icon: '🏛️',
      description: 'Complete digital transformation for UCBL including retail and corporate internet banking (UNET), Islamic banking on Oracle Flexcube platform, and internal process automation.',
      stats: { users: '200K+', uptime: '99.9%', modules: '25+', efficiency: '+30%' }, color: '#2563eb',
      link: 'https://www.ucb.com.bd',
      techStack: [
        { name: 'Oracle Flexcube', type: 'Core Banking', icon: '🔶', color: '#f80000' },
        { name: 'Java', type: 'Backend', icon: '☕', color: '#007396' },
        { name: 'Angular', type: 'Frontend', icon: '🅰️', color: '#dd0031' },
        { name: 'Oracle DB', type: 'Database', icon: '🗄️', color: '#f80000' },
      ],
      features: ['Internet Banking', 'Islamic Banking', 'Corporate Portal', 'Process Automation', 'API Integration', 'Mobile Banking'],
      impact: [
        { icon: '👥', value: '200K+', title: 'Digital Users' },
        { icon: '⏱️', value: '99.9%', title: 'System Uptime' },
        { icon: '🔧', value: '25+', title: 'Banking Modules' },
        { icon: '📈', value: '+30%', title: 'Efficiency Gain' },
      ],
    },
    {
      id: 12, name: 'AB Bank Digital', client: 'AB Bank', category: 'FINTECH', icon: '💼',
      description: 'Digital banking transformation for AB Bank enabling modern internet and mobile banking services for their customers across Bangladesh.',
      stats: { transactions: '$500M+', users: '150K+', features: '40+', growth: '2x' }, color: '#059669',
      link: 'https://www.abbank.com.bd',
      techStack: [
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: 'Spring Boot', type: 'Backend', icon: '🍃', color: '#6db33f' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'Docker', type: 'Container', icon: '🐳', color: '#2496ed' },
      ],
      features: ['Fund Transfer', 'Bill Payment', 'Account Management', 'Card Services', 'Loan Application', 'Investment'],
      impact: [
        { icon: '💰', value: '$500M+', title: 'Transactions' },
        { icon: '👥', value: '150K+', title: 'Active Users' },
        { icon: '🔧', value: '40+', title: 'Features' },
        { icon: '📈', value: '2x', title: 'User Growth' },
      ],
    },
    {
      id: 13, name: 'Robi Self-Care', client: 'Robi Axiata', category: 'TELECOM', icon: '📶',
      description: 'Comprehensive self-service platform for Robi Axiata subscribers. Empowering users to manage their telecom services digitally with seamless experience.',
      stats: { users: '15M+', rating: '4.3', features: '80+', uptime: '99.8%' }, color: '#dc2626',
      link: 'https://www.robi.com.bd',
      techStack: [
        { name: 'React Native', type: 'Mobile', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'MongoDB', type: 'Database', icon: '🍃', color: '#47a248' },
        { name: 'Kubernetes', type: 'Orchestration', icon: '☸️', color: '#326ce5' },
      ],
      features: ['Balance Management', 'Package Activation', 'Bill Payment', 'Usage Analytics', 'Offers', 'Support Chat'],
      impact: [
        { icon: '👥', value: '15M+', title: 'Active Users' },
        { icon: '⭐', value: '4.3', title: 'App Rating' },
        { icon: '🔧', value: '80+', title: 'Features' },
        { icon: '⏱️', value: '99.8%', title: 'Uptime' },
      ],
    },
    {
      id: 14, name: 'AEM Pharma Portal', client: 'European Biopharma', category: 'HEALTHCARE', icon: '🧬',
      description: 'GDPR-compliant, multi-language HCP portal on Adobe Experience Manager. Streamlining medical content access and LMS integration for European biopharma markets.',
      stats: { hcps: '25K+', countries: '12', languages: '8', compliance: 'GDPR' }, color: '#7c3aed',
      link: 'https://brainstation-23.com/industries/',
      techStack: [
        { name: 'Adobe AEM', type: 'CMS', icon: '🔺', color: '#ff0000' },
        { name: 'Java', type: 'Backend', icon: '☕', color: '#007396' },
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: 'Azure', type: 'Cloud', icon: '☁️', color: '#0089d6' },
      ],
      features: ['Multi-language Support', 'LMS Integration', 'Content Management', 'HCP Portal', 'GDPR Compliance', 'Analytics'],
      impact: [
        { icon: '👨‍⚕️', value: '25K+', title: 'HCPs Reached' },
        { icon: '🌍', value: '12', title: 'EU Countries' },
        { icon: '🗣️', value: '8', title: 'Languages' },
        { icon: '✅', value: 'GDPR', title: 'Compliant' },
      ],
    },
    {
      id: 15, name: 'Odoo ERP Solutions', client: 'Various Enterprises', category: 'PRODUCTS', icon: '⚙️',
      description: 'Comprehensive Odoo ERP implementation for multiple enterprises achieving 30% operational efficiency improvement with 99.9% uptime on AWS infrastructure.',
      stats: { clients: '50+', efficiency: '+30%', uptime: '99.9%', errors: '-40%' }, color: '#8b5cf6',
      link: 'https://www.odoo.com/partners/brain-station-23-1191772',
      techStack: [
        { name: 'Odoo', type: 'ERP', icon: '🟣', color: '#714b67' },
        { name: 'Python', type: 'Backend', icon: '🐍', color: '#3776ab' },
        { name: 'PostgreSQL', type: 'Database', icon: '🐘', color: '#336791' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
      ],
      features: ['Custom Modules', 'API Integration', 'Process Automation', 'Reporting', 'Multi-company', 'Mobile Access'],
      impact: [
        { icon: '🏢', value: '50+', title: 'Enterprise Clients' },
        { icon: '📈', value: '+30%', title: 'Efficiency Gain' },
        { icon: '⏱️', value: '99.9%', title: 'System Uptime' },
        { icon: '❌', value: '-40%', title: 'Error Reduction' },
      ],
    },
    {
      id: 16, name: 'PayPal Integration', client: 'PayPal', category: 'FINTECH', icon: '🅿️',
      description: 'Strategic partnership with PayPal for payment solutions integration. Enabling global payment capabilities for businesses across Bangladesh and beyond.',
      stats: { integrations: '100+', countries: '25+', volume: '$1B+', partners: '50+' }, color: '#003087',
      link: 'https://www.paypal.com',
      techStack: [
        { name: 'Node.js', type: 'Backend', icon: '🟢', color: '#339933' },
        { name: 'REST APIs', type: 'Integration', icon: '🔗', color: '#4285f4' },
        { name: 'React', type: 'Frontend', icon: '⚛️', color: '#61dafb' },
        { name: 'AWS', type: 'Cloud', icon: '☁️', color: '#ff9900' },
      ],
      features: ['Payment Gateway', 'Subscription Billing', 'Multi-currency', 'Fraud Prevention', 'Reporting', 'Webhooks'],
      impact: [
        { icon: '🔗', value: '100+', title: 'Integrations' },
        { icon: '🌍', value: '25+', title: 'Countries' },
        { icon: '💰', value: '$1B+', title: 'Volume Processed' },
        { icon: '🤝', value: '50+', title: 'Partners' },
      ],
    },
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Theme-aware colors
  const themeColors = {
    background: isLightMode
      ? 'linear-gradient(180deg, #f8fafc 0%, #e8f4ff 50%, #f8fafc 100%)'
      : 'linear-gradient(180deg, #050510 0%, #0a0a20 50%, #050510 100%)',
    cardBg: isLightMode
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9))'
      : 'linear-gradient(135deg, rgba(10, 10, 30, 0.95), rgba(20, 20, 50, 0.9))',
    cardBorder: isLightMode ? 'rgba(8, 145, 178, 0.2)' : 'rgba(255,255,255,0.1)',
    cardShadow: isLightMode ? '0 10px 40px rgba(0,0,0,0.08)' : '0 10px 40px rgba(0,0,0,0.3)',
    filterBg: isLightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(10, 10, 30, 0.8)',
    filterBorder: isLightMode ? 'rgba(8, 145, 178, 0.2)' : 'rgba(255,255,255,0.1)',
    filterActiveBg: isLightMode
      ? 'linear-gradient(135deg, rgba(8, 145, 178, 0.15), rgba(5, 150, 105, 0.1))'
      : 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 255, 136, 0.1))',
    filterActiveBorder: isLightMode ? 'rgba(8, 145, 178, 0.5)' : 'rgba(0, 212, 255, 0.6)',
    modalBg: isLightMode
      ? 'linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(240, 247, 255, 0.98))'
      : 'linear-gradient(180deg, rgba(10, 10, 30, 0.98), rgba(5, 5, 20, 0.98))',
    modalOverlay: isLightMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.9)',
    featureBg: isLightMode ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,30,0.6)',
    featureBorder: isLightMode ? 'rgba(8, 145, 178, 0.15)' : 'rgba(255,255,255,0.1)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: themeColors.background,
    }}>
      {!isLightMode && <CosmicBackground activeColor={activeColor} />}

      {/* Hero Section */}
      <section style={{
        padding: '120px 60px 80px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Realm indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              padding: '12px 30px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '100px',
              marginBottom: '30px',
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '20px' }}
            >
              ⚔️
            </motion.span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent-cyan)',
              letterSpacing: '4px',
            }}>
              THE PROJECT NEXUS
            </span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '20px' }}
            >
              ⚔️
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 10vw, 100px)',
              fontWeight: 800,
              marginBottom: '20px',
              lineHeight: 1,
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>LEGENDARY</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 25%, #9333ea 50%, #ff6b35 75%, #00d4ff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 5s linear infinite',
            }}>
              ARTIFACTS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 20px',
              lineHeight: 1.7,
            }}
          >
            Embark on a journey through our greatest creations.
            Each artifact holds the power to transform industries.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
            }}
          >
            {filteredProjects.length} ARTIFACTS DISCOVERED • SELECT TO BEGIN YOUR QUEST
          </motion.p>
        </motion.div>
      </section>

      {/* Realm Filters */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '0 60px 60px',
        position: 'relative',
        zIndex: 1,
      }}>
        {filters.map((filter, i) => (
          <motion.button
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.7 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: activeFilter === filter
                ? '0 20px 40px rgba(0, 212, 255, 0.3)'
                : '0 10px 30px rgba(0,0,0,0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '14px 28px',
              background: activeFilter === filter
                ? themeColors.filterActiveBg
                : themeColors.filterBg,
              border: `2px solid ${activeFilter === filter ? themeColors.filterActiveBorder : themeColors.filterBorder}`,
              borderRadius: '12px',
              color: activeFilter === filter ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isLightMode ? '0 4px 15px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            {activeFilter === filter && (
              <motion.div
                layoutId="activeFilter"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), transparent)',
                  borderRadius: '10px',
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{filter}</span>
          </motion.button>
        ))}
      </div>

      {/* Constellation Grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px',
          padding: '0 60px 120px',
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ArtifactNode
              key={project.id}
              project={project}
              index={i}
              onClick={setSelectedProject}
              isActive={selectedProject?.id === project.id}
              totalProjects={filteredProjects.length}
              isLightMode={isLightMode}
              themeColors={themeColors}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isLightMode={isLightMode}
            themeColors={themeColors}
          />
        )}
      </AnimatePresence>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Custom scrollbar for modal */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 255, 0.8);
        }
      `}</style>
    </div>
  );
}
