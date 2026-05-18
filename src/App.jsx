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

  // Wallet Connection States
  const [account, setAccount] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMock, setIsMock] = useState(false);
  
  // Balances State
  const [balances, setBalances] = useState({
    eth: '0.0000',
    usd: '0.00'
  });

  // Badge Form States
  const [formData, setFormData] = useState({
    name: 'Universal Gas Pioneer',
    description: 'Successfully executed a gasless mint on Base Sepolia using Mock USD gas sponsorship.',
    styleName: 'gold',
    recipient: ''
  });

  // Faucet interaction loading
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  // UGF Transaction Tracking
  const [txStatus, setTxStatus] = useState('idle'); // 'idle' | 'quoting' | 'signing' | 'executing' | 'confirming' | 'settled' | 'failed'
  const [txError, setTxError] = useState(null);

  // Claimed Badges Gallery State (Loads from Local Storage)
  const [claimedList, setClaimedList] = useState([]);

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

  // Connect Real Ethers Wallet (MetaMask, Coinbase Wallet, etc.)
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Metamask or standard Web3 browser wallet not detected! Click "Demo Mock Wallet" to test the app instantly.');
      return;
    }

    try {
      setIsConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request accounts
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
      // 1. Fetch ETH balance
      const ethBalanceVal = await provider.getBalance(address);
      const ethStr = ethers.formatEther(ethBalanceVal);

      // 2. Fetch Mock USD ERC20 balance
      let usdStr = '0.00';
      try {
        const usdContract = new ethers.Contract(MOCK_USD_ADDRESS, ERC20_ABI, provider);
        const usdBalanceVal = await usdContract.balanceOf(address);
        const decimals = await usdContract.decimals();
        usdStr = ethers.formatUnits(usdBalanceVal, decimals);
      } catch (tokenErr) {
        console.warn('Could not fetch Mock USD balance, token may not exist at target address', tokenErr);
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
      // Generate a simulated EOA
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

  // The Main Claim Flow (EIP-3009/EIP-2612 Gasless UGF integration)
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
      // Ensure sufficient Mock USD for the transaction
      const gasFee = 0.15;
      if (parseFloat(balances.usd) < gasFee) {
        alert('Insufficient Mock USD to pay for gas! Click "Top Up Mock USD" in the sandbox panel below.');
        return;
      }

      try {
        setTxError(null);
        
        // Visual Simulation of the UGF Testnet lifecycle
        setTxStatus('quoting');
        await new Promise(r => setTimeout(r, 1500));
        
        setTxStatus('signing');
        await new Promise(r => setTimeout(r, 1500));
        
        setTxStatus('executing');
        await new Promise(r => setTimeout(r, 1500));
        
        setTxStatus('confirming');
        await new Promise(r => setTimeout(r, 1500));
        
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
          recipient: formData.recipient,
          txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
        };

        const updatedList = [newBadge, ...claimedList];
        setClaimedList(updatedList);
        localStorage.setItem('devbadge_gallery', JSON.stringify(updatedList));

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
        `ipfs://devbadge-${formData.styleName}-${Date.now()}`
      ]);

      // Call UGF React Modal Hook
      setTxStatus('signing');
      const response = await openUGF({
        signer: signer,
        tx: {
          to: NFT_CONTRACT_ADDRESS,
          data: txData,
          value: 0n // 0 ETH value
        },
        destChainId: 84532 // Base Sepolia Chain ID
      });

      console.log("UGF Response Secured:", response);

      setTxStatus('executing');
      // Wait briefly for confirmation status
      setTxStatus('confirming');
      
      const newBadge = {
        id: 'badge_' + Date.now(),
        name: formData.name,
        description: formData.description,
        styleName: formData.styleName,
        recipient: formData.recipient,
        txHash: response?.txHash || response?.hash || '0x...'
      };

      const updatedList = [newBadge, ...claimedList];
      setClaimedList(updatedList);
      localStorage.setItem('devbadge_gallery', JSON.stringify(updatedList));
      
      setTxStatus('settled');

      // Refresh real balances
      await fetchRealBalances(account, provider);

    } catch (err) {
      console.error('UGF Claim Failed', err);
      setTxError(err.message || 'The gasless claim request was rejected or failed.');
      setTxStatus('failed');
    }
  };

  const clearGallery = () => {
    if (window.confirm('Are you sure you want to clear your local claimed gallery?')) {
      setClaimedList([]);
      localStorage.removeItem('devbadge_gallery');
    }
  };

  return (
    <div className="app-container">
      {/* Header with Wallet Connection */}
      <Header 
        account={account}
        balances={balances}
        isConnecting={isConnecting}
        isMock={isMock}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        onConnectMock={connectMockWallet}
      />

      {/* Main Grid Dashboard */}
      <main className="dashboard-grid">
        {/* Left Side Controls & Forms */}
        <div className="left-panel">
          <BadgeDesigner 
            formData={formData}
            setFormData={setFormData}
            account={account}
          />

          {account ? (
            <div>
              {/* Claim Action Trigger */}
              <button 
                className="btn-claim" 
                onClick={handleClaimBadge}
                disabled={txStatus !== 'idle' && txStatus !== 'settled' && txStatus !== 'failed'}
              >
                🛡️ Claim Badge (Gasless via UGF)
              </button>

              {/* Step Status Tracker */}
              <UGFStatus status={txStatus} error={txError} />

              {/* Demo Mode / Sandbox Helper Panel */}
              {isMock && (
                <div className="mock-faucet-panel">
                  <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>🧪 Developer Sandbox Panel</h4>
                    <span style={{ fontSize: '0.7rem', background: 'rgba(255, 255, 255, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      DEMO MODE
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    You are in <strong>Mock Signer</strong> mode. Your wallet has <strong>0 ETH</strong>. 
                    When you claim, the UGF engine will pay the gas fee in Mock USD automatically!
                  </p>
                  
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      className="btn-faucet" 
                      onClick={claimMockFaucet}
                      disabled={isFaucetLoading}
                      style={{ flex: 1 }}
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

              {/* Info Block explaining UGF */}
              {!isMock && (
                <div className="mock-faucet-panel" style={{ background: 'rgba(6, 182, 212, 0.03)', borderColor: 'rgba(6, 182, 212, 0.15)' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--secondary)' }}>💡 How does UGF work here?</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Normally, minting an NFT on Base Sepolia requires <strong>ETH</strong> in your wallet to cover gas. 
                    With UGF integration, when you click Claim, our dApp challenges the gateway. The gateway quotes gas in <strong>Mock USD</strong>. 
                    You sign a standard authorization enabling gas payment with <code>USDC</code>, and UGF handles the on-chain minting. <strong>No ETH needed!</strong>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔌</span>
              <h3>Connect Wallet to Claim</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px', margin: '0.5rem auto 1.5rem auto' }}>
                Connect your browser Web3 extension wallet or use our <strong>Demo Mock Wallet</strong> to experience the gasless UGF claim flow.
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
        </div>

        {/* Right Side 3D Preview Card */}
        <BadgeCard 
          name={formData.name}
          description={formData.description}
          styleName={formData.styleName}
        />
      </main>

      {/* Gallery Section */}
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
    </div>
  );
}
