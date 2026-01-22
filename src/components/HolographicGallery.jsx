import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from '@react-spring/web';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Trail, Text } from '@react-three/drei';
import * as THREE from 'three';

// OwnPATH Core Values - Our Core Beliefs
const images = [
  {
    id: 1,
    src: '/images/Hero-Img-v3.2.webp',
    title: 'Ownership',
    subtitle: 'Own - Taking Full Responsibility',
    description: 'We own our work, our decisions, and our impact. Every team member takes full accountability for delivering excellence.',
    letter: 'O',
    color: '#00d4ff'
  },
  {
    id: 2,
    src: '/images/AIDSecI.webp',
    title: 'Passion & Commitment',
    subtitle: 'P - Driven by Purpose',
    description: 'Our passion fuels innovation. We are deeply committed to our craft and to exceeding expectations in everything we do.',
    letter: 'P',
    color: '#ff4da6'
  },
  {
    id: 3,
    src: '/images/Service-Card-4.webp',
    title: 'Agility & Excellence',
    subtitle: 'A - Adaptive and Outstanding',
    description: 'We embrace change with agility while maintaining the highest standards of excellence in every deliverable.',
    letter: 'A',
    color: '#00ff88'
  },
  {
    id: 4,
    src: '/images/bs-212.webp',
    title: 'Team Spirit',
    subtitle: 'T - Together We Achieve More',
    description: 'Collaboration is our strength. We believe in the power of teamwork to achieve extraordinary results.',
    letter: 'T',
    color: '#ffd700'
  },
  {
    id: 5,
    src: '/images/ctaimg-1.webp',
    title: 'Honesty',
    subtitle: 'H - Integrity in All We Do',
    description: 'Transparency and honesty form the foundation of our relationships with clients, partners, and each other.',
    letter: 'H',
    color: '#9333ea'
  },
];

// 3D Floating Orb Component
function FloatingOrb({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.15, 1]} />
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.6}
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}

// 3D Energy Ring
function EnergyRing({ radius, color, rotationSpeed = 1, reverse = false }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * (reverse ? -1 : 1);
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

// 3D Central Core
function CentralCore({ activeImage }) {
  const coreRef = useRef();
  const glowRef = useRef();
  const activeColor = activeImage !== null ? images[activeImage].color : '#00d4ff';

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group>
      {/* Inner Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.4, 0]} />
        <MeshDistortMaterial
          color={activeColor}
          transparent
          opacity={0.8}
          distort={0.2}
          speed={3}
          roughness={0}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.1} />
      </mesh>

      {/* Energy Rings */}
      <EnergyRing radius={0.8} color="#00d4ff" rotationSpeed={0.5} />
      <EnergyRing radius={1.0} color="#9333ea" rotationSpeed={0.3} reverse />
      <EnergyRing radius={1.2} color="#00ff88" rotationSpeed={0.4} />

      {/* Sparkles */}
      <Sparkles count={100} scale={3} size={2} speed={0.4} color={activeColor} />
    </group>
  );
}

// 3D Scene Component
function Scene3D({ activeImage, mousePosition }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });

  const orbPositions = useMemo(() =>
    images.map((_, i) => {
      const angle = (i / images.length) * Math.PI * 2;
      const radius = 2.5;
      return [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * radius
      ];
    }), []
  );

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#9333ea" />

      <CentralCore activeImage={activeImage} />

      {orbPositions.map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <FloatingOrb
            position={pos}
            color={images[i].color}
            speed={1 + i * 0.2}
          />
        </Float>
      ))}
    </>
  );
}

