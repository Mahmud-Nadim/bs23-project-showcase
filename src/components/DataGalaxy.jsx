import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Sparkles, Float, OrbitControls, Stars, shaderMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Data for cosmic bodies
const cosmicData = [
  { id: 1, label: '2500+', name: 'Projects', color: '#00d4ff', size: 1.4, distance: 6, speed: 0.15, description: 'Delivered Worldwide' },
  { id: 2, label: '850+', name: 'Engineers', color: '#00ff88', size: 1.2, distance: 8, speed: 0.12, description: 'Tech Professionals' },
  { id: 3, label: '30+', name: 'Countries', color: '#9333ea', size: 1.0, distance: 10, speed: 0.1, description: 'Global Presence' },
  { id: 4, label: '19+', name: 'Years', color: '#ffd700', size: 1.3, distance: 4.5, speed: 0.2, description: 'Of Excellence' },
  { id: 5, label: '95%', name: 'Satisfaction', color: '#ff6b35', size: 1.1, distance: 12, speed: 0.08, description: 'Client Happiness' },
  { id: 6, label: '99.9%', name: 'Uptime', color: '#ff4488', size: 0.9, distance: 14, speed: 0.06, description: 'System Reliability' },
];

// Nebula Cloud Component
function NebulaCloud({ color, position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[30, 30, 1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Central Black Hole / Sun
function CosmicCore({ activeData }) {
  const coreRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();
  const accretionRef = useRef();

  const activeColor = activeData ? activeData.color : '#00d4ff';

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.3;
      coreRef.current.rotation.z = time * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
    }

    if (accretionRef.current) {
      accretionRef.current.rotation.z = -time * 0.8;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.1;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Accretion disk */}
      <mesh ref={accretionRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 4, 64]} />
        <meshBasicMaterial
          color={activeColor}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Energy ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshBasicMaterial color={activeColor} />
      </mesh>

      {/* Sparkles around core */}
      <Sparkles
        count={200}
        scale={8}
        size={3}
        speed={0.5}
        color={activeColor}
      />
    </group>
  );
}

// Orbiting Planet/Star
function CosmicBody({ data, index, isActive, onHover, onLeave, onClick }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  const angle = useRef(index * (Math.PI * 2 / cosmicData.length) + Math.random() * 0.5);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    angle.current += data.speed * 0.01;

    const x = Math.cos(angle.current) * data.distance;
    const z = Math.sin(angle.current) * data.distance;
    const y = Math.sin(angle.current * 2 + index) * 1.5;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y = time * 0.5;
      bodyRef.current.rotation.x = time * 0.2;
    }

    if (glowRef.current) {
      const pulse = isActive ? 1.5 : 1;
      const breathe = 1 + Math.sin(time * 3 + index) * 0.1;
      glowRef.current.scale.setScalar(pulse * breathe);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * (0.5 + index * 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbit trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -groupRef.current?.position.y || 0, 0]}>
        {/* Orbit path is rendered separately */}
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group
          onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
          onPointerLeave={(e) => { e.stopPropagation(); onLeave(); }}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {/* Main body */}
          <mesh ref={bodyRef} scale={isActive ? 1.3 : 1}>
            <dodecahedronGeometry args={[data.size * 0.5, 0]} />
            <meshStandardMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={isActive ? 1.5 : 0.5}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>

          {/* Glow sphere */}
          <mesh ref={glowRef}>
            <sphereGeometry args={[data.size * 0.7, 16, 16]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={isActive ? 0.4 : 0.2}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          {/* Orbital ring */}
          {isActive && (
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[data.size * 0.9, 0.02, 16, 50]} />
              <meshBasicMaterial color={data.color} transparent opacity={0.8} />
            </mesh>
          )}

          {/* Particle trail */}
          <Sparkles
            count={isActive ? 50 : 20}
            scale={data.size * 2}
            size={isActive ? 3 : 1.5}
            speed={0.3}
            color={data.color}
          />
        </group>
      </Float>
    </group>
  );
}

