import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Sparkles, Float, OrbitControls, Stars, Text, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Enhanced cosmic data with Brain Station 23 infographics
const cosmicData = [
  {
    id: 1,
    label: '2500+',
    name: 'Projects',
    color: '#00d4ff',
    size: 1.4,
    distance: 6,
    speed: 0.15,
    description: 'Delivered Worldwide',
    infographics: {
      title: 'Project Excellence',
      stats: [
        { label: 'Fintech Projects', value: '500+', icon: '🏦' },
        { label: 'E-Commerce', value: '400+', icon: '🛒' },
        { label: 'Healthcare', value: '300+', icon: '🏥' },
        { label: 'Enterprise', value: '600+', icon: '🏢' },
      ],
      highlight: 'CityTouch: 446K+ users, $3B+ transactions',
      partners: ['City Bank', 'AB Bank', 'HSBC', 'Shwapno'],
    }
  },
  {
    id: 2,
    label: '889',
    name: 'Engineers',
    color: '#00ff88',
    size: 1.2,
    distance: 8,
    speed: 0.12,
    description: 'Tech Professionals',
    infographics: {
      title: 'World-Class Team',
      stats: [
        { label: 'Full Stack Devs', value: '350+', icon: '💻' },
        { label: 'AI/ML Engineers', value: '80+', icon: '🤖' },
        { label: 'Cloud Architects', value: '60+', icon: '☁️' },
        { label: 'QA Engineers', value: '120+', icon: '🔍' },
      ],
      highlight: 'Talent powering Fortune 100 solutions',
      partners: ['AWS', 'Microsoft', 'Google Cloud'],
    }
  },
  {
    id: 3,
    label: '30+',
    name: 'Countries',
    color: '#9333ea',
    size: 1.0,
    distance: 10,
    speed: 0.1,
    description: 'Global Presence',
    infographics: {
      title: 'Worldwide Impact',
      stats: [
        { label: 'Asia Pacific', value: '15+', icon: '🌏' },
        { label: 'Europe', value: '8+', icon: '🌍' },
        { label: 'Americas', value: '5+', icon: '🌎' },
        { label: 'Middle East', value: '4+', icon: '🏜️' },
      ],
      highlight: '6 Global Offices: Bangladesh, USA, Germany, Malaysia, UAE, Japan',
      partners: ['Salesforce', 'Odoo', 'Moodle'],
    }
  },
  {
    id: 4,
    label: '19+',
    name: 'Years',
    color: '#ffd700',
    size: 1.3,
    distance: 4.5,
    speed: 0.2,
    description: 'Of Excellence',
    infographics: {
      title: 'Legacy of Innovation',
      stats: [
        { label: 'Founded', value: '2006', icon: '🎯' },
        { label: 'CMMI Level', value: '3', icon: '📊' },
        { label: 'ISO Certs', value: '2', icon: '🏆' },
        { label: 'BASIS Awards', value: '10+', icon: '🥇' },
      ],
      highlight: 'Bronze Winner - Google AI Competition (Kaggle) 2019',
      partners: ['ISO 27001', 'ISO 9001', 'CMMI Level 3'],
    }
  },
  {
    id: 5,
    label: '95%',
    name: 'Satisfaction',
    color: '#ff6b35',
    size: 1.1,
    distance: 12,
    speed: 0.08,
    description: 'Client Happiness',
    infographics: {
      title: 'Client Success',
      stats: [
        { label: 'Repeat Business', value: '85%', icon: '🔄' },
        { label: 'On-Time Delivery', value: '99%', icon: '⏰' },
        { label: 'Support Rating', value: '4.9/5', icon: '⭐' },
        { label: 'NPS Score', value: '72+', icon: '📈' },
      ],
      highlight: 'Clutch-rated Top Software Development Company',
      partners: ['Clutch', 'Forbes', 'Inc. 5000'],
    }
  },
  {
    id: 6,
    label: '130+',
    name: 'Industries',
    color: '#ff4488',
    size: 0.9,
    distance: 14,
    speed: 0.06,
    description: 'Sectors Served',
    infographics: {
      title: 'Industry Expertise',
      stats: [
        { label: 'Fintech', value: '25%', icon: '💳' },
        { label: 'Healthcare', value: '20%', icon: '🏥' },
        { label: 'E-Commerce', value: '22%', icon: '🛍️' },
        { label: 'Telecom', value: '15%', icon: '📱' },
      ],
      highlight: 'Transforming Bangladesh\'s banking sector since 2012',
      partners: ['Metlife', 'UCBL', 'Southeast Bank'],
    }
  },
];

