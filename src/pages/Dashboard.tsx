
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketInsights from "@/components/dashboard/MarketInsights";
import AIChat from "@/components/dashboard/AIChat";
import { WalletProvider } from "@/hooks/useWallet";

const Dashboard = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in">Dashboard</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl animate-fade-in">
              Access real-time market insights and interact with our AI assistant to get crypto intelligence.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <MarketInsights />
              </div>
              <div className="h-[600px]">
                <AIChat />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default Dashboard;
