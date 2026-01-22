import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AppleScrollSections.css';

// Import the new Tech Spider Web component
import TechSpiderWeb from './TechSpiderWeb';
import './TechSpiderWeb.css';

// Import the 3D Global Offices component
import GlobalOffices3D from './GlobalOffices3D';
import './GlobalOffices3D.css';

// Import HolographicGallery for Our Core Beliefs
import HolographicGallery from './HolographicGallery';

// Smooth scroll hook for Apple-like animations
function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// ============================================
// SECTION 1: About Brain Station 23
// ============================================
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <section ref={ref} className="apple-section about-section">
      <motion.div
        className="section-inner"
        style={{ opacity, scale, y }}
      >
        <motion.span
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ABOUT US
        </motion.span>

        <motion.h2
          className="section-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="gradient-word">Almost 20 Years</span> of
          <br />Digital Excellence
        </motion.h2>

        <motion.p
          className="section-subhead"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Founded in 2006, Brain Station 23 has grown from a small team to Bangladesh's
          leading software development company with 800+ engineers serving clients in 30+ countries.
        </motion.p>

        <div className="about-grid">
          {[
            {
              icon: '🏆',
              title: '7x BASIS Award Winner',
              desc: 'Best Outsourcing Organization for seven consecutive years'
            },
            {
              icon: '🌍',
              title: 'Global Presence',
              desc: 'Offices in USA, UAE, Malaysia, Netherlands, Estonia & Bangladesh'
            },
            {
              icon: '🎯',
              title: 'Mission Critical',
              desc: 'Powering $3B+ in transactions through our fintech solutions'
            },
            {
              icon: '🤖',
              title: 'AI-First Approach',
              desc: 'Delivering solutions 10X faster with AI-augmented engineering'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="about-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <span className="card-icon">{item.icon}</span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="section-bg-elements">
        <div className="bg-gradient-orb orb-1" />
        <div className="bg-gradient-orb orb-2" />
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: Services Showcase - ENHANCED with Visual Flair
// ============================================
function ServicesSection() {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const services = [
    {
      id: 'fintech',
      title: 'Fintech & Banking',
      headline: 'Transforming Finance',
      description: 'Secure, scalable fintech & blockchain platforms built to transform payments, lending, and risk management. Trusted by City Bank, HSBC, MetLife, and PayPal.',
      stats: ['$3B+ Transactions', '446K+ Users', '99.9% Uptime'],
      color: '#00d4ff',
      icon: '🏦',
      clients: ['City Bank', 'HSBC', 'MetLife', 'PayPal']
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Pharma',
      headline: 'Healing Through Innovation',
      description: 'Regulation-first pharma & healthcare software: GDPR-compliant platforms supporting HCPs, education & analytics. Serving Incepta, Aristopharma, and European biopharma leaders.',
      stats: ['GDPR Compliant', 'Multi-language', 'AEM Powered'],
      color: '#00ff88',
      icon: '🏥',
      clients: ['Incepta', 'Aristopharma', 'EU Biopharma']
    },
    {
      id: 'telecom',
      title: 'Telecom & Enterprise',
      headline: 'Connecting Millions',
      description: 'Enterprise-grade telecom applications that scale securely to serve millions with reliability & speed. Powering Grameenphone, Robi, British Telecom, and Telenor.',
      stats: ['Millions Served', '40% Error Reduction', 'Real-time Analytics'],
      color: '#9333ea',
      icon: '📡',
      clients: ['Grameenphone', 'British Telecom', 'Telenor']
    },
    {
      id: 'retail',
      title: 'Retail & E-Commerce',
      headline: 'Revolutionizing Shopping',
      description: 'Smart retail systems streamlining inventory, customer journeys & omnichannel sales. Built the #1 retail platform for Shwapno with microservice architecture.',
      stats: ['100K+ Downloads', 'Microservices', 'Real-time Inventory'],
      color: '#ff6b35',
      icon: '🛒',
      clients: ['Shwapno', 'Othoba', 'PRAN-RFL']
    },
    {
      id: 'edtech',
      title: 'LMS & EdTech',
      headline: 'Education Reimagined',
      description: 'LMS solutions built with Moodle: live classes, assessments, compliance & reporting. Our Proctoring Pro plugin is used on 2157+ sites worldwide.',
      stats: ['2157+ Sites', 'AI Proctoring', 'SCORM Compliant'],
      color: '#ffd700',
      icon: '📚',
      clients: ['Moodle', 'Cambridge', 'Global EdTech']
    }
  ];

  // Update active service based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const index = Math.min(
        Math.floor(v * services.length),
        services.length - 1
      );
      setActiveService(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length]);

  // Calculate rotation for the circular visualization
  const circleRotation = useTransform(scrollYProgress, [0, 1], [0, -360]);

  return (
    <section ref={containerRef} className="services-sticky-section services-enhanced">
      {/* Scroll Progress Indicator - Fixed on screen */}
      <div className="scroll-progress-fixed">
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            style={{ scaleY: scrollYProgress }}
          />
        </div>
        <div className="progress-labels">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              className={`progress-label ${activeService === i ? 'active' : ''}`}
              style={{ '--label-color': s.color }}
              animate={{ opacity: activeService === i ? 1 : 0.3 }}
            >
              <span className="label-dot" />
              <span className="label-text">{s.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Instruction */}
      <motion.div
        className="scroll-instruction"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="mouse-wheel" />
        </motion.div>
        <span>Scroll to explore industries</span>
      </motion.div>

      <div className="services-sticky-container">
        {/* Left side - Circular Visualization */}
        <div className="services-sticky-left services-visual">
          <motion.div
            className="services-circle-container"
            style={{ rotate: circleRotation }}
          >
            {/* Central hub */}
            <div className="services-hub">
              <span className="hub-text">BS23</span>
              <div className="hub-ring ring-1" />
              <div className="hub-ring ring-2" />
              <div className="hub-ring ring-3" />
            </div>

            {/* Orbiting service icons */}
            {services.map((service, i) => {
              const angle = (i / services.length) * 360;
              return (
                <motion.div
                  key={service.id}
                  className={`orbit-item ${activeService === i ? 'active' : ''}`}
                  style={{
                    '--orbit-angle': `${angle}deg`,
                    '--orbit-color': service.color,
                  }}
                  animate={{
                    scale: activeService === i ? 1.3 : 1,
                    filter: activeService === i ? `drop-shadow(0 0 20px ${service.color})` : 'none'
                  }}
                >
                  <div className="orbit-icon">{service.icon}</div>
                  <div className="orbit-connector" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Section number */}
          <motion.div
            className="section-number"
            style={{ '--active-color': services[activeService].color }}
          >
            <span className="number-current">0{activeService + 1}</span>
            <span className="number-divider">/</span>
            <span className="number-total">0{services.length}</span>
          </motion.div>
        </div>

        {/* Right side - Content */}
        <div className="services-sticky-right services-content-enhanced">
          <motion.div
            className="section-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            OUR EXPERTISE
          </motion.div>
          <h2 className="services-title">
            Industries We
            <span className="gradient-word"> Transform</span>
          </h2>

          {/* Active service content */}
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className={`service-content-card ${activeService === i ? 'active' : ''}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: activeService === i ? 1 : 0,
                x: activeService === i ? 0 : 50,
                scale: activeService === i ? 1 : 0.9
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ '--service-color': service.color }}
            >
              <div className="service-header">
                <div className="service-icon-wrapper">
                  <span className="service-icon-bg">{service.icon}</span>
                  <motion.div
                    className="icon-pulse"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="service-title-group">
                  <h3 className="service-headline">{service.headline}</h3>
                  <span className="service-subtitle">{service.title}</span>
                </div>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-stats-grid">
                {service.stats.map((stat, j) => (
                  <motion.div
                    key={j}
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeService === i ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: j * 0.1 }}
                  >
                    <span className="stat-value">{stat}</span>
                  </motion.div>
                ))}
              </div>

              <div className="service-clients">
                <span className="clients-label">Trusted by:</span>
                <div className="clients-list">
                  {service.clients.map((client, k) => (
                    <span key={k} className="client-name">{client}</span>
                  ))}
                </div>
              </div>

              <Link to="/solutions" className="service-cta-btn">
                <span>Explore {service.title}</span>
                <motion.span
                  className="cta-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >→</motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background visual effects */}
      <div className="services-bg-effects">
        <motion.div
          className="bg-glow"
          animate={{
            background: `radial-gradient(circle at 30% 50%, ${services[activeService].color}20 0%, transparent 50%)`
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="bg-grid-pattern" />
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--particle-color': services[activeService].color
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}

// ============================================
// SECTION 3: Case Studies Parallax
// ============================================
function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const caseStudies = [
    {
      title: 'CityTouch',
      client: 'City Bank',
      description: 'Cutting-edge digital banking platform that set a new benchmark in Bangladesh\'s fintech landscape.',
      metrics: { users: '446,000+', transactions: '$3B+', growth: '300%' },
      color: '#00d4ff',
      image: '/citytouch.jpg'
    },
    {
      title: 'Shwapno E-Commerce',
      client: 'Shwapno Retail',
      description: 'Microservice-based enterprise e-commerce platform for Bangladesh\'s #1 retail supermarket.',
      metrics: { downloads: '100K+', uptime: '99.9%', scale: 'Enterprise' },
      color: '#00ff88',
      image: '/shwapno.jpg'
    },
    {
      title: 'TechStep Portal',
      client: 'TechStep ASA Norway',
      description: 'Modern cloud-based .NET solution serving 620,000 end users across Nordic countries.',
      metrics: { users: '620K', customers: '6,000+', countries: 'Nordic' },
      color: '#9333ea',
      image: '/techstep.jpg'
    },
    {
      title: 'Proctoring Pro',
      client: 'Moodle LMS',
      description: 'AI-enabled proctoring plugin ensuring exam integrity for educational institutions worldwide.',
      metrics: { sites: '2,157+', integrity: '99.9%', global: 'Worldwide' },
      color: '#ffd700',
      image: '/proctoring.jpg'
    }
  ];

  return (
    <section ref={ref} className="case-studies-section">
      <motion.div
        className="section-header-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">SUCCESS STORIES</span>
        <h2 className="section-headline">
          Projects That
          <span className="gradient-word"> Define Excellence</span>
        </h2>
      </motion.div>

      <div className="case-studies-grid">
        {caseStudies.map((study, i) => (
          <motion.div
            key={study.title}
            className="case-study-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            style={{ '--card-color': study.color }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="card-glow" />
            <div className="card-content">
              <span className="card-client">{study.client}</span>
              <h3 className="card-title">{study.title}</h3>
              <p className="card-description">{study.description}</p>

              <div className="card-metrics">
                {Object.entries(study.metrics).map(([key, value]) => (
                  <div key={key} className="metric">
                    <span className="metric-value">{value}</span>
                    <span className="metric-label">{key}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-arrow">→</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="cta-centered"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link to="/projects" className="btn-explore">
          Explore All Projects
          <span className="btn-shine" />
        </Link>
      </motion.div>
    </section>
  );
}

// ============================================
// SECTION 4: Technology Stack
// ============================================
function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const techCategories = [
    {
      name: 'Cloud & DevOps',
      techs: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform'],
      color: '#ff6b35'
    },
    {
      name: 'AI & Machine Learning',
      techs: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP', 'MLOps'],
      color: '#00d4ff'
    },
    {
      name: 'Frontend',
      techs: ['React', 'Vue.js', 'Angular', 'Next.js', 'Flutter', 'React Native'],
      color: '#00ff88'
    },
    {
      name: 'Backend & Database',
      techs: ['.NET', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
      color: '#9333ea'
    },
    {
      name: 'Emerging Tech',
      techs: ['Blockchain', 'IoT', 'AR/VR', 'Web3', 'Edge Computing', 'Quantum Ready'],
      color: '#ffd700'
    }
  ];

  const partners = [
    { name: 'Microsoft', badge: 'Gold Partner' },
    { name: 'AWS', badge: 'Partner' },
    { name: 'Google', badge: 'Cloud Partner' },
    { name: 'Salesforce', badge: 'Partner' },
    { name: 'Adobe', badge: 'AEM Partner' },
    { name: 'Odoo', badge: 'Partner' },
    { name: 'Moodle', badge: 'Certified' },
  ];

  return (
    <section ref={ref} className="tech-stack-section">
      <motion.div
        className="section-header-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">TECHNOLOGY</span>
        <h2 className="section-headline">
          Expertise That
          <span className="gradient-word"> Spans Generations</span>
        </h2>
        <p className="section-subhead">
          From legacy systems to cutting-edge AI/ML, XR, blockchain, and IoT
        </p>
      </motion.div>

      <div className="tech-categories">
        {techCategories.map((category, i) => (
          <motion.div
            key={category.name}
            className="tech-category"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ '--category-color': category.color }}
          >
            <h3 className="category-name">{category.name}</h3>
            <div className="category-techs">
              {category.techs.map((tech, j) => (
                <motion.span
                  key={tech}
                  className="tech-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.1 + j * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Partners Section */}
      <motion.div
        className="partners-section"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="partners-title">Strategic Partnerships</h3>
        <div className="partners-grid">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="partner-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <span className="partner-name">{partner.name}</span>
              <span className="partner-badge">{partner.badge}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// SECTION 5: Global Presence Map
// ============================================
function GlobalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const offices = [
    { city: 'Dhaka', country: 'Bangladesh', type: 'HQ', employees: '700+' },
    { city: 'Virginia', country: 'USA', type: 'Office', employees: '25+' },
    { city: 'Amsterdam', country: 'Netherlands', type: 'Office', employees: '15+' },
    { city: 'Tallinn', country: 'Estonia', type: 'Office', employees: '10+' },
    { city: 'Dubai', country: 'UAE', type: 'Office', employees: '20+' },
    { city: 'Kuala Lumpur', country: 'Malaysia', type: 'Office', employees: '15+' },
  ];

  const regions = [
    { name: 'North America', countries: 'USA, Canada' },
    { name: 'Europe', countries: 'UK, Germany, Norway, Denmark, Switzerland, Netherlands' },
    { name: 'Middle East', countries: 'UAE, Turkey' },
    { name: 'Asia Pacific', countries: 'Bangladesh, Malaysia, Japan' },
  ];

  return (
    <section ref={ref} className="global-section">
      <motion.div
        className="section-header-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">GLOBAL REACH</span>
        <h2 className="section-headline">
          Operating in
          <span className="gradient-word"> 30+ Countries</span>
        </h2>
        <p className="section-subhead">
          With offices across 4 continents and 11 partner companies worldwide
        </p>
      </motion.div>

      {/* Office Cards */}
      <div className="offices-grid">
        {offices.map((office, i) => (
          <motion.div
            key={office.city}
            className={`office-card ${office.type === 'HQ' ? 'hq' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="office-icon">
              {office.type === 'HQ' ? '🏛️' : '🏢'}
            </div>
            <h3 className="office-city">{office.city}</h3>
            <p className="office-country">{office.country}</p>
            <span className="office-type">{office.type}</span>
            <span className="office-employees">{office.employees} People</span>
          </motion.div>
        ))}
      </div>

      {/* Regions */}
      <motion.div
        className="regions-container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="regions-title">Serving Clients Across</h3>
        <div className="regions-grid">
          {regions.map((region, i) => (
            <div key={region.name} className="region-card">
              <span className="region-name">{region.name}</span>
              <span className="region-countries">{region.countries}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vision 2030 */}
      <motion.div
        className="vision-banner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <span className="vision-year">VISION 2030</span>
        <h3 className="vision-text">Operating in 15+ Countries</h3>
        <p className="vision-subtext">Expanding our global footprint to serve more enterprises worldwide</p>
      </motion.div>
    </section>
  );
}

// ============================================
// SECTION 6: Awards & Recognition
// ============================================
function AwardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const awards = [
    {
      title: 'BASIS National ICT Award 2019',
      category: 'Business Services - Professional Solutions',
      project: 'Intellifriend AI Time Tracking',
      icon: '🏆'
    },
    {
      title: '7x Best Outsourcing Company',
      category: 'BASIS Award',
      project: 'Consecutive Years Winner',
      icon: '⭐'
    },
    {
      title: 'Google AI Competition Bronze',
      category: 'Kaggle - Machine Learning',
      project: 'Pneumothorax Detection AI',
      icon: '🥉'
    },
    {
      title: 'HSBC Top SME Exporter',
      category: 'Export Excellence',
      project: 'Global IT Services',
      icon: '🌟'
    },
    {
      title: 'Code Warrior Champions 2014',
      category: 'Web Development',
      project: 'Technical Excellence',
      icon: '💻'
    }
  ];

  const certifications = [
    { name: 'CMMI Level 3', desc: 'Process Maturity' },
    { name: 'ISO 9001', desc: 'Quality Management' },
    { name: 'ISO 27001', desc: 'Information Security' },
  ];

  return (
    <section ref={ref} className="awards-section">
      <motion.div
        className="section-header-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="section-eyebrow">RECOGNITION</span>
        <h2 className="section-headline">
          Awards &
          <span className="gradient-word"> Achievements</span>
        </h2>
      </motion.div>

      <div className="awards-grid">
        {awards.map((award, i) => (
          <motion.div
            key={award.title}
            className="award-card"
            initial={{ opacity: 0, y: 30, rotateY: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -10, rotateY: 5 }}
          >
            <span className="award-icon">{award.icon}</span>
            <h3 className="award-title">{award.title}</h3>
            <span className="award-category">{award.category}</span>
            <p className="award-project">{award.project}</p>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        className="certifications-row"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="certs-title">Certified Excellence</h3>
        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="cert-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="cert-name">{cert.name}</span>
              <span className="cert-desc">{cert.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============================================
// SECTION 7: Final CTA
// ============================================
function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={ref} className="final-cta-section">
      <motion.div
        className="cta-container"
        style={{ scale, opacity }}
      >
        <motion.span
          className="cta-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          LET'S BUILD TOGETHER
        </motion.span>

        <motion.h2
          className="cta-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to Transform
          <br />
          <span className="gradient-word">Your Business?</span>
        </motion.h2>

        <motion.p
          className="cta-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join 100+ enterprises worldwide who trust Brain Station 23
          for their digital transformation journey.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/contact" className="cta-primary-btn">
            Start Your Project
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/solutions" className="cta-secondary-btn">
            Explore Solutions
          </Link>
        </motion.div>

        <motion.div
          className="cta-contact-info"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="mailto:sales@brainstation-23.com" className="contact-link">
            sales@brainstation-23.com
          </a>
          <span className="contact-divider">|</span>
          <a href="tel:+8801404055226" className="contact-link">
            +880 1404-055226
          </a>
        </motion.div>
      </motion.div>

      {/* Background effects */}
      <div className="cta-bg-effects">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-orb cta-orb-3" />
        <div className="cta-grid" />
      </div>
    </section>
  );
}

// ============================================
// MAIN EXPORT
// ============================================
export default function AppleScrollSections() {
  return (
    <div className="apple-scroll-container">
      <AboutSection />
      <HolographicGallery />
      <ServicesSection />
      <CaseStudiesSection />
      <TechSpiderWeb />
      <GlobalOffices3D />
      <AwardsSection />
      <FinalCTASection />
    </div>
  );
}
