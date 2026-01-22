import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProgrammingEffects.css';

// Code symbols for floating effect
const CODE_SYMBOLS = [
  '{ }', '< />', '[ ]', '( )', '&&', '||', '=>', '!=', '===', '++',
  '--', '/*', '*/', '//', '##', '$$', '%%', '@@', '<<', '>>', '::',
  '?:', '...', '```', ':::',  'fn()', 'if()', '01', '10', '0x', '#!'
];

// Programming language keywords
const KEYWORDS = [
  'const', 'let', 'var', 'function', 'return', 'import', 'export',
  'class', 'interface', 'type', 'async', 'await', 'try', 'catch',
  'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
  'new', 'this', 'super', 'extends', 'implements', 'static', 'public',
  'private', 'protected', 'void', 'null', 'undefined', 'true', 'false'
];

// Binary strings
const BINARY = ['01001000', '01100101', '01101100', '01101100', '01101111', '00100000'];

// Matrix characters
const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

// ============================================
// Glitch Text Component
// ============================================
export function GlitchText({
  children,
  className = '',
  intensity = 'normal', // 'subtle', 'normal', 'intense'
  as: Component = 'span'
}) {
  const glitchClass = intensity === 'intense'
    ? 'glitch-intense'
    : intensity === 'subtle'
    ? 'glitch-subtle'
    : 'glitch-text';

  return (
    <Component
      className={`${glitchClass} ${className}`}
      data-text={children}
    >
      {children}
    </Component>
  );
}

