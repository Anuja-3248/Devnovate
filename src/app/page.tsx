"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, ChevronRight, CheckCircle } from "lucide-react";
import styles from "./page.module.css";

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Browser extension wallet",
    icon: (
      <svg width="28" height="28" viewBox="0 0 318 318" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M274.1 35.5L162.3 118.6l20.1-47.3L274.1 35.5z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44.4 35.5l110.9 83.9-19.1-47.6L44.4 35.5z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M238.3 206.8l-29.8 45.7 63.8 17.6 18.4-62.1-52.4-1.2z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27.9 208l18.4 62.1 63.6-17.6-29.8-45.7-52.2 1.2z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M106.2 138.2l-18 27.2 64.1 2.8-2.3-68.7-43.8 38.7z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M212.3 138.2l-44.4-39.5-1.5 69.5 63.9-2.8-18-27.2z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M109.9 252.5l38.6-18.7-33.3-26-5.3 44.7z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M170 233.8l38.4 18.7-5.1-44.7-33.3 26z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#f6851b",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect any mobile wallet",
    icon: (
      <svg width="28" height="28" viewBox="0 0 300 185" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M61.4 36.7C112.9-11.6 196.7-11.6 248.2 36.7L254 42.3c2.7 2.5 2.7 6.7 0 9.3L233.5 71.2c-1.3 1.3-3.5 1.3-4.8 0l-8-7.7C184.3 30.5 115.2 30.5 78.9 63.5l-8.5 8.2c-1.3 1.3-3.5 1.3-4.8 0L44.9 52.1c-2.7-2.5-2.7-6.7 0-9.3L61.4 36.7zM291.2 78.1l18.4 17.7c2.7 2.5 2.7 6.7 0 9.3L225.2 183c-2.7 2.5-7 2.5-9.6 0L155 124.5c-.7-.6-1.7-.6-2.4 0l-60.6 58.5c-2.7 2.5-7 2.5-9.6 0L.4 105.1c-2.7-2.5-2.7-6.7 0-9.3L18.8 78.1c2.7-2.5 7-2.5 9.6 0l60.7 58.5c.7.6 1.7.6 2.4 0l60.6-58.5c2.7-2.5 7-2.5 9.6 0l60.7 58.5c.7.6 1.7.6 2.4 0l60.6-58.5c2.7-2.5 7-2.5 9.6 0z" fill="#3B99FC"/>
      </svg>
    ),
    color: "#3b99fc",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Your key to the open web",
    icon: (
      <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1024" height="1024" rx="220" fill="#0052FF"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M512 692C396.9 692 303 598.1 303 483S396.9 274 512 274s209 93.9 209 209c0 115.1-93.9 209-209 209zm0-282c-40.3 0-73 32.7-73 73s32.7 73 73 73 73-32.7 73-73-32.7-73-73-73z" fill="white"/>
      </svg>
    ),
    color: "#0052ff",
  },
];

type Phase = "idle" | "connecting" | "success";

export default function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface ParticleData {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string;
    }

    let particles: ParticleData[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "rgba(77,184,255,0.7)" : "rgba(169,128,255,0.7)",
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(169,128,255,${(1 - dist / 150) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, []);

  const handleConnect = (wallet: typeof wallets[0]) => {
    if (phase !== "idle") return;
    setSelectedWallet(wallet.name);
    setPhase("connecting");

    // Simulate wallet connection (2s) then show success (1s) then redirect
    setTimeout(() => {
      setPhase("success");
      setTimeout(() => {
        router.push("/home");
      }, 1200);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <header className={styles.header}>
        <h1 className={styles.logo}>KRYPTOS</h1>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Support</a>
          <a href="#" className={styles.navLink}>Docs</a>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>

          {/* Icon */}
          <div className={styles.iconWrapper}>
            {phase === "success" ? (
              <CheckCircle size={28} color="#4ade80" />
            ) : (
              <Wallet size={28} />
            )}
          </div>

          {/* Title */}
          {phase === "idle" && (
            <>
              <h2 className={styles.title}>Connect Your Wallet</h2>
              <p className={styles.subtitle}>
                Choose your preferred wallet to access the decentralized web.
              </p>
            </>
          )}
          {phase === "connecting" && (
            <>
              <h2 className={styles.title}>Connecting…</h2>
              <p className={styles.subtitle}>
                Opening {selectedWallet}. Please approve the connection.
              </p>
            </>
          )}
          {phase === "success" && (
            <>
              <h2 className={styles.title} style={{ color: "#4ade80" }}>Connected!</h2>
              <p className={styles.subtitle}>
                Wallet connected successfully. Redirecting…
              </p>
            </>
          )}

          {/* Wallet Buttons */}
          {phase === "idle" && (
            <div className={styles.walletList}>
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  className={styles.walletBtn}
                  onClick={() => handleConnect(wallet)}
                >
                  <div className={styles.walletIcon}>{wallet.icon}</div>
                  <div className={styles.walletInfo}>
                    <span className={styles.walletName}>{wallet.name}</span>
                    <span className={styles.walletDesc}>{wallet.description}</span>
                  </div>
                  <ChevronRight size={20} className={styles.arrowIcon} />
                </button>
              ))}
            </div>
          )}

          {/* Spinner for connecting */}
          {phase === "connecting" && (
            <div className={styles.spinnerWrap}>
              <div className={styles.spinner} />
              <p className={styles.spinnerLabel}>Awaiting approval…</p>
            </div>
          )}

          {/* Success check */}
          {phase === "success" && (
            <div className={styles.successWrap}>
              <div className={styles.successPulse} />
            </div>
          )}

          {phase === "idle" && (
            <p className={styles.footerLink}>
              New to Web3?{" "}
              <a href="https://ethereum.org/en/wallets/" target="_blank" rel="noopener noreferrer">
                Learn more about wallets
              </a>
            </p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.copyright}>© 2024 KRYPTOS DECENTRALIZED</div>
        <nav className={styles.footerNav}>
          <a href="#" className={styles.footerNavLink}>Privacy Policy</a>
          <a href="#" className={styles.footerNavLink}>Terms of Service</a>
          <a href="#" className={styles.footerNavLink}>Security</a>
        </nav>
      </footer>
    </div>
  );
}
