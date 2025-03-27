
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TokenReports from "@/components/dashboard/TokenReports";
import { WalletProvider } from "@/hooks/useWallet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const TokenReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in">Token Reports</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl animate-fade-in">
              Detailed AI-generated analysis of cryptocurrency tokens, including market performance and future projections.
            </p>

            <GlassCard className="p-6 mb-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for tokens (Bitcoin, Ethereum, Solana...)"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Popular: BTC, ETH, SOL, INJ, ADA, DOT
              </div>
            </GlassCard>

            <div className="space-y-10">
              <TokenReports searchQuery={searchQuery} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default TokenReportsPage;
