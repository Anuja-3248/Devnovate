import React from 'react';

export default function Header({ 
  account, 
  balances, 
  isConnecting, 
  isMock, 
  onConnect, 
  onDisconnect, 
  onConnectMock 
}) {
  
  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="app-header glass-panel">
      <div className="logo-section">
        <span className="logo-icon">🛡️</span>
        <div>
          <h1 className="logo-title gradient-text">DevBadge</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Base Sepolia Gasless Credentials
          </p>
        </div>
      </div>

      <div className="wallet-section">
        {/* Faucet Link */}
        <a 
          href="https://universalgasframework.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="faucet-link"
          title="Go to Universal Gas Framework to mint Mock USD"
        >
          🚰 UGF Faucet
        </a>

        {account ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Balance Widget */}
            <div className="wallet-balances">
              <div className="balance-item eth">
                <span>{parseFloat(balances.eth).toFixed(4)}</span> ETH
              </div>
              <div className="balance-item usd">
                <span>{parseFloat(balances.usd).toFixed(2)}</span> Mock USD
              </div>
            </div>

            {/* Wallet Address / Disconnect Button */}
            <button 
              className="btn-connect connected" 
              onClick={onDisconnect}
              title="Click to disconnect"
            >
              {isMock ? '🧪 Mock Signer: ' : '🟢 '}
              {formatAddress(account)}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {/* Connect Mock Wallet */}
            <button 
              className="btn-connect"
              style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid var(--border-light)' }}
              onClick={onConnectMock}
              disabled={isConnecting}
            >
              🧪 Demo Mock Wallet
            </button>

            {/* Connect Web3 Wallet */}
            <button 
              className="btn-connect" 
              onClick={onConnect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : '🔌 Connect Wallet'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
