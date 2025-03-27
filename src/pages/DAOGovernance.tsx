
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DAOInsights from "@/components/dashboard/DAOInsights";
import { WalletProvider } from "@/hooks/useWallet";

const DAOGovernance = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in">DAO Governance</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl animate-fade-in">
              Track active proposals, analyze voting patterns, and get AI-powered insights on governance decisions.
            </p>

            <div className="space-y-10">
              <DAOInsights />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default DAOGovernance;
