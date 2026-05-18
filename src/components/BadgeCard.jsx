import React, { useRef, useState } from 'react';

// Dynamic SVG Emblem Render
const EmblemSVG = ({ emblem, color }) => {
  const glowStyle = {
    filter: `drop-shadow(0 0 10px ${color})`,
    transition: 'all 0.4s ease'
  };

  switch (emblem) {
    case 'shield':
      return (
        <svg viewBox="0 0 100 100" className="card-badge-art" style={glowStyle}>
          {/* Cyber Shield */}
          <polygon 
            points="50,10 85,25 85,60 50,90 15,60 15,25" 
            fill="rgba(0,0,0,0.4)" 
            stroke={color} 
            strokeWidth="3.5" 
          />
          <polygon 
            points="50,18 77,30 77,56 50,80 23,56 23,30" 
            fill={`${color}22`} 
            stroke={color} 
            strokeWidth="1.5" 
            strokeDasharray="4 2"
          />
          <path d="M50,30 L50,68 M35,45 L65,45" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 100 100" className="card-badge-art" style={glowStyle}>
          {/* Digital Crown */}
          <path 
            d="M15,75 L20,35 L40,55 L50,25 L60,55 L80,35 L85,75 Z" 
            fill={`${color}22`} 
            stroke={color} 
            strokeWidth="4" 
            strokeLinejoin="round"
          />
          <line x1="10" y1="75" x2="90" y2="75" stroke={color} strokeWidth="5" strokeLinecap="round" />
          <circle cx="20" cy="30" r="4" fill="#ffffff" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="20" r="5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
          <circle cx="80" cy="30" r="4" fill="#ffffff" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="55" r="7" fill="none" stroke={color} strokeWidth="2.5" />
          <polygon points="50,51 52,56 57,56 53,59 55,64 50,61 45,64 47,59 43,56 48,56" fill={color} />
        </svg>
      );
    case 'lightning':
      return (
        <svg viewBox="0 0 100 100" className="card-badge-art" style={glowStyle}>
          {/* Lightning Bolt */}
          <polygon 
            points="60,10 25,55 50,55 40,90 75,45 50,45" 
            fill={`${color}22`} 
            stroke={color} 
            strokeWidth="4" 
            strokeLinejoin="round"
          />
          <polygon 
            points="58,15 29,51 50,51 42,82 71,49 50,49" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            opacity="0.75"
          />
        </svg>
      );
    case 'planet':
      return (
        <svg viewBox="0 0 100 100" className="card-badge-art" style={glowStyle}>
          {/* Space Orbit / Planet */}
          <ellipse cx="50" cy="50" rx="45" ry="12" fill="none" stroke={color} strokeWidth="4.5" transform="rotate(-20 50 50)" />
          <circle cx="50" cy="50" r="24" fill="rgba(0,0,0,0.5)" stroke={color} strokeWidth="4" />
          <path d="M30,42 C34,30 42,26 50,26 C62,26 71,35 73,47" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          <circle cx="68" cy="35" r="4" fill={color} />
        </svg>
      );
    case 'star':
    default:
      return (
        <svg viewBox="0 0 100 100" className="card-badge-art" style={glowStyle}>
          {/* Radiant Star */}
          <polygon 
            points="50,8 63,38 95,38 69,57 79,88 50,69 21,88 31,57 5,38 37,38" 
            fill={`${color}22`} 
            stroke={color} 
            strokeWidth="4" 
            strokeLinejoin="round"
          />
          <polygon 
            points="50,18 59,41 83,41 64,55 71,78 50,64 29,78 36,55 17,41 41,41" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            opacity="0.7"
          />
        </svg>
      );
  }
};

export default function BadgeCard({ name, description, styleName, glowColor, emblem, network }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic 3D rotation handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate relative mouse position (from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // 3D rotation transforms
  const rotateX = -coords.y * 30; // Max 15 degrees tilt
  const rotateY = coords.x * 30;
  
  const cardStyle = {
    transform: isHovered 
      ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
      : 'rotateX(0deg) rotateY(0deg) scale(1)',
    borderColor: isHovered ? glowColor : 'rgba(255, 255, 255, 0.08)',
    boxShadow: isHovered 
      ? `0 25px 60px -15px ${glowColor}55, 0 10px 30px -10px rgba(0, 0, 0, 0.5)`
      : '0 15px 35px rgba(0, 0, 0, 0.4)'
  };

  // Specular sheen highlight coordinate
  const sheenStyle = {
    left: `${(coords.x + 0.5) * 200}%`,
    top: `${(coords.y + 0.5) * 200}%`,
    background: `radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`,
    opacity: isHovered ? 1 : 0
  };

  // Helper for preset descriptions
  const getStyleLabel = () => {
    switch (styleName) {
      case 'bronze':
        return 'BRONZE PRESET';
      case 'silver':
        return 'SILVER PRESET';
      case 'gold':
      default:
        return 'GOLD PRESET';
    }
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
        {/* Specular Glare Highlight */}
        <div className="card-sheen" style={sheenStyle} />

        {/* Top Header metadata */}
        <div className="card-header-3d">
          <span>{network || 'BASE SEPOLIA'}</span>
          <span>ID: #100X</span>
        </div>

        {/* Central Vector artwork */}
        <div className="card-content-3d">
          <EmblemSVG emblem={emblem} color={glowColor} />
          
          <div className="card-info">
            <h3 className="card-title" style={{ 
              textShadow: isHovered ? `0 0 12px ${glowColor}88` : 'none',
              transition: 'text-shadow 0.3s ease',
              color: 'var(--text-primary)'
            }}>
              {name || 'Universal Pioneer'}
            </h3>
            <p className="card-desc">
              {description || 'Custom credential validated gaslessly.'}
            </p>
          </div>
        </div>

        {/* Card Footer branding */}
        <div className="card-footer">
          <span className="tech-signature" style={{ color: glowColor }}>
            {getStyleLabel()}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>UGF POWERED</span>
        </div>
      </div>
      
      <p style={{ 
        marginTop: '1.5rem', 
        fontSize: '0.8rem', 
        color: 'var(--text-muted)', 
        fontStyle: 'italic',
        textAlign: 'center' 
      }}>
        ✨ Hover to experience physical 3D parallax lighting & metallic sheen physics
      </p>
    </div>
  );
}
