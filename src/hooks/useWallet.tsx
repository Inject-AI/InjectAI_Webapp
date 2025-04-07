
import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "sonner";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  // Connect to Keplr wallet
  const connect = async () => {
    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        toast.error("Keplr wallet not found. Please install Keplr extension.");
        return;
      }

      const chainId = "injective-1"; // Mainnet chain ID
      
      // Request connection to the chain
      await window.keplr.enable(chainId);
      
      // Get the account
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      
      if (accounts && accounts.length > 0) {
        const walletAddress = accounts[0].address;
        setIsConnected(true);
        setAddress(walletAddress);
        
        // For a real implementation, you would fetch the actual balance here
        // For now we'll set a placeholder balance
        setBalance(125.48);
        
        // Save connection state to localStorage
        localStorage.setItem("walletConnected", "true");
        localStorage.setItem("walletAddress", walletAddress);
        localStorage.setItem("walletBalance", "125.48");
        
        toast.success("Keplr wallet connected successfully");
      } else {
        toast.error("No accounts found in Keplr wallet");
      }
    } catch (error) {
      console.error("Error connecting Keplr wallet:", error);
      toast.error("Failed to connect Keplr wallet. Please try again.");
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
    
    // Clear connection state from localStorage
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletBalance");
    
    toast.info("Wallet disconnected");
  };

  // Check if wallet was previously connected
  useEffect(() => {
    const checkPreviousConnection = () => {
      const wasConnected = localStorage.getItem("walletConnected") === "true";
      const savedAddress = localStorage.getItem("walletAddress");
      const savedBalance = localStorage.getItem("walletBalance");
      
      if (wasConnected && savedAddress) {
        // For a real implementation, you would verify the connection is still valid
        // by checking with Keplr before setting these states
        setIsConnected(true);
        setAddress(savedAddress);
        setBalance(savedBalance ? parseFloat(savedBalance) : 0);
      }
    };
    
    checkPreviousConnection();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Add TypeScript declarations for Keplr
declare global {
  interface Window {
    keplr: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => {
        getAccounts: () => Promise<{ address: string; pubkey: Uint8Array }[]>;
      };
    };
  }
}
