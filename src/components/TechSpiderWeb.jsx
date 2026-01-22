import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import './TechSpiderWeb.css';

// Technology data with CDN logo URLs - EXPANDED
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

// Animated Spider Component
function Spider({ webGeometry, index, speed = 1 }) {
  const spiderRef = useRef();
  const [currentSegment, setCurrentSegment] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  // Get path along web connections
  const path = useMemo(() => {
    const connections = webGeometry.connections;
    const startIdx = (index * 7) % connections.length;
    const pathLength = 5 + Math.floor(Math.random() * 5);
    const selectedPath = [];

    for (let i = 0; i < pathLength; i++) {
      selectedPath.push(connections[(startIdx + i) % connections.length]);
    }
    return selectedPath;
  }, [webGeometry, index]);

  useFrame((state, delta) => {
    if (!spiderRef.current || path.length === 0) return;

    const segment = path[currentSegment];
    if (!segment) return;

    const p1 = webGeometry.points[segment[0]];
    const p2 = webGeometry.points[segment[1]];

    // Update progress
    const newProgress = progress + delta * speed * 0.3 * direction;

    if (newProgress >= 1) {
      // Move to next segment
      const nextSegment = (currentSegment + 1) % path.length;
      setCurrentSegment(nextSegment);
      setProgress(0);
    } else if (newProgress <= 0) {
      // Move to previous segment
      const prevSegment = currentSegment === 0 ? path.length - 1 : currentSegment - 1;
      setCurrentSegment(prevSegment);
      setProgress(1);
    } else {
      setProgress(newProgress);
    }

    // Interpolate position
    const t = Math.max(0, Math.min(1, progress));
    const x = p1.x + (p2.x - p1.x) * t;
    const y = p1.y + (p2.y - p1.y) * t;
    const z = p1.z + (p2.z - p1.z) * t + 0.1;

    spiderRef.current.position.set(x, y, z);

    // Rotate spider to face movement direction
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    spiderRef.current.rotation.z = angle;

    // Animate legs
    const time = state.clock.elapsedTime;
    spiderRef.current.children.forEach((leg, i) => {
      if (leg.isGroup) {
        leg.rotation.z = Math.sin(time * 10 + i * 0.5) * 0.3;
      }
    });
  });

  return (
    <group ref={spiderRef}>
      {/* Spider body */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>
      {/* Spider abdomen */}
      <mesh position={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0d0d1a" />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.1, 0.05, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.1, -0.05, 0.08]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ff0044" emissive="#ff0044" emissiveIntensity={2} />
      </mesh>
      {/* Legs */}
      {[...Array(8)].map((_, i) => {
        const side = i < 4 ? 1 : -1;
        const legIndex = i % 4;
        const angles = [-0.5, -0.2, 0.2, 0.5];
        return (
          <group key={i} position={[0, side * 0.1, 0]} rotation={[0, 0, angles[legIndex] * side]}>
            <mesh position={[0.15, side * 0.15, 0]} rotation={[0, 0, side * 0.8]}>
              <cylinderGeometry args={[0.02, 0.015, 0.3, 8]} />
              <meshBasicMaterial color="#2a2a4e" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Spider Web 3D Component
function SpiderWeb({ scrollProgress, activeCategory, webScale, filteredTechCount }) {
  const webRef = useRef();
  const nodesRef = useRef([]);

  // Generate web structure - dynamic based on filtered count
  const webGeometry = useMemo(() => {
    const rings = activeCategory === 'all' ? 6 : 4;
    const spokes = activeCategory === 'all' ? 16 : 12;
    const maxRadius = activeCategory === 'all' ? 7 : 5;
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

    // Add spiral connections for visual interest
    for (let r = 1; r < rings; r++) {
      for (let s = 0; s < spokes; s += 2) {
        const current = 1 + (r - 1) * spokes + s;
        const diagonal = 1 + r * spokes + ((s + 1) % spokes);
        connections.push([current, diagonal]);
      }
    }

    return { points, connections, rings, spokes };
  }, [activeCategory]);

  // Create line geometry for web strands
  const linePositions = useMemo(() => {
    const positions = [];
    webGeometry.connections.forEach(([i, j]) => {
      const p1 = webGeometry.points[i];
      const p2 = webGeometry.points[j];
      if (p1 && p2) {
        positions.push(p1.x, p1.y, p1.z);
        positions.push(p2.x, p2.y, p2.z);
      }
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
        if (p1 && p2) {
          const wave1 = Math.sin(time * 2 + p1.x + p1.y) * 0.05;
          const wave2 = Math.sin(time * 2 + p2.x + p2.y) * 0.05;

          if (positions[idx * 6 + 2] !== undefined) {
            positions[idx * 6 + 2] = p1.z + wave1;
          }
          if (positions[idx * 6 + 5] !== undefined) {
            positions[idx * 6 + 5] = p2.z + wave2;
          }
        }
      });
      webRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const categoryColors = {
    all: '#00d4ff',
    cloud: '#FF9900',
    ai: '#FF6F00',
    frontend: '#61DAFB',
    backend: '#339933',
    database: '#4169E1',
    emerging: '#9333ea',
  };

  const webColor = categoryColors[activeCategory] || '#00d4ff';

  return (
    <group scale={webScale}>
      {/* OUTER GLOW RING - Creates atmosphere */}
      <mesh position={[0, 0, -0.5]}>
        <ringGeometry args={[6, 8, 64]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <ringGeometry args={[4, 6.5, 64]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {/* Web strands - ULTRA VIBRANT - Main layer */}
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
          color={webColor}
          transparent
          opacity={0.95}
          linewidth={3}
        />
      </lineSegments>

      {/* Second layer - bright white glow */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          linewidth={4}
        />
      </lineSegments>

      {/* Third layer - colored outer glow */}
      <lineSegments position={[0, 0, -0.02]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={webColor}
          transparent
          opacity={0.4}
          linewidth={6}
        />
      </lineSegments>

      {/* Glowing center - ULTRA VIBRANT with multiple layers */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={1} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color={webColor} transparent opacity={0.1} />
      </mesh>

      {/* Web junction points with enhanced glow */}
      {webGeometry.points.slice(1).map((point, i) => (
        <group key={i} position={[point.x, point.y, point.z]}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={webColor} transparent opacity={0.5} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={webColor} transparent opacity={0.2} />
          </mesh>
        </group>
      ))}

      {/* Pulsing rings emanating from center */}
      {[1.5, 2.5, 3.5, 4.5, 5.5].map((radius, i) => (
        <mesh key={`ring-${i}`} position={[0, 0, -0.1]} rotation={[0, 0, (i * Math.PI) / 8]}>
          <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
          <meshBasicMaterial color={webColor} transparent opacity={0.15 - i * 0.02} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Walking Spiders */}
      {[0, 1, 2, 3].map((i) => (
        <Spider
          key={i}
          webGeometry={webGeometry}
          index={i}
          speed={0.4 + i * 0.25}
        />
      ))}
    </group>
  );
}

// Floating Tech Node Component
function TechNode({ tech, position, delay, scrollProgress, isVisible, targetPosition }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [currentPos, setCurrentPos] = useState(position);

  // Animate to target position
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      // Smooth transition to target position
      const lerpFactor = 0.05;
      currentPos[0] += (targetPosition[0] - currentPos[0]) * lerpFactor;
      currentPos[1] += (targetPosition[1] - currentPos[1]) * lerpFactor;
      currentPos[2] += (targetPosition[2] - currentPos[2]) * lerpFactor;

      // Float animation
      meshRef.current.position.y = currentPos[1] + Math.sin(time * 0.5 + delay) * 0.2;
      meshRef.current.position.x = currentPos[0] + Math.cos(time * 0.3 + delay) * 0.1;
      meshRef.current.position.z = currentPos[2];

      // Pulse when hovered
      const targetScale = isVisible ? (hovered ? 1.3 : 1) : 0;
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(currentScale + (targetScale - currentScale) * 0.1);
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={meshRef} position={position}>
      <Html
        center
        distanceFactor={10}
        style={{
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
          opacity: isVisible ? 1 : 0,
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

// Camera Controller for zoom transitions
function CameraController({ activeCategory, targetZoom }) {
  const { camera } = useThree();
  const targetRef = useRef({ z: 12, x: 0, y: 0 });

  useEffect(() => {
    // Set camera position based on category
    if (activeCategory === 'all') {
      targetRef.current = { z: 14, x: 0, y: 0 };
    } else {
      targetRef.current = { z: 10, x: 0, y: 0 };
    }
  }, [activeCategory]);

  useFrame(() => {
    // Smooth camera transition
    camera.position.z += (targetRef.current.z - camera.position.z) * 0.05;
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.05;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.05;
  });

  return null;
}

// 3D Scene
function Scene({ scrollProgress, activeCategory }) {
  // Filter technologies based on category
  const filteredTechs = useMemo(() => {
    if (activeCategory === 'all') return technologies;
    return technologies.filter(tech => tech.category === activeCategory);
  }, [activeCategory]);

  // Position tech nodes on the web - recalculate when filter changes
  const techPositions = useMemo(() => {
    const techCount = filteredTechs.length;
    const allCount = technologies.length;

    return technologies.map((tech, i) => {
      const isVisible = activeCategory === 'all' || tech.category === activeCategory;
      const visibleIndex = filteredTechs.findIndex(t => t.name === tech.name);

      // Calculate position based on whether visible
      let angle, radius, z;

      if (isVisible && visibleIndex !== -1) {
        // Position on smaller/larger web based on category
        angle = (visibleIndex / techCount) * Math.PI * 2;
        const ring = 1 + (visibleIndex % (activeCategory === 'all' ? 5 : 3));
        radius = ring * (activeCategory === 'all' ? 1.5 : 1.8);
        z = (Math.random() - 0.5) * 2;
      } else {
        // Move off-screen
        angle = (i / allCount) * Math.PI * 2;
        radius = 15;
        z = 10;
      }

      return {
        tech,
        originalPosition: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        ],
        targetPosition: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          isVisible ? (Math.random() - 0.5) * 2 : 10
        ],
        delay: i * 0.5,
        isVisible,
      };
    });
  }, [activeCategory, filteredTechs]);

  const webScale = activeCategory === 'all' ? 1 : 0.9;

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#9333ea" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#00ff88" />

      <CameraController activeCategory={activeCategory} />

      <SpiderWeb
        scrollProgress={scrollProgress}
        activeCategory={activeCategory}
        webScale={webScale}
        filteredTechCount={filteredTechs.length}
      />

      {techPositions.map(({ tech, originalPosition, targetPosition, delay, isVisible }, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={originalPosition}
          targetPosition={targetPosition}
          delay={delay}
          scrollProgress={scrollProgress}
          isVisible={isVisible}
        />
      ))}

      {/* Particles */}
      <group>
        {Array.from({ length: 80 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 15,
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    { id: 'all', name: 'All Technologies', color: '#00d4ff', count: technologies.length },
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
    setTimeout(() => setIsTransitioning(false), 800);
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

        {/* 3D Spider Web Canvas */}
        <motion.div
          className={`spider-web-canvas ${isTransitioning ? 'transitioning' : ''}`}
          animate={{
            scale: isTransitioning ? 0.95 : 1,
            opacity: isTransitioning ? 0.8 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Canvas
            camera={{ position: [0, 0, 14], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Scene
              scrollProgress={scrollProgress}
              activeCategory={activeCategory}
            />
          </Canvas>

          {/* Decorative elements */}
          <div className="web-decorations">
            <div className="dew-drop dew-1" />
            <div className="dew-drop dew-2" />
            <div className="dew-drop dew-3" />
            <div className="dew-drop dew-4" />
            <div className="dew-drop dew-5" />
          </div>

          {/* Spider crawl indicator */}
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
        <div className="web-glow glow-3" />
        <div className="spider-silk silk-1" />
        <div className="spider-silk silk-2" />
        <div className="spider-silk silk-3" />
      </div>
    </section>
  );
}
