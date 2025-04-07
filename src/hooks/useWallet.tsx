import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "sonner";
import WalletConnectClient from "@walletconnect/client"; // WalletConnect client import

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
  const [walletConnectClient, setWalletConnectClient] = useState<WalletConnectClient | null>(null);

  // Function to fetch wallet balance (Placeholder)
  const fetchBalance = async (walletAddress: string) => {
    // Placeholder: Replace with actual blockchain API call to fetch the balance
    return 125.48; // Placeholder balance
  };

  // Connect to Keplr wallet or fallback to WalletConnect
  const connect = async () => {
    try {
      // Check if Keplr is installed
      if (window.keplr) {
        const chainId = "injective-1"; // Mainnet chain ID
        
        // Request connection to the chain
        await window.keplr.enable(chainId);
        
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        
        if (accounts && accounts.length > 0) {
          const walletAddress = accounts[0].address;
          setIsConnected(true);
          setAddress(walletAddress);
          
          // Fetch actual balance
          const walletBalance = await fetchBalance(walletAddress);
          setBalance(walletBalance);
          
          localStorage.setItem("walletConnected", "true");
          localStorage.setItem("walletAddress", walletAddress);
          localStorage.setItem("walletBalance", walletBalance.toString());
          
          toast.success("Keplr wallet connected successfully");
        } else {
          toast.error("No accounts found in Keplr wallet");
        }
      } else {
        // Fallback to WalletConnect if Keplr is not available
        const wcClient = new WalletConnectClient({
          bridge: "https://bridge.walletconnect.org", // Set your bridge URL
        });

        setWalletConnectClient(wcClient);

        const uri = await wcClient.createSession();
        window.location.href = `keplrwallet://wc?uri=${uri}`; // Deep link to Keplr mobile app
        
        wcClient.on("connect", async (error, payload) => {
          if (error) {
            toast.error("Failed to connect to WalletConnect");
            return;
          }

          const { accounts } = payload.params[0];
          const walletAddress = accounts[0];
          setIsConnected(true);
          setAddress(walletAddress);
          
          // Fetch actual balance
          const walletBalance = await fetchBalance(walletAddress);
          setBalance(walletBalance);
          
          localStorage.setItem("walletConnected", "true");
          localStorage.setItem("walletAddress", walletAddress);
          localStorage.setItem("walletBalance", walletBalance.toString());

          toast.success("WalletConnect wallet connected successfully");
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
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
    
    if (walletConnectClient) {
      walletConnectClient.killSession();
    }
  };

  // Check if wallet was previously connected
  useEffect(() => {
    const checkPreviousConnection = () => {
      const wasConnected = localStorage.getItem("walletConnected") === "true";
      const savedAddress = localStorage.getItem("walletAddress");
      const savedBalance = localStorage.getItem("walletBalance");
      
      if (wasConnected && savedAddress) {
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

// Add TypeScript declarations for Keplr and WalletConnect
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
