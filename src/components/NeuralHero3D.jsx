import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Trail, MeshDistortMaterial, Sparkles, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Neural Network Particle System
function NeuralParticles({ count = 500, mouse }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;

      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        basePosition: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 1, 0.6),
        scale: 0.02 + Math.random() * 0.03,
      });
    }
    return temp;
  }, [count]);

  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      colors[i * 3] = particle.color.r;
      colors[i * 3 + 1] = particle.color.g;
      colors[i * 3 + 2] = particle.color.b;
      scales[i] = particle.scale;
    });

    return [positions, colors, scales];
  }, [particles, count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      // Organic movement
      particle.position.x = particle.basePosition.x + Math.sin(time * 0.5 + i) * 0.3;
      particle.position.y = particle.basePosition.y + Math.cos(time * 0.3 + i * 0.5) * 0.3;
      particle.position.z = particle.basePosition.z + Math.sin(time * 0.4 + i * 0.3) * 0.2;

      // Mouse interaction
      if (mouse.current) {
        const mouseInfluence = 0.5;
        particle.position.x += mouse.current.x * mouseInfluence;
        particle.position.y += mouse.current.y * mouseInfluence;
      }

      mesh.current.geometry.attributes.position.array[i * 3] = particle.position.x;
      mesh.current.geometry.attributes.position.array[i * 3 + 1] = particle.position.y;
      mesh.current.geometry.attributes.position.array[i * 3 + 2] = particle.position.z;
    });

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Neural Connection Lines
function NeuralConnections({ mouse }) {
  const linesRef = useRef();
  const nodeCount = 50;

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    nodes.forEach((node, i) => {
      node.position.x += Math.sin(time * 0.5 + i) * 0.005;
      node.position.y += Math.cos(time * 0.3 + i * 0.5) * 0.005;
    });

    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.02;
    }
  });

  const lineGeometry = useMemo(() => {
    const positions = [];
    const colors = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 2.5) {
          positions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );

          const alpha = 1 - dist / 2.5;
          colors.push(0, 0.8 * alpha, 1 * alpha, 0, 0.8 * alpha, 1 * alpha);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, [nodes]);

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// Floating Logo Sphere
function LogoSphere({ mouse }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;

      // Mouse influence
      if (mouse.current) {
        meshRef.current.rotation.x += mouse.current.y * 0.3;
        meshRef.current.rotation.y += mouse.current.x * 0.3;
      }
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Inner core */}
        <mesh>
          <icosahedronGeometry args={[0.8, 2]} />
          <MeshDistortMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>

        {/* Orbiting rings */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}>
            <torusGeometry args={[1.3 + i * 0.2, 0.02, 16, 100]} />
            <meshBasicMaterial color={i === 0 ? '#00d4ff' : i === 1 ? '#00ff88' : '#9333ea'} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Data Stream Effect
