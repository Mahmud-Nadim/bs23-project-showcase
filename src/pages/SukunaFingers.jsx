import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SukunaFingers() {
  const [loaded, setLoaded] = useState(false);
  const [collectedFingers, setCollectedFingers] = useState([1, 2, 3]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [consuming, setConsuming] = useState(false);
  const [sukunaPower, setSukunaPower] = useState(15);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const fingers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    location: [
      'Sugisawa Third High School',
      'Eishu Juvenile Detention Center',
      'Yasohachi Bridge',
      'Kinokawa Detention Center',
      'Unknown Location',
      'Tokyo Metropolitan Area',
      'Kyoto Jujutsu High',
      'Shibuya District',
      'Unknown Location',
      'Jujutsu High Vault',
      'Unknown Location',
      'Sendai Colony',
      'Unknown Location',
      'Tokyo Colony No. 1',
      'Unknown Location',
      'Jujutsu High Vault',
      'Unknown Location',
      'Unknown Location',
      'Unknown Location',
      'Itadori Yuji (Final)',
    ][i],
    discoveredBy: ['Yuji Itadori', 'Megumi Fushiguro', 'Satoru Gojo', 'Unknown'][Math.floor(Math.random() * 4)],
    power: 5 + Math.floor(Math.random() * 10),
  }));

  const collectFinger = (fingerId) => {
    if (!collectedFingers.includes(fingerId)) {
      setSelectedFinger(fingers.find(f => f.id === fingerId));
    }
  };

  const consumeFinger = () => {
    if (selectedFinger && !collectedFingers.includes(selectedFinger.id)) {
      setConsuming(true);
      setTimeout(() => {
        setCollectedFingers([...collectedFingers, selectedFinger.id]);
        setSukunaPower(sukunaPower + selectedFinger.power);
        setConsuming(false);
        setSelectedFinger(null);
      }, 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0a0a 50%, #0a0a0f 100%)',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fingerGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes consumeEffect {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; filter: blur(10px); }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes powerSurge {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .finger-slot {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .finger-slot:hover {
          transform: scale(1.1);
          z-index: 10;
        }

        .finger-slot.collected {
          animation: fingerGlow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -30 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 10 }}
      >
        <span style={{
          fontFamily: 'Noto Sans JP',
          fontSize: '20px',
          color: 'rgba(220, 38, 38, 0.8)',
          letterSpacing: '10px',
        }}>両面宿儺</span>
        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: '64px',
          color: '#fff',
          letterSpacing: '10px',
          margin: '10px 0',
          textShadow: '0 0 40px rgba(220, 38, 38, 0.5)',
        }}>SUKUNA'S FINGERS</h1>
        <p style={{
          fontFamily: 'Space Mono',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
        }}>Collect all 20 fingers to unleash the King of Curses</p>
      </motion.div>

      {/* Power meter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          maxWidth: '600px',
          margin: '0 auto 50px',
          padding: '30px',
          background: 'rgba(220, 38, 38, 0.1)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '4px',
          }}>SUKUNA'S POWER LEVEL</span>
          <span style={{
            fontFamily: 'Bebas Neue',
            fontSize: '36px',
            color: '#dc2626',
          }}>{sukunaPower}%</span>
        </div>
        <div style={{
          height: '12px',
          background: 'rgba(220, 38, 38, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${sukunaPower}%` }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: 'linear-gradient(90deg, #dc2626, #ef4444, #dc2626)',
              backgroundSize: '200% 100%',
              animation: 'powerSurge 2s linear infinite',
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '15px',
        }}>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
          }}>FINGERS COLLECTED: {collectedFingers.length}/20</span>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '10px',
            color: collectedFingers.length >= 15 ? '#dc2626' : 'rgba(255,255,255,0.4)',
          }}>{collectedFingers.length >= 15 ? 'DANGER: APPROACHING FULL POWER' : 'CONTAINMENT STABLE'}</span>
        </div>
      </motion.div>

      {/* Fingers Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {fingers.map((finger, i) => {
          const isCollected = collectedFingers.includes(finger.id);
          return (
            <motion.div
              key={finger.id}
              className={`finger-slot ${isCollected ? 'collected' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
              onClick={() => collectFinger(finger.id)}
              style={{
                aspectRatio: '1',
                background: isCollected
                  ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.1))'
                  : 'rgba(220, 38, 38, 0.05)',
                border: `2px solid ${isCollected ? '#dc2626' : 'rgba(220, 38, 38, 0.2)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Finger number */}
              <span style={{
                fontFamily: 'Bebas Neue',
                fontSize: '48px',
                color: isCollected ? '#dc2626' : 'rgba(220, 38, 38, 0.3)',
                textShadow: isCollected ? '0 0 20px rgba(220, 38, 38, 0.5)' : 'none',
              }}>{finger.id}</span>

              {/* Status */}
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: '8px',
                color: isCollected ? '#dc2626' : 'rgba(255,255,255,0.3)',
                letterSpacing: '2px',
                marginTop: '5px',
              }}>{isCollected ? 'COLLECTED' : 'UNDISCOVERED'}</span>

              {/* Finger icon */}
              {isCollected && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '20px',
                  animation: 'floatUp 2s ease-in-out infinite',
                }}>👆</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Finger Detail Modal */}
      <AnimatePresence>
        {selectedFinger && !collectedFingers.includes(selectedFinger.id) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !consuming && setSelectedFinger(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0a0a0f',
                border: '2px solid #dc2626',
                maxWidth: '500px',
                width: '90%',
                padding: '50px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {consuming && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle, rgba(220, 38, 38, 0.8) 0%, transparent 70%)',
                  animation: 'consumeEffect 2s ease-out forwards',
                  pointerEvents: 'none',
                }} />
              )}

              <div style={{
                fontFamily: 'Bebas Neue',
                fontSize: '120px',
                color: '#dc2626',
                textShadow: '0 0 60px rgba(220, 38, 38, 0.8)',
                animation: consuming ? 'pulse 0.3s ease-in-out infinite' : 'none',
              }}>{selectedFinger.id}</div>

              <h2 style={{
                fontFamily: 'Orbitron',
                fontSize: '14px',
                color: '#fff',
                letterSpacing: '6px',
                margin: '20px 0',
              }}>SUKUNA'S FINGER #{selectedFinger.id}</h2>

              <div style={{
                padding: '20px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                marginBottom: '20px',
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    fontFamily: 'Orbitron',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}>LAST KNOWN LOCATION</span>
                  <p style={{
                    fontFamily: 'Space Mono',
                    fontSize: '13px',
                    color: '#fff',
                    marginTop: '5px',
                  }}>{selectedFinger.location}</p>
                </div>
                <div>
                  <span style={{
                    fontFamily: 'Orbitron',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '2px',
                  }}>POWER INCREASE</span>
                  <p style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '24px',
                    color: '#dc2626',
                    marginTop: '5px',
                  }}>+{selectedFinger.power}%</p>
                </div>
              </div>

              <p style={{
                fontFamily: 'Space Mono',
                fontSize: '11px',
                color: 'rgba(239, 68, 68, 0.8)',
                marginBottom: '30px',
              }}>WARNING: Consuming this finger will increase Sukuna's influence over the vessel.</p>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  onClick={consumeFinger}
                  disabled={consuming}
                  style={{
                    background: consuming ? 'rgba(220, 38, 38, 0.5)' : '#dc2626',
                    border: 'none',
                    padding: '18px 50px',
                    color: '#fff',
                    fontFamily: 'Orbitron',
                    fontSize: '14px',
                    letterSpacing: '4px',
                    cursor: consuming ? 'wait' : 'pointer',
                  }}
                >
                  {consuming ? 'CONSUMING...' : 'CONSUME FINGER'}
                </button>
                {!consuming && (
                  <button
                    onClick={() => setSelectedFinger(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '18px 30px',
                      color: '#fff',
                      fontFamily: 'Orbitron',
                      fontSize: '12px',
                      letterSpacing: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warning overlay when power is high */}
      {sukunaPower >= 80 && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          padding: '15px',
          background: 'rgba(220, 38, 38, 0.9)',
          textAlign: 'center',
          zIndex: 100,
        }}>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '12px',
            color: '#fff',
            letterSpacing: '4px',
          }}>CRITICAL WARNING: SUKUNA'S POWER APPROACHING MAXIMUM - CONTAINMENT AT RISK</span>
        </div>
      )}
    </div>
  );
}
