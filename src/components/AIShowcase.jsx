import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// AI Tech Stack data organized by category - BRIGHT NEON COLORS
const aiTechStack = {
  frameworks: [
    { name: 'TensorFlow', color: '#FF8C00', abbr: 'TF' },  // Bright orange
    { name: 'PyTorch', color: '#FF4757', abbr: 'PT' },     // Bright red-pink
    { name: 'Keras', color: '#FF6B6B', abbr: 'KR' },       // Coral red
  ],
  llms: [
    { name: 'OpenAI GPT', color: '#00FF9F', abbr: 'GPT' }, // Neon green
    { name: 'Claude AI', color: '#FFB347', abbr: 'CL' },   // Bright amber
    { name: 'Gemini', color: '#00D4FF', abbr: 'GE' },      // Bright cyan
  ],
  tools: [
    { name: 'LangChain', color: '#7BFF7B', abbr: 'LC' },   // Lime green
    { name: 'Hugging Face', color: '#FFE135', abbr: 'HF' }, // Bright yellow
    { name: 'MLflow', color: '#00BFFF', abbr: 'ML' },      // Deep sky blue
  ],
  cloud: [
    { name: 'AWS SageMaker', color: '#FFA500', abbr: 'SM' }, // Pure orange
    { name: 'Azure ML', color: '#1E90FF', abbr: 'AZ' },      // Dodger blue
    { name: 'Vertex AI', color: '#00FF7F', abbr: 'VA' },     // Spring green
  ],
};

