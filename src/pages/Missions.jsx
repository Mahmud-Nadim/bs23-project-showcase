import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Missions() {
  const [loaded, setLoaded] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [completedMissions, setCompletedMissions] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const missions = [
    {
      id: 1,
      grade: 'GRADE 4',
      gradeColor: '#22c55e',
      title: 'URBAN SPIRIT CLEANSING',
      location: 'SHIBUYA DISTRICT',
      locationJp: '渋谷区',
      threat: 'LOW',
      cursedSpirits: 3,
      reward: '50,000',
      description: 'Exorcise minor cursed spirits reported in underground passages. These are weak spirits born from the negative emotions of stressed commuters.',
      requirements: ['Grade 4+ Sorcerer', 'Basic Exorcism Skills'],
    },
    {
      id: 2,
      grade: 'GRADE 3',
      gradeColor: '#84cc16',
      title: 'HAUNTED SCHOOL INVESTIGATION',
      location: 'NERIMA WARD',
      locationJp: '練馬区',
      threat: 'LOW-MED',
      cursedSpirits: 5,
      reward: '80,000',
      description: 'Investigate reports of cursed activity at an abandoned elementary school. Multiple low-grade spirits suspected.',
      requirements: ['Grade 3+ Sorcerer', 'Investigation Experience'],
    },
    {
      id: 3,
      grade: 'GRADE 2',
      gradeColor: '#f59e0b',
      title: 'CURSED WOMB INVESTIGATION',
      location: 'KINOKAWA DETENTION CENTER',
      locationJp: '木野川拘置所',
      threat: 'MEDIUM',
      cursedSpirits: 1,
      reward: '200,000',
      description: 'Investigate and potentially exorcise an evolving cursed womb. High probability of special grade birth if left unchecked.',
      requirements: ['Grade 2+ Sorcerer', 'Combat Experience', 'Backup Available'],
    },
    {
      id: 4,
      grade: 'GRADE 1',
      gradeColor: '#ef4444',
      title: 'SPECIAL GRADE SUPPRESSION',
      location: 'CLASSIFIED',
      locationJp: '機密',
      threat: 'EXTREME',
      cursedSpirits: '?',
      reward: 'CLASSIFIED',
      description: 'Details classified. Special Grade sorcerer backup required. Extreme danger level.',
      requirements: ['Grade 1+ Sorcerer', 'Special Grade Backup', 'Full Combat Readiness'],
    },
    {
      id: 5,
      grade: 'GRADE 2',
      gradeColor: '#f59e0b',
      title: 'BRIDGE CURSE ELIMINATION',
      location: 'SUMIDA RIVER',
      locationJp: '隅田川',
      threat: 'MEDIUM',
      cursedSpirits: 2,
      reward: '180,000',
      description: 'Two semi-grade 1 curses have been reported haunting an old bridge. Multiple civilian disappearances linked to this location.',
      requirements: ['Grade 2+ Sorcerer', 'Water Combat Skills'],
    },
  ];

  const handleAcceptMission = (mission) => {
    if (!acceptedMissions.includes(mission.id)) {
      setAcceptedMissions([...acceptedMissions, mission.id]);
    }
  };

  const handleCompleteMission = (missionId) => {
    setAcceptedMissions(acceptedMissions.filter(id => id !== missionId));
    setCompletedMissions([...completedMissions, missionId]);
    setSelectedMission(null);
  };

  const getMissionStatus = (missionId) => {
    if (completedMissions.includes(missionId)) return 'completed';
    if (acceptedMissions.includes(missionId)) return 'accepted';
    return 'available';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(147, 51, 234, 0.3); }
          50% { border-color: rgba(147, 51, 234, 0.6); }
        }

        @keyframes blinkDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes threatPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(239, 68, 68, 0); }
          50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
        }

        .mission-card {
          transition: all 0.3s ease;
        }

        .mission-card:hover {
          transform: translateX(10px);
          border-color: rgba(147, 51, 234, 0.8) !important;
        }
      `}</style>

      {/* Left sidebar - Stats */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -30 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '300px',
          borderRight: '1px solid rgba(147, 51, 234, 0.2)',
          padding: '40px 30px',
          background: 'linear-gradient(180deg, rgba(147, 51, 234, 0.05) 0%, transparent 100%)',
        }}
      >
        {/* Profile section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(99, 102, 241, 0.3))',
            borderRadius: '50%',
            border: '2px solid #9333ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'Noto Sans JP',
              fontSize: '36px',
              color: '#9333ea',
            }}>術</span>
          </div>
          <h3 style={{
            fontFamily: 'Bebas Neue',
            fontSize: '24px',
            color: '#fff',
            letterSpacing: '3px',
            margin: '0 0 5px 0',
          }}>SORCERER</h3>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: '10px',
            color: '#9333ea',
            letterSpacing: '3px',
          }}>GRADE 2</span>
        </div>

        {/* Mission count */}
        <div style={{
          background: 'rgba(147, 51, 234, 0.1)',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          padding: '20px',
          marginBottom: '30px',
          animation: 'borderPulse 3s ease-in-out infinite',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'Orbitron',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '2px',
            }}>MISSIONS COMPLETE</span>
            <span style={{
              fontFamily: 'Bebas Neue',
              fontSize: '36px',
              color: '#9333ea',
            }}>{completedMissions.length}</span>
          </div>
        </div>

        {/* Active missions */}
        <h4 style={{
          fontFamily: 'Orbitron',
          fontSize: '10px',
          color: 'rgba(147, 51, 234, 0.7)',
          letterSpacing: '3px',
          marginBottom: '15px',
        }}>ACTIVE MISSIONS ({acceptedMissions.length})</h4>

        {acceptedMissions.length === 0 ? (
          <p style={{
            fontFamily: 'Space Mono',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
          }}>No active missions</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {acceptedMissions.map(id => {
              const mission = missions.find(m => m.id === id);
              return (
                <div key={id} style={{
                  padding: '12px',
                  background: `${mission.gradeColor}10`,
                  border: `1px solid ${mission.gradeColor}40`,
                  cursor: 'pointer',
                }} onClick={() => setSelectedMission(mission)}>
                  <span style={{
                    fontFamily: 'Space Mono',
                    fontSize: '10px',
                    color: mission.gradeColor,
                  }}>{mission.grade}</span>
                  <p style={{
                    fontFamily: 'Orbitron',
                    fontSize: '10px',
                    color: '#fff',
                    margin: '5px 0 0 0',
                    letterSpacing: '1px',
                  }}>{mission.title}</p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Main content - Missions */}
      <div style={{
        flex: 1,
        padding: '40px 50px',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '10px',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              background: '#22c55e',
              borderRadius: '50%',
              animation: 'blinkDot 1s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Orbitron',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '4px',
            }}>MISSION CONTROL ACTIVE</span>
          </div>
          <h1 style={{
            fontFamily: 'Bebas Neue',
            fontSize: '56px',
            color: '#fff',
            letterSpacing: '8px',
            margin: 0,
          }}>AVAILABLE MISSIONS</h1>
          <p style={{
            fontFamily: 'Noto Sans JP',
            fontSize: '14px',
            color: 'rgba(147, 51, 234, 0.7)',
            marginTop: '5px',
          }}>任務一覧</p>
        </motion.div>

        {/* Mission cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {missions.map((mission, i) => {
            const status = getMissionStatus(mission.id);
            return (
              <motion.div
                key={mission.id}
                className="mission-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 50 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                onClick={() => setSelectedMission(mission)}
                style={{
                  background: status === 'completed'
                    ? 'rgba(34, 197, 94, 0.1)'
                    : status === 'accepted'
                    ? 'rgba(147, 51, 234, 0.15)'
                    : 'rgba(147, 51, 234, 0.05)',
                  border: `1px solid ${status === 'completed' ? '#22c55e40' : status === 'accepted' ? '#9333ea60' : 'rgba(147, 51, 234, 0.2)'}`,
                  padding: '25px 30px',
                  cursor: 'pointer',
                  opacity: status === 'completed' ? 0.6 : 1,
                  animation: mission.grade === 'GRADE 1' && status === 'available' ? 'threatPulse 2s ease-in-out infinite' : 'none',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ flex: 1 }}>
                    {/* Status badge */}
                    {status !== 'available' && (
                      <span style={{
                        fontFamily: 'Orbitron',
                        fontSize: '9px',
                        color: status === 'completed' ? '#22c55e' : '#9333ea',
                        letterSpacing: '2px',
                        padding: '4px 10px',
                        background: status === 'completed' ? '#22c55e20' : '#9333ea20',
                        marginRight: '10px',
                      }}>{status.toUpperCase()}</span>
                    )}

                    {/* Grade badge */}
                    <span style={{
                      fontFamily: 'Orbitron',
                      fontSize: '10px',
                      color: mission.gradeColor,
                      letterSpacing: '3px',
                      padding: '5px 12px',
                      border: `1px solid ${mission.gradeColor}`,
                      background: `${mission.gradeColor}15`,
                    }}>{mission.grade}</span>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '28px',
                      color: '#fff',
                      letterSpacing: '4px',
                      margin: '15px 0 5px 0',
                      textDecoration: status === 'completed' ? 'line-through' : 'none',
                    }}>{mission.title}</h3>

                    {/* Location */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <span style={{
                        fontFamily: 'Space Mono',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                      }}>{mission.location}</span>
                      <span style={{
                        fontFamily: 'Noto Sans JP',
                        fontSize: '12px',
                        color: 'rgba(147, 51, 234, 0.6)',
                      }}>{mission.locationJp}</span>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontFamily: 'Space Mono',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '15px',
                      lineHeight: 1.6,
                    }}>{mission.description}</p>
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginLeft: '40px',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '8px',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '2px',
                        marginBottom: '5px',
                      }}>THREAT</div>
                      <div style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '18px',
                        color: mission.gradeColor,
                      }}>{mission.threat}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '8px',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '2px',
                        marginBottom: '5px',
                      }}>SPIRITS</div>
                      <div style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '18px',
                        color: '#fff',
                      }}>{mission.cursedSpirits}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'Orbitron',
                        fontSize: '8px',
                        color: 'rgba(255,255,255,0.4)',
                        letterSpacing: '2px',
                        marginBottom: '5px',
                      }}>REWARD</div>
                      <div style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '18px',
                        color: '#22c55e',
                      }}>{mission.reward}¥</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mission Detail Modal */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMission(null)}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0a0a0f',
                border: `2px solid ${selectedMission.gradeColor}`,
                maxWidth: '600px',
                width: '100%',
                padding: '40px',
              }}
            >
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: '12px',
                color: selectedMission.gradeColor,
                letterSpacing: '4px',
              }}>{selectedMission.grade} MISSION</span>

              <h2 style={{
                fontFamily: 'Bebas Neue',
                fontSize: '42px',
                color: '#fff',
                letterSpacing: '6px',
                margin: '15px 0',
              }}>{selectedMission.title}</h2>

              <p style={{
                fontFamily: 'Space Mono',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                marginBottom: '30px',
              }}>{selectedMission.description}</p>

              {/* Requirements */}
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{
                  fontFamily: 'Orbitron',
                  fontSize: '10px',
                  color: 'rgba(147, 51, 234, 0.7)',
                  letterSpacing: '3px',
                  marginBottom: '15px',
                }}>REQUIREMENTS</h4>
                {selectedMission.requirements.map((req, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '8px',
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: selectedMission.gradeColor,
                    }} />
                    <span style={{
                      fontFamily: 'Space Mono',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.6)',
                    }}>{req}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '15px' }}>
                {getMissionStatus(selectedMission.id) === 'available' && (
                  <button
                    onClick={() => handleAcceptMission(selectedMission)}
                    style={{
                      flex: 1,
                      background: selectedMission.gradeColor,
                      border: 'none',
                      padding: '18px',
                      color: '#000',
                      fontFamily: 'Orbitron',
                      fontSize: '14px',
                      letterSpacing: '4px',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    ACCEPT MISSION
                  </button>
                )}
                {getMissionStatus(selectedMission.id) === 'accepted' && (
                  <button
                    onClick={() => handleCompleteMission(selectedMission.id)}
                    style={{
                      flex: 1,
                      background: '#22c55e',
                      border: 'none',
                      padding: '18px',
                      color: '#000',
                      fontFamily: 'Orbitron',
                      fontSize: '14px',
                      letterSpacing: '4px',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    COMPLETE MISSION
                  </button>
                )}
                <button
                  onClick={() => setSelectedMission(null)}
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
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
