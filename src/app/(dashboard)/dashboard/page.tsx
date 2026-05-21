"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAccount, useBalance as useWagmiBalance } from "wagmi";
import { baseSepolia } from "wagmi/chains";

interface RecentTx {
  id: string;
  type: "Sent" | "Received" | "Other";
  amount: string;
  address: string;
  time: string;
  status: string;
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useWagmiBalance({ address, chainId: baseSepolia.id });
  const [recentActivity, setRecentActivity] = useState<RecentTx[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setRecentActivity([]);
      setActivityError(null);
      return;
    }

    const fetchRecentActivity = async () => {
      setActivityLoading(true);
      setActivityError(null);

      try {
        const response = await fetch(`/api/sepolia-txs?address=${address}`);
        const data = await response.json();
        if (!response.ok) {
          setActivityError(data.error || "Failed to load activity.");
          setRecentActivity([]);
        } else {
          setRecentActivity(data.transactions || []);
        }
      } catch (error) {
        setActivityError("Unable to fetch activity.");
        setRecentActivity([]);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchRecentActivity();
  }, [address, isConnected]);

  const totalBalanceValue = balanceData
    ? `${Number(balanceData.formatted).toFixed(4)} ${balanceData.symbol}`
    : "0.0000 ETH";

  const stats = [
    { name: "Total Balance", value: totalBalanceValue, change: "+12.5%", isPositive: true, icon: Wallet },
    { name: "Gas Saved", value: "$124.50", change: "+4.2%", isPositive: true, icon: Activity },
    { name: "NFT Badges", value: "12", change: "+2 this week", isPositive: true, icon: Award },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
          <p className="text-foreground/70">
            Welcome back, {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "ghostuser.eth"}.
          </p>
        </div>
        <Link href="/assistant">
          <Button variant="primary" className="gap-2">
            AI Assistant <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 hover:shadow-[0_0_25px_var(--primary-glow)] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Icon className="w-16 h-16 text-primary" />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-medium text-foreground/70 mb-1">{stat.name}</p>
                <h3 className="text-3xl font-bold text-white mb-4">{stat.value}</h3>
                <div className="flex items-center gap-1 text-sm font-medium">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-consumer-green" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-consumer-orange" />
                  )}
                  <span className={stat.isPositive ? "text-consumer-green" : "text-consumer-orange"}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-panel p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-sm text-primary hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {activityLoading && (
              <div className="p-4 rounded-xl glass text-sm text-foreground/70">Loading recent activity…</div>
            )}
            {!activityLoading && activityError && (
              <div className="p-4 rounded-xl glass text-sm text-foreground/70">{activityError}</div>
            )}
            {!activityLoading && !activityError && recentActivity.length === 0 && (
              <div className="p-4 rounded-xl glass text-sm text-foreground/70">No recent Sepolia activity found in the latest blocks.</div>
            )}
            {!activityLoading && !activityError && recentActivity.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl glass hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "Received" ? "bg-consumer-green-dark/20 text-consumer-green" : 
                    tx.type === "Sent" ? "bg-consumer-orange-dark/20 text-consumer-orange" : "bg-primary/10 text-primary"
                  }`}>
                    {tx.type === "Received" ? <ArrowDownRight className="w-5 h-5" /> : 
                     tx.type === "Sent" ? <ArrowUpRight className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tx.type}</p>
                    <p className="text-xs text-foreground/50">{tx.time} • {tx.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    tx.type === "Received" ? "text-consumer-green" : 
                    tx.type === "Sent" ? "text-white" : "text-primary"
                  }`}>{tx.amount}</p>
                  <p className="text-xs text-foreground/50">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions / Promotion */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]" />
          <h3 className="text-xl font-bold text-white mb-4 relative z-10">Try GhostPay AI</h3>
          <p className="text-sm text-foreground/70 mb-8 relative z-10">
            Send tokens, mint NFTs, and interact with smart contracts using natural language. 
            No gas fees required.
          </p>
          
          <div className="mt-auto space-y-3 relative z-10">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-sm text-foreground/80 font-mono">
              &quot;Send 10 USDC to vitalik.eth&quot;
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-sm text-foreground/80 font-mono">
              &quot;Mint the early adopter badge&quot;
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
