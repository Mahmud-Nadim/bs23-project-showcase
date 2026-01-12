import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function StudentID() {
  const [loaded, setLoaded] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [studentData, setStudentData] = useState({
    name: 'YUJI ITADORI',
    nameJp: '虎杖悠仁',
    grade: 'SPECIAL GRADE',
    year: '1ST YEAR',
    id: 'JJK-2018-0721',
    technique: 'DIVERGENT FIST',
  });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const grades = ['GRADE 4', 'GRADE 3', 'GRADE 2', 'GRADE 1', 'SPECIAL GRADE'];
  const years = ['1ST YEAR', '2ND YEAR', '3RD YEAR', 'TEACHER'];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1025 50%, #0a0a0f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes hologram {
          0%, 100% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(30deg);
          }
        }

        @keyframes scanlineMove {
          0% { top: -100%; }
          100% { top: 200%; }
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
          50% { transform: translateY(-15px) rotateX(5deg) rotateY(-5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes borderFlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .card-container {
          perspective: 1000px;
        }

        .card-flip {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .card-flip.flipped {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .edit-input {
          background: rgba(147, 51, 234, 0.1);
          border: 1px solid rgba(147, 51, 234, 0.5);
          padding: 8px 12px;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          outline: none;
          width: 100%;
        }

        .edit-input:focus {
          border-color: #9333ea;
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.3);
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content wrapper */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -30 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '12px',
            color: 'rgba(147, 51, 234, 0.7)',
            letterSpacing: '6px',
          }}>OFFICIAL DOCUMENT</span>
          <h1 style={{
            fontFamily: 'Bebas Neue',
            fontSize: '48px',
            color: '#fff',
            letterSpacing: '10px',
            margin: '10px 0 0 0',
          }}>STUDENT ID CARD</h1>
          <p style={{
            fontFamily: 'Noto Sans JP',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '5px',
          }}>学生証明書</p>
        </motion.div>

        {/* ID Card */}
        <motion.div
          className="card-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => !editMode && setFlipped(!flipped)}
          style={{
            width: '500px',
            height: '320px',
            cursor: editMode ? 'default' : 'pointer',
            animation: loaded && !flipped && !editMode ? 'cardFloat 4s ease-in-out infinite' : 'none',
          }}
        >
          <div className={`card-flip ${flipped ? 'flipped' : ''}`} style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
            {/* Front of card */}
            <div className="card-front" style={{
              background: 'linear-gradient(135deg, #1a1025 0%, #0d0b14 50%, #1a1025 100%)',
              border: '2px solid #9333ea',
              padding: '30px',
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3), inset 0 0 60px rgba(147, 51, 234, 0.05)',
              overflow: 'hidden',
            }}>
              {/* Holographic overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'hologram 3s ease-in-out infinite',
                pointerEvents: 'none',
              }} />

              {/* Scanline */}
              <div style={{
                position: 'absolute',
                top: '-100%',
                left: 0,
                right: 0,
                height: '50px',
                background: 'linear-gradient(180deg, transparent, rgba(147, 51, 234, 0.1), transparent)',
                animation: 'scanlineMove 4s linear infinite',
                pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '25px',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Noto Sans JP',
                    fontSize: '14px',
                    color: 'rgba(147, 51, 234, 0.8)',
                    fontWeight: 900,
                  }}>東京都立呪術高等専門学校</div>
                  <div style={{
                    fontFamily: 'Orbitron',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '2px',
                    marginTop: '3px',
                  }}>TOKYO JUJUTSU HIGH</div>
                </div>
                <div style={{
                  width: '45px',
                  height: '45px',
                  border: '2px solid #9333ea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: '#9333ea', fontFamily: 'Noto Sans JP', fontSize: '20px' }}>呪</span>
                </div>
              </div>

              {/* Main content */}
              <div style={{ display: 'flex', gap: '25px' }}>
                {/* Photo placeholder */}
                <div style={{
                  width: '110px',
                  height: '145px',
                  background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2))',
                  border: '1px solid rgba(147, 51, 234, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    background: 'rgba(147, 51, 234, 0.3)',
                    marginBottom: '20px',
                  }} />
                  <div style={{
                    fontFamily: 'Orbitron',
                    fontSize: '9px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '1px',
                  }}>PHOTO</div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{
                      fontFamily: 'Orbitron',
                      fontSize: '9px',
                      color: 'rgba(147, 51, 234, 0.7)',
                      letterSpacing: '2px',
                    }}>NAME / 氏名</div>
                    {editMode ? (
                      <input
                        className="edit-input"
                        value={studentData.name}
                        onChange={(e) => setStudentData({ ...studentData, name: e.target.value.toUpperCase() })}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <div style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '28px',
                        color: '#fff',
                        letterSpacing: '3px',
                      }}>{studentData.name}</div>
                    )}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '9px',
                        color: 'rgba(147, 51, 234, 0.7)',
                        letterSpacing: '2px',
                      }}>GRADE / 等級</div>
                      {editMode ? (
                        <select
                          value={studentData.grade}
                          onChange={(e) => setStudentData({ ...studentData, grade: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            background: 'rgba(147, 51, 234, 0.1)',
                            border: '1px solid rgba(147, 51, 234, 0.5)',
                            padding: '8px',
                            color: '#9333ea',
                            fontFamily: 'Bebas Neue',
                            fontSize: '16px',
                            width: '100%',
                            outline: 'none',
                          }}
                        >
                          {grades.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      ) : (
                        <div style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '18px',
                          color: '#9333ea',
                          letterSpacing: '2px',
                        }}>{studentData.grade}</div>
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '9px',
                        color: 'rgba(147, 51, 234, 0.7)',
                        letterSpacing: '2px',
                      }}>YEAR / 学年</div>
                      {editMode ? (
                        <select
                          value={studentData.year}
                          onChange={(e) => setStudentData({ ...studentData, year: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            background: 'rgba(147, 51, 234, 0.1)',
                            border: '1px solid rgba(147, 51, 234, 0.5)',
                            padding: '8px',
                            color: '#fff',
                            fontFamily: 'Bebas Neue',
                            fontSize: '16px',
                            width: '100%',
                            outline: 'none',
                          }}
                        >
                          {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      ) : (
                        <div style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '18px',
                          color: '#fff',
                          letterSpacing: '2px',
                        }}>{studentData.year}</div>
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '9px',
                        color: 'rgba(147, 51, 234, 0.7)',
                        letterSpacing: '2px',
                      }}>ID NUMBER</div>
                      <div style={{
                        fontFamily: 'Space Mono',
                        fontSize: '13px',
                        color: '#fff',
                      }}>{studentData.id}</div>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '9px',
                        color: 'rgba(147, 51, 234, 0.7)',
                        letterSpacing: '2px',
                      }}>TECHNIQUE</div>
                      {editMode ? (
                        <input
                          className="edit-input"
                          value={studentData.technique}
                          onChange={(e) => setStudentData({ ...studentData, technique: e.target.value.toUpperCase() })}
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontSize: '12px', padding: '6px 10px' }}
                        />
                      ) : (
                        <div style={{
                          fontFamily: 'Space Mono',
                          fontSize: '11px',
                          color: '#fff',
                        }}>{studentData.technique}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stripe */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #9333ea, #6366f1, #3b82f6, #6366f1, #9333ea)',
                backgroundSize: '200% 100%',
                animation: 'borderFlow 3s linear infinite',
              }} />
            </div>

            {/* Back of card */}
            <div className="card-back" style={{
              background: 'linear-gradient(135deg, #1a1025 0%, #0d0b14 50%, #1a1025 100%)',
              border: '2px solid rgba(147, 51, 234, 0.5)',
              padding: '25px',
              boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
            }}>
              {/* Barcode area */}
              <div style={{
                background: '#fff',
                padding: '15px 20px',
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  height: '50px',
                }}>
                  {[...Array(50)].map((_, i) => (
                    <div key={i} style={{
                      width: Math.random() > 0.5 ? '3px' : '1px',
                      height: '100%',
                      background: '#000',
                    }} />
                  ))}
                </div>
                <div style={{
                  fontFamily: 'Space Mono',
                  fontSize: '12px',
                  color: '#000',
                  textAlign: 'center',
                  marginTop: '10px',
                }}>*{studentData.id}-{studentData.grade.split(' ')[1] || 'SP'}*</div>
              </div>

              {/* QR-like pattern and text */}
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: 'repeating-conic-gradient(#9333ea 0% 25%, transparent 0% 50%) 50% / 10px 10px',
                  opacity: 0.5,
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: 'Space Mono',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    This card certifies the bearer as an official student of Tokyo Jujutsu High.
                    Unauthorized possession is a Grade 1 offense under Jujutsu regulations.
                    Report any suspicious activity to the nearest Jujutsu sorcerer.
                  </p>
                </div>
              </div>

              {/* Seal */}
              <div style={{
                position: 'absolute',
                bottom: '25px',
                right: '25px',
                width: '65px',
                height: '65px',
                border: '2px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'Noto Sans JP',
                  fontSize: '24px',
                  color: 'rgba(239, 68, 68, 0.7)',
                }}>認</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '20px' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(!editMode);
              if (flipped) setFlipped(false);
            }}
            style={{
              background: editMode ? '#9333ea' : 'transparent',
              border: '1px solid #9333ea',
              padding: '15px 40px',
              color: '#fff',
              fontFamily: 'Orbitron',
              fontSize: '12px',
              letterSpacing: '3px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {editMode ? 'SAVE CARD' : 'CUSTOMIZE'}
          </button>
        </motion.div>

        {/* Click instruction */}
        <p style={{
          fontFamily: 'Orbitron',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '4px',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          {editMode ? 'EDIT YOUR DETAILS ABOVE' : 'CLICK CARD TO FLIP'}
        </p>
      </div>
    </div>
  );
}
