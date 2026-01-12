import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Techniques() {
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [fear, setFear] = useState('');

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const techniques = [
    { name: 'INFINITY REVERSAL', nameJp: '無限の反転', power: 'A', range: 'B', control: 'S', emotion: 'AMBITION' },
    { name: 'SHADOW MONARCH', nameJp: '影の君主', power: 'S', range: 'A', control: 'A', emotion: 'SORROW' },
    { name: 'CRIMSON BINDING', nameJp: '紅蓮縛り', power: 'S', range: 'C', control: 'B', emotion: 'ANGER' },
    { name: 'SOUL RESONANCE', nameJp: '魂の共鳴', power: 'B', range: 'S', control: 'A', emotion: 'LOVE' },
  ];

  const handleReveal = () => {
    if (!selectedEmotion) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setRevealed(true);
    }, 2500);
  };

  const currentTechnique = techniques.find(t => t.emotion === selectedEmotion) || techniques[0];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
    }}>
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes revealGlow {
          0% { box-shadow: 0 0 0 rgba(147, 51, 234, 0); }
          50% { box-shadow: 0 0 100px rgba(147, 51, 234, 0.8), 0 0 200px rgba(59, 130, 246, 0.4); }
          100% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.4); }
        }

        @keyframes scanPulse {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.6; transform: scaleX(1.02); }
        }

        @keyframes energyWave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .emotion-btn:hover {
          transform: scale(1.05);
          border-color: rgba(147, 51, 234, 0.8) !important;
        }
      `}</style>

      {/* Left Panel - Assessment */}
      <div style={{
        flex: 1,
        padding: '60px',
        borderRight: '1px solid rgba(147, 51, 234, 0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -30 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '10px',
            color: 'rgba(147, 51, 234, 0.6)',
            letterSpacing: '4px',
          }}>ASSESSMENT MODULE 02</span>
          <h2 style={{
            fontFamily: 'Bebas Neue',
            fontSize: '48px',
            color: '#fff',
            letterSpacing: '8px',
            margin: '10px 0 0 0',
          }}>INNATE TECHNIQUE</h2>
          <p style={{
            fontFamily: 'Noto Sans JP',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '10px',
          }}>生得術式の解析</p>
        </motion.div>

        {/* Assessment Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginTop: '50px', flex: 1 }}
        >
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              fontFamily: 'Space Mono',
              fontSize: '11px',
              color: 'rgba(147, 51, 234, 0.8)',
              letterSpacing: '2px',
            }}>01 // WHAT IS YOUR GREATEST FEAR?</label>
            <input
              type="text"
              value={fear}
              onChange={(e) => setFear(e.target.value)}
              placeholder="Enter your deepest fear..."
              style={{
                width: '100%',
                background: 'rgba(147, 51, 234, 0.05)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                padding: '15px 20px',
                marginTop: '10px',
                color: '#fff',
                fontFamily: 'Space Mono',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              fontFamily: 'Space Mono',
              fontSize: '11px',
              color: 'rgba(147, 51, 234, 0.8)',
              letterSpacing: '2px',
            }}>02 // WHAT EMOTION DRIVES YOU?</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              marginTop: '10px',
            }}>
              {['ANGER', 'SORROW', 'LOVE', 'AMBITION'].map((emotion) => (
                <div
                  key={emotion}
                  className="emotion-btn"
                  onClick={() => setSelectedEmotion(emotion)}
                  style={{
                    background: selectedEmotion === emotion ? 'rgba(147, 51, 234, 0.2)' : 'rgba(147, 51, 234, 0.05)',
                    border: `1px solid rgba(147, 51, 234, ${selectedEmotion === emotion ? 0.6 : 0.2})`,
                    padding: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  <span style={{
                    fontFamily: 'Orbitron',
                    fontSize: '12px',
                    color: selectedEmotion === emotion ? '#fff' : 'rgba(255,255,255,0.5)',
                    letterSpacing: '2px',
                  }}>{emotion}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              fontFamily: 'Space Mono',
              fontSize: '11px',
              color: 'rgba(147, 51, 234, 0.8)',
              letterSpacing: '2px',
            }}>03 // CURSED ENERGY SIGNATURE</label>
            <div style={{
              height: '60px',
              background: 'rgba(147, 51, 234, 0.05)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              marginTop: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <svg width="100%" height="60" style={{ position: 'absolute', top: 0, left: 0 }}>
                <path
                  d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 T500,30 T600,30"
                  fill="none"
                  stroke="rgba(147, 51, 234, 0.6)"
                  strokeWidth="2"
                  style={{ animation: 'scanPulse 2s ease-in-out infinite' }}
                />
                <path
                  d="M0,30 Q50,50 100,30 T200,30 T300,30 T400,30 T500,30 T600,30"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="1"
                  style={{ animation: 'scanPulse 2.5s ease-in-out infinite 0.5s' }}
                />
              </svg>
              {/* Energy wave */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.2), transparent)',
                animation: 'energyWave 3s linear infinite',
              }} />
            </div>
          </div>

          <button
            onClick={handleReveal}
            disabled={!selectedEmotion || analyzing}
            style={{
              width: '100%',
              background: analyzing ? 'rgba(147, 51, 234, 0.3)' : 'transparent',
              border: '1px solid rgba(147, 51, 234, 0.6)',
              padding: '20px',
              color: '#fff',
              fontFamily: 'Orbitron',
              fontSize: '14px',
              letterSpacing: '4px',
              cursor: selectedEmotion && !analyzing ? 'pointer' : 'not-allowed',
              marginTop: '20px',
              opacity: selectedEmotion ? 1 : 0.5,
              transition: 'all 0.3s',
            }}
          >
            {analyzing ? 'ANALYZING CURSED ENERGY...' : 'REVEAL TECHNIQUE'}
          </button>
        </motion.div>
      </div>

      {/* Right Panel - Technique Reveal */}
      <div style={{
        flex: 1.2,
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Background circles */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(147, 51, 234, 0.1)',
          borderRadius: '50%',
          animation: 'rotate 60s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(147, 51, 234, 0.15)',
          borderRadius: '50%',
          animation: 'rotate 40s linear infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          border: '1px solid rgba(147, 51, 234, 0.2)',
          borderRadius: '50%',
          animation: 'pulseRing 3s ease-in-out infinite',
        }} />

        {!revealed ? (
          <div style={{ textAlign: 'center', opacity: analyzing ? 0.3 : 0.6 }}>
            <div style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '80px',
              color: 'rgba(147, 51, 234, 0.3)',
            }}>?</div>
            <p style={{
              fontFamily: 'Orbitron',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '4px',
            }}>{analyzing ? 'SCANNING...' : 'AWAITING ANALYSIS'}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: 'center',
              animation: 'revealGlow 1.5s ease-out',
              padding: '60px',
            }}
          >
            {/* Technique Name */}
            <div style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '16px',
              color: 'rgba(147, 51, 234, 0.8)',
              letterSpacing: '6px',
              marginBottom: '10px',
            }}>{currentTechnique.nameJp}</div>
            <h1 style={{
              fontFamily: 'Bebas Neue',
              fontSize: '64px',
              color: '#fff',
              letterSpacing: '10px',
              margin: '0 0 30px 0',
              textShadow: '0 0 40px rgba(147, 51, 234, 0.5)',
            }}>{currentTechnique.name}</h1>

            {/* Technique Description */}
            <div style={{
              background: 'rgba(147, 51, 234, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
              padding: '30px',
              maxWidth: '400px',
              textAlign: 'left',
            }}>
              <p style={{
                fontFamily: 'Space Mono',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.8,
                margin: 0,
              }}>
                Your innate technique manifests from your core emotion of {selectedEmotion?.toLowerCase()}.
                This power allows you to manipulate cursed energy in ways unique to your soul's resonance.
              </p>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginTop: '30px',
            }}>
              {[
                { label: 'POWER', value: currentTechnique.power },
                { label: 'RANGE', value: currentTechnique.range },
                { label: 'CONTROL', value: currentTechnique.control },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '36px',
                    color: stat.value === 'S' ? '#9333ea' : '#fff',
                  }}>{stat.value}</div>
                  <div style={{
                    fontFamily: 'Orbitron',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setRevealed(false);
                setSelectedEmotion(null);
                setFear('');
              }}
              style={{
                marginTop: '40px',
                background: 'transparent',
                border: '1px solid rgba(147, 51, 234, 0.4)',
                padding: '15px 40px',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Orbitron',
                fontSize: '11px',
                letterSpacing: '3px',
                cursor: 'pointer',
              }}
            >
              TRY AGAIN
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
