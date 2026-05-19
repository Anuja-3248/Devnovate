"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Lock, Star, Shield, Zap } from "lucide-react";

const badges = [
  {
    id: 1,
    title: "Early Adopter",
    description: "Joined GhostPay during the closed beta phase.",
    icon: Star,
    unlocked: true,
    color: "from-yellow-400 to-orange-500",
    date: "Oct 12, 2026"
  },
  {
    id: 2,
    title: "Gas Saver Pro",
    description: "Saved over $100 in gas fees using UGF.",
    icon: Zap,
    unlocked: true,
    color: "from-green-400 to-emerald-600",
    date: "Nov 05, 2026"
  },
  {
    id: 3,
    title: "Whale Transactor",
    description: "Processed a single transaction over $10,000.",
    icon: Shield,
    unlocked: false,
    color: "from-blue-400 to-indigo-600",
    date: null
  },
  {
    id: 4,
    title: "Social Connector",
    description: "Transacted with 10 different unique wallets.",
    icon: Award,
    unlocked: false,
    color: "from-purple-400 to-pink-600",
    date: null
  }
];

export default function NFTsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">NFT Achievements</h1>
        <p className="text-foreground/70">Soulbound tokens representing your journey and reputation on GhostPay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={badge.unlocked ? { 
                scale: 1.05,
                rotateY: 10,
                rotateX: 5,
                z: 50
              } : {}}
              style={{ perspective: 1000 }}
              className={`relative rounded-2xl p-1 overflow-hidden group ${!badge.unlocked ? 'opacity-70 grayscale hover:grayscale-0 transition-all duration-500' : ''}`}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
                {!badge.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-foreground/50" />
                  </div>
                )}
                
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br ${badge.color} relative`}>
                  <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                    <Icon className={`w-10 h-10 bg-gradient-to-br ${badge.color} bg-clip-text text-transparent`} style={{ color: badge.unlocked ? 'white' : 'currentColor' }} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{badge.title}</h3>
                <p className="text-sm text-foreground/70 mb-6">{badge.description}</p>
                
                <div className="mt-auto w-full pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-foreground/50">{badge.unlocked ? 'Minted' : 'Locked'}</span>
                  {badge.date ? (
                    <span className="text-primary font-mono">{badge.date}</span>
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
