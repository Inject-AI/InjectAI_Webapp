import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "sonner";
import WalletConnectClient from "@walletconnect/client";

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
  const [connector, setConnector] = useState<WalletConnectClient | null>(null);

  // Connect to WalletConnect and Keplr wallet
  const connect = async () => {
    try {
      const walletConnector = new WalletConnectClient({
        bridge: "https://bridge.walletconnect.org", // You can replace this with your WalletConnect project ID
        qrcode: true,
      });

      if (!walletConnector.connected) {
        await walletConnector.createSession();
      }

      walletConnector.on("connect", (error, payload) => {
        if (error) {
          toast.error("Error connecting WalletConnect");
          return;
        }

        const { accounts, chainId } = payload.params[0];
        const walletAddress = accounts[0];
        setIsConnected(true);
        setAddress(walletAddress);

        // Placeholder balance, replace with actual balance fetching logic
        setBalance(125.48);

        // Save connection state to localStorage
        localStorage.setItem("walletConnected", "true");
        localStorage.setItem("walletAddress", walletAddress);
        localStorage.setItem("walletBalance", "125.48");

        toast.success("Wallet connected successfully");
      });

      setConnector(walletConnector);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const disconnect = () => {
    if (connector) {
      connector.killSession();
    }

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
