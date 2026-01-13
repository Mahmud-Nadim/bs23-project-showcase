import React, { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Office locations with coordinates
const offices = [
  {
    id: 'BD',
    name: 'Bangladesh',
    city: 'Dhaka',
    flag: '🇧🇩',
    coordinates: [90.4125, 23.8103],
    color: '#00d4ff',
    employees: '700+',
    established: '2006',
    description: 'Global Headquarters',
    countryCode: 'BGD',
  },
  {
    id: 'DE',
    name: 'Germany',
    city: 'Munich',
    flag: '🇩🇪',
    coordinates: [11.5820, 48.1351],
    color: '#00ff88',
    employees: '50+',
    established: '2018',
    description: 'European Operations',
    countryCode: 'DEU',
  },
  {
    id: 'MY',
    name: 'Malaysia',
    city: 'Kuala Lumpur',
    flag: '🇲🇾',
    coordinates: [101.6869, 3.1390],
    color: '#9333ea',
    employees: '30+',
    established: '2019',
    description: 'APAC Hub',
    countryCode: 'MYS',
  },
  {
    id: 'US',
    name: 'USA',
    city: 'New York',
    flag: '🇺🇸',
    coordinates: [-74.0060, 40.7128],
    color: '#ffd700',
    employees: '25+',
    established: '2020',
    description: 'North America Office',
    countryCode: 'USA',
  },
  {
    id: 'AE',
    name: 'UAE',
    city: 'Dubai',
    flag: '🇦🇪',
    coordinates: [55.2708, 25.2048],
    color: '#ff6b35',
    employees: '20+',
    established: '2021',
    description: 'Middle East Operations',
    countryCode: 'ARE',
  },
  {
    id: 'JP',
    name: 'Japan',
    city: 'Tokyo',
    flag: '🇯🇵',
    coordinates: [139.6917, 35.6895],
    color: '#ff4444',
    employees: '15+',
    established: '2022',
    description: 'East Asia Office',
    countryCode: 'JPN',
  },
];

// Memoized Geography component
const MemoizedGeography = memo(({ geo, isHighlighted, highlightColor, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Geography
      geography={geo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        default: {
          fill: isHighlighted ? highlightColor : 'var(--map-land-fill, #1a1a2e)',
          stroke: 'var(--map-land-stroke, #2a2a4a)',
          strokeWidth: 0.5,
          outline: 'none',
          transition: 'all 0.3s ease',
        },
        hover: {
          fill: isHighlighted ? highlightColor : 'var(--map-land-hover, #2a2a4a)',
          stroke: 'var(--map-land-stroke-hover, #3a3a5a)',
          strokeWidth: 0.75,
          outline: 'none',
          cursor: 'pointer',
        },
        pressed: {
          fill: highlightColor || '#00d4ff',
          stroke: 'var(--map-land-stroke-pressed, #4a4a6a)',
          strokeWidth: 1,
          outline: 'none',
        },
      }}
    />
  );
});

