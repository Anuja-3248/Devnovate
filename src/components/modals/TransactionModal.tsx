"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Zap, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  amount: string;
  receiver: string;
  onSuccess: () => void;
}

export function TransactionModal({ isOpen, onClose, action, amount, receiver, onSuccess }: TransactionModalProps) {
  const [status, setStatus] = useState<"preview" | "processing" | "success">("preview");

  const handleConfirm = () => {
    setStatus("processing");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess();
        onClose();
        setStatus("preview"); // Reset for next time
      }, 2000);
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={status === "processing" ? () => {} : onClose} title={status === "preview" ? "Confirm Transaction" : ""}>
      <AnimatePresence mode="wait">
        {status === "preview" && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-xl glass border border-white/10 space-y-4 mt-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-foreground/70 text-sm">Action</span>
                <span className="font-semibold text-white">{action}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-foreground/70 text-sm">Amount</span>
                <span className="font-bold text-primary text-lg">{amount}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-foreground/70 text-sm">Receiver</span>
                <span className="font-mono text-white text-sm bg-white/5 px-2 py-1 rounded">{receiver}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70 text-sm">Network Fee</span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground/50 line-through text-sm">$2.45</span>
                  <span className="text-green-400 font-medium text-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Covered by UGF
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 border border-white/10" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </motion.div>
        )}

        {status === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12 space-y-6 text-center"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Executing Meta-Transaction</h3>
              <p className="text-sm text-foreground/70">Broadcasting to network via Universal Gas Fund...</p>
            </div>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle className="w-24 h-24 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h3>
              <p className="text-sm text-green-400 font-medium">Gas fees fully subsidized by UGF.</p>
            </div>
            <div className="text-xs text-foreground/50 font-mono bg-white/5 px-4 py-2 rounded-lg">
              Hash: 0x8f2d...4a9c
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
