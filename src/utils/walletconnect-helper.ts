import { WalletConnectModalSign } from "@walletconnect/modal-sign";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // Replace with your real one

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: WalletConnectModalSign.connectors({
    version: "2",
    projectId,
    chains,
  }),
  publicClient,
});

export { chains };