// Single Neural Node with geometric/holographic effects - NO GLOW
function NeuralNode3D({ position, color, label, scale = 1, delay = 0 }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const scanLineRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      // Subtle rotation only
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.2 + delay) * 0.1;
    }

    // Wireframe counter-rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -time * 0.5;
      wireframeRef.current.rotation.z = time * 0.2;
    }

    // Orbiting rings at different speeds and axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 1.2 + delay;
      ring1Ref.current.rotation.y = time * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 1.5 + delay;
      ring2Ref.current.rotation.z = time * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 1.0 + delay;
      ring3Ref.current.rotation.x = time * 0.4;
    }

    // Scanning line effect
    if (scanLineRef.current) {
      const scanPos = Math.sin(time * 2 + delay) * 0.35 * scale;
      scanLineRef.current.position.y = scanPos;
      scanLineRef.current.material.opacity = 0.6 + Math.sin(time * 4) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group position={position}>
        {/* Faint ambient glow */}
        <mesh scale={2.5}>
          <sphereGeometry args={[0.32 * scale, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>

        {/* Inner glow layer */}
        <mesh scale={1.8}>
          <sphereGeometry args={[0.32 * scale, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>

        {/* Solid core */}
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={hovered ? 1.15 : 1}
        >
          <icosahedronGeometry args={[0.32 * scale, 1]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Wireframe shell */}
        <mesh ref={wireframeRef} scale={1.4}>
          <icosahedronGeometry args={[0.32 * scale, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
        </mesh>

        {/* Orbiting ring 1 */}
        <group ref={ring1Ref}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55 * scale, 0.012, 8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Orbiting ring 2 */}
        <group ref={ring2Ref}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.48 * scale, 0.01, 8, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Orbiting ring 3 - dashed effect */}
        <group ref={ring3Ref}>
          <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <torusGeometry args={[0.62 * scale, 0.008, 4, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.35} />
          </mesh>
        </group>

        {/* Horizontal scan line */}
        <mesh ref={scanLineRef}>
          <planeGeometry args={[0.8 * scale, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Corner brackets - holographic frame effect */}
        {[[-1, -1], [-1, 1], [1, -1], [1, 1]].map(([x, y], i) => (
          <group key={i} position={[x * 0.4 * scale, y * 0.4 * scale, 0]}>
            <mesh rotation={[0, 0, (i * Math.PI) / 2]}>
              <planeGeometry args={[0.12 * scale, 0.015]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[0, 0, (i * Math.PI) / 2 + Math.PI / 2]}>
              <planeGeometry args={[0.12 * scale, 0.015]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}

        {/* Data points orbiting */}
        {[0, 1, 2].map((i) => (
          <group key={`orbit-${i}`} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
            <mesh position={[0.5 * scale, 0, 0]}>
              <octahedronGeometry args={[0.03 * scale, 0]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}

        {/* Label - cleaner style */}
        <Html
          position={[0, -0.75 * scale, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: color,
            background: 'rgba(0,0,0,0.85)',
            padding: '4px 10px',
            borderRadius: '2px',
            border: `1px solid ${color}`,
            letterSpacing: '1px',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </div>
        </Html>

        {/* Subtle point light - much dimmer */}
        <pointLight color={color} intensity={hovered ? 0.6 : 0.3} distance={2} />
      </group>
    </Float>
  );
}

// Animated data particle flowing between nodes - RED LASER DOTS
function DataParticle({ startPos, endPos, color, delay, speed = 1 }) {
  const particleRef = useRef();
  const trailRef = useRef();

  // Create curved path
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.y += (Math.random() - 0.5) * 1.5;
    mid.z += (Math.random() - 0.5) * 2;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPos, endPos]);

  useFrame((state) => {
    if (particleRef.current) {
      const t = ((state.clock.elapsedTime * speed * 0.5 + delay) % 1);
      const pos = curve.getPoint(t);
      particleRef.current.position.copy(pos);

      // Sharp on/off visibility for laser effect
      const visibility = Math.sin(t * Math.PI);
      particleRef.current.material.opacity = visibility > 0.1 ? 0.95 : 0;

      // Trail follows slightly behind
      if (trailRef.current) {
        const trailT = Math.max(0, t - 0.03);
        const trailPos = curve.getPoint(trailT);
        trailRef.current.position.copy(trailPos);
        trailRef.current.material.opacity = visibility > 0.1 ? 0.4 : 0;
      }
    }
  });

  return (
    <>
      {/* Red laser dot - small and sharp */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#ff0033" transparent opacity={0.95} />
      </mesh>
      {/* Faint trail */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshBasicMaterial color="#ff3355" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

// Connection line between nodes - BRIGHTER
function ConnectionLine({ start, end, color, delay }) {
  const lineRef = useRef();

  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);
    mid.y += (Math.random() - 0.5) * 0.8;
    mid.z += (Math.random() - 0.5) * 1;
    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    return curve.getPoints(30);
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.15;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.4} linewidth={2} />
    </line>
  );
}

// Main Neural Network 3D Scene
function NeuralNetworkScene() {
  const groupRef = useRef();

  // Define node positions in layers
  const layers = useMemo(() => {
    const frameworkNodes = aiTechStack.frameworks.map((tech, i) => ({
      ...tech,
      position: [-5, (i - 1) * 1.8, 0],
      scale: 0.9,
    }));

    const llmNodes = aiTechStack.llms.map((tech, i) => ({
      ...tech,
      position: [-1.5, (i - 1) * 1.8, 0.5],
      scale: 1.1,
    }));

    const toolNodes = aiTechStack.tools.map((tech, i) => ({
      ...tech,
      position: [2, (i - 1) * 1.8, 0],
      scale: 1.0,
    }));

    const cloudNodes = aiTechStack.cloud.map((tech, i) => ({
      ...tech,
      position: [5.5, (i - 1) * 1.8, -0.5],
      scale: 0.9,
    }));

    return [frameworkNodes, llmNodes, toolNodes, cloudNodes];
  }, []);

  // Generate connections between adjacent layers
  const connections = useMemo(() => {
    const conns = [];
    for (let l = 0; l < layers.length - 1; l++) {
      layers[l].forEach((fromNode, i) => {
        layers[l + 1].forEach((toNode, j) => {
          conns.push({
            start: fromNode.position,
            end: toNode.position,
            color: fromNode.color,
            delay: i * 0.3 + j * 0.2,
          });
        });
      });
    }
    return conns;
  }, [layers]);

  // Generate data particles
  const particles = useMemo(() => {
    const parts = [];
    connections.forEach((conn, i) => {
      // Add multiple particles per connection with different delays
      for (let p = 0; p < 2; p++) {
        parts.push({
          ...conn,
          delay: conn.delay + p * 0.5,
          speed: 0.8 + Math.random() * 0.4,
        });
      }
    });
    return parts;
  }, [connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {connections.map((conn, i) => (
        <ConnectionLine key={`conn-${i}`} {...conn} />
      ))}

      {/* Data particles flowing through network */}
      {particles.map((particle, i) => (
        <DataParticle
          key={`particle-${i}`}
          startPos={particle.start}
          endPos={particle.end}
          color={particle.color}
          delay={particle.delay}
          speed={particle.speed}
        />
      ))}

      {/* Neural nodes */}
      {layers.flat().map((node, i) => (
        <NeuralNode3D
          key={`node-${i}`}
          position={node.position}
          color={node.color}
          label={node.abbr}
          scale={node.scale}
          delay={i * 0.3}
        />
      ))}

      {/* Central "AI Solution" output node */}
      <NeuralNode3D
        position={[9, 0, 0]}
        color="#00d4ff"
        label="AI"
        scale={1.4}
        delay={0}
      />

      {/* Final connections to output */}
      {layers[3].map((node, i) => (
        <React.Fragment key={`final-${i}`}>
          <ConnectionLine
            start={node.position}
            end={[9, 0, 0]}
            color={node.color}
            delay={i * 0.2}
          />
          <DataParticle
            startPos={node.position}
            endPos={[9, 0, 0]}
            color={node.color}
            delay={i * 0.3}
            speed={1}
          />
        </React.Fragment>
      ))}
    </group>
  );
}

// Ambient floating spheres for atmosphere
function AmbientElements() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={0.8 + i * 0.15} rotationIntensity={0.2} floatIntensity={0.4}>
          <Sphere
            args={[0.3 + Math.random() * 0.4, 16, 16]}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 8,
              -4 - Math.random() * 4,
            ]}
          >
            <MeshDistortMaterial
              color={['#00d4ff', '#00ff88', '#9333ea', '#ff6b35', '#ffd700', '#FF6F00', '#0078D4', '#34A853'][i]}
              speed={1.5}
              distort={0.3}
              radius={1}
              transparent
              opacity={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

// Background particles
function BackgroundParticles() {
  const particlesRef = useRef();
  const count = 200;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#00ff88'),
      new THREE.Color('#9333ea'),
      new THREE.Color('#ff6b35'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += 0.01;
        if (positions[i * 3] > 12.5) {
          positions[i * 3] = -12.5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function AIShowcase() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme !== 'light');
    };

    checkTheme();

    // Observe theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Background colors based on theme
  const sectionBackground = isDarkMode
    ? 'linear-gradient(180deg, #0d1117, #0a0a0f)'
    : 'linear-gradient(180deg, #4a1d6b, #2e1248, #1a0a2e)';

  const features = [
    {
      icon: '🧠',
      title: 'AI-First Development',
      description: 'Every project integrates cutting-edge AI from conception to deployment',
      gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), rgba(0, 150, 200, 0.15))',
      borderColor: 'rgba(0, 212, 255, 0.4)',
      hoverShadow: '0 20px 60px rgba(0, 212, 255, 0.3)',
    },
    {
      icon: '🚀',
      title: 'Rapid Innovation',
      description: 'Accelerate development cycles with intelligent automation and ML pipelines',
      gradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 200, 100, 0.15))',
      borderColor: 'rgba(0, 255, 136, 0.4)',
      hoverShadow: '0 20px 60px rgba(0, 255, 136, 0.3)',
    },
    {
      icon: '🔮',
      title: 'Predictive Analytics',
      description: 'Transform data into actionable insights with advanced AI models',
      gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(120, 40, 200, 0.15))',
      borderColor: 'rgba(147, 51, 234, 0.4)',
      hoverShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
    },
    {
      icon: '⚡',
      title: 'Smart Automation',
      description: 'Automate complex workflows with custom-trained AI agents',
      gradient: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 150, 80, 0.15))',
      borderColor: 'rgba(255, 107, 53, 0.4)',
      hoverShadow: '0 20px 60px rgba(255, 107, 53, 0.3)',
    },
  ];

  const categories = [
    { key: 'frameworks', label: 'ML Frameworks', color: '#FF6F00' },
    { key: 'llms', label: 'Large Language Models', color: '#00A67E' },
    { key: 'tools', label: 'AI Tools', color: '#FFD21E' },
    { key: 'cloud', label: 'Cloud AI', color: '#0078D4' },
  ];

  return (
    <section style={{
      padding: '80px 60px',
      background: sectionBackground,
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 1 }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#00d4ff',
          letterSpacing: '4px',
          marginBottom: '15px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ⚛️
          </motion.span>
          PIONEERING THE FUTURE
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            ⚛️
          </motion.span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '15px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #00ff88, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(0, 212, 255, 0.5)',
          }}>AI-FIRST</span>{' '}
          DEVELOPMENT
        </h2>

        <p style={{
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Revolutionizing software development through the power of artificial intelligence.
          We're not just adopting AI — we're pioneering its integration into every aspect of
          modern software engineering.
        </p>
      </motion.div>

      {/* 3D Neural Network Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          height: '500px',
          marginBottom: '40px',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 20, 40, 0.4))',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 0 80px rgba(0, 212, 255, 0.1), inset 0 0 80px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Neural Network Label */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          padding: '12px 20px',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--accent-cyan)',
            letterSpacing: '2px',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#00ff88',
                boxShadow: '0 0 10px #00ff88',
              }}
            />
            LIVE NEURAL NETWORK
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            color: '#ffffff',
          }}>
            AI Tech Stack Processing
          </div>
        </div>

        {/* Layer Labels */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          maxWidth: '300px',
          justifyContent: 'flex-end',
        }}>
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setActiveCategory(cat.key)}
              onMouseLeave={() => setActiveCategory(null)}
              style={{
                padding: '6px 12px',
                background: activeCategory === cat.key ? `${cat.color}30` : 'rgba(0, 0, 0, 0.7)',
                borderRadius: '4px',
                border: `1px solid ${activeCategory === cat.key ? cat.color : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: activeCategory === cat.key ? cat.color : '#888',
              }}>
                {cat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#00d4ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#9333ea" />
          <pointLight position={[0, 10, 5]} intensity={0.3} color="#00ff88" />

          <NeuralNetworkScene />
          <BackgroundParticles />
          <AmbientElements />
        </Canvas>

        {/* Tech Stack Legend */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          maxWidth: '95%',
          zIndex: 10,
        }}>
          {Object.values(aiTechStack).flat().slice(0, 10).map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.1, y: -3 }}
              style={{
                padding: '5px 10px',
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '4px',
                border: `1px solid ${tech.color}40`,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: tech.color,
                boxShadow: `0 0 8px ${tech.color}`,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: '#fff',
              }}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{
              scale: 1.02,
              boxShadow: feature.hoverShadow,
            }}
            style={{
              padding: '35px',
              background: feature.gradient,
              border: `1px solid ${feature.borderColor}`,
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated gradient border */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(0deg, #00d4ff, #00ff88)',
                  'linear-gradient(90deg, #00ff88, #9333ea)',
                  'linear-gradient(180deg, #9333ea, #ff6b35)',
                  'linear-gradient(270deg, #ff6b35, #00d4ff)',
                  'linear-gradient(360deg, #00d4ff, #00ff88)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
              }}
            />

            <div style={{
              fontSize: '40px',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
            }}>
              {feature.icon}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '12px',
            }}>
              {feature.title}
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.6,
            }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          marginTop: '60px',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '18px 40px',
            background: 'linear-gradient(135deg, #00d4ff, #00ff88)',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            fontWeight: 700,
            color: '#000',
            cursor: 'pointer',
            letterSpacing: '2px',
          }}
        >
          EXPLORE AI SOLUTIONS
        </motion.button>
      </motion.div>
    </section>
  );
}
