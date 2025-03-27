
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import WalletConnect from "@/components/wallet/WalletConnect";
import { useWallet } from "@/hooks/useWallet";

const Hero = () => {
  const { isConnected } = useWallet();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pb-32">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute top-32 left-0 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-purple-400/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center bg-secondary/80 backdrop-blur-sm rounded-full px-3 py-1 mb-6 animate-fade-in">
            <Sparkles size={14} className="text-primary mr-2" />
            <span className="text-xs font-medium">AI-Powered Insights on Injective</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight md:leading-tight mb-6 animate-fade-in">
            <span className="block">Unlock the Power of AI</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              for Crypto Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 animate-fade-in">
            Inject AI combines artificial intelligence with blockchain analytics to provide real-time market insights, 
            predictive analysis, and AI-powered decision support—all on the Injective blockchain.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
            {isConnected ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            ) : (
              <WalletConnect size="lg" />
            )}
            <Button variant="outline" size="lg" asChild>
              <Link to="/reports">
                Explore Reports
              </Link>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-4xl bg-card/30 backdrop-blur-md border border-white/10 rounded-3xl p-2 shadow-xl overflow-hidden animate-fade-in">
            <img 
              src="https://placehold.co/1200x600/0a0f1c/e2e8f0?text=AI+Insights+Dashboard" 
              alt="Dashboard Preview" 
              className="rounded-2xl object-cover w-full shadow-inner"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
