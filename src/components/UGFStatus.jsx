import React from 'react';

export default function UGFStatus({ status, error }) {
  if (status === 'idle') return null;

  // Determine stage visual active states
  const getStepClass = (step) => {
    switch (step) {
      case 1: // Quote Stage
        if (status === 'quoting') return 'active';
        if (['signing', 'executing', 'confirming', 'settled'].includes(status)) return 'completed';
        return '';
      case 2: // Settle / Signature Stage
        if (status === 'signing') return 'active';
        if (['executing', 'confirming', 'settled'].includes(status)) return 'completed';
        return '';
      case 3: // Execute Stage
        if (status === 'executing') return 'active';
        if (['confirming', 'settled'].includes(status)) return 'completed';
        return '';
      case 4: // Confirm / Block Finalize Stage
        if (status === 'confirming') return 'active';
        if (status === 'settled') return 'completed';
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="glass-panel" style={{ marginTop: '1.5rem', border: error ? '1px solid var(--accent)' : '1px solid var(--border-light)' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {status === 'settled' ? '🎉 Transaction Succeeded!' : status === 'failed' ? '❌ Transaction Failed' : '⚡ UGF Gasless Engine Active'}
      </h3>

      {error ? (
        <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', background: 'rgba(239, 68, 68, 0.08)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          {error}
        </div>
      ) : (
        <div className="ugf-status-panel">
          {/* Step 1: Quote */}
          <div className={`status-step ${getStepClass(1)}`}>
            <div className="step-indicator">1</div>
            <div className="step-info">
              <span className="step-title">Quote Gas Fees</span>
              <span className="step-desc">
                {status === 'quoting' ? 'Quoting gas in Mock USD from gateway...' : 'Gas fee successfully quoted in Mock USD'}
              </span>
            </div>
          </div>

          {/* Step 2: Signature */}
          <div className={`status-step ${getStepClass(2)}`}>
            <div className="step-indicator">2</div>
            <div className="step-info">
              <span className="step-title">Sign Gas Authorization</span>
              <span className="step-desc">
                {status === 'signing' ? 'Awaiting EIP-3009 transfer signature in wallet...' : 'EIP-3009 signature secured'}
              </span>
            </div>
          </div>

          {/* Step 3: Remote Execution */}
          <div className={`status-step ${getStepClass(3)}`}>
            <div className="step-indicator">3</div>
            <div className="step-info">
              <span className="step-title">Sponsor & Execute</span>
              <span className="step-desc">
                {status === 'executing' ? 'Broadcasting sponsored remote mint on Base Sepolia...' : 'Transaction successfully broadcasted'}
              </span>
            </div>
          </div>

          {/* Step 4: Block finalization */}
          <div className={`status-step ${getStepClass(4)}`}>
            <div className="step-indicator">4</div>
            <div className="step-info">
              <span className="step-title">Finalize Badge</span>
              <span className="step-desc">
                {status === 'confirming' ? 'Waiting for block confirmation on Base Sepolia...' : status === 'settled' ? 'Badge minted and confirmed!' : 'Awaiting broadcast...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
