import React, { useState, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sparkles, Text3D, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './SolutionBuilder.css';

// Industries with their characteristics
const industries = [
  { id: 'fintech', name: 'Fintech', icon: '🏦', color: '#00d4ff', description: 'Digital banking, payments, trading platforms', basePrice: 80000, timeMultiplier: 1.2 },
  { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', color: '#00ff88', description: 'Online stores, marketplaces, inventory systems', basePrice: 50000, timeMultiplier: 1.0 },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#ff6b6b', description: 'Patient management, telemedicine, health tracking', basePrice: 90000, timeMultiplier: 1.3 },
  { id: 'logistics', name: 'Logistics', icon: '🚚', color: '#ffd700', description: 'Fleet management, route optimization, tracking', basePrice: 60000, timeMultiplier: 1.1 },
  { id: 'education', name: 'Education', icon: '📚', color: '#9333ea', description: 'LMS, virtual classrooms, assessment systems', basePrice: 45000, timeMultiplier: 0.9 },
  { id: 'enterprise', name: 'Enterprise', icon: '🏢', color: '#ff6b35', description: 'ERP, CRM, workflow automation', basePrice: 100000, timeMultiplier: 1.4 },
];

// Feature modules
const featureModules = [
  { id: 'auth', name: 'Authentication & Security', icon: '🔐', price: 8000, weeks: 2, category: 'core' },
  { id: 'dashboard', name: 'Analytics Dashboard', icon: '📊', price: 15000, weeks: 3, category: 'core' },
  { id: 'payment', name: 'Payment Integration', icon: '💳', price: 20000, weeks: 4, category: 'transaction' },
  { id: 'notification', name: 'Push Notifications', icon: '🔔', price: 6000, weeks: 1, category: 'engagement' },
  { id: 'chat', name: 'Real-time Chat', icon: '💬', price: 12000, weeks: 3, category: 'engagement' },
  { id: 'ai', name: 'AI/ML Integration', icon: '🤖', price: 35000, weeks: 6, category: 'advanced' },
  { id: 'api', name: 'API Gateway', icon: '🔌', price: 10000, weeks: 2, category: 'core' },
  { id: 'search', name: 'Advanced Search', icon: '🔍', price: 8000, weeks: 2, category: 'core' },
  { id: 'reports', name: 'Report Generation', icon: '📑', price: 12000, weeks: 3, category: 'analytics' },
  { id: 'mobile', name: 'Mobile App', icon: '📱', price: 40000, weeks: 8, category: 'platform' },
  { id: 'admin', name: 'Admin Panel', icon: '⚙️', price: 15000, weeks: 3, category: 'core' },
  { id: 'cms', name: 'Content Management', icon: '📝', price: 10000, weeks: 2, category: 'content' },
];

// Technology stacks
const techStacks = [
  { id: 'react', name: 'React.js', icon: '⚛️', category: 'frontend', color: '#61dafb' },
  { id: 'nextjs', name: 'Next.js', icon: '▲', category: 'frontend', color: '#ffffff' },
  { id: 'vue', name: 'Vue.js', icon: '💚', category: 'frontend', color: '#42b883' },
  { id: 'node', name: 'Node.js', icon: '🟢', category: 'backend', color: '#339933' },
  { id: 'python', name: 'Python', icon: '🐍', category: 'backend', color: '#3776ab' },
  { id: 'dotnet', name: '.NET Core', icon: '🔷', category: 'backend', color: '#512bd4' },
  { id: 'postgres', name: 'PostgreSQL', icon: '🐘', category: 'database', color: '#336791' },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', category: 'database', color: '#47a248' },
  { id: 'aws', name: 'AWS', icon: '☁️', category: 'cloud', color: '#ff9900' },
  { id: 'azure', name: 'Azure', icon: '🌐', category: 'cloud', color: '#0078d4' },
  { id: 'docker', name: 'Docker', icon: '🐳', category: 'devops', color: '#2496ed' },
  { id: 'kubernetes', name: 'Kubernetes', icon: '⚓', category: 'devops', color: '#326ce5' },
];

// 3D Floating Crystal Component
function FloatingCrystal({ position, color, scale = 1, selected }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={selected ? scale * 1.3 : scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.8 : 0.3}
          roughness={0.1}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>
      {selected && (
        <Sparkles
          count={30}
          scale={3}
          size={2}
          speed={0.5}
          color={color}
        />
      )}
    </Float>
  );
}

// 3D Tech Sphere
function TechSphere({ technologies, selectedTech }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const positions = useMemo(() => {
    const points = [];
    const count = technologies.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      points.push([
        2.5 * Math.cos(theta) * Math.sin(phi),
        2.5 * Math.sin(theta) * Math.sin(phi),
        2.5 * Math.cos(phi),
      ]);
    }
    return points;
  }, [technologies.length]);

  return (
    <group ref={groupRef}>
      {technologies.map((tech, i) => (
        <Float key={tech.id} speed={1.5} rotationIntensity={0.2}>
          <mesh position={positions[i]} scale={selectedTech.includes(tech.id) ? 0.4 : 0.25}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={tech.color}
              emissive={tech.color}
              emissiveIntensity={selectedTech.includes(tech.id) ? 0.6 : 0.2}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

// Animated connection lines
function ConnectionLines({ count = 50 }) {
  const linesRef = useRef();

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const start = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const end = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      temp.push({ start, end });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...line.start, ...line.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

// Main 3D Scene
function Scene3D({ selectedIndustry, selectedFeatures, selectedTech }) {
  const industryData = industries.find(i => i.id === selectedIndustry);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <ConnectionLines count={30} />

      {industryData && (
        <FloatingCrystal
          position={[0, 0, 0]}
          color={industryData.color}
          scale={1.5}
          selected={true}
        />
      )}

      <TechSphere technologies={techStacks} selectedTech={selectedTech} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Progress indicator component
function ProgressIndicator({ currentStep, totalSteps }) {
  return (
    <div className="progress-indicator">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <motion.div
            className={`progress-step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: i === currentStep ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {i < currentStep ? '✓' : i + 1}
          </motion.div>
          {i < totalSteps - 1 && (
            <div className={`progress-line ${i < currentStep ? 'completed' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Main Solution Builder Component
export default function SolutionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedTech, setSelectedTech] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);

  const steps = ['Industry', 'Features', 'Technology', 'Summary'];

  const calculateEstimate = () => {
    const industry = industries.find(i => i.id === selectedIndustry);
    if (!industry) return { cost: 0, weeks: 0 };

    const featureCost = selectedFeatures.reduce((sum, fId) => {
      const feature = featureModules.find(f => f.id === fId);
      return sum + (feature?.price || 0);
    }, 0);

    const featureWeeks = selectedFeatures.reduce((sum, fId) => {
      const feature = featureModules.find(f => f.id === fId);
      return sum + (feature?.weeks || 0);
    }, 0);

    const totalCost = Math.round((industry.basePrice + featureCost) * industry.timeMultiplier);
    const totalWeeks = Math.round((8 + featureWeeks) * industry.timeMultiplier);

    return { cost: totalCost, weeks: totalWeeks };
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const toggleTech = (techId) => {
    setSelectedTech(prev =>
      prev.includes(techId)
        ? prev.filter(t => t !== techId)
        : [...prev, techId]
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const estimate = calculateEstimate();

  return (
    <div className="solution-builder">
      {/* 3D Background Canvas */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene3D
              selectedIndustry={selectedIndustry}
              selectedFeatures={selectedFeatures}
              selectedTech={selectedTech}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating particles overlay */}
      <div className="particles-overlay">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-100, -500],
              x: Math.sin(i) * 50,
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${['#00d4ff', '#00ff88', '#9333ea'][i % 3]} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="builder-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <motion.h1
            className="glitch-text"
            data-text="Solution Architect"
          >
            Solution Architect
          </motion.h1>
          <p className="header-subtitle">
            Design your perfect digital solution with our interactive builder
          </p>
        </div>
        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />
      </motion.header>

      {/* Main Content */}
      <main className="builder-main">
        <AnimatePresence mode="wait">
          {/* Step 1: Industry Selection */}
          {currentStep === 0 && (
            <motion.section
              key="industry"
              className="step-section"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="step-title">
                <span className="step-number">01</span>
                Select Your Industry
              </h2>
              <p className="step-description">
                Choose the industry that best matches your project requirements
              </p>

              <div className="industry-grid">
                {industries.map((industry, index) => (
                  <motion.div
                    key={industry.id}
                    className={`industry-card ${selectedIndustry === industry.id ? 'selected' : ''}`}
                    onClick={() => setSelectedIndustry(industry.id)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ '--accent-color': industry.color }}
                  >
                    <div className="card-glow" style={{ background: industry.color }} />
                    <div className="card-icon">{industry.icon}</div>
                    <h3>{industry.name}</h3>
                    <p>{industry.description}</p>
                    <div className="card-indicator">
                      {selectedIndustry === industry.id && (
                        <motion.div
                          className="check-mark"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Step 2: Feature Selection */}
          {currentStep === 1 && (
            <motion.section
              key="features"
              className="step-section"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="step-title">
                <span className="step-number">02</span>
                Select Features
              </h2>
              <p className="step-description">
                Choose the modules and features you need for your solution
              </p>

              <div className="features-container">
                {['core', 'transaction', 'engagement', 'advanced', 'analytics', 'platform', 'content'].map(category => {
                  const categoryFeatures = featureModules.filter(f => f.category === category);
                  if (categoryFeatures.length === 0) return null;

                  return (
                    <div key={category} className="feature-category">
                      <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                      <div className="features-grid">
                        {categoryFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.id}
                            className={`feature-card ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                            onClick={() => toggleFeature(feature.id)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-info">
                              <h4>{feature.name}</h4>
                              <div className="feature-meta">
                                <span className="feature-price">${feature.price.toLocaleString()}</span>
                                <span className="feature-time">{feature.weeks} weeks</span>
                              </div>
                            </div>
                            <div className="feature-checkbox">
                              {selectedFeatures.includes(feature.id) ? '✓' : '+'}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Step 3: Technology Stack */}
          {currentStep === 2 && (
            <motion.section
              key="technology"
              className="step-section"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="step-title">
                <span className="step-number">03</span>
                Technology Stack
              </h2>
              <p className="step-description">
                Select your preferred technologies or let us recommend the best stack
              </p>

              <div className="tech-container">
                {['frontend', 'backend', 'database', 'cloud', 'devops'].map(category => {
                  const categoryTech = techStacks.filter(t => t.category === category);

                  return (
                    <div key={category} className="tech-category">
                      <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                      <div className="tech-grid">
                        {categoryTech.map((tech, index) => (
                          <motion.div
                            key={tech.id}
                            className={`tech-card ${selectedTech.includes(tech.id) ? 'selected' : ''}`}
                            onClick={() => toggleTech(tech.id)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, rotateZ: 2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ '--tech-color': tech.color }}
                          >
                            <div className="tech-icon">{tech.icon}</div>
                            <span className="tech-name">{tech.name}</span>
                            {selectedTech.includes(tech.id) && (
                              <motion.div
                                className="tech-selected-indicator"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Step 4: Summary */}
          {currentStep === 3 && (
            <motion.section
              key="summary"
              className="step-section summary-section"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="step-title">
                <span className="step-number">04</span>
                Your Solution Blueprint
              </h2>

              <div className="summary-grid">
                {/* Project Info Card */}
                <motion.div
                  className="summary-card project-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3>Project Details</h3>
                  <input
                    type="text"
                    placeholder="Enter your project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="project-name-input"
                  />
                  <div className="selected-industry">
                    {selectedIndustry && (
                      <>
                        <span className="industry-icon">
                          {industries.find(i => i.id === selectedIndustry)?.icon}
                        </span>
                        <span>{industries.find(i => i.id === selectedIndustry)?.name}</span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Features Summary */}
                <motion.div
                  className="summary-card features-summary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Selected Features ({selectedFeatures.length})</h3>
                  <div className="features-list">
                    {selectedFeatures.map(fId => {
                      const feature = featureModules.find(f => f.id === fId);
                      return (
                        <div key={fId} className="feature-item">
                          <span>{feature?.icon}</span>
                          <span>{feature?.name}</span>
                        </div>
                      );
                    })}
                    {selectedFeatures.length === 0 && (
                      <p className="no-selection">No features selected</p>
                    )}
                  </div>
                </motion.div>

                {/* Tech Stack Summary */}
                <motion.div
                  className="summary-card tech-summary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>Technology Stack</h3>
                  <div className="tech-list">
                    {selectedTech.map(tId => {
                      const tech = techStacks.find(t => t.id === tId);
                      return (
                        <div key={tId} className="tech-item" style={{ borderColor: tech?.color }}>
                          <span>{tech?.icon}</span>
                          <span>{tech?.name}</span>
                        </div>
                      );
                    })}
                    {selectedTech.length === 0 && (
                      <p className="no-selection">Let us recommend the best stack</p>
                    )}
                  </div>
                </motion.div>

                {/* Estimate Card */}
                <motion.div
                  className="summary-card estimate-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>Estimated Investment</h3>
                  <div className="estimate-details">
                    <div className="estimate-item">
                      <span className="estimate-label">Development Cost</span>
                      <motion.span
                        className="estimate-value cost"
                        key={estimate.cost}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        ${estimate.cost.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="estimate-item">
                      <span className="estimate-label">Timeline</span>
                      <motion.span
                        className="estimate-value time"
                        key={estimate.weeks}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                      >
                        {estimate.weeks} weeks
                      </motion.span>
                    </div>
                  </div>
                  <p className="estimate-note">
                    * Final quote may vary based on detailed requirements
                  </p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="summary-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="btn-download"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📄</span> Download Proposal
                </motion.button>
                <motion.button
                  className="btn-schedule"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📅</span> Schedule Consultation
                </motion.button>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <footer className="builder-footer">
        <div className="nav-buttons">
          <motion.button
            className="btn-nav btn-prev"
            onClick={prevStep}
            disabled={currentStep === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>

          {currentStep < steps.length - 1 ? (
            <motion.button
              className="btn-nav btn-next"
              onClick={nextStep}
              disabled={currentStep === 0 && !selectedIndustry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          ) : (
            <motion.button
              className="btn-nav btn-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started 🚀
            </motion.button>
          )}
        </div>

        {/* Live Estimate Preview */}
        <motion.div
          className="live-estimate"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="estimate-preview">
            <span className="estimate-label">Estimated Cost:</span>
            <span className="estimate-amount">${estimate.cost.toLocaleString()}</span>
          </div>
          <div className="estimate-preview">
            <span className="estimate-label">Timeline:</span>
            <span className="estimate-amount">{estimate.weeks} weeks</span>
          </div>
        </motion.div>
      </footer>

      {/* Decorative Elements */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </div>
  );
}
