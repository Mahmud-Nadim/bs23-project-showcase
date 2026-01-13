import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Syntax highlighting colors
const syntaxColors = {
  keyword: '#ff79c6',
  string: '#f1fa8c',
  function: '#50fa7b',
  variable: '#8be9fd',
  comment: '#6272a4',
  number: '#bd93f9',
  operator: '#ff79c6',
  bracket: '#f8f8f2',
  property: '#ffb86c',
  className: '#8be9fd',
};

// Light mode syntax colors
const syntaxColorsLight = {
  keyword: '#d73a49',
  string: '#032f62',
  function: '#22863a',
  variable: '#005cc5',
  comment: '#6a737d',
  number: '#005cc5',
  operator: '#d73a49',
  bracket: '#24292e',
  property: '#e36209',
  className: '#6f42c1',
};

// Code snippets to animate
const codeSnippets = [
  {
    language: 'React',
    icon: '⚛️',
    code: [
      { text: 'import ', type: 'keyword' },
      { text: 'React', type: 'variable' },
      { text: ' from ', type: 'keyword' },
      { text: "'react'", type: 'string' },
      { text: ';', type: 'bracket' },
      { text: '\n\n' },
      { text: '// Brain Station 23 Component', type: 'comment' },
      { text: '\n' },
      { text: 'const ', type: 'keyword' },
      { text: 'Innovation', type: 'function' },
      { text: ' = ', type: 'operator' },
      { text: '() ', type: 'bracket' },
      { text: '=> ', type: 'operator' },
      { text: '{', type: 'bracket' },
      { text: '\n  ' },
      { text: 'const ', type: 'keyword' },
      { text: '[magic, setMagic]', type: 'variable' },
      { text: ' = ', type: 'operator' },
      { text: 'useState', type: 'function' },
      { text: '(', type: 'bracket' },
      { text: 'true', type: 'keyword' },
      { text: ');', type: 'bracket' },
      { text: '\n\n  ' },
      { text: 'return ', type: 'keyword' },
      { text: '(', type: 'bracket' },
      { text: '\n    ' },
      { text: '<', type: 'bracket' },
      { text: 'div ', type: 'keyword' },
      { text: 'className', type: 'property' },
      { text: '=', type: 'operator' },
      { text: '"digital-magic"', type: 'string' },
      { text: '>', type: 'bracket' },
      { text: '\n      ' },
      { text: '{', type: 'bracket' },
      { text: 'magic ', type: 'variable' },
      { text: '&& ', type: 'operator' },
      { text: '<', type: 'bracket' },
      { text: 'Transform', type: 'className' },
      { text: ' />', type: 'bracket' },
      { text: '}', type: 'bracket' },
      { text: '\n    ' },
      { text: '</', type: 'bracket' },
      { text: 'div', type: 'keyword' },
      { text: '>', type: 'bracket' },
      { text: '\n  ' },
      { text: ');', type: 'bracket' },
      { text: '\n' },
      { text: '};', type: 'bracket' },
    ],
  },
  {
    language: 'Python',
    icon: '🐍',
    code: [
      { text: '# AI-Powered Solutions', type: 'comment' },
      { text: '\n' },
      { text: 'import ', type: 'keyword' },
      { text: 'tensorflow ', type: 'variable' },
      { text: 'as ', type: 'keyword' },
      { text: 'tf', type: 'variable' },
      { text: '\n' },
      { text: 'from ', type: 'keyword' },
      { text: 'brain_station ', type: 'variable' },
      { text: 'import ', type: 'keyword' },
      { text: 'magic', type: 'function' },
      { text: '\n\n' },
      { text: 'class ', type: 'keyword' },
      { text: 'DigitalTransform', type: 'className' },
      { text: ':', type: 'bracket' },
      { text: '\n    ' },
      { text: 'def ', type: 'keyword' },
      { text: '__init__', type: 'function' },
      { text: '(', type: 'bracket' },
      { text: 'self', type: 'variable' },
      { text: '):', type: 'bracket' },
      { text: '\n        ' },
      { text: 'self', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'innovation', type: 'property' },
      { text: ' = ', type: 'operator' },
      { text: 'True', type: 'keyword' },
      { text: '\n        ' },
      { text: 'self', type: 'variable' },
      { text: '.', type: 'operator' },
      { text: 'years', type: 'property' },
      { text: ' = ', type: 'operator' },
      { text: '19', type: 'number' },
      { text: '\n\n    ' },
      { text: 'def ', type: 'keyword' },
      { text: 'transform', type: 'function' },
      { text: '(', type: 'bracket' },
      { text: 'self', type: 'variable' },
      { text: ', ', type: 'bracket' },
      { text: 'business', type: 'variable' },
      { text: '):', type: 'bracket' },
      { text: '\n        ' },
      { text: 'return ', type: 'keyword' },
      { text: 'magic', type: 'function' },
      { text: '.', type: 'operator' },
      { text: 'apply', type: 'function' },
      { text: '(', type: 'bracket' },
      { text: 'business', type: 'variable' },
      { text: ')', type: 'bracket' },
    ],
  },
  {
    language: 'TypeScript',
    icon: '💎',
    code: [
      { text: '// Enterprise Solutions', type: 'comment' },
      { text: '\n' },
      { text: 'interface ', type: 'keyword' },
      { text: 'Solution ', type: 'className' },
      { text: '{', type: 'bracket' },
      { text: '\n  ' },
      { text: 'innovation', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: 'boolean', type: 'keyword' },
      { text: ';', type: 'bracket' },
      { text: '\n  ' },
      { text: 'scalable', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: 'boolean', type: 'keyword' },
      { text: ';', type: 'bracket' },
      { text: '\n  ' },
      { text: 'projects', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: 'number', type: 'keyword' },
      { text: ';', type: 'bracket' },
      { text: '\n' },
      { text: '}', type: 'bracket' },
      { text: '\n\n' },
      { text: 'const ', type: 'keyword' },
      { text: 'bs23', type: 'variable' },
      { text: ': ', type: 'bracket' },
      { text: 'Solution', type: 'className' },
      { text: ' = ', type: 'operator' },
      { text: '{', type: 'bracket' },
      { text: '\n  ' },
      { text: 'innovation', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: 'true', type: 'keyword' },
      { text: ',', type: 'bracket' },
      { text: '\n  ' },
      { text: 'scalable', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: 'true', type: 'keyword' },
      { text: ',', type: 'bracket' },
      { text: '\n  ' },
      { text: 'projects', type: 'property' },
      { text: ': ', type: 'bracket' },
      { text: '2500', type: 'number' },
      { text: '+', type: 'operator' },
      { text: '\n' },
      { text: '};', type: 'bracket' },
    ],
  },
];

