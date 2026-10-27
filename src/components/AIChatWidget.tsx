"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User, Sparkles, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "こんにちは！あなたのAIトレーナーです。トレーニングやフォームについて何か質問はありますか？",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.reply || "申し訳ありません。現在お答えできません。",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // BottomNav-тай давхцуулахгүйн тулд bottom-24 гэж заасан
    <div className="fixed bottom-24 right-6 z-[9999]">
      {/* 1. Чат Цонх */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[460px] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200">
          {/* Толгой хэсэг */}
          <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Gym Note AI Coach</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Мессежийн жагсаалт */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2.5 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-zinc-950 font-medium rounded-tr-none"
                      : "bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-zinc-500 text-[11px]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                AI бодож байна...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Асуулт оруулах хэсэг */}
          <form onSubmit={handleSend} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="質問する..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* 2. Нээх/Хаах Товчлуур */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-zinc-950 p-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}