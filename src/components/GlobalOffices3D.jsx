import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import './GlobalOffices3D.css';

// Brain Station 23 Office Locations with coordinates
const offices = [
  {
    id: 'dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    address: '8th Floor, 2 Bir Uttam AK Khandakar Road, Mohakhali C/A',
    phone: '+88-01404055226',
    lat: 23.7806,
    lng: 90.4068,
    isHQ: true,
    timezone: 'GMT+6',
    employees: '700+',
    color: '#00ff88',
  },
  {
    id: 'springfield',
    city: 'Springfield',
    country: 'USA',
    address: '7426 Alban Station Blvd, Suite a101, VA 22150',
    phone: '+1-606-773-7443',
    lat: 38.7893,
    lng: -77.1872,
    isHQ: false,
    timezone: 'GMT-5',
    employees: '15+',
    color: '#00d4ff',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    address: '903, 9th Floor, DAMAC XL Tower, Business Bay',
    phone: '+971-42420223',
    lat: 25.1857,
    lng: 55.2744,
    isHQ: false,
    timezone: 'GMT+4',
    employees: '20+',
    color: '#00d4ff',
  },
  {
    id: 'kualalumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    address: 'Level 9, Integra Tower, The Intermark, No. 348',
    phone: '+60-111-1708999',
    lat: 3.1569,
    lng: 101.7123,
    isHQ: false,
    timezone: 'GMT+8',
    employees: '25+',
    color: '#00d4ff',
  },
  {
    id: 'zwischenahn',
    city: 'Bad Zwischenahn',
    country: 'Germany',
    address: 'Rebhuhnweg 4, 26160',
    phone: '+49-440-36999839',
    lat: 53.1833,
    lng: 7.9833,
    isHQ: false,
    timezone: 'GMT+1',
    employees: '10+',
    color: '#00d4ff',
  },
  {
    id: 'zeist',
    city: 'Zeist',
    country: 'Netherlands',
    address: 'Sparrenheuvel 2, 3708 JE',
    phone: '',
    lat: 52.0833,
    lng: 5.2333,
    isHQ: false,
    timezone: 'GMT+1',
    employees: '5+',
    color: '#00d4ff',
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    address: 'Wako Miyamasuzaka Building 5F, 2-19-19 Shibuya',
    phone: '',
    lat: 35.6595,
    lng: 139.7004,
    isHQ: false,
    timezone: 'GMT+9',
    employees: '10+',
    color: '#00d4ff',
  },
];

// Generate arcs from HQ to all other offices
const generateArcs = () => {
  const hq = offices.find(o => o.isHQ);
  return offices
    .filter(o => !o.isHQ)
    .map(office => ({
      startLat: hq.lat,
      startLng: hq.lng,
      endLat: office.lat,
      endLng: office.lng,
      color: ['#00ff88', '#00d4ff'],
    }));
};

// Generate rings for animation
const generateRings = () => {
  return offices.map(office => ({
    lat: office.lat,
    lng: office.lng,
    maxR: office.isHQ ? 5 : 3,
    propagationSpeed: office.isHQ ? 2 : 3,
    repeatPeriod: office.isHQ ? 800 : 1200,
    color: office.isHQ ? '#00ff88' : '#00d4ff',
  }));
};

