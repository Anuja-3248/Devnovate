import React from 'react';

// pre-configured premium color presets
const COLOR_PRESETS = [
  { name: 'cyan', hex: '#06b6d4', label: 'Cyan Glow' },
  { name: 'purple', hex: '#8b5cf6', label: 'Purple Glow' },
  { name: 'emerald', hex: '#10b981', label: 'Green Glow' },
  { name: 'pink', hex: '#f43f5e', label: 'Pink Glow' },
  { name: 'gold', hex: '#fbbf24', label: 'Gold Glow' }
];

// pre-configured emblem presets
const EMBLEM_PRESETS = [
  { id: 'star', label: '⭐ Star' },
  { id: 'shield', label: '🛡️ Shield' },
  { id: 'crown', label: '👑 Crown' },
  { id: 'lightning', label: '⚡ Spark' },
  { id: 'planet', label: '🪐 Orbit' }
];

// pre-configured destination blockchains
const NETWORKS = [
  { id: 'Base Sepolia', label: '🔵 Base Sepolia' },
  { id: 'Optimism Sepolia', label: '🔴 Optimism Sepolia' },
  { id: 'Arbitrum Sepolia', label: '📯 Arbitrum Sepolia' }
];

export default function BadgeDesigner({ formData, setFormData, account }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelect = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const autofillSelf = () => {
    if (!account) return;
    setFormData(prev => ({
      ...prev,
      recipient: account
    }));
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h2 className="form-title">Customize Your Credential</h2>

      {/* Target Destination Blockchain Switcher */}
      <div className="form-group">
        <label className="form-label">Destination Network</label>
        <select 
          name="network" 
          className="form-input" 
          value={formData.network} 
          onChange={handleChange}
          style={{ cursor: 'pointer' }}
        >
          {NETWORKS.map(net => (
            <option key={net.id} value={net.id} style={{ backgroundColor: 'var(--bg-dark)' }}>
              {net.label}
            </option>
          ))}
        </select>
      </div>

      {/* Badge Name Input */}
      <div className="form-group">
        <label className="form-label">Badge Title</label>
        <input 
          type="text" 
          name="name" 
          className="form-input" 
          value={formData.name} 
          onChange={handleChange}
          placeholder="e.g. UGF Integration Pioneer"
          maxLength={30}
        />
      </div>

      {/* Badge Description Input */}
      <div className="form-group">
        <label className="form-label">Achievement Description</label>
        <textarea 
          name="description" 
          className="form-input" 
          value={formData.description} 
          onChange={handleChange}
          placeholder="Describe the milestone that this badge validates onchain..."
          rows={2}
          maxLength={120}
          style={{ resize: 'none' }}
        />
      </div>

      {/* Emblem Presets Selector */}
      <div className="form-group">
        <label className="form-label">Select Central Emblem</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {EMBLEM_PRESETS.map(emb => (
            <button
              key={emb.id}
              type="button"
              onClick={() => handleSelect('emblem', emb.id)}
              className="style-option"
              style={{
                flex: 1,
                padding: '0.6rem 0.3rem',
                minWidth: '70px',
                borderColor: formData.emblem === emb.id ? formData.glowColor : 'var(--border-light)',
                background: formData.emblem === emb.id ? `${formData.glowColor}15` : 'rgba(255, 255, 255, 0.02)',
                color: formData.emblem === emb.id ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{emb.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Preset Colors Selection */}
      <div className="form-group">
        <label className="form-label">Select Theme Glow Color</label>
        <div className="color-picker-grid">
          {COLOR_PRESETS.map(col => (
            <button
              key={col.name}
              type="button"
              className={`color-dot ${formData.glowColor === col.hex ? 'selected' : ''}`}
              style={{ 
                backgroundColor: col.hex, 
                color: col.hex,
                boxShadow: formData.glowColor === col.hex ? `0 0 14px ${col.hex}` : 'none' 
              }}
              onClick={() => handleSelect('glowColor', col.hex)}
              title={col.label}
            />
          ))}
        </div>
      </div>

      {/* Recipient Wallet Address Input */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <label className="form-label">Recipient Wallet Address</label>
          {account && (
            <button 
              type="button" 
              onClick={autofillSelf}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--secondary)',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                marginLeft: 'auto'
              }}
            >
              Fill My Wallet
            </button>
          )}
        </div>
        <input 
          type="text" 
          name="recipient" 
          className="form-input" 
          value={formData.recipient} 
          onChange={handleChange}
          placeholder="0x..."
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
        />
      </div>
    </div>
  );
}