// ============================================
// Code Rain (Matrix) Effect
// ============================================
export function CodeRain({ density = 20, speed = 'normal' }) {
  const columns = useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: i,
      left: `${(i / density) * 100}%`,
      delay: Math.random() * 5,
      duration: speed === 'fast' ? 5 + Math.random() * 5 : 10 + Math.random() * 10,
      chars: Array.from({ length: 20 }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ).join(''),
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, [density, speed]);

  return (
    <div className="code-rain-container">
      {columns.map((col) => (
        <div
          key={col.id}
          className="code-rain-column"
          style={{
            left: col.left,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
            opacity: col.opacity,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
}

// ============================================
// Floating Code Symbols
// ============================================
export function FloatingSymbols({ count = 15 }) {
  const symbols = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 0.8 + Math.random() * 1.5,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.2,
    }));
  }, [count]);

  return (
    <div className="floating-symbols-container">
      {symbols.map((sym) => (
        <motion.div
          key={sym.id}
          className="floating-symbol"
          style={{
            left: sym.left,
            top: sym.top,
            fontSize: `${sym.size}rem`,
            opacity: sym.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [sym.opacity, sym.opacity * 2, sym.opacity],
          }}
          transition={{
            duration: sym.duration,
            delay: sym.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {sym.symbol}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// Terminal Line Effect
// ============================================
export function TerminalLine({
  prefix = '>',
  text,
  typingSpeed = 50,
  showCursor = true,
  className = ''
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;

    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, typingSpeed]);

  return (
    <div className={`terminal-line ${className}`}>
      <span className="terminal-prefix">{prefix}</span>
      <span className="terminal-text">{displayedText}</span>
      {showCursor && <span className={`terminal-cursor ${!isTyping ? 'blink' : ''}`} />}
    </div>
  );
}

// ============================================
// Binary Stream
// ============================================
export function BinaryStream({ speed = 'normal' }) {
  const [stream, setStream] = useState('');

  useEffect(() => {
    const generateBinary = () => {
      const length = 50;
      return Array.from({ length }, () => Math.round(Math.random())).join('');
    };

    setStream(generateBinary());

    const interval = setInterval(() => {
      setStream(generateBinary());
    }, speed === 'fast' ? 100 : speed === 'slow' ? 500 : 200);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="binary-stream">
      {stream}
    </div>
  );
}

// ============================================
// Scan Line Effect
// ============================================
export function ScanLines({ opacity = 0.1 }) {
  return (
    <div
      className="scanlines-overlay"
      style={{ '--scanline-opacity': opacity }}
    />
  );
}

// ============================================
// Data Packet Animation
// ============================================
export function DataPackets({ count = 5 }) {
  const packets = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      duration: 2 + Math.random() * 2,
      top: `${20 + Math.random() * 60}%`,
    }));
  }, [count]);

  return (
    <div className="data-packets-container">
      {packets.map((packet) => (
        <motion.div
          key={packet.id}
          className="data-packet"
          style={{ top: packet.top }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: packet.duration,
            delay: packet.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span className="packet-data">{`{ data: 0x${Math.random().toString(16).slice(2, 6)} }`}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// Hexagon Grid Background
// ============================================
export function HexagonGrid() {
  return <div className="hexagon-grid-bg" />;
}

// ============================================
// Circuit Lines
// ============================================
export function CircuitLines() {
  return (
    <svg className="circuit-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Horizontal lines */}
      <line x1="0" y1="20" x2="100" y2="20" stroke="url(#circuitGrad)" strokeWidth="0.2" className="circuit-line" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="url(#circuitGrad)" strokeWidth="0.2" className="circuit-line" style={{ animationDelay: '0.5s' }} />
      <line x1="0" y1="80" x2="100" y2="80" stroke="url(#circuitGrad)" strokeWidth="0.2" className="circuit-line" style={{ animationDelay: '1s' }} />

      {/* Nodes */}
      <circle cx="20" cy="20" r="1" fill="#00d4ff" className="circuit-node" />
      <circle cx="50" cy="50" r="1" fill="#00ff88" className="circuit-node" style={{ animationDelay: '0.3s' }} />
      <circle cx="80" cy="80" r="1" fill="#00d4ff" className="circuit-node" style={{ animationDelay: '0.6s' }} />
      <circle cx="70" cy="20" r="1" fill="#9333ea" className="circuit-node" style={{ animationDelay: '0.9s' }} />
      <circle cx="30" cy="80" r="1" fill="#00ff88" className="circuit-node" style={{ animationDelay: '1.2s' }} />
    </svg>
  );
}

// ============================================
// Glitch Image Effect
// ============================================
export function GlitchImage({ src, alt, className = '' }) {
  return (
    <div className={`glitch-image-container ${className}`}>
      <img src={src} alt={alt} className="glitch-image" />
      <img src={src} alt="" className="glitch-image-r" aria-hidden="true" />
      <img src={src} alt="" className="glitch-image-g" aria-hidden="true" />
      <img src={src} alt="" className="glitch-image-b" aria-hidden="true" />
    </div>
  );
}

// ============================================
// Status Indicator
// ============================================
export function StatusIndicator({ status = 'online', label }) {
  const colors = {
    online: '#00ff88',
    offline: '#ff4444',
    processing: '#ffd700',
    syncing: '#00d4ff',
  };

  return (
    <div className="status-indicator">
      <motion.span
        className="status-dot"
        style={{ backgroundColor: colors[status] }}
        animate={{
          boxShadow: [
            `0 0 5px ${colors[status]}`,
            `0 0 20px ${colors[status]}`,
            `0 0 5px ${colors[status]}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {label && <span className="status-label">{label}</span>}
    </div>
  );
}

// ============================================
// Code Block Decoration
// ============================================
export function CodeBlock({ children, language = 'javascript', showLineNumbers = true }) {
  const lines = children.split('\n');

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="code-block-language">{language}</span>
      </div>
      <pre className="code-block-content">
        {lines.map((line, i) => (
          <div key={i} className="code-line">
            {showLineNumbers && <span className="line-number">{i + 1}</span>}
            <span className="line-content">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

// ============================================
// Export all effects
// ============================================
export default {
  GlitchText,
  CodeRain,
  FloatingSymbols,
  TerminalLine,
  BinaryStream,
  ScanLines,
  DataPackets,
  HexagonGrid,
  CircuitLines,
  GlitchImage,
  StatusIndicator,
  CodeBlock,
};
