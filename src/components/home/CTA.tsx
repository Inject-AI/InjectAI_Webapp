
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import WalletConnect from "@/components/wallet/WalletConnect";
import { useWallet } from "@/hooks/useWallet";

const CTA = () => {
  const { isConnected } = useWallet();

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl -z-10" />
      <div className="absolute top-1/3 left-1/4 transform -translate-y-1/2 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-gradient-to-b from-background/60 to-background/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 animate-fade-in">
              Ready to Elevate Your Crypto Intelligence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
              Connect your Keplr wallet to start earning Knowl Points and access AI-powered insights that 
              give you an edge in the crypto market. Every interaction makes you smarter.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
