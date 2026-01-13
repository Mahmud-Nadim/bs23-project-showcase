import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Text, MeshDistortMaterial, Trail, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Data points configuration
const dataPoints = [
  { id: 1, label: '2500+', sublabel: 'Projects', color: '#00d4ff', size: 1.2, orbit: 4, speed: 0.3 },
  { id: 2, label: '850+', sublabel: 'Engineers', color: '#00ff88', size: 1.0, orbit: 5.5, speed: 0.25 },
  { id: 3, label: '30+', sublabel: 'Countries', color: '#9333ea', size: 0.9, orbit: 7, speed: 0.2 },
  { id: 4, label: '19+', sublabel: 'Years', color: '#ffd700', size: 1.1, orbit: 3, speed: 0.35 },
  { id: 5, label: '95%', sublabel: 'Satisfaction', color: '#ff6b35', size: 0.85, orbit: 6, speed: 0.22 },
  { id: 6, label: '5', sublabel: 'Offices', color: '#3b82f6', size: 0.8, orbit: 8, speed: 0.18 },
];

// Central Sun Component
function CentralSun({ activePoint }) {
  const sunRef = useRef();
  const glowRef = useRef();
  const activeColor = activePoint ? dataPoints.find(d => d.id === activePoint)?.color : '#00d4ff';

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      sunRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={sunRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color={activeColor}
          emissive={activeColor}
          emissiveIntensity={0.5}
          distort={0.3}
          speed={3}
          roughness={0}
          metalness={0.8}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.15} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.05} />
      </mesh>

      {/* BS23 Text */}
      <Text
        position={[0, 0, 1.6]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        BS23
      </Text>

      {/* Sparkles */}
      <Sparkles count={50} scale={4} size={3} speed={0.5} color={activeColor} />
    </group>
  );
}

// Orbiting Planet (Data Point)
function DataPlanet({ data, index, isActive, onHover, onLeave }) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const angle = useRef(index * (Math.PI * 2 / dataPoints.length));

  useFrame((state) => {
    angle.current += data.speed * 0.01;
    const x = Math.cos(angle.current) * data.orbit;
    const z = Math.sin(angle.current) * data.orbit;
    const y = Math.sin(angle.current * 2) * 0.5;

    if (planetRef.current) {
      planetRef.current.position.set(x, y, z);
      planetRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.orbit - 0.02, data.orbit + 0.02, 64]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={isActive ? 0.4 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planet */}
      <group ref={planetRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            onPointerEnter={onHover}
            onPointerLeave={onLeave}
            scale={isActive ? 1.3 : 1}
          >
            <sphereGeometry args={[data.size * 0.4, 32, 32]} />
            <MeshDistortMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={isActive ? 0.8 : 0.3}
              distort={0.2}
              speed={2}
              roughness={0.2}
            />
          </mesh>

          {/* Glow ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.size * 0.5, data.size * 0.7, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={isActive ? 0.6 : 0.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Label */}
          {isActive && (
            <>
              <Text
                position={[0, data.size * 0.8, 0]}
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {data.label}
              </Text>
              <Text
                position={[0, data.size * 0.5, 0]}
                fontSize={0.15}
                color={data.color}
                anchorX="center"
                anchorY="middle"
              >
                {data.sublabel}
              </Text>
            </>
          )}
        </Float>

        {/* Trail effect */}
        {isActive && (
          <Sparkles
            count={20}
            scale={2}
            size={2}
            speed={0.3}
            color={data.color}
          />
        )}
      </group>
    </group>
  );
}

// Constellation Lines
function ConstellationLines({ activePoint }) {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      {dataPoints.map((point, i) => {
        const nextPoint = dataPoints[(i + 1) % dataPoints.length];
        const angle1 = i * (Math.PI * 2 / dataPoints.length);
        const angle2 = (i + 1) * (Math.PI * 2 / dataPoints.length);

        const x1 = Math.cos(angle1) * point.orbit;
        const z1 = Math.sin(angle1) * point.orbit;
        const x2 = Math.cos(angle2) * nextPoint.orbit;
        const z2 = Math.sin(angle2) * nextPoint.orbit;

        const isActive = activePoint === point.id || activePoint === nextPoint.id;

        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([x1, 0, z1, x2, 0, z2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={isActive ? point.color : '#ffffff'}
              transparent
              opacity={isActive ? 0.5 : 0.1}
            />
          </line>
        );
      })}
    </group>
  );
}

// Star Field Background
function StarField() {
  const starsRef = useRef();
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}

// Meteor Shower
function MeteorShower() {
  const meteors = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 2,
      duration: 1 + Math.random(),
      startX: -20 + Math.random() * 40,
      startY: 15 + Math.random() * 10,
      startZ: -10 + Math.random() * 20,
    })), []
  );

  return (
    <group>
      {meteors.map((meteor) => (
        <Meteor key={meteor.id} {...meteor} />
      ))}
    </group>
  );
}

