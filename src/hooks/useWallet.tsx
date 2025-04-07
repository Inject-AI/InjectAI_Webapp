import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { wagmiConfig } from "@/utils/walletconnect-helper";
import { WagmiConfig } from "wagmi";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <WalletManager>{children}</WalletManager>
    </WagmiConfig>
  );
};

const WalletManager = ({ children }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const connector = connectors[0];
      await connect({ connector });
    } catch (err) {
      console.error("Connection Error:", err);
    }
  };

  const disconnectWallet = async () => {
    try {
      disconnect();
    } catch (err) {
      console.error("Disconnection Error:", err);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [isConnected, address]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address: walletAddress,
        connect: connectWallet,
        disconnect: disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);