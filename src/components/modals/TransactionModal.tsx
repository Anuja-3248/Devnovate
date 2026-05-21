"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Zap, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ethers } from "ethers";
import { sendMockUSD } from "@/lib/sendTransaction";
import MockUSDABI from "@/abi/MockUSD.json";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  amount: string;
  receiver: string;
  receiverAddress?: string;
  onSuccess: () => void;
}

export function TransactionModal({ isOpen, onClose, action, amount, receiver, receiverAddress, onSuccess }: TransactionModalProps) {
  const [status, setStatus] = useState<"preview" | "processing" | "success" | "error">("preview");
  const [txHash, setTxHash] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirm = async () => {
    try {
      setStatus("processing");
      setErrorMsg("");

      if (!(window as any).ethereum) {
        alert("MetaMask not found");
        setStatus("preview");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const tx = await sendMockUSD(
        receiver,
        amount,
        signer,
        process.env.NEXT_PUBLIC_TOKEN_ADDRESS!,
        MockUSDABI
      );

      setTxHash(tx);
      setStatus("success");

      setTimeout(() => {
        onSuccess();
        onClose();
        setStatus("preview");
        setTxHash("");
      }, 2500);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Transaction failed. Please try again.";
      setErrorMsg(errorMessage);
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status !== "processing") {
      setStatus("preview");
      setTxHash("");
      setErrorMsg("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={status === "preview" ? "Confirm Transaction" : ""}>
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
              {receiverAddress && (
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-foreground/70 text-sm">Wallet</span>
                  <span className="font-mono text-green-400 text-xs bg-white/5 px-2 py-1 rounded truncate max-w-[200px]">{receiverAddress}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-foreground/70 text-sm">Network Fee</span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground/50 line-through text-sm">$2.45</span>
                  <span className="text-consumer-green font-medium text-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Covered by UGF
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" className="flex-1 border border-white/10" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={handleConfirm}>
                Confirm <ArrowRight className="w-4 h-4 ml-1" />
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
              <h3 className="text-xl font-bold text-white mb-2">Executing on Blockchain</h3>
              <p className="text-sm text-foreground/70">Broadcasting to Base Sepolia via Universal Gas Fund...</p>
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
              <CheckCircle className="w-24 h-24 text-consumer-green drop-shadow-[0_0_15px_rgba(186,242,74,0.3)]" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Transaction Successful!</h3>
              <p className="text-sm text-consumer-green font-medium">Gas fees fully subsidized by UGF.</p>
            </div>
            <div className="text-xs text-foreground/50 font-mono bg-white/5 px-4 py-2 rounded-lg">
              Hash: {txHash}
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <AlertTriangle className="w-24 h-24 text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Transaction Failed</h3>
              <p className="text-sm text-red-400 font-medium max-w-xs">{errorMsg}</p>
            </div>
            <Button variant="primary" onClick={() => setStatus("preview")}>
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
