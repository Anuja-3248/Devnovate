import React from 'react';

// Tiny SVG badge for gallery item
const GalleryBadgeSVG = ({ styleName }) => {
  if (styleName === 'bronze') {
    return (
      <svg viewBox="0 0 100 100" className="gallery-art">
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="none" stroke="#fbbf24" strokeWidth="4" />
        <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="rgba(251,191,36,0.15)" stroke="#d97706" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#fbbf24" />
      </svg>
    );
  }
  if (styleName === 'silver') {
    return (
      <svg viewBox="0 0 100 100" className="gallery-art">
        <polygon points="50,12 62,25 80,20 75,38 88,50 75,62 80,80 62,75 50,88 38,75 20,80 25,62 12,50 25,38 20,20 38,25" fill="rgba(6,182,212,0.15)" stroke="#22d3ee" strokeWidth="4" />
        <circle cx="50" cy="50" r="10" fill="#22d3ee" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="gallery-art">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d946ef" strokeWidth="4" strokeDasharray="10, 4" />
      <path d="M50,25 L60,40 L78,35 L68,55 L78,75 L50,68 L22,75 L32,55 L22,35 L40,40 Z" fill="rgba(217,70,239,0.15)" stroke="#f472b6" strokeWidth="2.5" />
      <polygon points="50,42 52,48 58,48 53,52 55,58 50,54 45,58 47,52 42,48 48,48" fill="#ffffff" />
    </svg>
  );
};

export default function Gallery({ claimedList }) {
  if (!claimedList || claimedList.length === 0) {
    return (
      <div className="glass-panel gallery-section" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>Minted Credentials Gallery</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '1rem auto 0 auto' }}>
          No credentials claimed by this wallet yet. Fill in your details above and execute your first gasless transaction using UGF!
        </p>
      </div>
    );
  }

  // Helper to format recipient address
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="gallery-section">
      <h2 style={{ fontSize: '1.4rem', borderLeft: '3px solid var(--secondary)', paddingLeft: '0.75rem' }}>
        Minted Credentials Gallery ({claimedList.length})
      </h2>
      
      <div className="gallery-grid">
        {claimedList.map((item, index) => (
          <div key={item.id || index} className="gallery-card">
            <GalleryBadgeSVG styleName={item.styleName} />
            <div>
              <h3 className="gallery-title">{item.name}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {item.description}
              </p>
            </div>
            
            <div style={{ width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="gallery-id">Token ID: #100{index + 1}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Owner: {formatAddress(item.recipient)}
              </span>
            </div>

            {item.txHash && (
              <a 
                href={`https://sepolia.basescan.org/tx/${item.txHash}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="gallery-link"
              >
                🔍 View on Basescan ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