// Office Card Component
function OfficeCard({ office, isActive }) {
  if (!office) return null;

  return (
    <motion.div
      className={`office-card-3d ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="office-card-header">
        {office.isHQ && <span className="hq-badge">HEADQUARTERS</span>}
        <h3 className="office-card-city">{office.city}</h3>
        <span className="office-card-country">{office.country}</span>
      </div>

      <div className="office-card-body">
        <div className="office-detail">
          <span className="detail-icon">📍</span>
          <span className="detail-text">{office.address}</span>
        </div>

        {office.phone && (
          <div className="office-detail">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{office.phone}</span>
          </div>
        )}

        <div className="office-detail">
          <span className="detail-icon">🕐</span>
          <span className="detail-text">{office.timezone}</span>
        </div>

        <div className="office-detail">
          <span className="detail-icon">👥</span>
          <span className="detail-text">{office.employees} team members</span>
        </div>
      </div>

      <div className="office-card-pulse" style={{ '--pulse-color': office.isHQ ? '#00ff88' : '#00d4ff' }} />
    </motion.div>
  );
}

// Office List Sidebar
function OfficeList({ offices, selectedOffice, onSelectOffice }) {
  return (
    <div className="office-list-3d">
      <div className="office-list-header">
        <span className="office-list-icon">🌐</span>
        <h3>Global Presence</h3>
        <span className="office-count">{offices.length} Offices</span>
      </div>

      <div className="office-list-items">
        {offices.map((office) => (
          <button
            key={office.id}
            className={`office-list-item ${selectedOffice?.id === office.id ? 'active' : ''} ${office.isHQ ? 'hq' : ''}`}
            onClick={() => onSelectOffice(office)}
          >
            <div className="office-item-marker" style={{ '--marker-color': office.isHQ ? '#00ff88' : '#00d4ff' }} />
            <div className="office-item-info">
              <span className="office-item-city">{office.city}</span>
              <span className="office-item-country">{office.country}</span>
            </div>
            {office.isHQ && <span className="office-item-hq">HQ</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Component
export default function GlobalOffices3D() {
  const globeRef = useRef();
  const containerRef = useRef();
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Measure container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({
          width: offsetWidth || 800,
          height: offsetHeight || 600,
        });
      }
    };

    // Initial measurement
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);

    // Small delay to ensure container is rendered
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Point data for office markers
  const pointsData = useMemo(() => offices.map(office => ({
    lat: office.lat,
    lng: office.lng,
    size: office.isHQ ? 0.8 : 0.5,
    color: office.color,
    office: office,
  })), []);

  // Arc data for connections
  const arcsData = useMemo(() => generateArcs(), []);

  // Ring data for animations
  const ringsData = useMemo(() => generateRings(), []);

  // Labels for offices
  const labelsData = useMemo(() => offices.map(office => ({
    lat: office.lat,
    lng: office.lng,
    text: office.city,
    color: office.isHQ ? '#00ff88' : '#ffffff',
    size: office.isHQ ? 1.5 : 1,
    office: office,
  })), []);

  // Initialize globe position
  useEffect(() => {
    if (globeRef.current && globeReady) {
      // Set initial view to show Dhaka (HQ)
      globeRef.current.pointOfView({ lat: 25, lng: 60, altitude: 2.5 }, 1000);

      // Auto-rotate
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 500;
      }
    }
  }, [globeReady]);

  // Handle office selection - focus on that location
  const handleOfficeSelect = useCallback((office) => {
    setSelectedOffice(office);
    if (globeRef.current && office) {
      globeRef.current.pointOfView({ lat: office.lat, lng: office.lng, altitude: 1.8 }, 1000);
    }
  }, []);

  // Handle point click
  const handlePointClick = useCallback((point) => {
    if (point?.office) {
      handleOfficeSelect(point.office);
    }
  }, [handleOfficeSelect]);

  // Handle label click
  const handleLabelClick = useCallback((label) => {
    if (label?.office) {
      handleOfficeSelect(label.office);
    }
  }, [handleOfficeSelect]);

  const activeOffice = selectedOffice;

  return (
    <section className="global-offices-section">
      <div className="global-offices-header">
        <span className="section-eyebrow">WORLDWIDE NETWORK</span>
        <h2 className="section-headline">
          <span className="gradient-word">Global</span> Presence
        </h2>
        <p className="section-subhead">
          Strategically positioned across 7 countries to deliver excellence around the clock.
          From our headquarters in Dhaka to offices spanning 4 continents.
        </p>
      </div>

      <div className="global-offices-content">
        <OfficeList
          offices={offices}
          selectedOffice={activeOffice}
          onSelectOffice={handleOfficeSelect}
        />

        <div className="globe-container" ref={containerRef}>
          {dimensions.width > 0 && dimensions.height > 0 && (
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              onGlobeReady={() => setGlobeReady(true)}

              // Globe appearance - NASA Blue Marble texture
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

              // No background - transparent
              backgroundColor="rgba(0,0,0,0)"

              // Atmosphere disabled for clear view
              showAtmosphere={false}

              // Points (office markers)
              pointsData={pointsData}
              pointAltitude={0.01}
              pointRadius="size"
              pointColor="color"
              pointsMerge={false}
              onPointClick={handlePointClick}

              // Arcs (connections from HQ)
              arcsData={arcsData}
              arcColor="color"
              arcDashLength={0.4}
              arcDashGap={0.2}
              arcDashAnimateTime={2000}
              arcStroke={0.5}
              arcAltitudeAutoScale={0.3}

              // Rings (pulse effect)
              ringsData={ringsData}
              ringColor="color"
              ringMaxRadius="maxR"
              ringPropagationSpeed="propagationSpeed"
              ringRepeatPeriod="repeatPeriod"

              // Labels
              labelsData={labelsData}
              labelLat="lat"
              labelLng="lng"
              labelText="text"
              labelSize="size"
              labelColor="color"
              labelDotRadius={0.4}
              labelAltitude={0.02}
              labelResolution={2}
              onLabelClick={handleLabelClick}

              // Interaction
              enablePointerInteraction={true}
            />
          )}

        </div>

        <AnimatePresence mode="wait">
          {activeOffice && (
            <OfficeCard office={activeOffice} isActive={true} />
          )}
        </AnimatePresence>
      </div>

      <div className="global-offices-footer">
        <p className="footer-note">
          <span className="pulse-dot" /> Real-time collaboration across time zones
        </p>
      </div>
    </section>
  );
}
