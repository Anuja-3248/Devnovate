"use client";

import React from "react";
import { Copy, ExternalLink, ShieldCheck, Activity, Wallet, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent">
            <div className="w-full h-full bg-background rounded-full border-4 border-transparent overflow-hidden flex items-center justify-center relative">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               <span className="text-5xl relative z-10">😎</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                ghostuser.eth
                <ShieldCheck className="w-6 h-6 text-primary" />
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-foreground/70">
                <span className="font-mono bg-white/5 px-2 py-1 rounded text-sm">0x71C...976F</span>
                <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Copy Address">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded transition-colors" title="View on Explorer">
                  <ExternalLink className="w-4 h-4" />
                </button>
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

      {/* Activity Graph Placeholder */}
      <div className="glass-panel p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6">Activity Graph</h3>
        <div className="h-48 w-full flex items-end justify-between gap-2 px-4">
          {[40, 25, 60, 30, 80, 45, 90, 50, 70, 40, 100, 60].map((height, i) => (
            <div key={i} className="w-full relative group">
              <div 
                className="w-full bg-gradient-to-t from-primary/50 to-primary rounded-t-sm transition-all duration-300 group-hover:from-accent/50 group-hover:to-accent"
                style={{ height: `${height}%` }}
              />
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {height} Txs
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-foreground/50 px-4">
          <span>Jan</span>
          <span>Dec</span>
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
