"use client";

import React, { useState } from "react";
import { Copy, ExternalLink, ShieldCheck, Activity, Wallet, Award, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const [regName, setRegName] = useState("");
  const [regWallet, setRegWallet] = useState("");
  const [regStatus, setRegStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    if (!regName.trim() || !regWallet.trim()) {
      setRegStatus({ type: "error", message: "Please fill in both name and wallet address." });
      return;
    }
    setIsRegistering(true);
    setRegStatus(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, walletAddress: regWallet }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegStatus({ type: "success", message: data.message });
        setRegName("");
        setRegWallet("");
      } else {
        setRegStatus({ type: "error", message: data.error });
      }
    } catch {
      setRegStatus({ type: "error", message: "Failed to connect to the server." });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
              <span className="text-5xl">😎</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                ghostuser.eth <ShieldCheck className="w-6 h-6 text-primary" />
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-foreground/70">
                <span className="font-mono bg-white/5 px-2 py-1 rounded text-sm">0x71C...976F</span>
                <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><Copy className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-white/10 rounded transition-colors"><ExternalLink className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-primary/30">
                <span className="text-sm text-foreground/70">Reputation Score:</span>
                <span className="font-bold text-white text-lg">98/100</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-green-400 font-medium">UGF Whitelisted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Register a Contact */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Register a Contact</h3>
              <p className="text-sm text-foreground/60">Add anyone to the address book so GhostPay AI can send tokens to them by name.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-foreground/70 mb-2 block">Display Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Vijay, Sneha..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-foreground/70 mb-2 block">Wallet Address</label>
                <input
                  type="text"
                  value={regWallet}
                  onChange={(e) => setRegWallet(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-foreground/40 focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
                />
              </div>
            </div>

            {regStatus && (
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                regStatus.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                {regStatus.type === "success"
                  ? <CheckCircle className="w-5 h-5 shrink-0" />
                  : <XCircle className="w-5 h-5 shrink-0" />
                }
                <span className="text-sm">{regStatus.message}</span>
              </div>
            )}

            <Button onClick={handleRegister} disabled={isRegistering} className="gap-2">
              <UserPlus className="w-4 h-4" />
              {isRegistering ? "Registering..." : "Register Contact"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Transactions", value: "156", icon: Activity },
          { label: "Gas Saved", value: "$124.50", icon: Wallet },
          { label: "Badges Minted", value: "2", icon: Award },
          { label: "Account Age", value: "4 Months", icon: ShieldCheck },
        ].map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <stat.icon className="w-6 h-6 text-primary mb-3" />
            <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
            <span className="text-xs text-foreground/50">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Activity Graph */}
      <div className="glass-panel p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6">Activity Graph</h3>
        <div className="h-48 w-full flex items-end justify-between gap-2 px-4">
          {[40, 25, 60, 30, 80, 45, 90, 50, 70, 40, 100, 60].map((height, i) => (
            <div key={i} className="w-full relative group">
              <div
                className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-sm transition-all duration-300 group-hover:from-accent/50 group-hover:to-accent"
                style={{ height: `${height}%` }}
              />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {height} Txs
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-foreground/50 px-4">
          <span>Jan</span><span>Dec</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
          Disconnect Wallet
        </Button>
      </div>
    </div>
  );
}
