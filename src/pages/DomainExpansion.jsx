import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DomainExpansion() {
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(0);
  const [handPosition, setHandPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const domains = [
    {
      name: 'INFINITE VOID',
      nameJp: '無量空処',
      user: 'Satoru Gojo',
      effect: 'SENSORY OVERLOAD',
      description: 'A domain of infinite information where targets are flooded with endless stimuli, paralyzing them completely.',
      sureHit: '100%',
      barrier: 'S-RANK',
      radius: '200M',
      color: '#9333ea',
    },
    {
      name: 'MALEVOLENT SHRINE',
      nameJp: '伏魔御廚子',
      user: 'Ryomen Sukuna',
      effect: 'GUARANTEED SLASH',
      description: 'A domain without a barrier, allowing slashing attacks to reach anything within range unconditionally.',
      sureHit: '100%',
      barrier: 'NONE',
      radius: '200M+',
      color: '#dc2626',
    },
    {
      name: 'CHIMERA SHADOW GARDEN',
      nameJp: '嵌合暗翳庭',
      user: 'Megumi Fushiguro',
      effect: 'SHADOW SUPREMACY',
      description: 'A domain where everything becomes shadow, allowing the user to summon unlimited shikigami.',
      sureHit: '100%',
      barrier: 'A-RANK',
      radius: '150M',
      color: '#3b82f6',
    },
    {
      name: 'SELF-EMBODIMENT OF PERFECTION',
      nameJp: '自閉円頓裹',
      user: 'Mahito',
      effect: 'SOUL MANIPULATION',
      description: 'A domain where the user can touch the soul of any target, reshaping it at will.',
      sureHit: '100%',
      barrier: 'A-RANK',
      radius: '100M',
      color: '#6366f1',
    },
  ];

  const triggerExpansion = () => {
    setExpanding(true);
    setTimeout(() => {
      setExpanding(false);
      setExpanded(true);
    }, 2500);
  };

  const currentDomain = domains[selectedDomain];

  return (
    <div style={{
      minHeight: '100vh',
      background: expanded ? '#000' : '#0a0a0f',
      overflow: 'hidden',
      position: 'relative',
      transition: 'background 1s ease',
    }}>
      <style>{`
        @keyframes domainExpand {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          30% { transform: scale(0.5) rotate(90deg); opacity: 1; }
          60% { transform: scale(2) rotate(180deg); opacity: 1; }
          100% { transform: scale(50) rotate(360deg); opacity: 0; }
        }

        @keyframes handGlow {
          0%, 100% { filter: drop-shadow(0 0 20px ${domains[0].color}); }
          50% { filter: drop-shadow(0 0 40px ${domains[0].color}); }
        }

        @keyframes textGlitch {
          0%, 100% { text-shadow: 0 0 60px rgba(147, 51, 234, 0.8); }
          25% { text-shadow: -5px 0 60px rgba(147, 51, 234, 0.8), 5px 0 60px rgba(239, 68, 68, 0.5); }
          50% { text-shadow: 5px 0 60px rgba(59, 130, 246, 0.8), -5px 0 60px rgba(147, 51, 234, 0.5); }
          75% { text-shadow: -3px 0 60px rgba(147, 51, 234, 0.8), 3px 0 60px rgba(34, 197, 94, 0.5); }
        }

        @keyframes geometryRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseExpand {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        .domain-card:hover {
          transform: scale(1.05);
          border-color: rgba(147, 51, 234, 0.8);
        }

        .hand-gesture {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hand-gesture:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* Expanding domain effect */}
      <AnimatePresence>
        {expanding && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 50, opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '100px',
              height: '100px',
              background: `radial-gradient(circle, ${currentDomain.color} 0%, ${currentDomain.color}00 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 100,
            }}
          />
        )}
      </AnimatePresence>

      {/* Particles */}
      {expanded && [...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          background: currentDomain.color,
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          bottom: '-10px',
          animation: `floatParticle ${5 + Math.random() * 5}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.6,
        }} />
      ))}

      {!expanded ? (
        /* Pre-expansion state */
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -30 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <span style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '24px',
              color: 'rgba(147, 51, 234, 0.8)',
              letterSpacing: '10px',
            }}>領域展開</span>
            <h1 style={{
              fontFamily: 'Bebas Neue',
              fontSize: '72px',
              color: '#fff',
              letterSpacing: '15px',
              margin: '10px 0 0 0',
            }}>DOMAIN EXPANSION</h1>
          </motion.div>

          {/* Domain Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '40px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {domains.map((domain, i) => (
              <div
                key={domain.name}
                className="domain-card"
                onClick={() => setSelectedDomain(i)}
                style={{
                  padding: '15px 25px',
                  background: selectedDomain === i ? `${domain.color}30` : 'rgba(147, 51, 234, 0.05)',
                  border: `1px solid ${selectedDomain === i ? domain.color : 'rgba(147, 51, 234, 0.3)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                <span style={{
                  fontFamily: 'Orbitron',
                  fontSize: '10px',
                  color: selectedDomain === i ? '#fff' : 'rgba(255,255,255,0.5)',
                  letterSpacing: '2px',
                }}>{domain.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Hand gesture area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              width: '400px',
              height: '400px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Concentric circles */}
            {[1, 2, 3, 4].map((ring, i) => (
              <div key={ring} style={{
                position: 'absolute',
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                border: `1px solid ${currentDomain.color}${Math.floor((0.4 - i * 0.08) * 255).toString(16).padStart(2, '0')}`,
                borderRadius: '50%',
                animation: `geometryRotate ${20 + i * 10}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }} />
            ))}

            {/* Central hand gesture icon */}
            <div
              className="hand-gesture"
              onClick={triggerExpansion}
              style={{
                width: '120px',
                height: '120px',
                background: `${currentDomain.color}20`,
                border: `2px solid ${currentDomain.color}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'floatUp 3s ease-in-out infinite',
                boxShadow: `0 0 30px ${currentDomain.color}50`,
              }}
            >
              <span style={{ fontSize: '48px' }}>🙏</span>
            </div>

            {/* Pulse effect */}
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              border: `2px solid ${currentDomain.color}80`,
              borderRadius: '50%',
              animation: 'pulseExpand 2s ease-out infinite',
            }} />
          </motion.div>

          {/* Domain info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              textAlign: 'center',
              marginTop: '30px',
              maxWidth: '500px',
            }}
          >
            <p style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '18px',
              color: currentDomain.color,
              marginBottom: '10px',
            }}>{currentDomain.nameJp}</p>
            <p style={{
              fontFamily: 'Space Mono',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
            }}>User: {currentDomain.user}</p>
          </motion.div>

          {/* Trigger button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            onClick={triggerExpansion}
            disabled={expanding}
            style={{
              marginTop: '40px',
              background: `linear-gradient(90deg, ${currentDomain.color}, ${currentDomain.color}80, ${currentDomain.color})`,
              backgroundSize: '200% auto',
              border: 'none',
              padding: '25px 80px',
              color: '#fff',
              fontFamily: 'Orbitron',
              fontSize: '16px',
              letterSpacing: '6px',
              cursor: expanding ? 'wait' : 'pointer',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            {expanding ? 'EXPANDING...' : 'EXPAND DOMAIN'}
          </motion.button>
        </div>
      ) : (
        /* Post-expansion - Domain revealed */
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          background: `radial-gradient(ellipse at center, ${currentDomain.color}25 0%, transparent 70%)`,
        }}>
          {/* Domain name reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '20px',
              color: `${currentDomain.color}`,
              letterSpacing: '15px',
              marginBottom: '20px',
            }}>DOMAIN ACTIVATED</div>

            {/* Japanese domain name */}
            <h1 style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '80px',
              color: '#fff',
              margin: '0 0 10px 0',
              animation: 'textGlitch 4s ease-in-out infinite',
              textShadow: `0 0 60px ${currentDomain.color}`,
            }}>{currentDomain.nameJp}</h1>

            {/* English name */}
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '48px',
              color: '#fff',
              letterSpacing: '12px',
              margin: '0 0 60px 0',
              fontWeight: 700,
            }}>{currentDomain.name}</h2>

            {/* Domain description */}
            <div style={{
              maxWidth: '600px',
              padding: '30px',
              background: `${currentDomain.color}10`,
              border: `1px solid ${currentDomain.color}40`,
              marginBottom: '40px',
            }}>
              <p style={{
                fontFamily: 'Space Mono',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8,
              }}>{currentDomain.description}</p>
            </div>

            {/* Domain stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
            }}>
              {[
                { label: 'SURE-HIT', value: currentDomain.sureHit },
                { label: 'BARRIER', value: currentDomain.barrier },
                { label: 'RADIUS', value: currentDomain.radius },
                { label: 'EFFECT', value: currentDomain.effect },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    textAlign: 'center',
                    padding: '25px 35px',
                    background: `${currentDomain.color}15`,
                    border: `1px solid ${currentDomain.color}40`,
                  }}
                >
                  <div style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '28px',
                    color: currentDomain.color,
                  }}>{stat.value}</div>
                  <div style={{
                    fontFamily: 'Orbitron',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '2px',
                    marginTop: '5px',
                  }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Reset button */}
            <button
              onClick={() => setExpanded(false)}
              style={{
                marginTop: '50px',
                background: 'transparent',
                border: `1px solid ${currentDomain.color}60`,
                padding: '20px 60px',
                color: '#fff',
                fontFamily: 'Orbitron',
                fontSize: '14px',
                letterSpacing: '4px',
                cursor: 'pointer',
              }}
            >
              COLLAPSE DOMAIN
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
