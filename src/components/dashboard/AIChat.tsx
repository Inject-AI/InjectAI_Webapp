
import React, { useState, useRef, useEffect } from "react";
import GlassCard from "../ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, User } from "lucide-react";
import { fetchAIResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI assistant for crypto insights. How can I help you with Injective or other blockchain questions?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useWallet();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetchAIResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-medium">AI Assistant</h3>
        </div>
        <div className="flex items-center bg-secondary/80 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium">Earn Knowl Points with every question</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 transition-opacity",
              message.sender === "user" ? "justify-end" : "",
              message.id === messages[messages.length - 1].id && isLoading
                ? "animate-pulse"
                : "animate-fade-in"
            )}
          >
            {message.sender === "ai" && (
              <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Brain className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              )}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            
            {message.sender === "user" && (
              <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="max-w-[80%] rounded-2xl px-6 py-4 bg-secondary flex items-center">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "300ms" }} />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "600ms" }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {isConnected ? (
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask about market trends, token analysis, or blockchain concepts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-6 border-t border-white/10 bg-secondary/30 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Connect your wallet to access AI insights and earn Knowl Points
          </p>
          <Button variant="outline" size="sm" onClick={() => {}} className="w-full">
            Connect Wallet
          </Button>
        </div>
      )}
    </GlassCard>
  );
};

export default AIChat;
