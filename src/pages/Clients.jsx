import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Clients() {
  const [activeIndustry, setActiveIndustry] = useState('ALL');
  const [hoveredClient, setHoveredClient] = useState(null);

  const industries = [
    { id: 'ALL', label: 'All Industries', count: 100 },
    { id: 'FINTECH', label: 'Fintech & Banking', count: 20 },
    { id: 'TELECOM', label: 'Telecom', count: 15 },
    { id: 'ECOMMERCE', label: 'E-Commerce', count: 25 },
    { id: 'PHARMA', label: 'Pharma & Healthcare', count: 15 },
    { id: 'ENTERPRISE', label: 'Enterprise', count: 25 },
  ];

  const clients = [
    { name: 'City Bank', industry: 'FINTECH', country: 'BD', logo: '🏦', tier: 'platinum', project: 'CityTouch' },
    { name: 'AB Bank', industry: 'FINTECH', country: 'BD', logo: '🏛️', tier: 'gold', project: 'Internet Banking' },
    { name: 'HSBC', industry: 'FINTECH', country: 'UK', logo: '🌐', tier: 'platinum', project: 'Enterprise Solutions' },
    { name: 'PayPal', industry: 'FINTECH', country: 'US', logo: '💰', tier: 'platinum', project: 'Payment Integration' },
    { name: 'MetLife', industry: 'FINTECH', country: 'US', logo: '🛡️', tier: 'gold', project: 'Insurance Platform' },
    { name: 'Grameenphone', industry: 'TELECOM', country: 'BD', logo: '📱', tier: 'platinum', project: 'MyGP Platform' },
    { name: 'Robi', industry: 'TELECOM', country: 'BD', logo: '📶', tier: 'gold', project: 'Self-care App' },
    { name: 'Banglalink', industry: 'TELECOM', country: 'BD', logo: '📞', tier: 'gold', project: 'MyBL App' },
    { name: 'British Telecom', industry: 'TELECOM', country: 'UK', logo: '🌍', tier: 'platinum', project: 'Enterprise Solutions' },
    { name: 'Telenor', industry: 'TELECOM', country: 'NO', logo: '📡', tier: 'gold', project: 'Digital Services' },
    { name: 'Shwapno', industry: 'ECOMMERCE', country: 'BD', logo: '🛒', tier: 'platinum', project: 'E-commerce Platform' },
    { name: 'Othoba', industry: 'ECOMMERCE', country: 'BD', logo: '🏪', tier: 'platinum', project: 'Marketplace' },
    { name: 'PRAN-RFL', industry: 'ECOMMERCE', country: 'BD', logo: '🏭', tier: 'gold', project: 'Digital Retail' },
    { name: 'Incepta', industry: 'PHARMA', country: 'BD', logo: '💊', tier: 'platinum', project: 'mSFA Solution' },
    { name: 'Cambridge', industry: 'PHARMA', country: 'UK', logo: '❤️', tier: 'platinum', project: 'AI ECG Device' },
    { name: 'BAT Bangladesh', industry: 'ENTERPRISE', country: 'BD', logo: '🏢', tier: 'platinum', project: 'Enterprise Systems' },
    { name: 'Unilever', industry: 'ENTERPRISE', country: 'NL', logo: '🧴', tier: 'platinum', project: 'Digital Platform' },
    { name: 'Nissan', industry: 'ENTERPRISE', country: 'JP', logo: '🚗', tier: 'gold', project: 'Dealer Portal' },
  ];

  const globalPresence = [
    { region: 'Bangladesh', clients: 50, x: 72, y: 45 },
    { region: 'USA', clients: 15, x: 22, y: 38 },
    { region: 'UK', clients: 12, x: 47, y: 32 },
    { region: 'Germany', clients: 8, x: 50, y: 33 },
    { region: 'Japan', clients: 6, x: 85, y: 38 },
    { region: 'UAE', clients: 5, x: 58, y: 45 },
  ];

  const tierColors = { platinum: '#00d4ff', gold: '#ffd700', silver: '#c0c0c0' };
  const filteredClients = activeIndustry === 'ALL' ? clients : clients.filter(c => c.industry === activeIndustry);

  const styles = {
    page: { minHeight: '100vh' },
    header: { padding: '100px 60px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    headerLeft: {},
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '8px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 700, color: 'var(--text-primary)' },
    highlight: { color: 'var(--accent-cyan)' },
    stats: { display: 'flex', gap: '40px' },
    stat: { textAlign: 'center' },
    statValue: { fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--accent-cyan)' },
    statLabel: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px' },
    main: { display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', padding: '0 60px 100px' },
    filters: { display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' },
    filterBtn: (isActive) => ({
      background: isActive ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
      border: `1px solid ${isActive ? 'rgba(0, 212, 255, 0.5)' : 'var(--border-default)'}`,
      padding: '10px 20px', color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
      fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.3s',
    }),
    clientsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
    clientCard: (tierColor, isHovered) => ({
      background: 'var(--bg-card)', border: `1px solid ${isHovered ? tierColor : 'var(--border-default)'}`,
      padding: '20px', cursor: 'pointer', transition: 'all 0.3s',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      boxShadow: isHovered ? `0 10px 40px ${tierColor}20` : 'none',
    }),
    tierDot: (color) => ({ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: color }),
    logo: { fontSize: '32px', marginBottom: '10px' },
    clientName: { fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '5px' },
    clientInfo: { fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '30px' },
    mapPanel: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '30px' },
    mapTitle: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' },
    map: { position: 'relative', height: '200px', background: 'radial-gradient(circle at 50% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)', border: '1px solid rgba(0, 212, 255, 0.1)', borderRadius: '8px', marginBottom: '20px' },
    mapDot: (x, y) => ({ position: 'absolute', left: `${x}%`, top: `${y}%`, width: '12px', height: '12px', background: 'var(--accent-cyan)', borderRadius: '50%', cursor: 'pointer' }),
    regionList: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
    regionItem: { display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0, 0, 0, 0.3)' },
    regionName: { fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-secondary)' },
    regionCount: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)' },
    tiersPanel: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '30px' },
    tierItem: (color) => ({
      display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', padding: '15px',
      background: `linear-gradient(90deg, ${color}10, transparent)`, borderLeft: `3px solid ${color}`,
    }),
    tierBadge: (color) => ({
      width: '40px', height: '40px', background: `${color}20`, border: `1px solid ${color}50`,
      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: color,
    }),
    tierName: { fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' },
    tierDesc: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' },
  };

  const tiers = [
    { tier: 'Platinum', color: '#00d4ff', count: 15, desc: 'Strategic Partners' },
    { tier: 'Gold', color: '#ffd700', count: 35, desc: 'Key Accounts' },
    { tier: 'Silver', color: '#c0c0c0', count: 50, desc: 'Growing Partnerships' },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.label}>TRUSTED BY INDUSTRY LEADERS</div>
          <h1 style={styles.title}>OUR <span style={styles.highlight}>CLIENTS</span></h1>
        </div>
        <div style={styles.stats}>
          {[{ value: '25+', label: 'Countries' }, { value: '100+', label: 'Enterprise Clients' }, { value: '$3B+', label: 'Transaction Value' }].map((s) => (
            <div key={s.label} style={styles.stat}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </header>

      <main style={styles.main}>
        <div>
          <div style={styles.filters}>
            {industries.map((ind) => (
              <button key={ind.id} style={styles.filterBtn(activeIndustry === ind.id)} onClick={() => setActiveIndustry(ind.id)}>
                {ind.label} <span style={{ opacity: 0.5 }}>({ind.count})</span>
              </button>
            ))}
          </div>
          <div style={styles.clientsGrid}>
            {filteredClients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{ ...styles.clientCard(tierColors[client.tier], hoveredClient === client.name), position: 'relative' }}
                onMouseEnter={() => setHoveredClient(client.name)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div style={styles.tierDot(tierColors[client.tier])} />
                <div style={styles.logo}>{client.logo}</div>
                <div style={styles.clientName}>{client.name}</div>
                <div style={styles.clientInfo}>{client.industry} • {client.country}</div>
                {hoveredClient === client.name && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border-default)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: tierColors[client.tier], letterSpacing: '1px', marginBottom: '5px' }}>PROJECT</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)' }}>{client.project}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div style={styles.sidebar}>
          <div style={styles.mapPanel}>
            <h3 style={styles.mapTitle}>GLOBAL PRESENCE</h3>
            <div style={styles.map}>
              {globalPresence.map((loc) => (
                <div key={loc.region} style={styles.mapDot(loc.x, loc.y)} title={`${loc.region}: ${loc.clients} clients`} />
              ))}
            </div>
            <div style={styles.regionList}>
              {globalPresence.map((loc) => (
                <div key={loc.region} style={styles.regionItem}>
                  <span style={styles.regionName}>{loc.region}</span>
                  <span style={styles.regionCount}>{loc.clients}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.tiersPanel}>
            <h3 style={styles.mapTitle}>PARTNERSHIP TIERS</h3>
            {tiers.map((tier) => (
              <div key={tier.tier} style={styles.tierItem(tier.color)}>
                <div style={styles.tierBadge(tier.color)}>{tier.count}</div>
                <div>
                  <div style={styles.tierName}>{tier.tier}</div>
                  <div style={styles.tierDesc}>{tier.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
