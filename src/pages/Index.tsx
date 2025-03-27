
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CTA from "@/components/home/CTA";
import { WalletProvider } from "@/hooks/useWallet";

const Index = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/90">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default Index;
