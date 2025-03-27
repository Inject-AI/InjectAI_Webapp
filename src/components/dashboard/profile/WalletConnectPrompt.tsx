
import React from "react";
import { User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletConnectPromptProps {
  onConnect: () => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const WalletConnectPrompt = ({ 
  onConnect, 
  title = "Connect Your Keplr Wallet",
  description = "Connect your Keplr wallet to access your profile, track your Knowl Points, participate in DAO governance, and unlock advanced features.",
  icon = <User className="h-8 w-8 text-muted-foreground" />
}: WalletConnectPromptProps) => {
  return (
    <div className="text-center py-12">
      <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
        {icon}
      </div>
      <h4 className="text-xl font-medium mb-2">{title}</h4>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      <Button onClick={onConnect}>Connect Keplr Wallet</Button>
    </div>
  );
};

export default WalletConnectPrompt;
