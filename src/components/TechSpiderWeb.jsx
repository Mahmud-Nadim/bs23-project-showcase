import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import './TechSpiderWeb.css';

// Technology data with CDN logo URLs
const technologies = [
  // Cloud & DevOps (8)
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', color: '#FF9900' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', category: 'cloud', color: '#0089D6' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'cloud', color: '#4285F4' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'cloud', color: '#2496ED' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'cloud', color: '#326CE5' },
  { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'cloud', color: '#7B42BC' },
  { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', category: 'cloud', color: '#D24939' },
  { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg', category: 'cloud', color: '#FC6D26' },

  // AI & ML (6)
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'ai', color: '#FF6F00' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'ai', color: '#EE4C2C' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'ai', color: '#3776AB' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', category: 'ai', color: '#00A67E' },
  { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg', category: 'ai', color: '#F37626' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', category: 'ai', color: '#150458' },

  // Frontend (8)
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend', color: '#61DAFB' },
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'frontend', color: '#4FC08D' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', category: 'frontend', color: '#DD0031' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend', color: '#3178C6' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', category: 'frontend', color: '#02569B' },
  { name: 'Svelte', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg', category: 'frontend', color: '#FF3E00' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', category: 'frontend', color: '#06B6D4' },

  // Backend (8)
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend', color: '#339933' },
  { name: '.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', category: 'backend', color: '#512BD4' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'backend', color: '#007396' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', category: 'backend', color: '#00ADD8' },
  { name: 'Spring', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'backend', color: '#6DB33F' },
  { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', category: 'backend', color: '#092E20' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', category: 'backend', color: '#009688' },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', category: 'backend', color: '#E10098' },

  // Database (6)
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', color: '#4169E1' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', color: '#47A248' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'database', color: '#DC382D' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'database', color: '#4479A1' },
  { name: 'Elasticsearch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg', category: 'database', color: '#005571' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'database', color: '#FFCA28' },

  // Emerging Tech (6)
  { name: 'Solidity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', category: 'emerging', color: '#363636' },
  { name: 'Unity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', category: 'emerging', color: '#FFFFFF' },
  { name: 'Three.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', category: 'emerging', color: '#000000' },
  { name: 'WebGL', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/WebGL_Logo.svg', category: 'emerging', color: '#990000' },
  { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg', category: 'emerging', color: '#000000' },
  { name: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', category: 'emerging', color: '#7F52FF' },
];

// Realistic Spider Web Canvas Component
function SpiderWebCanvas({ activeCategory, mousePos }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  const categoryColors = {
    all: '#c0c0c0',
    cloud: '#FF9900',
    ai: '#FF6F00',
    frontend: '#61DAFB',
    backend: '#339933',
    database: '#4169E1',
    emerging: '#9333ea',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.42;

    // Web configuration
    const numRadials = 24; // Number of spokes
    const numSpirals = 18; // Number of spiral rings
    const webColor = categoryColors[activeCategory] || '#c0c0c0';

    // Generate random offsets for natural look (once)
    const radialAngles = [];
    const baseAngle = (Math.PI * 2) / numRadials;
    for (let i = 0; i < numRadials; i++) {
      // Add slight randomness to angle (up to 5 degrees)
      radialAngles.push(baseAngle * i + (Math.random() - 0.5) * 0.1);
    }

    // Generate spiral intersection points with natural variation
    const spiralPoints = [];
    for (let ring = 1; ring <= numSpirals; ring++) {
      const ringPoints = [];
      const baseRadius = (ring / numSpirals) * maxRadius;
      for (let spoke = 0; spoke < numRadials; spoke++) {
        // Add variation to radius (bumpy web effect)
        const radiusVariation = 1 + (Math.random() - 0.5) * 0.08;
        const radius = baseRadius * radiusVariation;
        const angle = radialAngles[spoke];
        ringPoints.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          baseX: centerX + Math.cos(angle) * radius,
          baseY: centerY + Math.sin(angle) * radius,
          angle,
          radius,
        });
      }
      spiralPoints.push(ringPoints);
    }

    // Animation function
    function animate() {
      timeRef.current += 0.016;
      const time = timeRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate mouse influence
      const mouseInfluence = mousePos ? {
        x: (mousePos.x - centerX) * 0.02,
        y: (mousePos.y - centerY) * 0.02,
      } : { x: 0, y: 0 };

      // Update points with wind/sway animation
      spiralPoints.forEach((ring, ringIndex) => {
        ring.forEach((point, spokeIndex) => {
          const swayAmount = (ringIndex / numSpirals) * 3; // Outer rings sway more
          const swayX = Math.sin(time * 0.8 + spokeIndex * 0.3) * swayAmount;
          const swayY = Math.cos(time * 0.6 + ringIndex * 0.2) * swayAmount;

          point.x = point.baseX + swayX + mouseInfluence.x * (ringIndex / numSpirals);
          point.y = point.baseY + swayY + mouseInfluence.y * (ringIndex / numSpirals);
        });
      });

      // Draw radial threads (spokes) - from center to edge
      ctx.strokeStyle = webColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      ctx.shadowBlur = 3;
      ctx.shadowColor = webColor;

      for (let i = 0; i < numRadials; i++) {
        const angle = radialAngles[i];
        const outerPoint = spiralPoints[spiralPoints.length - 1][i];

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(outerPoint.x, outerPoint.y);
        ctx.stroke();
      }

      // Draw spiral threads (connecting arcs between radials)
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.8;
      ctx.shadowBlur = 2;

      spiralPoints.forEach((ring, ringIndex) => {
        ctx.beginPath();

        for (let i = 0; i < ring.length; i++) {
          const point = ring[i];
          const nextPoint = ring[(i + 1) % ring.length];

          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          }

          // Draw curved line to next point (quadratic curve for natural look)
          const midX = (point.x + nextPoint.x) / 2;
          const midY = (point.y + nextPoint.y) / 2;

          // Add slight sag to the thread
          const sag = 2 + ringIndex * 0.3;
          const sagX = midX + (Math.random() - 0.5) * sag * 0.5;
          const sagY = midY + sag;

          ctx.quadraticCurveTo(sagX, sagY, nextPoint.x, nextPoint.y);
        }

        ctx.closePath();
        ctx.stroke();
      });

      // Draw anchor points (thicker at intersections)
      ctx.fillStyle = webColor;
      ctx.globalAlpha = 0.6;
      ctx.shadowBlur = 4;

      spiralPoints.forEach((ring, ringIndex) => {
        if (ringIndex % 3 === 0) { // Every 3rd ring
          ring.forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      });

      // Draw center hub
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 8;
      ctx.shadowColor = webColor;

      // Outer hub circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.strokeStyle = webColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = webColor;
      ctx.fill();

      // Draw dew drops on some intersections
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ffffff';
      spiralPoints.forEach((ring, ringIndex) => {
        if (ringIndex % 4 === 2) {
          ring.forEach((point, i) => {
            if (i % 3 === 0) {
              const dewSize = 2 + Math.sin(time * 2 + i) * 0.5;
              const gradient = ctx.createRadialGradient(
                point.x - 1, point.y - 1, 0,
                point.x, point.y, dewSize
              );
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              gradient.addColorStop(0.5, 'rgba(200, 220, 255, 0.6)');
              gradient.addColorStop(1, 'rgba(150, 200, 255, 0.2)');

              ctx.globalAlpha = 0.8;
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(point.x, point.y, dewSize, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      });

      // Reset shadow
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activeCategory, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="spider-web-canvas-element"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// Walking Spider Component
function WalkingSpider({ index, containerRef }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [isWalking, setIsWalking] = useState(true);
  const targetRef = useRef({ x: 50, y: 50 });
  const animationRef = useRef(null);

  useEffect(() => {
    // Set random starting position
    setPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    });

    // Pick new random target periodically
    const pickNewTarget = () => {
      targetRef.current = {
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
      };
    };

    pickNewTarget();
    const targetInterval = setInterval(pickNewTarget, 3000 + index * 1000);

    // Animate towards target
    const animate = () => {
      setPosition(prev => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 1) {
          setIsWalking(false);
          return prev;
        }

        setIsWalking(true);
        const speed = 0.3 + index * 0.1;
        const newRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        setRotation(newRotation);

        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(targetInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [index]);

  return (
    <div
      className={`walking-spider ${isWalking ? 'walking' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 100 100" width="40" height="40">
        {/* Spider body */}
        <ellipse cx="50" cy="55" rx="12" ry="18" fill="#1a1a2e" />
        <ellipse cx="50" cy="35" rx="10" ry="12" fill="#0d0d1a" />

        {/* Eyes */}
        <circle cx="45" cy="30" r="3" fill="#ff0044" className="spider-eye" />
        <circle cx="55" cy="30" r="3" fill="#ff0044" className="spider-eye" />

        {/* Legs - left side */}
        <path d="M40 40 Q20 30 10 15" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-1" />
        <path d="M38 48 Q15 45 5 35" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-2" />
        <path d="M38 58 Q15 60 5 70" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-3" />
        <path d="M40 65 Q20 75 10 90" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-4" />

        {/* Legs - right side */}
        <path d="M60 40 Q80 30 90 15" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-5" />
        <path d="M62 48 Q85 45 95 35" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-6" />
        <path d="M62 58 Q85 60 95 70" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-7" />
        <path d="M60 65 Q80 75 90 90" stroke="#2a2a4e" strokeWidth="3" fill="none" className="spider-leg leg-8" />
      </svg>
    </div>
  );
}

// Tech Node Component (Floating on the web)
function TechNode({ tech, position, delay, isVisible, onClick }) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="tech-node-floating"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        '--tech-color': tech.color,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.2, zIndex: 100 }}
      onClick={() => onClick && onClick(tech)}
    >
      <div className="tech-node-glow" />
      <img
        src={tech.logo}
        alt={tech.name}
        className="tech-logo"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="tech-logo-fallback" style={{ display: 'none' }}>
        {tech.name.slice(0, 2)}
      </div>
      <span className="tech-name">{tech.name}</span>
    </motion.div>
  );
}

// Main Component
export default function TechSpiderWeb() {
  const containerRef = useRef(null);
  const webContainerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Handle mouse move for web interaction
  const handleMouseMove = useCallback((e) => {
    if (webContainerRef.current) {
      const rect = webContainerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Filter technologies based on category
  const filteredTechs = useMemo(() => {
    if (activeCategory === 'all') return technologies;
    return technologies.filter(tech => tech.category === activeCategory);
  }, [activeCategory]);

  // Generate positions for tech nodes on the web
  const techPositions = useMemo(() => {
    return filteredTechs.map((tech, i) => {
      const totalTechs = filteredTechs.length;
      const angle = (i / totalTechs) * Math.PI * 2 - Math.PI / 2;

      // Distribute across multiple rings
      const ring = Math.floor(i / 8) + 1;
      const maxRings = Math.ceil(totalTechs / 8);
      const radiusPercent = 20 + (ring / maxRings) * 25;

      return {
        tech,
        position: {
          x: 50 + Math.cos(angle) * radiusPercent,
          y: 50 + Math.sin(angle) * radiusPercent,
        },
      };
    });
  }, [filteredTechs]);

  // Category filters
  const categories = [
    { id: 'all', name: 'All Technologies', color: '#c0c0c0', count: technologies.length },
    { id: 'cloud', name: 'Cloud & DevOps', color: '#FF9900', count: technologies.filter(t => t.category === 'cloud').length },
    { id: 'ai', name: 'AI & Machine Learning', color: '#FF6F00', count: technologies.filter(t => t.category === 'ai').length },
    { id: 'frontend', name: 'Frontend', color: '#61DAFB', count: technologies.filter(t => t.category === 'frontend').length },
    { id: 'backend', name: 'Backend', color: '#339933', count: technologies.filter(t => t.category === 'backend').length },
    { id: 'database', name: 'Database', color: '#4169E1', count: technologies.filter(t => t.category === 'database').length },
    { id: 'emerging', name: 'Emerging Tech', color: '#9333ea', count: technologies.filter(t => t.category === 'emerging').length },
  ];

  const handleCategoryChange = useCallback((catId) => {
    if (catId === activeCategory) return;
    setIsTransitioning(true);
    setActiveCategory(catId);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [activeCategory]);

  const activeCategoryData = categories.find(c => c.id === activeCategory);

  return (
    <section ref={containerRef} className="tech-spider-section">
      <motion.div className="tech-spider-container" style={{ opacity, scale }}>
        {/* Header */}
        <motion.div
          className="section-header-centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">TECHNOLOGY EXPERTISE</span>
          <h2 className="section-headline">
            Technologies
            <span className="gradient-word"> Caught in Our Web</span>
          </h2>
          <p className="section-subhead">
            From legacy systems to cutting-edge AI/ML, XR, blockchain, and IoT -
            our expertise spans generations of technology
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="category-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
              style={{ '--cat-color': cat.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active category indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="active-category-indicator"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ '--indicator-color': activeCategoryData?.color }}
          >
            <span className="indicator-label">Viewing:</span>
            <span className="indicator-value">{activeCategoryData?.name}</span>
            <span className="indicator-count">({activeCategoryData?.count} technologies)</span>
          </motion.div>
        </AnimatePresence>

        {/* Spider Web Container */}
        <motion.div
          ref={webContainerRef}
          className={`spider-web-container ${isTransitioning ? 'transitioning' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos(null)}
          animate={{
            scale: isTransitioning ? 0.98 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Canvas Spider Web */}
          <SpiderWebCanvas
            activeCategory={activeCategory}
            mousePos={mousePos}
          />

          {/* Technology Nodes */}
          <AnimatePresence>
            {techPositions.map(({ tech, position }, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                position={position}
                delay={i}
                isVisible={true}
              />
            ))}
          </AnimatePresence>

          {/* Walking Spiders */}
          <WalkingSpider index={0} containerRef={webContainerRef} />
          <WalkingSpider index={1} containerRef={webContainerRef} />
          <WalkingSpider index={2} containerRef={webContainerRef} />

          {/* Spider indicator */}
          <div className="spider-indicator">
            <span className="spider-emoji">🕷️</span>
            <span className="spider-text">Spiders are crawling the web...</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <span>Move your mouse over the web</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Partners section */}
        <motion.div
          className="partners-row"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3>Strategic Technology Partners</h3>
          <div className="partners-logos">
            {[
              { name: 'Microsoft', badge: 'Gold Partner' },
              { name: 'AWS', badge: 'Partner' },
              { name: 'Google Cloud', badge: 'Partner' },
              { name: 'Salesforce', badge: 'Partner' },
              { name: 'Adobe', badge: 'AEM Partner' },
              { name: 'Moodle', badge: 'Certified' },
            ].map((partner) => (
              <div key={partner.name} className="partner-logo-card">
                <span className="partner-name">{partner.name}</span>
                <span className="partner-badge">{partner.badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Background effects */}
      <div className="spider-bg-effects">
        <div className="web-glow glow-1" />
        <div className="web-glow glow-2" />
        <div className="web-glow glow-3" />
      </div>
    </section>
  );
}
