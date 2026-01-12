import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlackFlash() {
  const [loaded, setLoaded] = useState(false);
  const [gameState, setGameState] = useState('idle'); // idle, charging, result
  const [chargeProgress, setChargeProgress] = useState(0);
  const [targetZone, setTargetZone] = useState({ start: 70, end: 85 });
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({
    attempts: 0,
    blackFlashes: 0,
    criticals: 0,
    bestStreak: 0,
    currentStreak: 0,
  });
  const [screenFlash, setScreenFlash] = useState(false);
  const intervalRef = useRef(null);
  const chargeSpeed = useRef(2);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const startCharge = useCallback(() => {
    if (gameState !== 'idle') return;

    setGameState('charging');
    setChargeProgress(0);
    setResult(null);

    // Randomize target zone for each attempt
    const start = 60 + Math.random() * 20;
    setTargetZone({ start, end: start + 15 });

    // Randomize charge speed slightly
    chargeSpeed.current = 1.5 + Math.random() * 1.5;

    intervalRef.current = setInterval(() => {
      setChargeProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          handleRelease(100);
          return 100;
        }
        return prev + chargeSpeed.current;
      });
    }, 16);
  }, [gameState]);

  const handleRelease = useCallback((finalProgress = chargeProgress) => {
    if (gameState !== 'charging') return;

    clearInterval(intervalRef.current);
    setGameState('result');

    const progress = finalProgress || chargeProgress;
    let resultType;
    let damage;

    // Calculate result based on timing
    const perfectCenter = (targetZone.start + targetZone.end) / 2;
    const distanceFromCenter = Math.abs(progress - perfectCenter);
    const zoneWidth = targetZone.end - targetZone.start;

    if (progress >= targetZone.start && progress <= targetZone.end) {
      if (distanceFromCenter <= zoneWidth * 0.2) {
        // Perfect BLACK FLASH
        resultType = 'blackflash';
        damage = 250 + Math.floor(Math.random() * 50);
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 300);
        setStats(prev => ({
          ...prev,
          attempts: prev.attempts + 1,
          blackFlashes: prev.blackFlashes + 1,
          currentStreak: prev.currentStreak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        }));
      } else {
        // Critical hit
        resultType = 'critical';
        damage = 150 + Math.floor(Math.random() * 50);
        setStats(prev => ({
          ...prev,
          attempts: prev.attempts + 1,
          criticals: prev.criticals + 1,
          currentStreak: prev.currentStreak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        }));
      }
    } else if (progress >= targetZone.start - 10 && progress <= targetZone.end + 10) {
      // Near miss
      resultType = 'hit';
      damage = 80 + Math.floor(Math.random() * 40);
      setStats(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        currentStreak: 0,
      }));
    } else {
      // Miss
      resultType = 'miss';
      damage = 20 + Math.floor(Math.random() * 30);
      setStats(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        currentStreak: 0,
      }));
    }

    setResult({ type: resultType, damage, progress });

    // Reset after showing result
    setTimeout(() => {
      setGameState('idle');
      setChargeProgress(0);
    }, 2000);
  }, [gameState, chargeProgress, targetZone]);

  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (gameState === 'idle') {
        startCharge();
      } else if (gameState === 'charging') {
        handleRelease();
      }
    }
  }, [gameState, startCharge, handleRelease]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getResultColor = () => {
    if (!result) return '#fff';
    switch (result.type) {
      case 'blackflash': return '#000';
      case 'critical': return '#f59e0b';
      case 'hit': return '#22c55e';
      case 'miss': return '#ef4444';
      default: return '#fff';
    }
  };

  const getResultText = () => {
    if (!result) return '';
    switch (result.type) {
      case 'blackflash': return 'BLACK FLASH!!!';
      case 'critical': return 'CRITICAL HIT!';
      case 'hit': return 'HIT';
      case 'miss': return 'MISS...';
      default: return '';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: screenFlash ? '#fff' : '#0a0a0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
      transition: screenFlash ? 'none' : 'background 0.3s ease',
    }}>
      <style>{`
        @keyframes blackFlashEffect {
          0% { transform: scale(1); filter: brightness(1); }
          25% { transform: scale(1.02); filter: brightness(3) contrast(2); }
          50% { transform: scale(1); filter: brightness(1) invert(1); }
          75% { transform: scale(1.01); filter: brightness(2); }
          100% { transform: scale(1); filter: brightness(1); }
        }

        @keyframes chargeGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }

        @keyframes targetPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes damageNumber {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
        }

        @keyframes shakeScreen {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .charge-button:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Background energy effect */}
      {gameState === 'charging' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${300 + chargeProgress * 3}px`,
          height: `${300 + chargeProgress * 3}px`,
          background: `radial-gradient(circle, rgba(147, 51, 234, ${chargeProgress / 200}) 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'all 0.1s ease',
        }} />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -30 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', zIndex: 10 }}
      >
        <span style={{
          fontFamily: 'Noto Sans JP',
          fontSize: '24px',
          color: 'rgba(147, 51, 234, 0.8)',
          letterSpacing: '10px',
        }}>黒閃</span>
        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: '72px',
          color: '#fff',
          letterSpacing: '15px',
          margin: '10px 0',
          textShadow: '0 0 40px rgba(147, 51, 234, 0.5)',
        }}>BLACK FLASH</h1>
        <p style={{
          fontFamily: 'Space Mono',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '500px',
        }}>
          A phenomenon where cursed energy flashes black when it impacts within 0.000001 seconds of a physical blow.
          Multiplies attack power by 2.5x.
        </p>
      </motion.div>

      {/* Game Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          width: '100%',
          maxWidth: '600px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Charge Bar */}
        <div style={{
          height: '80px',
          background: 'rgba(147, 51, 234, 0.1)',
          border: '2px solid rgba(147, 51, 234, 0.3)',
          position: 'relative',
          marginBottom: '30px',
          overflow: 'hidden',
        }}>
          {/* Target Zone */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${targetZone.start}%`,
            width: `${targetZone.end - targetZone.start}%`,
            background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0.5), rgba(147, 51, 234, 0.3))',
            animation: 'targetPulse 1s ease-in-out infinite',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Orbitron',
              fontSize: '10px',
              color: '#fff',
              letterSpacing: '2px',
              whiteSpace: 'nowrap',
            }}>BLACK FLASH ZONE</div>
          </div>

          {/* Charge Progress */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: `${chargeProgress}%`,
            background: chargeProgress >= targetZone.start && chargeProgress <= targetZone.end
              ? 'linear-gradient(90deg, #9333ea, #fff)'
              : 'linear-gradient(90deg, #9333ea, #6366f1)',
            transition: 'background 0.1s ease',
          }} />

          {/* Current Position Indicator */}
          {gameState === 'charging' && (
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${chargeProgress}%`,
              width: '4px',
              background: '#fff',
              boxShadow: '0 0 20px #fff',
              transform: 'translateX(-50%)',
            }} />
          )}
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                animation: result.type === 'blackflash' ? 'blackFlashEffect 0.5s ease-out' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'Bebas Neue',
                fontSize: result.type === 'blackflash' ? '72px' : '48px',
                color: getResultColor(),
                textShadow: result.type === 'blackflash'
                  ? '0 0 40px #000, 0 0 80px #9333ea, 2px 2px 0 #fff, -2px -2px 0 #fff'
                  : `0 0 20px ${getResultColor()}`,
                letterSpacing: '8px',
              }}>{getResultText()}</div>
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -30, opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '36px',
                  color: getResultColor(),
                  marginTop: '10px',
                }}
              >
                {result.damage} DMG
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions / Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {gameState === 'idle' && (
            <button
              className="charge-button"
              onClick={startCharge}
              style={{
                background: 'linear-gradient(90deg, #9333ea, #6366f1)',
                border: 'none',
                padding: '25px 80px',
                color: '#fff',
                fontFamily: 'Orbitron',
                fontSize: '16px',
                letterSpacing: '6px',
                cursor: 'pointer',
                animation: 'chargeGlow 2s ease-in-out infinite',
              }}
            >
              HOLD SPACE TO CHARGE
            </button>
          )}
          {gameState === 'charging' && (
            <button
              onClick={() => handleRelease()}
              style={{
                background: chargeProgress >= targetZone.start && chargeProgress <= targetZone.end
                  ? '#fff'
                  : 'transparent',
                border: `2px solid ${chargeProgress >= targetZone.start && chargeProgress <= targetZone.end ? '#fff' : '#9333ea'}`,
                padding: '25px 80px',
                color: chargeProgress >= targetZone.start && chargeProgress <= targetZone.end ? '#000' : '#fff',
                fontFamily: 'Orbitron',
                fontSize: '16px',
                letterSpacing: '6px',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
              }}
            >
              RELEASE!
            </button>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '15px',
          marginTop: '50px',
        }}>
          {[
            { label: 'ATTEMPTS', value: stats.attempts },
            { label: 'BLACK FLASHES', value: stats.blackFlashes, color: '#000' },
            { label: 'CRITICALS', value: stats.criticals, color: '#f59e0b' },
            { label: 'CURRENT STREAK', value: stats.currentStreak },
            { label: 'BEST STREAK', value: stats.bestStreak, color: '#9333ea' },
          ].map((stat) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(147, 51, 234, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.3)',
            }}>
              <div style={{
                fontFamily: 'Bebas Neue',
                fontSize: '32px',
                color: stat.color || '#fff',
                textShadow: stat.color ? `0 0 20px ${stat.color}` : 'none',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'Orbitron',
                fontSize: '8px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1px',
                marginTop: '5px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(147, 51, 234, 0.05)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
        }}>
          <h4 style={{
            fontFamily: 'Orbitron',
            fontSize: '10px',
            color: 'rgba(147, 51, 234, 0.7)',
            letterSpacing: '3px',
            marginBottom: '10px',
          }}>HOW TO ACHIEVE BLACK FLASH</h4>
          <p style={{
            fontFamily: 'Space Mono',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
          }}>
            Release your attack at the exact moment the charge enters the glowing zone.
            Perfect timing in the center of the zone triggers the legendary BLACK FLASH,
            dealing 2.5x damage. Only the most skilled sorcerers can achieve this consistently.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
