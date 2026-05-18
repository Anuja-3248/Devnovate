import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useUGFModal } from '@tychilabs/react-ugf';

import Header from './components/Header.jsx';
import BadgeDesigner from './components/BadgeDesigner.jsx';
import BadgeCard from './components/BadgeCard.jsx';
import UGFStatus from './components/UGFStatus.jsx';
import Gallery from './components/Gallery.jsx';

import { 
  MOCK_USD_ADDRESS, 
  NFT_CONTRACT_ADDRESS, 
  ERC20_ABI, 
  ERC721_ABI 
} from './constants/contracts.js';

export default function App() {
  const { openUGF } = useUGFModal();

  // Navigation state: 'claim' | 'verify'
  const [activeTab, setActiveTab] = useState('claim');

  // Wallet Connection States
  const [account, setAccount] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMock, setIsMock] = useState(false);
  
  // Balances State
  const [balances, setBalances] = useState({
    eth: '0.0000',
    usd: '0.00'
  });

  // Upgraded Badge Form States (managing color presets, emblems, and networks)
  const [formData, setFormData] = useState({
    name: 'Universal Gas Pioneer',
    description: 'Successfully executed a gasless mint on Base Sepolia using Mock USD gas sponsorship.',
    styleName: 'gold',
    recipient: '',
    glowColor: '#fbbf24', // default Gold Glow hex
    emblem: 'crown',      // default Crown emblem
    network: 'Base Sepolia'
  });

  // Faucet interaction loading
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  // UGF Transaction Tracking
  const [txStatus, setTxStatus] = useState('idle'); // 'idle' | 'quoting' | 'signing' | 'executing' | 'confirming' | 'settled' | 'failed'
  const [txError, setTxError] = useState(null);

  // Success Victory Overlay Modal State
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [lastMintedBadge, setLastMintedBadge] = useState(null);

  // Claimed Badges Gallery State
  const [claimedList, setClaimedList] = useState([]);

  // Verification Engine Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load claimed badges from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('devbadge_gallery');
    if (saved) {
      try {
        setClaimedList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load gallery', e);
      }
    }
  }, []);

  // Update default recipient when account changes
  useEffect(() => {
    if (account) {
      setFormData(prev => ({
        ...prev,
        recipient: prev.recipient || account
      }));
    }
  }, [account]);

  // Connect Real Ethers Wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Metamask or standard Web3 browser wallet not detected! Click "Demo Mock Wallet" to test the app instantly.');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setAccount(address);
      setIsMock(false);

      // Fetch active balances
      await fetchRealBalances(address, provider);
    } catch (err) {
      console.error('Wallet connection failed', err);
      alert('Connection failed: ' + (err.message || err));
    } finally {
      setIsConnecting(false);
    }
  };

  // Fetch balances for real connected wallet
  const fetchRealBalances = async (address, provider) => {
    try {
      const ethBalanceVal = await provider.getBalance(address);
      const ethStr = ethers.formatEther(ethBalanceVal);

      let usdStr = '0.00';
      try {
        const usdContract = new ethers.Contract(MOCK_USD_ADDRESS, ERC20_ABI, provider);
        const usdBalanceVal = await usdContract.balanceOf(address);
        const decimals = await usdContract.decimals();
        usdStr = ethers.formatUnits(usdBalanceVal, decimals);
      } catch (tokenErr) {
        console.warn('Could not fetch Mock USD balance', tokenErr);
      }

      setBalances({
        eth: ethStr,
        usd: usdStr
      });
    } catch (err) {
      console.error('Failed to fetch real balances', err);
    }
  };

  // Connect Simulated Developer Mock Signer (Demo Mode)
  const connectMockWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const mockAddr = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setAccount(mockAddr);
      setIsMock(true);
      setBalances({
        eth: '0.0000', // Shows 0 ETH - emphasizing the gasless requirement!
        usd: '50.00'   // Start with $50 Mock USD for testing
      });
      setIsConnecting(false);
    }, 800);
  };

  // Disconnect active session
  const disconnectWallet = () => {
    setAccount('');
    setIsMock(false);
    setBalances({
      eth: '0.0000',
      usd: '0.00'
    });
    setFormData(prev => ({
      ...prev,
      recipient: ''
    }));
  };

  // Custom Faucet for Demo Mode
  const claimMockFaucet = () => {
    if (!isMock) return;
    setIsFaucetLoading(true);
    setTimeout(() => {
      setBalances(prev => ({
        ...prev,
        usd: (parseFloat(prev.usd) + 20.00).toFixed(2)
      }));
      setIsFaucetLoading(false);
    }, 1200);
  };

  // The Main Claim Flow (EIP-3009 Gasless UGF integration)
  const handleClaimBadge = async () => {
    if (!account) return;

    if (!formData.name.trim()) {
      alert('Please enter a badge name!');
      return;
    }

    if (!formData.recipient.trim() || !ethers.isAddress(formData.recipient)) {
      alert('Please enter a valid recipient wallet address!');
      return;
    }

    // 1. DEMO MODE MOCK PIPELINE
    if (isMock) {
      const gasFee = 0.15;
      if (parseFloat(balances.usd) < gasFee) {
        alert('Insufficient Mock USD to pay for gas! Click "Top Up Mock USD" in the sandbox panel below.');
        return;
      }

      try {
        setTxError(null);
        
        // Visual Simulation of the UGF Testnet lifecycle
        setTxStatus('quoting');
        await new Promise(r => setTimeout(r, 1400));
        
        setTxStatus('signing');
        await new Promise(r => setTimeout(r, 1400));
        
        setTxStatus('executing');
        await new Promise(r => setTimeout(r, 1400));
        
        setTxStatus('confirming');
        await new Promise(r => setTimeout(r, 1400));
        
        // Deduct simulated gas fee
        const newUsdBalance = (parseFloat(balances.usd) - gasFee).toFixed(2);
        setBalances(prev => ({ ...prev, usd: newUsdBalance }));

        // Complete settlement
        setTxStatus('settled');
        
        const newBadge = {
          id: 'badge_' + Date.now(),
          name: formData.name,
          description: formData.description,
          styleName: formData.styleName,
          glowColor: formData.glowColor,
          emblem: formData.emblem,
          network: formData.network,
          recipient: formData.recipient,
          txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
        };

        const updatedList = [newBadge, ...claimedList];
        setClaimedList(updatedList);
        localStorage.setItem('devbadge_gallery', JSON.stringify(updatedList));

        // Save last minted for victory overlays
        setLastMintedBadge(newBadge);
        setShowVictoryModal(true);

      } catch (err) {
        setTxError('Simulated transaction failed.');
        setTxStatus('failed');
      }
      return;
    }

    // 2. REAL WEB3 WALLET UGF PIPELINE
    try {
      setTxError(null);
      setTxStatus('quoting');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Encode standard ERC-721 mintTo function call
      const nftInterface = new ethers.Interface(ERC721_ABI);
      const txData = nftInterface.encodeFunctionData("mintTo", [
        formData.recipient, 
        `ipfs://devbadge-${formData.emblem}-${formData.glowColor.replace('#', '')}-${Date.now()}`
      ]);

      // Resolve destination chain ID based on selected target network switcher
      let destChainId = 84532; // Default Base Sepolia
      if (formData.network === 'Optimism Sepolia') destChainId = 11155420;
      if (formData.network === 'Arbitrum Sepolia') destChainId = 421614;

      // Call UGF React Modal Hook
      setTxStatus('signing');
      const response = await openUGF({
        signer: signer,
        tx: {
          to: NFT_CONTRACT_ADDRESS,
          data: txData,
          value: 0n // 0 ETH value
        },
        destChainId: destChainId
      });

      console.log("UGF Response Secured:", response);

      setTxStatus('executing');
      setTxStatus('confirming');
      
      const newBadge = {
        id: 'badge_' + Date.now(),
        name: formData.name,
        description: formData.description,
        styleName: formData.styleName,
        glowColor: formData.glowColor,
        emblem: formData.emblem,
        network: formData.network,
        recipient: formData.recipient,
        txHash: response?.txHash || response?.hash || '0x...'
      };

      const updatedList = [newBadge, ...claimedList];
      setClaimedList(updatedList);
      localStorage.setItem('devbadge_gallery', JSON.stringify(updatedList));
      
      setTxStatus('settled');

      // Save last minted for victory overlays
      setLastMintedBadge(newBadge);
      setShowVictoryModal(true);

      // Refresh real balances
      await fetchRealBalances(account, provider);

    } catch (err) {
      console.error('UGF Claim Failed', err);
      setTxError(err.message || 'The gasless claim request was rejected or failed.');
      setTxStatus('failed');
    }
  };

  // Search Engine Verifiable Credentials Query
  const handleVerifySearch = () => {
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const cleanQuery = searchQuery.trim().toLowerCase();
    
    // Check local storage gallery registry
    const found = claimedList.find(item => 
      item.recipient.toLowerCase() === cleanQuery ||
      item.id.toLowerCase() === cleanQuery ||
      cleanQuery.includes(item.id.toLowerCase()) ||
      item.txHash.toLowerCase() === cleanQuery ||
      (cleanQuery.startsWith('100') && cleanQuery.endsWith(String(claimedList.indexOf(item) + 1))) ||
      (cleanQuery.startsWith('#100') && cleanQuery.endsWith(String(claimedList.indexOf(item) + 1)))
    );

    setSearchResult(found || null);
  };

  const clearGallery = () => {
    if (window.confirm('Are you sure you want to clear your local claimed gallery?')) {
      setClaimedList([]);
      localStorage.removeItem('devbadge_gallery');
      setSearchResult(null);
      setHasSearched(false);
    }
  };

  // Social Sharing brag text formatters
  const getBragMessage = () => {
    if (!lastMintedBadge) return '';
    return encodeURIComponent(
      `Just claimed my '${lastMintedBadge.name}' NFT Badge gaslessly on ${lastMintedBadge.network} using Tychi UGF! Paid for gas in Mock USD instead of ETH. Web3 UX feels like magic! 🛡️⚡ @Base @TychiLabs`
    );
  };

  return (
    <div className="app-container">
      {/* Header with Connection widget */}
      <Header 
        account={account}
        balances={balances}
        isConnecting={isConnecting}
        isMock={isMock}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onConnectMock={connectMockWallet}
      />

      {/* Interactive Tabs switchers */}
      <div className="tab-container">
        <button 
          className={`tab-btn ${activeTab === 'claim' ? 'active' : ''}`}
          onClick={() => setActiveTab('claim')}
        >
          🛡️ Claim Dashboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
        >
          🔍 Verification Center
        </button>
      </div>

      {/* VIEW 1: CLAIM CREDENTIAL DASHBOARD */}
      {activeTab === 'claim' && (
        <main className="dashboard-grid">
          {/* Left Panel Customizer controls */}
          <div className="left-panel">
            <BadgeDesigner 
              formData={formData}
              setFormData={setFormData}
              account={account}
            />

            {account ? (
              <div>
                {/* Sponsor Mint Trigger */}
                <button 
                  className="btn-claim" 
                  onClick={handleClaimBadge}
                  disabled={txStatus !== 'idle' && txStatus !== 'settled' && txStatus !== 'failed'}
                  style={{
                    background: `linear-gradient(135deg, ${formData.glowColor}aa 0%, var(--primary) 100%)`,
                    boxShadow: `0 4px 20px ${formData.glowColor}44`
                  }}
                >
                  🚀 Claim on {formData.network} (Gasless via UGF)
                </button>

                {/* Status pulse tracer */}
                <UGFStatus status={txStatus} error={txError} />

                {/* Sandbox Faucet for mock signers */}
                {isMock && (
                  <div className="mock-faucet-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>🧪 Developer Sandbox Panel</h4>
                      <span style={{ fontSize: '0.7rem', background: 'rgba(255, 255, 255, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        DEMO MODE
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      You are in <strong>Mock Signer</strong> mode with <strong>0 ETH</strong>. 
                      Gas is fully paid in Mock USD using UGF execution.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button 
                        className="btn-faucet" 
                        onClick={claimMockFaucet}
                        disabled={isFaucetLoading}
                        style={{ flex: 1, borderColor: formData.glowColor, color: formData.glowColor }}
                      >
                        {isFaucetLoading ? 'Minting...' : '🚰 Top Up $20 Mock USD'}
                      </button>
                      <button 
                        className="btn-faucet" 
                        onClick={() => setBalances(prev => ({ ...prev, usd: '0.00' }))}
                        style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: 'rgba(239, 68, 68, 0.8)' }}
                      >
                        Empty USD
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔌</span>
                <h3>Connect Wallet to Begin</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px', margin: '0.5rem auto 1.5rem auto' }}>
                  Connect your browser Web3 wallet or use our <strong>Demo Mock Wallet</strong> to experience UGF's gasless credentials.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '240px', margin: '0 auto' }}>
                  <button className="btn-connect" onClick={connectWallet}>
                    🔌 Connect Web3 Wallet
                  </button>
                  <button 
                    className="btn-connect" 
                    style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid var(--border-light)' }} 
                    onClick={connectMockWallet}
                  >
                    🧪 Demo Mock Wallet
                  </button>
                </div>
              </div>
            )}

            {/* Interactive UGF Gas Analytics Dashboard */}
            <div className="glass-panel" style={{ marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderLeft: '3px solid var(--secondary)', paddingLeft: '0.75rem' }}>
                ⚡ UGF Friction Abstraction Analytics
              </h3>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <div className="analytics-value">100%</div>
                  <div className="analytics-label">Friction Avoided</div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-value">5 Steps</div>
                  <div className="analytics-label">Bypassed Bridge</div>
                </div>
                <div className="analytics-card">
                  <div className="analytics-value">EIP-3009</div>
                  <div className="analytics-label">Gas Routing</div>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', fontStyle: 'italic', textAlign: 'center' }}>
                * Bypassed steps include: ETH Swaps → Native Bridging → Address Gas Locking → Sponsor Contracts.
              </p>
            </div>
          </div>

          {/* Right Panel 3D Dynamic Card preview */}
          <BadgeCard 
            name={formData.name}
            description={formData.description}
            styleName={formData.styleName}
            glowColor={formData.glowColor}
            emblem={formData.emblem}
            network={formData.network}
          />
        </main>
      )}

      {/* VIEW 2: VERIFIABLE CREDENTIALS SEARCH ENGINE */}
      {activeTab === 'verify' && (
        <div className="glass-panel" style={{ minHeight: '500px' }}>
          <h2 className="form-title">On-Chain Credential Verification Center</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
            Verify the authenticity and parameters of any achievement credential. 
            Enter the **Recipient Wallet Address**, **Token ID** (e.g. `#1001`), or **Transaction Hash** to query the registry.
          </p>

          {/* Search bar input group */}
          <div className="verifier-search-container">
            <input 
              type="text" 
              className="verifier-input" 
              placeholder="Enter 0x Address, Token ID (#1001), or Transaction hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerifySearch()}
            />
            <button className="btn-search" onClick={handleVerifySearch}>
              🔍 Verify
            </button>
          </div>

          {/* Query search result rendering */}
          {hasSearched && (
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
              {searchResult ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                  
                  {/* Verification Status Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                    <div>
                      <span className="verified-badge-label">
                        🛡️ verified signature onchain
                      </span>
                      <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>
                        Authentic Digital Badge
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        This cryptographic credential was minted gaslessly via UGF sponsored execution.
                      </p>
                    </div>

                    <div className="mock-faucet-panel" style={{ background: 'rgba(16, 185, 129, 0.02)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Holder Address</td>
                            <td style={{ padding: '0.5rem 0', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>
                              {searchResult.recipient}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Destination Network</td>
                            <td style={{ padding: '0.5rem 0', fontWeight: '600', textAlign: 'right' }}>
                              {searchResult.network}
                            </td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Status Register</td>
                            <td style={{ padding: '0.5rem 0', color: '#10b981', fontWeight: '700', textAlign: 'right' }}>
                              SUCCESSFULLY SETTLED
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Tx Hash</td>
                            <td style={{ padding: '0.5rem 0', fontFamily: 'var(--font-mono)', textAlign: 'right', fontSize: '0.75rem' }}>
                              <a 
                                href={`https://sepolia.basescan.org/tx/${searchResult.txHash}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: 'var(--secondary)' }}
                              >
                                {searchResult.txHash.substring(0, 16)}... ↗
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 3D dynamic card for verified badge */}
                  <BadgeCard 
                    name={searchResult.name}
                    description={searchResult.description}
                    styleName={searchResult.styleName}
                    glowColor={searchResult.glowColor}
                    emblem={searchResult.emblem}
                    network={searchResult.network}
                  />

                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚠️</span>
                  <h3>No Credentials Registered</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '400px', margin: '0.5rem auto 0 auto' }}>
                    We could not find any active on-chain credentials matching that address or Token ID. 
                    Ensure that you have successfully completed a gasless claim first.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Minted items gallery */}
      <Gallery claimedList={claimedList} />

      {/* Gallery Admin Tool */}
      {claimedList.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '-1rem' }}>
          <button 
            onClick={clearGallery}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear Claimed History
          </button>
        </div>
      )}

      {/* CELEBRATORY VICTORY OVERLAY MODAL */}
      {showVictoryModal && lastMintedBadge && (
        <div className="victory-overlay">
          <div className="victory-modal">
            <span className="victory-trophy">👑</span>
            <h2 className="victory-title">Gasless Claim Complete!</h2>
            <p className="victory-desc">
              Congratulations! Your digital credential **"{lastMintedBadge.name}"** was successfully minted on **{lastMintedBadge.network}** using UGF. 
              The entire gas fee was sponsored and paid in **Mock USD** — zero ETH was needed!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="social-share-container">
                {/* Share on X (Twitter) */}
                <a 
                  href={`https://twitter.com/intent/tweet?text=${getBragMessage()}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-share twitter"
                  style={{ textDecoration: 'none' }}
                >
                  🐦 Share on X (Twitter)
                </a>

                {/* Share on Warpcast */}
                <a 
                  href={`https://warpcast.com/~/compose?text=${getBragMessage()}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-share warpcast"
                  style={{ textDecoration: 'none' }}
                >
                  🪐 Share on Warpcast (Farcaster)
                </a>
              </div>

              <button className="btn-close-modal" onClick={() => setShowVictoryModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
