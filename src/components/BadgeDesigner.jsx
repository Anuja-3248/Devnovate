import React from 'react';

export default function BadgeDesigner({ formData, setFormData, account }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStyleSelect = (style) => {
    setFormData(prev => ({
      ...prev,
      styleName: style
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
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 className="form-title">Design Your Gasless Credential</h2>

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
          rows={3}
          maxLength={120}
          style={{ resize: 'none' }}
        />
      </div>

      {/* Presets Selection Grid */}
      <div className="form-group">
        <label className="form-label">Select Badge Visual Preset</label>
        <div className="style-grid">
          {/* Bronze Explorer */}
          <div 
            className={`style-option ${formData.styleName === 'bronze' ? 'selected' : ''}`}
            onClick={() => handleStyleSelect('bronze')}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🛡️</span>
            <span className="style-label">Bronze Explorer</span>
          </div>

          {/* Silver Builder */}
          <div 
            className={`style-option ${formData.styleName === 'silver' ? 'selected' : ''}`}
            onClick={() => handleStyleSelect('silver')}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
            <span className="style-label">Silver Builder</span>
          </div>

          {/* Gold Overlord */}
          <div 
            className={`style-option ${formData.styleName === 'gold' ? 'selected' : ''}`}
            onClick={() => handleStyleSelect('gold')}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>👑</span>
            <span className="style-label">Gold Overlord</span>
          </div>
        </div>
      </div>

      {/* Recipient Wallet Address Input */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '0.5rem' }}>
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
