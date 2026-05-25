"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, User, Send, Sparkles, Zap, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { useBalance } from "@/context/BalanceContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: {
    type: string;
    amount: string;
    receiver: string;
    receiverAddress?: string;
    receiverAvatar?: string;
    receiverResolved?: boolean;
  };
}

let messageCounter = 1;
const generateId = () => {
  messageCounter += 1;
  return `msg-${messageCounter}`;
};

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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const previousInputRef = useRef("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput((previousInputRef.current ? previousInputRef.current + " " : "") + currentTranscript);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        previousInputRef.current = input;
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { deductUGF, deductTotalBalance, addTransaction } = useBalance();

  const [modalState, setModalState] = useState({
    isOpen: false,
    action: "",
    amount: "",
    receiver: "",
    receiverAddress: ""
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

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: generateId(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Call the real OpenAI backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (!response.ok) {
        setMessages((prev) => [...prev, {
          id: generateId(),
          role: "assistant",
          content: `Oops, something went wrong: ${data.error || "Please check your API key in .env.local"}`
        }]);
        return;
      }

      // Check if AI parsed a valid action
      if (data.action && data.action.type !== "Unknown") {
        const isMint = data.action.type === "Mint NFT";

        // ✅ Block transaction if receiver not found in address book
        if (data.action.type === "Transfer" && data.action.receiverResolved === false) {
          setMessages((prev) => [...prev, {
            id: generateId(),
            role: "assistant",
            content: `❌ I couldn't find "${data.action.receiver}" in the address book. Please check the name and try again. Currently registered users: Rahul, Pranay, Anuja, John, Gitcoin.`,
          }]);
          return;
        }

        setMessages((prev) => [...prev, {
          id: generateId(),
          role: "assistant",
          content: isMint 
            ? "Ready to mint your badge. The gas fee is fully subsidized." 
            : "I've prepared that transaction for you. Please review and confirm to proceed.",
          action: data.action
        }]);
      } else {
        // Fallback for conversational messages or unclear commands
        setMessages((prev) => [...prev, {
          id: generateId(),
          role: "assistant",
          content: "I'm ready to help with that. Could you provide a bit more detail about the transaction you want to execute?",
        }]);
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: generateId(),
        role: "assistant",
        content: "Error communicating with the blockchain AI."
      }]);
    }
  };

  const executeAction = (action: {
    type: string;
    amount: string;
    receiver: string;
    receiverAddress?: string;
    receiverAvatar?: string;
    receiverResolved?: boolean;
  }) => {
    setModalState({
      isOpen: true,
      action: action.type,
      amount: action.amount,
      receiver: action.receiver,
      receiverAddress: action.receiverAddress || ""
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
            className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-[0_0_10px_var(--primary-glow)]">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            )}

            {msg.role === "user" && (
              <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                <User className="w-5 h-5 text-white" />
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
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-foreground/50">To:</span>
                      <div className="flex items-center gap-2">
                        {msg.action.receiverAvatar && (
                          <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">
                            {msg.action.receiverAvatar}
                          </div>
                        )}
                        <span className="text-white font-medium">{msg.action.receiver}</span>
                      </div>
                    </div>
                    {msg.action.receiverAddress && (
                      <div className="flex justify-between text-xs">
                        <span className="text-foreground/50">Wallet:</span>
                        <span className={`font-mono truncate max-w-[160px] ${msg.action.receiverResolved ? "text-green-400" : "text-red-400"}`}>
                          {msg.action.receiverAddress}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className={`w-full ${!msg.action.receiverResolved && msg.action.type === "Transfer" ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => { if (msg.action && msg.action.receiverResolved !== false) executeAction(msg.action); }}
                    disabled={msg.action?.type === "Transfer" && msg.action?.receiverResolved === false}
                  >
                    {msg.action.type === "Transfer" && msg.action.receiverResolved === false
                      ? "❌ Unknown Receiver"
                      : "Review Transaction"
                    }
                  </Button>
                </div>
              )}
            </div>
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
            placeholder="Type or speak your command..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-28 text-white placeholder-foreground/40 focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`p-2 rounded-xl transition-colors ${
                isListening 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-white"
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        action={modalState.action}
        amount={modalState.amount}
        receiver={modalState.receiver}
        receiverAddress={modalState.receiverAddress}
        onSuccess={() => {
          setMessages(prev => [...prev, {
            id: generateId(),
            role: "assistant",
            content: "Transaction executed successfully! The gas fees were completely covered by the Universal Gas Fund."
          }]);
          
          // Deduct 2.45 from UGF balance for the gas fee
          deductUGF(2.45);

          if (modalState.action === "Transfer") {
            const numericAmount = parseFloat(modalState.amount.replace(/[^0-9.]/g, ""));
            if (!isNaN(numericAmount)) {
              deductTotalBalance(numericAmount);
              addTransaction({
                type: "Sent",
                amount: `-${numericAmount.toFixed(2)} MockUSD`,
                address: modalState.receiverAddress || modalState.receiver,
                status: "Success"
              });
            }
          } else if (modalState.action === "Mint NFT") {
            addTransaction({
              type: "Minted",
              amount: "GhostBadge NFT",
              address: modalState.receiverAddress || modalState.receiver,
              status: "Success"
            });
          }
        }}
      />
    </div>
  );
}