// Animated Marker Component
function AnimatedMarker({ office, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Marker coordinates={office.coordinates}>
      <motion.g
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(office)}
        style={{ cursor: 'pointer' }}
      >
        {/* Pulse rings */}
        {(isSelected || isHovered) && (
          <>
            <motion.circle
              r={20}
              fill="none"
              stroke={office.color}
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              r={15}
              fill="none"
              stroke={office.color}
              strokeWidth={1.5}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}

        {/* Glow effect */}
        <motion.circle
          r={isSelected ? 12 : isHovered ? 10 : 8}
          fill={office.color}
          opacity={0.3}
          animate={{
            r: isSelected ? [12, 15, 12] : isHovered ? [10, 12, 10] : 8,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            filter: `drop-shadow(0 0 10px ${office.color})`,
          }}
        />

        {/* Main pin */}
        <motion.circle
          r={isSelected ? 8 : isHovered ? 7 : 5}
          fill={office.color}
          stroke="#fff"
          strokeWidth={2}
          animate={{
            scale: isSelected ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
          style={{
            filter: `drop-shadow(0 0 5px ${office.color})`,
          }}
        />

        {/* Inner dot */}
        <circle
          r={2}
          fill="#fff"
        />
      </motion.g>
    </Marker>
  );
}

// Office Info Card
function OfficeInfoCard({ office, onClose }) {
  if (!office) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--modal-bg)',
        border: `2px solid ${office.color}50`,
        padding: '25px 35px',
        minWidth: '350px',
        maxWidth: '450px',
        boxShadow: `var(--modal-shadow), 0 0 40px ${office.color}20`,
        zIndex: 100,
      }}
    >
      {/* Animated border glow */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(from 0deg, transparent, ${office.color}20, transparent, ${office.color}10, transparent)`,
          pointerEvents: 'none',
        }}
      />

      {/* Close button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '30px',
          height: '30px',
          background: 'transparent',
          border: `1px solid ${office.color}50`,
          color: office.color,
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </motion.button>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '40px' }}
          >
            {office.flag}
          </motion.span>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: office.color,
              marginBottom: '5px',
              textShadow: `0 0 20px ${office.color}50`,
            }}>
              {office.name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
            }}>
              {office.city} • {office.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
        }}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: '15px',
              background: `${office.color}10`,
              border: `1px solid ${office.color}30`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: office.color,
            }}>
              {office.employees}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
            }}>
              EMPLOYEES
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: '15px',
              background: `${office.color}10`,
              border: `1px solid ${office.color}30`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: office.color,
            }}>
              {office.established}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '1px',
            }}>
              ESTABLISHED
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Main World Map Component
export default function WorldMap() {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [highlightedCountry, setHighlightedCountry] = useState(null);

  const handleOfficeClick = (office) => {
    setSelectedOffice(office);
    setHighlightedCountry(office.countryCode);
  };

  const handleClose = () => {
    setSelectedOffice(null);
    setHighlightedCountry(null);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'var(--map-container-bg)',
          border: '1px solid var(--border-hover)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Decorative corners */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50px',
          height: '50px',
          borderTop: '2px solid #00d4ff',
          borderLeft: '2px solid #00d4ff',
          zIndex: 10,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50px',
          height: '50px',
          borderBottom: '2px solid #00ff88',
          borderRight: '2px solid #00ff88',
          zIndex: 10,
        }} />

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 140,
            center: [50, 30],
          }}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isHighlighted = geo.properties.ISO_A3 === highlightedCountry;
                  const office = offices.find(o => o.countryCode === geo.properties.ISO_A3);
                  const highlightColor = office?.color || '#00d4ff';

                  return (
                    <MemoizedGeography
                      key={geo.rsmKey}
                      geo={geo}
                      isHighlighted={isHighlighted}
                      highlightColor={highlightColor}
                      onClick={() => {
                        if (office) handleOfficeClick(office);
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Office Markers */}
            {offices.map((office) => (
              <AnimatedMarker
                key={office.id}
                office={office}
                isSelected={selectedOffice?.id === office.id}
                onClick={handleOfficeClick}
              />
            ))}

            {/* Connection lines from HQ to other offices */}
            {selectedOffice && selectedOffice.id === 'BD' && offices.filter(o => o.id !== 'BD').map((office) => (
              <motion.line
                key={`line-${office.id}`}
                x1={offices[0].coordinates[0]}
                y1={offices[0].coordinates[1]}
                x2={office.coordinates[0]}
                y2={office.coordinates[1]}
                stroke={office.color}
                strokeWidth={1}
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10,
        }}>
          {offices.map((office, i) => (
            <motion.button
              key={office.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: -5, scale: 1.05 }}
              onClick={() => handleOfficeClick(office)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 15px',
                background: selectedOffice?.id === office.id
                  ? `${office.color}20`
                  : 'rgba(0, 0, 0, 0.5)',
                border: `1px solid ${selectedOffice?.id === office.id ? office.color : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: '16px' }}>{office.flag}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: selectedOffice?.id === office.id ? office.color : 'var(--text-secondary)',
                letterSpacing: '1px',
              }}>
                {office.name}
              </span>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: office.color,
                boxShadow: `0 0 10px ${office.color}`,
              }} />
            </motion.button>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '2px',
            zIndex: 10,
          }}
        >
          CLICK ON PINS OR COUNTRIES TO VIEW DETAILS
        </motion.div>
      </motion.div>

      {/* Office Info Card */}
      <AnimatePresence>
        {selectedOffice && (
          <OfficeInfoCard office={selectedOffice} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}
