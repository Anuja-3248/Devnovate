"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = (wallet: string) => {
    setIsConnecting(wallet);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(null);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet">
      <div className="space-y-4 mt-4">
        <p className="text-sm text-foreground/70 mb-6">
          Connect your wallet to start using GhostPay AI. No gas fees required.
        </p>

        <button
          onClick={() => handleConnect("metamask")}
          disabled={isConnecting !== null}
          className="w-full flex items-center justify-between p-4 rounded-xl glass hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {isConnecting === "metamask" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm z-10"
            >
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </motion.div>
          )}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#F6851B]/10 flex items-center justify-center">
              <span className="text-xl">🦊</span>
            </div>
            <span className="font-semibold text-white group-hover:text-primary transition-colors">
              MetaMask
            </span>
          </div>
          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
            Popular
          </span>
        </button>

        <button
          onClick={() => handleConnect("walletconnect")}
          disabled={isConnecting !== null}
          className="w-full flex items-center justify-between p-4 rounded-xl glass hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {isConnecting === "walletconnect" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-secondary/20 flex items-center justify-center backdrop-blur-sm z-10"
            >
              <Loader2 className="w-6 h-6 animate-spin text-white" />
            </motion.div>
          )}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#3B99FC]/10 flex items-center justify-center">
              <span className="text-xl">🔗</span>
            </div>
            <span className="font-semibold text-white group-hover:text-secondary transition-colors">
              WalletConnect
            </span>
          </div>
        </button>
      </div>
    </Modal>
  );
}