// Massive Star Component for zoomed view
function MassiveStar({ data, isZoomed }) {
  const starRef = useRef();
  const coronaRef = useRef();
  const flareRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (starRef.current) {
      starRef.current.rotation.y = time * 0.2;
      starRef.current.rotation.z = time * 0.1;
    }

    if (coronaRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.1;
      coronaRef.current.scale.setScalar(pulse);
    }

    if (flareRef.current) {
      flareRef.current.rotation.z = time * 0.5;
    }
  });

  if (!isZoomed) return null;

  return (
    <group>
      {/* Massive star core */}
      <mesh ref={starRef}>
        <icosahedronGeometry args={[4, 6]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer glow layers */}
      {[6, 7, 8, 10].map((radius, i) => (
        <mesh key={i}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.15 - i * 0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Solar flares */}
      <group ref={flareRef}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            rotation={[0, 0, (angle * Math.PI) / 180]}
            position={[0, 0, 0]}
          >
            <coneGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Massive sparkle field */}
      <Sparkles
        count={500}
        scale={20}
        size={6}
        speed={0.8}
        color={data.color}
      />

      {/* Energy rings */}
      {[6, 8, 10, 12].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, 0]}>
          <torusGeometry args={[radius, 0.03, 16, 100]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.5 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

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
function CosmicCore({ activeData, isZoomed }) {
  const coreRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();
  const accretionRef = useRef();

  const activeColor = activeData ? activeData.color : '#00d4ff';
  const coreScale = isZoomed ? 0 : 1;

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
      glowRef.current.scale.setScalar(pulse * coreScale);
    }
  });

  return (
    <group scale={coreScale}>
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
function CosmicBody({ data, index, isActive, onHover, onLeave, onClick, isZoomed, zoomedData }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  const angle = useRef(index * (Math.PI * 2 / cosmicData.length) + Math.random() * 0.5);

  const isThisZoomed = isZoomed && zoomedData?.id === data.id;
  const shouldHide = isZoomed && !isThisZoomed;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (!isZoomed) {
      angle.current += data.speed * 0.01;

      const x = Math.cos(angle.current) * data.distance;
      const z = Math.sin(angle.current) * data.distance;
      const y = Math.sin(angle.current * 2 + index) * 1.5;

      if (groupRef.current) {
        groupRef.current.position.set(x, y, z);
      }
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

  if (shouldHide) return null;

  return (
    <group ref={groupRef}>
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
function OrbitPaths({ activeId, isZoomed }) {
  if (isZoomed) return null;

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

// Camera Animation with zoom support
function CameraRig({ activeData, isZoomed, zoomedData }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 8, 25));

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (isZoomed && zoomedData) {
      // Zoom in close to the star
      targetPosition.current.set(0, 2, 12);
    } else {
      // Normal orbiting view
      const targetX = Math.sin(time * 0.1) * 2;
      const targetY = 8 + Math.sin(time * 0.15) * 2;
      const targetZ = 25 + Math.sin(time * 0.08) * 3;
      targetPosition.current.set(targetX, targetY, targetZ);
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPosition.current.x, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPosition.current.y, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPosition.current.z, 0.02);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main Scene
function CosmicScene({ activeId, setActiveId, setActiveData, isZoomed, setIsZoomed, zoomedData, setZoomedData }) {
  const activeData = cosmicData.find(d => d.id === activeId);

  const handleBodyClick = (data) => {
    if (isZoomed && zoomedData?.id === data.id) {
      // Zoom out
      setIsZoomed(false);
      setZoomedData(null);
    } else {
      // Zoom in
      setIsZoomed(true);
      setZoomedData(data);
      setActiveData(data);
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={isZoomed ? 5 : 3} color={zoomedData?.color || "#00d4ff"} distance={50} />
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
      <OrbitPaths activeId={activeId} isZoomed={isZoomed} />

      {/* Central core (hidden when zoomed) */}
      <CosmicCore activeData={activeData} isZoomed={isZoomed} />

      {/* Massive star when zoomed */}
      {zoomedData && <MassiveStar data={zoomedData} isZoomed={isZoomed} />}

      {/* Orbiting bodies */}
      {cosmicData.map((data, index) => (
        <CosmicBody
          key={data.id}
          data={data}
          index={index}
          isActive={activeId === data.id}
          isZoomed={isZoomed}
          zoomedData={zoomedData}
          onHover={() => {
            if (!isZoomed) {
              setActiveId(data.id);
              setActiveData(data);
            }
          }}
          onLeave={() => {
            if (!isZoomed) {
              setActiveId(null);
              setActiveData(null);
            }
          }}
          onClick={() => handleBodyClick(data)}
        />
      ))}

      {/* Camera animation */}
      <CameraRig activeData={activeData} isZoomed={isZoomed} zoomedData={zoomedData} />

      {/* Orbit controls */}
      <OrbitControls
        enableZoom={!isZoomed}
        enablePan={false}
        minDistance={isZoomed ? 10 : 15}
        maxDistance={isZoomed ? 20 : 50}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
        autoRotate={!isZoomed}
        autoRotateSpeed={0.3}
      />
    </>
  );
}

// Infographic Panel Component
function InfographicPanel({ data, onClose }) {
  if (!data) return null;

  return (
    <motion.div
      className="infographic-panel"
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: 'spring', damping: 20 }}
      style={{ '--panel-color': data.color }}
    >
      {/* Close button */}
      <button className="infographic-close" onClick={onClose}>
        <span>×</span>
      </button>

      {/* Header */}
      <div className="infographic-header">
        <div className="infographic-icon-large">
          <div className="icon-glow" style={{ background: data.color }} />
          <span className="icon-value">{data.label}</span>
          <span className="icon-name">{data.name}</span>
        </div>
        <h3 className="infographic-title">{data.infographics.title}</h3>
      </div>

      {/* Stats Grid */}
      <div className="infographic-stats">
        {data.infographics.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="infographic-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-value" style={{ color: data.color }}>{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Highlight */}
      <motion.div
        className="infographic-highlight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ borderColor: data.color }}
      >
        <span className="highlight-icon">⚡</span>
        {data.infographics.highlight}
      </motion.div>

      {/* Partners */}
      <div className="infographic-partners">
        <span className="partners-label">KEY PARTNERS & CERTIFICATIONS</span>
        <div className="partners-list">
          {data.infographics.partners.map((partner, i) => (
            <motion.span
              key={partner}
              className="partner-badge"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{ borderColor: data.color }}
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="infographic-decoration">
        <svg viewBox="0 0 100 100" className="corner-svg top-left">
          <path d="M 0 30 L 0 0 L 30 0" fill="none" stroke={data.color} strokeWidth="2" />
        </svg>
        <svg viewBox="0 0 100 100" className="corner-svg top-right">
          <path d="M 70 0 L 100 0 L 100 30" fill="none" stroke={data.color} strokeWidth="2" />
        </svg>
        <svg viewBox="0 0 100 100" className="corner-svg bottom-left">
          <path d="M 0 70 L 0 100 L 30 100" fill="none" stroke={data.color} strokeWidth="2" />
        </svg>
        <svg viewBox="0 0 100 100" className="corner-svg bottom-right">
          <path d="M 100 70 L 100 100 L 70 100" fill="none" stroke={data.color} strokeWidth="2" />
        </svg>
      </div>
    </motion.div>
  );
}

// Info Card Component (for non-zoomed hover)
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
        <div className="card-cta">Click to explore</div>
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedData, setZoomedData] = useState(null);

  const handleLegendClick = (data) => {
    if (isZoomed && zoomedData?.id === data.id) {
      setIsZoomed(false);
      setZoomedData(null);
    } else {
      setIsZoomed(true);
      setZoomedData(data);
      setActiveData(data);
      setActiveId(data.id);
    }
  };

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
          {isZoomed ? `Exploring: ${zoomedData?.name}` : 'Navigate through our achievements in the data universe'}
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
              isZoomed={isZoomed}
              setIsZoomed={setIsZoomed}
              zoomedData={zoomedData}
              setZoomedData={setZoomedData}
            />
          </Suspense>
        </Canvas>

        {/* Legend */}
        <div className={`cosmic-legend ${isZoomed ? 'zoomed' : ''}`}>
          {cosmicData.map((data) => (
            <motion.div
              key={data.id}
              className={`legend-item ${activeId === data.id ? 'active' : ''} ${isZoomed && zoomedData?.id === data.id ? 'selected' : ''}`}
              onClick={() => handleLegendClick(data)}
              onMouseEnter={() => {
                if (!isZoomed) {
                  setActiveId(data.id);
                  setActiveData(data);
                }
              }}
              onMouseLeave={() => {
                if (!isZoomed) {
                  setActiveId(null);
                  setActiveData(null);
                }
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

        {/* Active Info Card (non-zoomed) */}
        <AnimatePresence>
          {activeData && !isZoomed && <InfoCard data={activeData} />}
        </AnimatePresence>

        {/* Infographic Panel (zoomed) */}
        <AnimatePresence>
          {isZoomed && zoomedData && (
            <InfographicPanel
              data={zoomedData}
              onClose={() => {
                setIsZoomed(false);
                setZoomedData(null);
              }}
            />
          )}
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
        {isZoomed ? 'CLICK TOPIC OR CLOSE BUTTON TO RETURN' : 'CLICK ANY CELESTIAL BODY TO ZOOM IN | HOVER TO PREVIEW'}
        <span className="hint-icon">🌌</span>
      </motion.div>
    </section>
  );
}
