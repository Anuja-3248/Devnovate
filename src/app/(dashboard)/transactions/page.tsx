"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBalance } from "@/context/BalanceContext";
import { ArrowUpRight, ArrowDownLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function TransactionsPage() {
  const { transactions } = useBalance();

  return (
    <div className="flex flex-col gap-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Transaction History</h1>
        <p className="text-foreground/60">View all your past sends, receives, and mints.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col gap-4 relative z-10">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-foreground/40" />
              </div>
              <p className="text-foreground/50">No transactions found.</p>
            </div>
          ) : (
            transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                    tx.type === "Sent" ? "bg-red-500/10 text-red-400" :
                    tx.type === "Received" ? "bg-green-500/10 text-green-400" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {tx.type === "Sent" ? <ArrowUpRight className="w-5 h-5" /> : 
                     tx.type === "Received" ? <ArrowDownLeft className="w-5 h-5" /> : 
                     <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white group-hover:text-primary transition-colors">{tx.type}</span>
                    <span className="text-sm text-foreground/50">{tx.address}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className={`font-mono font-medium ${
                      tx.type === "Sent" ? "text-white" :
                      tx.type === "Received" ? "text-green-400" :
                      "text-primary"
                    }`}>
                      {tx.amount}
                    </span>
                    <span className="text-xs text-foreground/40">{tx.time}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {tx.status}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