// Orbit Paths
function OrbitPaths({ activeId }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {cosmicData.map((data) => (
        <mesh key={data.id}>
          <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 128]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={activeId === data.id ? 0.5 : 0.1}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Shooting Stars
function ShootingStars() {
  const starsRef = useRef([]);
  const count = 8;

  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startPos: new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        20 + Math.random() * 20,
        (Math.random() - 0.5) * 60
      ),
      speed: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 10,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    starsRef.current.forEach((star, i) => {
      if (star) {
        const progress = ((time + stars[i].delay) % 5) / 5;
        star.position.x = stars[i].startPos.x + progress * 40;
        star.position.y = stars[i].startPos.y - progress * 35;
        star.position.z = stars[i].startPos.z + progress * 20;

        const opacity = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1;
        star.material.opacity = opacity * 0.8;
      }
    });
  });

  return (
    <group>
      {stars.map((star, i) => (
        <mesh
          key={star.id}
          ref={(el) => (starsRef.current[i] = el)}
          position={star.startPos}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Cosmic Dust Particles
function CosmicDust() {
  const particlesRef = useRef();
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Color variation
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.83; colors[i * 3 + 2] = 1; // cyan
      } else if (colorChoice < 0.5) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0.53; // green
      } else if (colorChoice < 0.7) {
        colors[i * 3] = 0.58; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.92; // purple
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1; // white
      }

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions: pos, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Animation
function CameraRig({ activeData }) {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle camera movement
    const targetX = Math.sin(time * 0.1) * 2;
    const targetY = 8 + Math.sin(time * 0.15) * 2;
    const targetZ = 25 + Math.sin(time * 0.08) * 3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.01);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.01);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.01);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main Scene
function CosmicScene({ activeId, setActiveId, setActiveData }) {
  const activeData = cosmicData.find(d => d.id === activeId);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00d4ff" distance={50} />
      <pointLight position={[20, 10, 20]} intensity={0.5} color="#ff6b35" />
      <pointLight position={[-20, -10, -20]} intensity={0.5} color="#9333ea" />

      {/* Background stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Nebula clouds */}
      <NebulaCloud color="#00d4ff" position={[-20, 10, -30]} scale={2} />
      <NebulaCloud color="#9333ea" position={[25, -5, -25]} scale={1.5} />
      <NebulaCloud color="#ff6b35" position={[0, 15, -40]} scale={2.5} />

      {/* Cosmic dust */}
      <CosmicDust />

      {/* Shooting stars */}
      <ShootingStars />

      {/* Orbit paths */}
      <OrbitPaths activeId={activeId} />

      {/* Central core */}
      <CosmicCore activeData={activeData} />

      {/* Orbiting bodies */}
      {cosmicData.map((data, index) => (
        <CosmicBody
          key={data.id}
          data={data}
          index={index}
          isActive={activeId === data.id}
          onHover={() => {
            setActiveId(data.id);
            setActiveData(data);
          }}
          onLeave={() => {
            setActiveId(null);
            setActiveData(null);
          }}
          onClick={() => {
            setActiveData(data);
          }}
        />
      ))}

      {/* Camera animation */}
      <CameraRig activeData={activeData} />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={15}
        maxDistance={50}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// Info Card Component
function InfoCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      className="cosmic-info-card"
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      style={{ '--card-color': data.color }}
    >
      <div className="card-glow" />
      <div className="card-content">
        <div className="card-icon">
          <svg viewBox="0 0 100 100" className="icon-svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke={data.color} strokeWidth="2" opacity="0.3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={data.color} strokeWidth="1" opacity="0.5" />
            <circle cx="50" cy="50" r="25" fill={`${data.color}30`} />
            <circle cx="50" cy="50" r="15" fill={data.color} />
          </svg>
        </div>
        <div className="card-value" style={{ color: data.color }}>{data.label}</div>
        <div className="card-name">{data.name}</div>
        <div className="card-description">{data.description}</div>
        <div className="card-bar">
          <motion.div
            className="bar-fill"
            style={{ background: data.color }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>
      <div className="card-corners">
        <span className="corner corner-tl" style={{ borderColor: data.color }} />
        <span className="corner corner-tr" style={{ borderColor: data.color }} />
        <span className="corner corner-bl" style={{ borderColor: data.color }} />
        <span className="corner corner-br" style={{ borderColor: data.color }} />
      </div>
    </motion.div>
  );
}

// Main Component
export default function DataGalaxy() {
  const [activeId, setActiveId] = useState(null);
  const [activeData, setActiveData] = useState(null);

  return (
    <section className="data-galaxy-section">
      {/* Cosmic Background Overlay */}
      <div className="cosmic-bg-overlay" />

      {/* Header */}
      <div className="galaxy-header">
        <motion.div
          className="header-badge"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="badge-stars">✦ ✦ ✦</span>
          DATA UNIVERSE
          <span className="badge-stars">✦ ✦ ✦</span>
        </motion.div>

        <motion.h2
          className="galaxy-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXPLORE THE <span className="highlight">COSMOS</span>
        </motion.h2>

        <motion.p
          className="galaxy-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Navigate through our achievements in the data universe
        </motion.p>
      </div>

      {/* 3D Canvas */}
      <div className="galaxy-canvas-container">
        <Canvas
          camera={{ position: [0, 8, 25], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <CosmicScene
              activeId={activeId}
              setActiveId={setActiveId}
              setActiveData={setActiveData}
            />
          </Suspense>
        </Canvas>

        {/* Legend */}
        <div className="cosmic-legend">
          {cosmicData.map((data) => (
            <motion.div
              key={data.id}
              className={`legend-item ${activeId === data.id ? 'active' : ''}`}
              onMouseEnter={() => {
                setActiveId(data.id);
                setActiveData(data);
              }}
              onMouseLeave={() => {
                setActiveId(null);
                setActiveData(null);
              }}
              whileHover={{ x: 10 }}
              style={{ '--item-color': data.color }}
            >
              <span className="legend-indicator">
                <span className="indicator-core" style={{ background: data.color }} />
                <span className="indicator-ring" style={{ borderColor: data.color }} />
              </span>
              <span className="legend-name">{data.name}</span>
              <span className="legend-value" style={{ color: data.color }}>{data.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Active Info Card */}
        <AnimatePresence>
          {activeData && <InfoCard data={activeData} />}
        </AnimatePresence>
      </div>

      {/* Interaction Hint */}
      <motion.div
        className="galaxy-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <span className="hint-icon">🌌</span>
        DRAG TO EXPLORE | SCROLL TO ZOOM | HOVER CELESTIAL BODIES
        <span className="hint-icon">🌌</span>
      </motion.div>
    </section>
  );
}