function Meteor({ delay, duration, startX, startY, startZ }) {
  const trailRef = useRef();

  useFrame((state) => {
    const time = (state.clock.elapsedTime + delay) % (duration + 3);
    if (time < duration && trailRef.current) {
      const progress = time / duration;
      trailRef.current.position.set(
        startX + progress * 30,
        startY - progress * 25,
        startZ
      );
    }
  });

  return (
    <Trail
      width={2}
      length={8}
      color="#00d4ff"
      attenuation={(width) => width * width}
    >
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Trail>
  );
}

// Camera Controller
function CameraController({ activePoint }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = activePoint ? 12 : 15;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02);
  });

  return null;
}

// Scene Component
function GalaxyScene({ activePoint, setActivePoint }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00d4ff" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />

      <StarField />
      <MeteorShower />
      <CentralSun activePoint={activePoint} />
      <ConstellationLines activePoint={activePoint} />

      {dataPoints.map((data, index) => (
        <DataPlanet
          key={data.id}
          data={data}
          index={index}
          isActive={activePoint === data.id}
          onHover={() => setActivePoint(data.id)}
          onLeave={() => setActivePoint(null)}
        />
      ))}

      <CameraController activePoint={activePoint} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main Component
export default function DataGalaxy() {
  const [activePoint, setActivePoint] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  return (
    <section className="data-galaxy-section">
      {/* Header */}
      <div className="galaxy-header">
        <motion.div
          className="header-badge"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="badge-icon">✦</span>
          DATA UNIVERSE
        </motion.div>

        <motion.h2
          className="galaxy-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXPLORE THE <span className="highlight">GALAXY</span>
        </motion.h2>

        <motion.p
          className="galaxy-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Hover over planets to discover our achievements
        </motion.p>
      </div>

      {/* 3D Canvas */}
      <div className="galaxy-canvas">
        <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
          <Suspense fallback={null}>
            <GalaxyScene
              activePoint={activePoint}
              setActivePoint={setActivePoint}
            />
          </Suspense>
        </Canvas>

        {/* Overlay UI */}
        <div className="galaxy-overlay">
          {/* Data Points Legend */}
          <div className="galaxy-legend">
            {dataPoints.map((point) => (
              <motion.div
                key={point.id}
                className={`legend-item ${activePoint === point.id ? 'active' : ''}`}
                onMouseEnter={() => setActivePoint(point.id)}
                onMouseLeave={() => setActivePoint(null)}
                whileHover={{ x: 10 }}
                style={{ '--point-color': point.color }}
              >
                <span className="legend-dot" style={{ background: point.color }} />
                <span className="legend-label">{point.sublabel}</span>
                <span className="legend-value">{point.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Active Point Info */}
          {activePoint && (
            <motion.div
              className="active-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                '--info-color': dataPoints.find(d => d.id === activePoint)?.color
              }}
            >
              <div className="info-value">
                {dataPoints.find(d => d.id === activePoint)?.label}
              </div>
              <div className="info-label">
                {dataPoints.find(d => d.id === activePoint)?.sublabel}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Interaction Hint */}
      <motion.p
        className="galaxy-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        DRAG TO ROTATE  |  HOVER PLANETS FOR DETAILS
      </motion.p>
    </section>
  );
}
