import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './TechSpiderWeb.css';

// Technology data with CDN logo URLs
const technologies = [
  // Cloud & DevOps
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', category: 'cloud', color: '#FF9900' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', category: 'cloud', color: '#0089D6' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', category: 'cloud', color: '#4285F4' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'cloud', color: '#2496ED' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'cloud', color: '#326CE5' },
  { name: 'Terraform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', category: 'cloud', color: '#7B42BC' },

  // AI & ML
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'ai', color: '#FF6F00' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'ai', color: '#EE4C2C' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'ai', color: '#3776AB' },
  { name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', category: 'ai', color: '#00A67E' },

  // Frontend
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend', color: '#61DAFB' },
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'frontend', color: '#4FC08D' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', category: 'frontend', color: '#DD0031' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend', color: '#3178C6' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', category: 'frontend', color: '#02569B' },

  // Backend
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend', color: '#339933' },
  { name: '.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', category: 'backend', color: '#512BD4' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'backend', color: '#007396' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', category: 'backend', color: '#00ADD8' },

  // Database
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', color: '#4169E1' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', color: '#47A248' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'database', color: '#DC382D' },

  // Emerging
  { name: 'Solidity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', category: 'emerging', color: '#363636' },
  { name: 'Unity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', category: 'emerging', color: '#FFFFFF' },
];

// Spider Web 3D Component
function SpiderWeb({ scrollProgress }) {
  const webRef = useRef();
  const nodesRef = useRef([]);

  // Generate web structure
  const webGeometry = useMemo(() => {
    const rings = 5;
    const spokes = 12;
    const maxRadius = 6;
    const points = [];
    const connections = [];

    // Generate ring points
    for (let r = 1; r <= rings; r++) {
      const radius = (r / rings) * maxRadius;
      for (let s = 0; s < spokes; s++) {
        const angle = (s / spokes) * Math.PI * 2;
        const wobble = Math.sin(r * 2 + s * 0.5) * 0.2;
        points.push({
          x: Math.cos(angle) * (radius + wobble),
          y: Math.sin(angle) * (radius + wobble),
          z: (Math.random() - 0.5) * 0.5,
          ring: r,
          spoke: s,
        });
      }
    }

    // Add center point
    points.unshift({ x: 0, y: 0, z: 0, ring: 0, spoke: 0 });

    // Generate connections (spokes from center)
    for (let s = 0; s < spokes; s++) {
      connections.push([0, s + 1]); // Center to first ring
      for (let r = 1; r < rings; r++) {
        const current = 1 + (r - 1) * spokes + s;
        const next = 1 + r * spokes + s;
        connections.push([current, next]);
      }
    }

    // Generate ring connections
    for (let r = 1; r <= rings; r++) {
      for (let s = 0; s < spokes; s++) {
        const current = 1 + (r - 1) * spokes + s;
        const nextOnRing = 1 + (r - 1) * spokes + ((s + 1) % spokes);
        connections.push([current, nextOnRing]);
      }
    }

    return { points, connections };
  }, []);

  // Create line geometry for web strands
  const linePositions = useMemo(() => {
    const positions = [];
    webGeometry.connections.forEach(([i, j]) => {
      const p1 = webGeometry.points[i];
      const p2 = webGeometry.points[j];
      positions.push(p1.x, p1.y, p1.z);
      positions.push(p2.x, p2.y, p2.z);
    });
    return new Float32Array(positions);
  }, [webGeometry]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (webRef.current) {
      // Subtle rotation based on scroll
      webRef.current.rotation.z = scrollProgress * Math.PI * 0.5 + time * 0.05;
      webRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Update line positions with wave effect
      const positions = webRef.current.geometry.attributes.position.array;
      webGeometry.connections.forEach(([i, j], idx) => {
        const p1 = webGeometry.points[i];
        const p2 = webGeometry.points[j];

        const wave1 = Math.sin(time * 2 + p1.x + p1.y) * 0.05;
        const wave2 = Math.sin(time * 2 + p2.x + p2.y) * 0.05;

        positions[idx * 6 + 2] = p1.z + wave1;
        positions[idx * 6 + 5] = p2.z + wave2;
      });
      webRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Web strands */}
      <lineSegments ref={webRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.4}
          linewidth={1}
        />
      </lineSegments>

      {/* Glowing center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>

      {/* Web junction points with glow */}
      {webGeometry.points.slice(1).map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Floating Tech Node Component
function TechNode({ tech, position, delay, scrollProgress }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      // Float animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + delay) * 0.2;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3 + delay) * 0.1;

      // Pulse when hovered
      const scale = hovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Html
        center
        distanceFactor={10}
        style={{
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
        }}
      >
        <div
          className={`tech-node-html ${hovered ? 'hovered' : ''}`}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          style={{ '--tech-color': tech.color }}
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
          <div className="web-strand-connection" />
        </div>
      </Html>
    </group>
  );
}

// 3D Scene
function Scene({ scrollProgress }) {
  const { camera } = useThree();

  // Position tech nodes on the web
  const techPositions = useMemo(() => {
    return technologies.map((tech, i) => {
      const angle = (i / technologies.length) * Math.PI * 2;
      const ring = 1 + (i % 4);
      const radius = ring * 1.5;
      const z = (Math.random() - 0.5) * 2;

      return {
        tech,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        ],
        delay: i * 0.5,
      };
    });
  }, []);

  useFrame(() => {
    // Zoom effect based on scroll
    camera.position.z = 12 - scrollProgress * 3;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />

      <SpiderWeb scrollProgress={scrollProgress} />

      {techPositions.map(({ tech, position, delay }, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={position}
          delay={delay}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Particles */}
      <group>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </>
  );
}

// Main Component
export default function TechSpiderWeb() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Category filters
  const categories = [
    { id: 'all', name: 'All Technologies', color: '#00d4ff' },
    { id: 'cloud', name: 'Cloud & DevOps', color: '#FF9900' },
    { id: 'ai', name: 'AI & Machine Learning', color: '#FF6F00' },
    { id: 'frontend', name: 'Frontend', color: '#61DAFB' },
    { id: 'backend', name: 'Backend', color: '#339933' },
    { id: 'database', name: 'Database', color: '#4169E1' },
    { id: 'emerging', name: 'Emerging Tech', color: '#9333ea' },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

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
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              style={{ '--cat-color': cat.color }}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* 3D Spider Web Canvas */}
        <div className="spider-web-canvas">
          <Canvas
            camera={{ position: [0, 0, 12], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Scene scrollProgress={scrollProgress} />
          </Canvas>

          {/* Overlay gradient */}
          <div className="canvas-overlay" />

          {/* Decorative elements */}
          <div className="web-decorations">
            <div className="dew-drop dew-1" />
            <div className="dew-drop dew-2" />
            <div className="dew-drop dew-3" />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <span>Scroll to explore the web</span>
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
        <div className="spider-silk silk-1" />
        <div className="spider-silk silk-2" />
        <div className="spider-silk silk-3" />
      </div>
    </section>
  );
}