// Typing animation hook
function useTypingAnimation(code, speed = 30) {
  const [displayedCode, setDisplayedCode] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= code.length) {
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedCode(prev => [...prev, code[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, code[currentIndex]?.text === '\n' ? speed * 3 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, code, speed]);

  const reset = () => {
    setDisplayedCode([]);
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return { displayedCode, isComplete, reset };
}

// IDE Window Component
function IDEWindow({ snippet, isActive, onComplete }) {
  const { displayedCode, isComplete, reset } = useTypingAnimation(
    isActive ? snippet.code : [],
    25
  );

  useEffect(() => {
    if (isComplete && onComplete) {
      const timeout = setTimeout(onComplete, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    if (isActive) {
      reset();
    }
  }, [isActive, snippet]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="ide-window"
    >
      {/* IDE Header */}
      <div className="ide-header">
        <div className="ide-buttons">
          <span className="ide-btn close" />
          <span className="ide-btn minimize" />
          <span className="ide-btn maximize" />
        </div>
        <div className="ide-title">
          <span className="ide-icon">{snippet.icon}</span>
          <span className="ide-filename">brain_station.{snippet.language.toLowerCase()}</span>
        </div>
        <div className="ide-actions">
          <span className="ide-action">▶ Run</span>
        </div>
      </div>

      {/* IDE Sidebar */}
      <div className="ide-body">
        <div className="ide-sidebar">
          <div className="sidebar-icon active">📁</div>
          <div className="sidebar-icon">🔍</div>
          <div className="sidebar-icon">⚙️</div>
          <div className="sidebar-icon">🧩</div>
        </div>

        {/* Code Editor */}
        <div className="ide-editor">
          {/* Line Numbers */}
          <div className="line-numbers">
            {Array.from({ length: 15 }, (_, i) => (
              <span key={i} className="line-number">{i + 1}</span>
            ))}
          </div>

          {/* Code Content */}
          <div className="code-content">
            <pre className="code-text">
              {displayedCode.map((token, i) => (
                <span
                  key={i}
                  className={`token token-${token.type || 'default'}`}
                  style={{ '--token-color': `var(--syntax-${token.type})` }}
                >
                  {token.text}
                </span>
              ))}
              <motion.span
                className="cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </pre>
          </div>
        </div>

        {/* Terminal */}
        <div className="ide-terminal">
          <div className="terminal-header">
            <span className="terminal-tab active">TERMINAL</span>
            <span className="terminal-tab">PROBLEMS</span>
            <span className="terminal-tab">OUTPUT</span>
          </div>
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                npm run innovation
              </motion.span>
            </div>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="terminal-line success"
              >
                <span className="terminal-success">✓</span>
                <span>Compiled successfully in 23ms</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Component
export default function CodeAnimation() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleComplete = () => {
    setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
  };

  return (
    <section className="code-animation-section" ref={containerRef}>
      <div className="code-animation-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="code-section-header"
        >
          <span className="section-label">CRAFTING EXCELLENCE</span>
          <h2 className="section-title">
            CODE THAT <span className="highlight">TRANSFORMS</span>
          </h2>
          <p className="section-description">
            Watch our developers bring ideas to life with cutting-edge technology
          </p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="language-selector"
        >
          {codeSnippets.map((snippet, index) => (
            <motion.button
              key={snippet.language}
              className={`language-btn ${activeSnippet === index ? 'active' : ''}`}
              onClick={() => setActiveSnippet(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="lang-icon">{snippet.icon}</span>
              <span className="lang-name">{snippet.language}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* IDE Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="ide-container"
        >
          <AnimatePresence mode="wait">
            {isInView && (
              <IDEWindow
                key={activeSnippet}
                snippet={codeSnippets[activeSnippet]}
                isActive={isInView}
                onComplete={handleComplete}
              />
            )}
          </AnimatePresence>

          {/* Floating Elements */}
          <motion.div
            className="floating-element elem-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="floating-element elem-2"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            {'{ }'}
          </motion.div>
          <motion.div
            className="floating-element elem-3"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            {'//'}
          </motion.div>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="tech-stack-pills"
        >
          {['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'].map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-pill"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
