"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, User, Send, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TransactionModal } from "@/components/modals/TransactionModal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: {
    type: string;
    amount: string;
    receiver: string;
  };
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Ghost, your AI blockchain assistant. I can help you send tokens, mint NFTs, or interact with smart contracts using natural language. Gas is always covered.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    action: "",
    amount: "",
    receiver: ""
  });

  const suggestions = [
    "Send 5 MockUSD to Rahul",
    "Mint participation badge",
    "Donate 10 MockUSD to Gitcoin",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse: Message;

      if (text.toLowerCase().includes("send") || text.toLowerCase().includes("donate")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've prepared that transaction for you. Please review and confirm to proceed.",
          action: {
            type: "Transfer",
            amount: text.toLowerCase().includes("10") ? "10.00 MockUSD" : "5.00 MockUSD",
            receiver: text.toLowerCase().includes("rahul") ? "rahul.eth" : "gitcoin.eth"
          }
        };
      } else if (text.toLowerCase().includes("mint")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Ready to mint your badge. The gas fee is fully subsidized.",
          action: {
            type: "Mint NFT",
            amount: "1 Badge",
            receiver: "0x71C...976F (You)"
          }
        };
      } else {
         aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm ready to help with that. Could you provide a bit more detail about the transaction you want to execute?",
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const executeAction = (action: any) => {
    setModalState({
      isOpen: true,
      action: action.type,
      amount: action.amount,
      receiver: action.receiver
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 pb-6 scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto" : "mr-auto"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-[0_0_10px_var(--primary-glow)]">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}
            
            <div className={`space-y-3 ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
              <div
                className={`p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "glass border border-white/10 text-foreground/90 rounded-tl-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
              </div>

              {msg.action && (
                <div className="glass-panel p-4 rounded-xl border border-primary/30 w-[300px]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-white">{msg.action.type}</span>
                    <Zap className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/50">Amount:</span>
                      <span className="text-white font-medium">{msg.action.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/50">To:</span>
                      <span className="text-white font-mono">{msg.action.receiver}</span>
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => executeAction(msg.action)}
                  >
                    Review Transaction
                  </Button>
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 max-w-3xl mr-auto"
          >
             <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="glass p-4 rounded-2xl rounded-tl-sm border border-white/10 flex items-center gap-2">
                <div className="flex gap-1">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-primary rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto shrink-0">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              className="whitespace-nowrap px-4 py-2 rounded-full glass border border-white/10 text-sm text-foreground/80 hover:text-white hover:border-primary/50 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              {suggestion}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Type your command (e.g. 'Send 50 USDC to...')"
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder-foreground/40 focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <TransactionModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        action={modalState.action}
        amount={modalState.amount}
        receiver={modalState.receiver}
        onSuccess={() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "assistant",
            content: "Transaction executed successfully! The gas fees were completely covered by the Universal Gas Fund."
          }]);
        }}
      />
    </div>
  );
}
