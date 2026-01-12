import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Characters() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const characters = [
    {
      id: 1,
      name: 'YUJI ITADORI',
      nameJp: '虎杖悠仁',
      grade: 'SPECIAL GRADE (VESSEL)',
      affiliation: 'Tokyo Jujutsu High - 1st Year',
      technique: 'Divergent Fist / Sukuna\'s Techniques',
      description: 'A kind-hearted student who became the vessel of Ryomen Sukuna after swallowing one of his fingers. Possesses incredible physical prowess and an indomitable will.',
      stats: { power: 95, speed: 90, technique: 60, intelligence: 70, cursedEnergy: 85 },
      color: '#f59e0b',
      icon: '虎',
    },
    {
      id: 2,
      name: 'MEGUMI FUSHIGURO',
      nameJp: '伏黒恵',
      grade: 'GRADE 2 → SPECIAL GRADE',
      affiliation: 'Tokyo Jujutsu High - 1st Year',
      technique: 'Ten Shadows Technique',
      description: 'A stoic and analytical sorcerer who inherited the prestigious Ten Shadows Technique from the Zenin clan. His potential is recognized even by Sukuna himself.',
      stats: { power: 75, speed: 80, technique: 90, intelligence: 95, cursedEnergy: 85 },
      color: '#3b82f6',
      icon: '伏',
    },
    {
      id: 3,
      name: 'NOBARA KUGISAKI',
      nameJp: '釘崎野薔薇',
      grade: 'GRADE 3 → GRADE 1',
      affiliation: 'Tokyo Jujutsu High - 1st Year',
      technique: 'Straw Doll Technique',
      description: 'A fierce and confident sorcerer from the countryside. Her technique allows her to damage enemies from a distance using straw dolls and nails infused with cursed energy.',
      stats: { power: 70, speed: 75, technique: 85, intelligence: 80, cursedEnergy: 75 },
      color: '#ef4444',
      icon: '釘',
    },
    {
      id: 4,
      name: 'SATORU GOJO',
      nameJp: '五条悟',
      grade: 'SPECIAL GRADE',
      affiliation: 'Tokyo Jujutsu High - Teacher',
      technique: 'Limitless / Six Eyes',
      description: 'The strongest jujutsu sorcerer alive. Born with both the Limitless technique and the Six Eyes, he possesses god-like powers that make him virtually invincible.',
      stats: { power: 100, speed: 100, technique: 100, intelligence: 95, cursedEnergy: 100 },
      color: '#9333ea',
      icon: '五',
    },
    {
      id: 5,
      name: 'RYOMEN SUKUNA',
      nameJp: '両面宿儺',
      grade: 'SPECIAL GRADE CURSE',
      affiliation: 'King of Curses',
      technique: 'Malevolent Shrine / Dismantle & Cleave',
      description: 'The undisputed King of Curses from over 1000 years ago. Even sealed within Itadori, his fragments of power are catastrophic. His true form had four arms and two faces.',
      stats: { power: 100, speed: 95, technique: 100, intelligence: 100, cursedEnergy: 100 },
      color: '#dc2626',
      icon: '宿',
    },
    {
      id: 6,
      name: 'KENTO NANAMI',
      nameJp: '七海建人',
      grade: 'GRADE 1',
      affiliation: 'Tokyo Jujutsu High',
      technique: 'Ratio Technique',
      description: 'A former salaryman turned jujutsu sorcerer. His precise and methodical fighting style, combined with his Ratio Technique, makes him a deadly opponent.',
      stats: { power: 85, speed: 80, technique: 90, intelligence: 90, cursedEnergy: 80 },
      color: '#f97316',
      icon: '七',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      padding: '40px',
    }}>
      <style>{`
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.2); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.4); }
        }

        @keyframes statFill {
          from { width: 0; }
          to { width: var(--fill-width); }
        }

        .character-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .character-card:hover {
          transform: translateY(-10px) scale(1.02);
          z-index: 10;
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '50px', textAlign: 'center' }}
      >
        <span style={{
          fontFamily: 'Orbitron',
          fontSize: '12px',
          color: 'rgba(147, 51, 234, 0.7)',
          letterSpacing: '6px',
        }}>DATABASE</span>
        <h1 style={{
          fontFamily: 'Bebas Neue',
          fontSize: '64px',
          color: '#fff',
          letterSpacing: '10px',
          margin: '10px 0',
          textShadow: '0 0 40px rgba(147, 51, 234, 0.5)',
        }}>JUJUTSU SORCERERS</h1>
        <p style={{
          fontFamily: 'Noto Sans JP',
          fontSize: '16px',
          color: 'rgba(147, 51, 234, 0.6)',
        }}>呪術師データベース</p>
      </motion.div>

      {/* Character Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {characters.map((char, i) => (
          <motion.div
            key={char.id}
            className="character-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 50 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedCharacter(char)}
            style={{
              background: `linear-gradient(135deg, rgba(${char.color === '#9333ea' ? '147, 51, 234' : char.color === '#3b82f6' ? '59, 130, 246' : char.color === '#ef4444' ? '239, 68, 68' : char.color === '#f59e0b' ? '245, 158, 11' : char.color === '#dc2626' ? '220, 38, 38' : '249, 115, 22'}, 0.1) 0%, rgba(10, 10, 15, 0.95) 100%)`,
              border: `1px solid ${char.color}40`,
              padding: '30px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Icon */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-10px',
              fontFamily: 'Noto Sans JP',
              fontSize: '150px',
              color: `${char.color}10`,
              fontWeight: 900,
              pointerEvents: 'none',
            }}>{char.icon}</div>

            {/* Grade Badge */}
            <div style={{
              display: 'inline-block',
              padding: '5px 15px',
              background: `${char.color}20`,
              border: `1px solid ${char.color}60`,
              marginBottom: '15px',
            }}>
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: '10px',
                color: char.color,
                letterSpacing: '2px',
              }}>{char.grade}</span>
            </div>

            {/* Name */}
            <h2 style={{
              fontFamily: 'Bebas Neue',
              fontSize: '32px',
              color: '#fff',
              letterSpacing: '4px',
              margin: '0 0 5px 0',
            }}>{char.name}</h2>
            <p style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '14px',
              color: char.color,
              marginBottom: '15px',
            }}>{char.nameJp}</p>

            {/* Affiliation */}
            <p style={{
              fontFamily: 'Space Mono',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '20px',
            }}>{char.affiliation}</p>

            {/* Technique */}
            <div style={{
              padding: '15px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(147, 51, 234, 0.2)',
              marginBottom: '20px',
            }}>
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: '9px',
                color: 'rgba(147, 51, 234, 0.7)',
                letterSpacing: '2px',
              }}>CURSED TECHNIQUE</span>
              <p style={{
                fontFamily: 'Space Mono',
                fontSize: '13px',
                color: '#fff',
                marginTop: '5px',
              }}>{char.technique}</p>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', gap: '15px' }}>
              {['power', 'speed', 'technique'].map(stat => (
                <div key={stat} style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Orbitron',
                    fontSize: '8px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '1px',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                  }}>{stat}</div>
                  <div style={{
                    height: '3px',
                    background: 'rgba(147, 51, 234, 0.2)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${char.stats[stat]}%`,
                      background: char.color,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Click indicator */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              fontFamily: 'Orbitron',
              fontSize: '8px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '2px',
            }}>CLICK FOR DETAILS</div>
          </motion.div>
        ))}
      </div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCharacter(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '40px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0a0a0f',
                border: `2px solid ${selectedCharacter.color}`,
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCharacter(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: `1px solid ${selectedCharacter.color}`,
                  width: '40px',
                  height: '40px',
                  color: selectedCharacter.color,
                  fontSize: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Orbitron',
                }}
              >X</button>

              {/* Header */}
              <div style={{
                padding: '40px',
                borderBottom: `1px solid ${selectedCharacter.color}30`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-30px',
                  fontFamily: 'Noto Sans JP',
                  fontSize: '250px',
                  color: `${selectedCharacter.color}08`,
                  fontWeight: 900,
                }}>{selectedCharacter.icon}</div>

                <span style={{
                  fontFamily: 'Orbitron',
                  fontSize: '12px',
                  color: selectedCharacter.color,
                  letterSpacing: '4px',
                }}>{selectedCharacter.grade}</span>
                <h1 style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '56px',
                  color: '#fff',
                  letterSpacing: '8px',
                  margin: '10px 0 5px 0',
                }}>{selectedCharacter.name}</h1>
                <p style={{
                  fontFamily: 'Noto Sans JP',
                  fontSize: '24px',
                  color: selectedCharacter.color,
                }}>{selectedCharacter.nameJp}</p>
              </div>

              {/* Content */}
              <div style={{ padding: '40px' }}>
                {/* Description */}
                <p style={{
                  fontFamily: 'Space Mono',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.8,
                  marginBottom: '40px',
                }}>{selectedCharacter.description}</p>

                {/* Technique */}
                <div style={{
                  padding: '25px',
                  background: `${selectedCharacter.color}10`,
                  border: `1px solid ${selectedCharacter.color}40`,
                  marginBottom: '40px',
                }}>
                  <span style={{
                    fontFamily: 'Orbitron',
                    fontSize: '10px',
                    color: selectedCharacter.color,
                    letterSpacing: '3px',
                  }}>CURSED TECHNIQUE</span>
                  <h3 style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '28px',
                    color: '#fff',
                    letterSpacing: '4px',
                    marginTop: '10px',
                  }}>{selectedCharacter.technique}</h3>
                </div>

                {/* Full Stats */}
                <h4 style={{
                  fontFamily: 'Orbitron',
                  fontSize: '12px',
                  color: 'rgba(147, 51, 234, 0.7)',
                  letterSpacing: '4px',
                  marginBottom: '20px',
                }}>COMBAT STATISTICS</h4>
                {Object.entries(selectedCharacter.stats).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '15px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}>
                      <span style={{
                        fontFamily: 'Orbitron',
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                      }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '18px',
                        color: selectedCharacter.color,
                      }}>{value}</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(147, 51, 234, 0.1)',
                      position: 'relative',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          background: `linear-gradient(90deg, ${selectedCharacter.color}, ${selectedCharacter.color}80)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
