
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Wallet } from "lucide-react";
import React from "react";

interface WalletConnectProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const WalletConnect = ({ 
  variant = "default", 
  size = "default", 
  className 
}: WalletConnectProps) => {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <>
      {!isConnected ? (
        <Button 
          variant={variant} 
          size={size} 
          className={className} 
          onClick={connect}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Keplr
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size={size} 
          className={className} 
          onClick={disconnect}
        >
          <span className="truncate max-w-[100px]">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </Button>
      )}
    </>
  );
};

export default WalletConnect;
