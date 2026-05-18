import React, { useState, useRef } from 'react';

// Gorgeous, detailed SVG illustrations for each badge style
const BadgeSVG = ({ styleName }) => {
  if (styleName === 'bronze') {
    return (
      <svg viewBox="0 0 100 100" className="card-badge-art">
        <defs>
          <radialGradient id="bronzeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bronzeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#bronzeGlow)" />
        {/* Outer Hexagon Shield */}
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="url(#bronzeMetal)" strokeWidth="3" />
        {/* Inner Shield */}
        <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="rgba(0,0,0,0.5)" stroke="url(#bronzeMetal)" strokeWidth="1.5" />
        {/* Shield Icon: EOA Logo / Spark */}
        <path d="M50,30 L55,45 L70,45 L58,55 L62,70 L50,60 L38,70 L42,55 L30,45 L45,45 Z" fill="url(#bronzeMetal)" filter="drop-shadow(0 0 5px rgba(245, 158, 11, 0.6))" />
        <circle cx="50" cy="52" r="3" fill="#ffffff" />
      </svg>
    );
  }

  if (styleName === 'silver') {
    return (
      <svg viewBox="0 0 100 100" className="card-badge-art">
        <defs>
          <radialGradient id="silverGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="silverMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#silverGlow)" />
        {/* Circuit Pattern */}
        <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
        {/* Starburst Octagon */}
        <polygon points="50,12 62,25 80,20 75,38 88,50 75,62 80,80 62,75 50,88 38,75 20,80 25,62 12,50 25,38 20,20 38,25" fill="rgba(0,0,0,0.6)" stroke="url(#silverMetal)" strokeWidth="3" />
        {/* Inner Web3 Spark */}
        <polygon points="50,25 57,43 75,50 57,57 50,75 43,57 25,50 43,43" fill="url(#silverMetal)" filter="drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))" />
        <circle cx="50" cy="50" r="5" fill="#ffffff" />
      </svg>
    );
  }

  // default to Gold Overlord
  return (
    <svg viewBox="0 0 100 100" className="card-badge-art">
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#goldGlow)" />
      {/* Outer Rotating Circles */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldMetal)" strokeWidth="2.5" strokeDasharray="15, 5, 5, 5" />
      <circle cx="50" cy="50" r="36" fill="rgba(0,0,0,0.65)" stroke="url(#goldMetal)" strokeWidth="1.5" />
      {/* Crown / Mastery Sigil */}
      <path d="M50,22 L60,38 L78,32 L68,52 L78,72 L50,65 L22,72 L32,52 L22,32 L40,38 Z" fill="rgba(0,0,0,0.8)" stroke="url(#goldMetal)" strokeWidth="2" />
      {/* Glowing Star in center */}
      <polygon points="50,30 54,42 66,42 56,50 60,62 50,54 40,62 44,50 34,42 46,42" fill="url(#goldMetal)" filter="drop-shadow(0 0 12px rgba(217, 70, 239, 0.9))" />
      {/* Tiny diamond particles */}
      <polygon points="50,12 52,15 50,18 48,15" fill="#ffffff" />
      <polygon points="50,82 52,85 50,88 48,85" fill="#ffffff" />
      <polygon points="12,50 15,52 18,50 15,48" fill="#ffffff" />
      <polygon points="82,50 85,52 88,50 85,48" fill="#ffffff" />
    </svg>
  );
};

export default function BadgeCard({ name, description, styleName }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Core 3D Tilt Event Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Deltas normalized between -1 and 1
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    // Tilt calculations (up to 22 degrees of tilt)
    setRotateX(-deltaY * 22);
    setRotateY(deltaX * 22);
    
    // Set sheen gradient coordinates
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;
    setSheenPosition({ x: sheenX, y: sheenY });
  };

  // Smooth Reset on Leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const cardStyle = {
    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
    borderColor: styleName === 'bronze' 
      ? 'rgba(217, 119, 6, 0.2)' 
      : styleName === 'silver' 
        ? 'rgba(6, 182, 212, 0.2)' 
        : 'rgba(217, 70, 239, 0.2)'
  };

  const sheenStyle = {
    background: `radial-gradient(circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 65%)`
  };

  const getStyleLabel = () => {
    if (styleName === 'bronze') return 'BRONZE EXPLORER';
    if (styleName === 'silver') return 'SILVER BUILDER';
    return 'GOLD OVERLORD';
  };

  return (
    <div className="preview-container">
      <div 
        ref={cardRef}
        className="badge-3d-card"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Light Sheen overlay */}
        <div className="card-sheen" style={sheenStyle}></div>
        
        {/* Card Header (3D translated) */}
        <div className="card-header-3d">
          <span>BASE SEPOLIA</span>
          <span style={{ color: 'var(--text-muted)' }}>ID: #777</span>
        </div>

        {/* Floating SVG Badge Illustration */}
        <BadgeSVG styleName={styleName} />

        {/* Metadata Details */}
        <div className="card-content-3d">
          <div className="card-info">
            <h3 className="card-title gradient-text">{name || "Badge Name"}</h3>
            <p className="card-desc">{description || "Provide an inspiring description for this credential..."}</p>
          </div>
        </div>

        {/* Card Footer (3D translated) */}
        <div className="card-footer">
          <span className="tech-signature">{getStyleLabel()}</span>
          <span style={{ color: 'var(--text-muted)' }}>UGF POWERED</span>
        </div>
      </div>
    </div>
  );
}
