"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Lock, Star, Shield, Zap, Sparkles } from "lucide-react";
import { useBalance } from "@/context/BalanceContext";

const staticBadges = [
  {
    id: "static-1",
    title: "Gas Saver Pro",
    description: "Saved over $100 in gas fees using UGF.",
    icon: Zap,
    unlocked: false,
    color: "from-green-400 to-emerald-600",
    date: null
  },
  {
    id: "static-2",
    title: "Whale Transactor",
    description: "Processed a single transaction over $10,000.",
    icon: Shield,
    unlocked: false,
    color: "from-blue-400 to-indigo-600",
    date: null
  },
  {
    id: "static-3",
    title: "Social Connector",
    description: "Transacted with 10 different unique wallets.",
    icon: Award,
    unlocked: false,
    color: "from-purple-400 to-pink-600",
    date: null
  }
];

export default function NFTsPage() {
  const { transactions } = useBalance();
  
  // Get dynamic NFTs minted from the AI Assistant
  const mintedNFTs = transactions.filter(tx => tx.type === "Minted");

  // Format them to match the badge card structure
  const dynamicBadges = mintedNFTs.map((nft, index) => ({
    id: `dynamic-${nft.id}`,
    title: nft.amount, // "GhostBadge NFT" etc
    description: "Minted instantly via Ghost AI Assistant.",
    icon: Sparkles,
    unlocked: true,
    color: "from-primary to-accent",
    date: nft.time
  }));

  // Combine dynamic and locked static badges
  const allBadges = [...dynamicBadges, ...staticBadges];

  return (
    <div className="space-y-8 pb-12 min-h-full">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">NFT Trophy Room</h1>
        <p className="text-foreground/70 text-lg">Soulbound tokens representing your journey and reputation on GhostPay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {allBadges.map((badge, index) => {
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={badge.unlocked ? { scale: 1.05, y: -5 } : {}}
              className={`relative rounded-3xl p-1 overflow-hidden group cursor-pointer ${!badge.unlocked ? 'opacity-70 grayscale hover:grayscale-0 transition-all duration-500' : ''}`}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative h-full bg-black/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5 flex flex-col items-center text-center">
                
                {!badge.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-foreground/50" />
                  </div>
                )}
                
                <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${badge.color} relative shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_30px_var(--primary-glow)] transition-shadow duration-500`}>
                  <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                     <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{badge.title}</h3>
                <p className="text-sm text-foreground/70 mb-6">{badge.description}</p>
                
                <div className="mt-auto w-full pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-foreground/50">{badge.unlocked ? 'Minted' : 'Locked'}</span>
                  {badge.date ? (
                    <span className="text-primary font-mono font-medium">{badge.date}</span>
                  ) : (
                    <span className="text-foreground/50 font-mono">--/--/--</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
