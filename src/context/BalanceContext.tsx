"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: number;
  type: string;
  amount: string;
  address: string;
  time: string;
  status: string;
}

interface BalanceContextType {
  ugfBalance: number;
  totalBalance: number;
  transactions: Transaction[];
  deductUGF: (amount: number) => void;
  deductTotalBalance: (amount: number) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "time">) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [ugfBalance, setUgfBalance] = useState(100.0);
  const [totalBalance, setTotalBalance] = useState(4250.0);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "Received", amount: "+50.00 USDC", address: "0x4F1...8A2B", time: "2 hours ago", status: "Success" },
    { id: 2, type: "Sent", amount: "-10.00 MATIC", address: "0x9D3...1C4E", time: "5 hours ago", status: "Success" },
    { id: 3, type: "Minted", amount: "Early Adopter NFT", address: "GhostPay System", time: "1 day ago", status: "Success" },
    { id: 4, type: "Received", amount: "+100.00 USDC", address: "0x2A7...5F9D", time: "2 days ago", status: "Success" },
  ]);

  const deductUGF = (amount: number) => {
    setUgfBalance((prev) => Math.max(0, prev - amount));
  };

  const deductTotalBalance = (amount: number) => {
    setTotalBalance((prev) => Math.max(0, prev - amount));
  };

  const addTransaction = (tx: Omit<Transaction, "id" | "time">) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now(),
      time: "Just now",
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <BalanceContext.Provider
      value={{
        ugfBalance,
        totalBalance,
        transactions,
        deductUGF,
        deductTotalBalance,
        addTransaction,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}
