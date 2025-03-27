
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { WalletProvider } from "@/hooks/useWallet";
import { FileText, Vote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reports = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6 animate-fade-in">Reports & Insights</h1>
            <p className="text-muted-foreground mb-10 max-w-2xl animate-fade-in">
              Access detailed AI-generated analysis for cryptocurrency tokens and DAO governance proposals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/token-reports" className="block">
                <GlassCard className="p-6 h-full hover:shadow-lg transition-all hover:bg-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Token Reports</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Get detailed market analysis, price predictions, and AI-generated insights for major cryptocurrencies.
                  </p>
                  <Button variant="secondary" className="w-full justify-between group">
                    View Token Reports
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </GlassCard>
              </Link>

              <Link to="/dao-governance" className="block">
                <GlassCard className="p-6 h-full hover:shadow-lg transition-all hover:bg-secondary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Vote className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">DAO Governance</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Track active proposals, analyze voting patterns, and get AI-powered insights on governance decisions.
                  </p>
                  <Button variant="secondary" className="w-full justify-between group">
                    View DAO Governance
                    <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </GlassCard>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default Reports;