// Animated Image Card with React Spring
function ImageCard({ image, index, isActive, onHover, onLeave, onClick, mousePosition }) {
  const cardRef = useRef();

  const angle = (index / images.length) * Math.PI * 2 - Math.PI / 2;
  const radius = 38;
  const baseX = 50 + Math.cos(angle) * radius;
  const baseY = 50 + Math.sin(angle) * radius;

  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    x: 0,
    y: 0,
    config: config.wobbly,
  }));

  useEffect(() => {
    api.start({
      scale: isActive ? 1.15 : 1,
      rotateX: mousePosition.y * -20,
      rotateY: mousePosition.x * 20,
      x: mousePosition.x * (30 + index * 8),
      y: mousePosition.y * (30 + index * 8),
    });
  }, [isActive, mousePosition, index, api]);

  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <animated.div
      ref={cardRef}
      className={`holo-card-enhanced ${isActive ? 'active' : ''}`}
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
        '--card-color': image.color,
        transform: springs.scale.to(s =>
          `translate(-50%, -50%) scale(${s})`
        ),
        ...springs,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Cyber Frame */}
      <div className="cyber-frame">
        <svg className="frame-svg" viewBox="0 0 200 250" preserveAspectRatio="none">
          <motion.path
            d="M 10 0 L 190 0 L 200 10 L 200 240 L 190 250 L 10 250 L 0 240 L 0 10 Z"
            fill="none"
            stroke={image.color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          />
          {/* Corner Accents */}
          <motion.path
            d="M 0 30 L 0 10 L 10 0 L 30 0"
            fill="none"
            stroke={image.color}
            strokeWidth="3"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
          <motion.path
            d="M 170 0 L 190 0 L 200 10 L 200 30"
            fill="none"
            stroke={image.color}
            strokeWidth="3"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
          <motion.path
            d="M 200 220 L 200 240 L 190 250 L 170 250"
            fill="none"
            stroke={image.color}
            strokeWidth="3"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
          <motion.path
            d="M 30 250 L 10 250 L 0 240 L 0 220"
            fill="none"
            stroke={image.color}
            strokeWidth="3"
            animate={{ opacity: isActive ? 1 : 0.5 }}
          />
        </svg>
      </div>

      {/* Image Container */}
      <div className="image-container-enhanced">
        <motion.img
          src={image.src}
          alt={image.title}
          className="card-image"
          animate={{
            scale: isActive ? 1.1 : 1,
            filter: isActive ? 'saturate(1.3) brightness(1.1)' : 'saturate(0.8)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Scanlines */}
        <div className="scanlines-enhanced" />

        {/* Holographic Shine */}
        <motion.div
          className="holo-shine"
          animate={{
            backgroundPosition: isActive ? ['0% 0%', '200% 200%'] : '0% 0%',
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glitch Effect */}
        <AnimatePresence>
          {glitchActive && (
            <motion.div
              className="glitch-effect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <div className="glitch-slice" style={{ '--offset': '-5px', '--color': '#ff0000' }} />
              <div className="glitch-slice" style={{ '--offset': '5px', '--color': '#00ffff' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Overlay */}
        <motion.div
          className="data-overlay"
          animate={{ opacity: isActive ? 1 : 0 }}
        >
          <div className="data-line">SYS.LOAD: {Math.floor(Math.random() * 30 + 70)}%</div>
          <div className="data-line">NET.STATUS: ACTIVE</div>
          <div className="data-line">ID: BS23-{String(index + 1).padStart(3, '0')}</div>
        </motion.div>
      </div>

      {/* Info Panel */}
      <motion.div
        className="info-panel"
        animate={{
          opacity: isActive ? 1 : 0.7,
          y: isActive ? 0 : 10,
        }}
      >
        <span className="card-index">0{index + 1}</span>
        <div className="card-info">
          <h4 className="card-title">{image.title}</h4>
          <p className="card-subtitle">{image.subtitle}</p>
        </div>
      </motion.div>

      {/* Energy Pulse */}
      <motion.div
        className="energy-pulse"
        animate={{
          scale: isActive ? [1, 1.5, 1] : 1,
          opacity: isActive ? [0.5, 0, 0.5] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Particle Trail on Hover */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="particle-burst"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.span
                key={i}
                className="burst-particle"
                style={{ '--angle': `${i * 45}deg` }}
                animate={{
                  opacity: [1, 0],
                  scale: [0, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </animated.div>
  );
}

// Fullscreen Viewer Component
function FullscreenViewer({ image, onClose }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      className="fullscreen-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Animated Background */}
      <div className="viewer-bg">
        <div className="bg-grid" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: image.color,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Close Button */}
      <motion.button
        className="close-btn"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Main Image Container */}
      <motion.div
        className="viewer-content"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: loaded ? 1 : 0.5, y: loaded ? 0 : 100 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cyber Frame */}
        <svg className="viewer-frame" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.rect
            x="2" y="2" width="96" height="96"
            fill="none"
            stroke={image.color}
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Corner Details */}
          <motion.path
            d="M 0 15 L 0 0 L 15 0"
            fill="none"
            stroke={image.color}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.path
            d="M 85 0 L 100 0 L 100 15"
            fill="none"
            stroke={image.color}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          <motion.path
            d="M 100 85 L 100 100 L 85 100"
            fill="none"
            stroke={image.color}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <motion.path
            d="M 15 100 L 0 100 L 0 85"
            fill="none"
            stroke={image.color}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        </svg>

        {/* Image */}
        <motion.img
          src={image.src}
          alt={image.title}
          className="viewer-image"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Scanlines */}
        <div className="viewer-scanlines" />

        {/* Info Bar - OwnPATH Value */}
        <motion.div
          className="viewer-info ownpath-viewer-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="info-left">
            <motion.span
              className="info-letter"
              style={{ color: image.color, textShadow: `0 0 30px ${image.color}` }}
            >
              {image.letter}
            </motion.span>
            <div className="info-text">
              <h3>{image.title}</h3>
              <p className="info-subtitle">{image.subtitle}</p>
              <p className="info-description">{image.description}</p>
            </div>
          </div>
          <div className="info-right">
            <div className="ownpath-badge">
              <span className="badge-label">OwnPATH</span>
              <span className="badge-value" style={{ background: image.color }}>Core Value</span>
            </div>
          </div>
        </motion.div>

        {/* Corner Accents */}
        {['tl', 'tr', 'bl', 'br'].map((corner, i) => (
          <motion.div
            key={corner}
            className={`viewer-corner corner-${corner}`}
            style={{ borderColor: image.color }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Navigation Hint */}
      <motion.p
        className="viewer-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        CLICK ANYWHERE TO CLOSE
      </motion.p>
    </motion.div>
  );
}

// Main Gallery Component
function HolographicGallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  // Electric arc animation between active card and center
  const [electricArcs, setElectricArcs] = useState([]);

  useEffect(() => {
    if (activeImage !== null) {
      const interval = setInterval(() => {
        setElectricArcs(prev => [
          ...prev.slice(-5),
          { id: Date.now(), index: activeImage }
        ]);
      }, 200);
      return () => clearInterval(interval);
    } else {
      setElectricArcs([]);
    }
  }, [activeImage]);

  return (
    <section className="holographic-gallery-section">
      <div className="section-header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          OwnPATH Values
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          OUR <span className="highlight">CORE BELIEFS</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="ownpath-letters">
            <span style={{ color: '#00d4ff' }}>Own</span>
            <span style={{ color: '#ff4da6' }}>P</span>
            <span style={{ color: '#00ff88' }}>A</span>
            <span style={{ color: '#ffd700' }}>T</span>
            <span style={{ color: '#9333ea' }}>H</span>
          </span>
          {' '}- The values that drive everything we do
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="holographic-container-enhanced"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
      >
        {/* 3D Background Scene */}
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene3D activeImage={activeImage} mousePosition={mousePosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Electric Arcs SVG */}
        <svg className="electric-arcs" viewBox="0 0 100 100" preserveAspectRatio="none">
          <AnimatePresence>
            {electricArcs.map((arc) => {
              const angle = (arc.index / images.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 38;
              const endX = 50 + Math.cos(angle) * radius;
              const endY = 50 + Math.sin(angle) * radius;

              // Generate random lightning path
              const midX = 50 + (endX - 50) * 0.5 + (Math.random() - 0.5) * 10;
              const midY = 50 + (endY - 50) * 0.5 + (Math.random() - 0.5) * 10;

              return (
                <motion.path
                  key={arc.id}
                  d={`M 50 50 Q ${midX} ${midY} ${endX} ${endY}`}
                  fill="none"
                  stroke={images[arc.index].color}
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    filter: `drop-shadow(0 0 3px ${images[arc.index].color})`,
                  }}
                />
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Central Nexus Overlay - OwnPATH */}
        <motion.div
          className="nexus-overlay"
          animate={{
            rotateX: mousePosition.y * 15,
            rotateY: mousePosition.x * 15,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="nexus-content ownpath-nexus">
            <span className="nexus-own">Own</span>
            <span className="nexus-path">PATH</span>
          </div>
        </motion.div>

        {/* Image Cards */}
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            isActive={activeImage === index}
            onHover={() => setActiveImage(index)}
            onLeave={() => setActiveImage(null)}
            onClick={() => setSelectedImage(image)}
            mousePosition={isHovering ? mousePosition : { x: 0, y: 0 }}
          />
        ))}

        {/* Floating Labels - OwnPATH Values */}
        <motion.div
          className="floating-label label-1"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {'<Ownership/>'}
        </motion.div>
        <motion.div
          className="floating-label label-2"
          animate={{ y: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          {'{Passion}'}
        </motion.div>
        <motion.div
          className="floating-label label-3"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          [Agility]
        </motion.div>
        <motion.div
          className="floating-label label-4"
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          {'//TeamSpirit'}
        </motion.div>
        <motion.div
          className="floating-label label-5"
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          {'#Honesty'}
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
        CLICK ANY IMAGE TO EXPAND  |  HOVER TO EXPLORE
      </motion.p>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <FullscreenViewer
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default HolographicGallery;
