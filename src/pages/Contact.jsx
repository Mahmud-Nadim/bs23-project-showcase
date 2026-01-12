import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', budget: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const offices = [
    { city: 'DHAKA', country: 'Bangladesh', address: 'Brain Station 23 Ltd, Level 3-8, BDBL Building, Karwan Bazar', type: 'HQ', phone: '+880 1404-055226' },
    { city: 'LONDON', country: 'United Kingdom', address: '20-22 Wenlock Road, London N1 7GU', type: 'UK', phone: '+44 20 1234 5678' },
    { city: 'MUNICH', country: 'Germany', address: 'Elsenheimerstr. 61, Munich 80687', type: 'EU', phone: '+49 89 1234 5678' },
  ];

  const contacts = [
    { type: 'SALES', email: 'sales@brainstation-23.com', desc: 'New projects & partnerships' },
    { type: 'SUPPORT', email: 'support@brainstation-23.com', desc: 'Technical assistance' },
    { type: 'CAREERS', email: 'hr@brainstation-23.com', desc: 'Join our team' },
  ];

  const styles = {
    page: { minHeight: '100vh' },
    hero: { padding: '100px 60px 60px', textAlign: 'center' },
    label: { fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '4px', marginBottom: '15px' },
    title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' },
    highlight: { color: 'var(--accent-cyan)' },
    description: { fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' },
    main: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px', padding: '0 60px 100px', maxWidth: '1400px', margin: '0 auto' },
    form: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '40px' },
    formTitle: { fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '30px' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label2: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px' },
    input: {
      background: 'var(--bg-tertiary)', border: '1px solid var(--border-default)', padding: '15px',
      fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)',
      transition: 'all 0.3s', outline: 'none',
    },
    textarea: {
      background: 'var(--bg-tertiary)', border: '1px solid var(--border-default)', padding: '15px',
      fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)',
      minHeight: '150px', resize: 'vertical', transition: 'all 0.3s', outline: 'none',
    },
    submitBtn: {
      width: '100%', padding: '18px', marginTop: '20px',
      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
      border: 'none', fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600,
      letterSpacing: '2px', color: 'var(--bg-primary)', cursor: 'pointer', transition: 'all 0.3s',
    },
    successMsg: {
      padding: '20px', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)',
      textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-green)',
      letterSpacing: '2px', marginTop: '20px',
    },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '30px' },
    contactCard: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '25px' },
    contactType: { fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)', letterSpacing: '2px', marginBottom: '10px' },
    contactEmail: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '5px' },
    contactDesc: { fontSize: '13px', color: 'var(--text-secondary)' },
    officesSection: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '30px' },
    officesTitle: { fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '25px' },
    officeCard: { padding: '20px 0', borderBottom: '1px solid var(--border-default)' },
    officeHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
    officeCity: { fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' },
    officeBadge: { fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-cyan)', padding: '3px 8px', background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)' },
    officeAddress: { fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 },
    officePhone: { fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-cyan)', marginTop: '8px' },
    socialSection: { background: 'var(--bg-card)', border: '1px solid var(--border-default)', padding: '25px' },
    socialTitle: { fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '15px' },
    socialLinks: { display: 'flex', gap: '10px' },
    socialLink: {
      width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-tertiary)', border: '1px solid var(--border-default)',
      fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)',
      transition: 'all 0.3s', cursor: 'pointer',
    },
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={styles.label}>LET'S BUILD TOGETHER</div>
          <h1 style={styles.title}>GET IN <span style={styles.highlight}>TOUCH</span></h1>
          <p style={styles.description}>
            Ready to transform your business? Let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>
      </section>

      <div style={styles.main}>
        <motion.div style={styles.form} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={styles.formTitle}>START A PROJECT</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label2}>YOUR NAME</label>
                <input
                  type="text" name="name" required style={styles.input}
                  value={formData.name} onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label2}>EMAIL</label>
                <input
                  type="email" name="email" required style={styles.input}
                  value={formData.email} onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label2}>COMPANY</label>
                <input
                  type="text" name="company" style={styles.input}
                  value={formData.company} onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label2}>BUDGET RANGE</label>
                <select
                  name="budget" style={styles.input}
                  value={formData.budget} onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
                >
                  <option value="">Select budget</option>
                  <option value="10k-50k">$10K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k-500k">$100K - $500K</option>
                  <option value="500k+">$500K+</option>
                </select>
              </div>
            </div>
            <div style={{ ...styles.inputGroup, marginBottom: '20px' }}>
              <label style={styles.label2}>PROJECT DETAILS</label>
              <textarea
                name="message" required style={styles.textarea}
                value={formData.message} onChange={handleChange}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
                placeholder="Tell us about your project..."
              />
            </div>
            <button type="submit" style={styles.submitBtn}>SUBMIT INQUIRY</button>
          </form>
          {submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.successMsg}>
              MESSAGE SENT SUCCESSFULLY
            </motion.div>
          )}
        </motion.div>

        <motion.div style={styles.sidebar} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          {contacts.map((contact, i) => (
            <div key={contact.type} style={styles.contactCard}>
              <div style={styles.contactType}>{contact.type}</div>
              <div style={styles.contactEmail}>{contact.email}</div>
              <div style={styles.contactDesc}>{contact.desc}</div>
            </div>
          ))}

          <div style={styles.officesSection}>
            <h3 style={styles.officesTitle}>GLOBAL OFFICES</h3>
            {offices.map((office, i) => (
              <div key={office.city} style={{ ...styles.officeCard, borderBottom: i === offices.length - 1 ? 'none' : '1px solid var(--border-default)' }}>
                <div style={styles.officeHeader}>
                  <span style={styles.officeCity}>{office.city}</span>
                  <span style={styles.officeBadge}>{office.type}</span>
                </div>
                <div style={styles.officeAddress}>{office.address}</div>
                <div style={styles.officePhone}>{office.phone}</div>
              </div>
            ))}
          </div>

          <div style={styles.socialSection}>
            <h4 style={styles.socialTitle}>CONNECT WITH US</h4>
            <div style={styles.socialLinks}>
              {['LI', 'FB', 'X', 'GH', 'YT'].map((s) => (
                <div key={s} style={styles.socialLink}>{s}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