function DataStreams() {
  const streamsRef = useRef([]);
  const streamCount = 20;

  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => ({
      startPos: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        5,
        (Math.random() - 0.5) * 8
      ),
      speed: 0.02 + Math.random() * 0.03,
      length: 0.5 + Math.random() * 1,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    streamsRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = ((5 - (time * streams[i].speed * 30)) % 10) - 5;
        mesh.material.opacity = 0.3 + Math.sin(time * 5 + i) * 0.2;
      }
    });
  });

  return (
    <group>
      {streams.map((stream, i) => (
        <mesh
          key={i}
          ref={(el) => (streamsRef.current[i] = el)}
          position={[stream.startPos.x, stream.startPos.y, stream.startPos.z]}
        >
          <cylinderGeometry args={[0.01, 0.01, stream.length, 8]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Floating Tech Icons
function TechIcons() {
  const groupRef = useRef();

  const icons = useMemo(() => [
    { position: [-4, 2, -2], color: '#00d4ff', label: 'AI' },
    { position: [4, 1.5, -1], color: '#00ff88', label: 'ML' },
    { position: [-3, -1.5, 1], color: '#9333ea', label: 'IoT' },
    { position: [3.5, -2, 0], color: '#ffd700', label: 'XR' },
    { position: [-2, 3, -1.5], color: '#ff6b35', label: 'BC' },
    { position: [2, 2.5, 1], color: '#3b82f6', label: 'CL' },
  ], []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={icon.position}>
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial
                color={icon.color}
                emissive={icon.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.21]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshBasicMaterial color="#000" transparent opacity={0.5} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

// Energy Field Effect
function EnergyField() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.1;
      meshRef.current.material.opacity = 0.05 + Math.sin(time) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <torusGeometry args={[6, 3, 16, 100]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.05} side={THREE.DoubleSide} wireframe />
    </mesh>
  );
}

// Mouse Tracker
function MouseTracker({ mouse }) {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouse]);

  return null;
}

// Scene Lighting
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#00ff88" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#fff" />
    </>
  );
}

// Main 3D Scene
function Scene({ mouse }) {
  return (
    <>
      <MouseTracker mouse={mouse} />
      <SceneLighting />

      {/* Background elements */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} color="#00d4ff" />

      {/* Main elements */}
      <NeuralParticles count={400} mouse={mouse} />
      <NeuralConnections mouse={mouse} />
      <LogoSphere mouse={mouse} />
      <DataStreams />
      <TechIcons />
      <EnergyField />

      {/* Environment */}
      <fog attach="fog" args={['#000', 5, 30]} />
    </>
  );
}

// Hero Content Overlay
function HeroContent() {
  const [loaded, setLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);

    // Trigger glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <motion.div
      className="neural-hero-content"
      variants={containerVariants}
      initial="hidden"
      animate={loaded ? "visible" : "hidden"}
    >
      {/* Floating Code Symbols */}
      <div className="hero-code-symbols">
        {['{ }', '< />', '[ ]', '( )', '=>', '&&', '||', '::'].map((symbol, i) => (
          <motion.span
            key={i}
            className="floating-code-symbol"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      {/* Logo */}
      <motion.div className="hero-logo-container" variants={itemVariants}>
        <div className="logo-glitch-wrapper">
          <img
            src="https://cdn.brandfetch.io/idlkM40qxI/w/399/h/399/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768681807852"
            alt="Brain Station 23"
            className="hero-official-logo"
          />
          <div className="logo-glitch-overlay" />
        </div>
      </motion.div>

      {/* Top label */}
      <motion.div className="hero-top-label" variants={itemVariants}>
        <span className="label-line" />
        <span className="label-text">
          <span className="code-bracket">{'<'}</span>
          SINCE 2006 | 800+ ENGINEERS | 30+ COUNTRIES
          <span className="code-bracket">{'/>'}</span>
        </span>
        <span className="label-line" />
      </motion.div>

      {/* Main title with INTENSE GLITCH */}
      <motion.h1 className="neural-hero-title" variants={itemVariants}>
        <div className={`glitch-title-container ${glitchActive ? 'glitch-active' : ''}`}>
          <span className="glitch-title" data-text="BRAIN STATION 23">
            BRAIN STATION 23
          </span>
          <span className="glitch-title-layer glitch-r" aria-hidden="true">BRAIN STATION 23</span>
          <span className="glitch-title-layer glitch-g" aria-hidden="true">BRAIN STATION 23</span>
          <span className="glitch-title-layer glitch-b" aria-hidden="true">BRAIN STATION 23</span>
        </div>
      </motion.h1>

      {/* Subtitle with typewriter effect */}
      <motion.div className="neural-hero-subtitle" variants={itemVariants}>
        <span className="subtitle-prefix">{">"}</span>
        <span className="subtitle-text">
          Digital Transformation Architects
        </span>
        <span className="subtitle-cursor">|</span>
      </motion.div>

      {/* Description */}
      <motion.p className="neural-hero-description" variants={itemVariants}>
        Bangladesh's #1 Software Company | Transforming Enterprises with
        <span className="highlight-text"> AI</span>,
        <span className="highlight-text"> Cloud</span>,
        <span className="highlight-text"> Blockchain</span> &
        <span className="highlight-text"> XR</span>
      </motion.p>

      {/* Stats row */}
      <motion.div className="hero-stats-row" variants={itemVariants}>
        {[
          { value: '2500+', label: 'Projects' },
          { value: '19+', label: 'Years' },
          { value: '$3B+', label: 'Transactions Powered' },
          { value: '99.9%', label: 'Uptime' },
        ].map((stat, i) => (
          <div key={i} className="hero-stat">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div className="neural-hero-cta" variants={itemVariants}>
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <motion.div
            className="cta-btn cta-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-text">Explore Our Work</span>
            <span className="btn-icon">→</span>
          </motion.div>
        </Link>
        <Link to="/solution-builder" style={{ textDecoration: 'none' }}>
          <motion.div
            className="cta-btn cta-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-text">Start a Project</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Certifications */}
      <motion.div className="hero-certifications" variants={itemVariants}>
        {['CMMI Level 3', 'ISO 27001', 'ISO 9001', 'AWS Partner', 'Microsoft Partner', 'Google Cloud'].map((cert, i) => (
          <motion.span
            key={cert}
            className="cert-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          >
            {cert}
          </motion.span>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Main Export Component
export default function NeuralHero3D() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div className="neural-hero-container">
      {/* 3D Canvas Background */}
      <div className="neural-canvas-wrapper">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Scene mouse={mouse} />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="neural-overlay" />

      {/* Animated grid background */}
      <div className="neural-grid" />

      {/* Content */}
      <HeroContent />
    </div>
  );
}
