import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Convert lat/lng to 3D coordinates on a sphere
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Office locations with lat/lng coordinates
const officeLocations = [
  { name: 'Bangladesh (HQ)', clients: 50, lat: 23.8103, lng: 90.4125, color: '#00d4ff' },
  { name: 'USA', clients: 15, lat: 37.0902, lng: -95.7129, color: '#00ff88' },
  { name: 'UAE', clients: 8, lat: 23.4241, lng: 53.8478, color: '#9333ea' },
  { name: 'Malaysia', clients: 6, lat: 4.2105, lng: 101.9758, color: '#ffd700' },
  { name: 'Germany', clients: 8, lat: 51.1657, lng: 10.4515, color: '#ff6b35' },
];

// Animated location marker
function LocationMarker({ position, color, name, clients, onHover }) {
  const markerRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.scale.setScalar(hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.3);
      ringRef.current.material.opacity = 0.5 - Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Main marker */}
      <mesh
        ref={markerRef}
        onPointerEnter={() => { setHovered(true); onHover({ name, clients, color }); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.08, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Glow effect */}
      <pointLight color={color} intensity={0.5} distance={0.5} />

      {/* Label */}
      {hovered && (
        <Html distanceFactor={3} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: `1px solid ${color}`,
            padding: '8px 12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#fff',
            boxShadow: `0 0 20px ${color}40`,
          }}>
            <div style={{ color, fontWeight: 'bold', marginBottom: '4px' }}>{name}</div>
            <div style={{ color: '#888' }}>{clients} clients</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// Earth Texture Component - Creates procedural Earth-like appearance
function EarthMesh({ onLocationHover }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // Create procedural earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean base - deep blue
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGradient.addColorStop(0, '#0a1628');
    oceanGradient.addColorStop(0.3, '#0d2847');
    oceanGradient.addColorStop(0.5, '#0f3460');
    oceanGradient.addColorStop(0.7, '#0d2847');
    oceanGradient.addColorStop(1, '#0a1628');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continent definitions (simplified shapes)
    const continents = [
      // North America
      { points: [[180, 150], [280, 140], [340, 200], [320, 300], [280, 350], [200, 380], [150, 320], [140, 250]], color: '#1a472a' },
      // South America
      { points: [[280, 400], [340, 380], [380, 450], [360, 580], [320, 680], [280, 700], [260, 600], [240, 500]], color: '#1a472a' },
      // Europe
      { points: [[900, 160], [1020, 140], [1080, 180], [1060, 280], [980, 300], [900, 260]], color: '#2d5a3d' },
      // Africa
      { points: [[920, 320], [1040, 300], [1120, 380], [1100, 560], [1020, 680], [920, 640], [880, 500], [860, 380]], color: '#1a472a' },
      // Asia
      { points: [[1100, 120], [1400, 100], [1600, 180], [1700, 300], [1650, 420], [1500, 480], [1300, 450], [1150, 380], [1100, 280]], color: '#2d5a3d' },
      // Australia
      { points: [[1500, 550], [1650, 520], [1720, 580], [1700, 680], [1580, 720], [1500, 680], [1480, 600]], color: '#1a472a' },
      // Russia/Siberia
      { points: [[1100, 80], [1600, 50], [1800, 120], [1750, 200], [1400, 220], [1150, 180]], color: '#2d5a3d' },
      // India
      { points: [[1280, 350], [1380, 320], [1400, 450], [1320, 520], [1260, 450]], color: '#1a472a' },
      // Southeast Asia
      { points: [[1450, 420], [1550, 400], [1600, 500], [1520, 560], [1450, 520]], color: '#2d5a3d' },
      // Greenland
      { points: [[620, 60], [720, 50], [740, 140], [680, 180], [600, 140]], color: '#4a7c59' },
    ];

    // Draw continents
    continents.forEach(continent => {
      ctx.fillStyle = continent.color;
      ctx.beginPath();
      ctx.moveTo(continent.points[0][0], continent.points[0][1]);
      continent.points.forEach(point => ctx.lineTo(point[0], point[1]));
      ctx.closePath();
      ctx.fill();

      // Add some texture/noise to continents
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 50; i++) {
        const x = continent.points[0][0] + (Math.random() - 0.5) * 200;
        const y = continent.points[0][1] + (Math.random() - 0.5) * 200;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Add city lights effect (bright dots)
    const cityLights = [
      [200, 280], [260, 320], [320, 380], // North America
      [920, 240], [980, 260], [1020, 220], // Europe
      [1300, 360], [1350, 380], [1280, 420], // India
      [1500, 350], [1550, 320], [1600, 280], // China
      [1700, 320], // Japan
      [1600, 600], [1650, 580], // Australia
      [300, 500], [320, 520], // South America
    ];

    cityLights.forEach(([x, y]) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 15);
      glow.addColorStop(0, 'rgba(255, 220, 100, 0.8)');
      glow.addColorStop(0.3, 'rgba(255, 200, 50, 0.4)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(x - 15, y - 15, 30, 30);
    });

    // Add subtle grid lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 64) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.width; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create cloud texture
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add cloud patches
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 20 + Math.random() * 60;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0025;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  // Create connection lines between offices
  const connectionLines = useMemo(() => {
    const hq = officeLocations[0]; // Bangladesh as HQ
    return officeLocations.slice(1).map((office) => {
      const start = latLngToVector3(hq.lat, hq.lng, 1.02);
      const end = latLngToVector3(office.lat, office.lng, 1.02);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(1.4); // Arc outward

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return { points: curve.getPoints(50), color: office.color };
    });
  }, []);

  return (
    <group ref={earthRef}>
      {/* Main Earth sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[1.02, 64, 64]}>
        <meshBasicMaterial
          map={cloudTexture}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </Sphere>

      {/* Inner atmosphere glow */}
      <Sphere args={[1.01, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.05}
          side={THREE.FrontSide}
        />
      </Sphere>

      {/* Outer atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[1.15, 64, 64]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Secondary atmosphere */}
      <Sphere args={[1.25, 32, 32]}>
        <meshBasicMaterial
          color="#4a90d9"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Connection arcs */}
      {connectionLines.map((conn, i) => (
        <line key={`connection-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={conn.points.length}
              array={new Float32Array(conn.points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={conn.color} transparent opacity={0.6} />
        </line>
      ))}

      {/* Animated data pulse on connection lines */}
      {connectionLines.map((conn, i) => (
        <DataPulse key={`pulse-${i}`} curve={conn.points} color={conn.color} delay={i * 0.5} />
      ))}

      {/* Location markers */}
      {officeLocations.map((location) => (
        <LocationMarker
          key={location.name}
          position={latLngToVector3(location.lat, location.lng, 1.03)}
          color={location.color}
          name={location.name}
          clients={location.clients}
          onHover={onLocationHover}
        />
      ))}
    </group>
  );
}

// Animated data pulse traveling along connection lines
function DataPulse({ curve, color, delay }) {
  const pulseRef = useRef();

  useFrame((state) => {
    if (pulseRef.current && curve.length > 0) {
      const t = ((state.clock.elapsedTime * 0.5 + delay) % 2) / 2;
      const index = Math.floor(t * (curve.length - 1));
      const point = curve[Math.min(index, curve.length - 1)];
      if (point) {
        pulseRef.current.position.set(point.x, point.y, point.z);
        pulseRef.current.material.opacity = Math.sin(t * Math.PI);
      }
    }
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={1} />
    </mesh>
  );
}

// Floating particles around the globe
function Particles() {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.3 + Math.random() * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function SpinningGlobe() {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  return (
    <div style={{
      width: '100%',
      height: '350px',
      position: 'relative',
      background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.08) 0%, rgba(0, 20, 40, 0.3) 50%, transparent 70%)',
      borderRadius: '8px',
      border: '1px solid rgba(0, 212, 255, 0.15)',
      overflow: 'hidden',
    }}>
      {/* Title */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        zIndex: 10,
        padding: '8px 16px',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '6px',
        border: '1px solid rgba(0, 212, 255, 0.3)',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--accent-cyan)',
          letterSpacing: '2px',
          marginBottom: '2px',
        }}>
          GLOBAL PRESENCE
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '12px',
          color: 'var(--text-primary)',
        }}>
          5 Office Locations
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />
        <pointLight position={[10, 10, 10]} intensity={0.2} color="#ffffff" />

        <EarthMesh onLocationHover={setHoveredLocation} />
        <Particles />
        <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        justifyContent: 'center',
      }}>
        {officeLocations.map((loc) => (
          <div
            key={loc.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              background: hoveredLocation?.name === loc.name ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px',
              fontSize: '9px',
              fontFamily: 'var(--font-mono)',
              color: hoveredLocation?.name === loc.name ? loc.color : '#888',
              border: `1px solid ${hoveredLocation?.name === loc.name ? loc.color : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.3s',
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: loc.color,
              boxShadow: `0 0 6px ${loc.color}`,
            }} />
            {loc.name}
          </div>
        ))}
      </div>
    </div>
  );
}
