"use client";
import "./globals.css";
import React from "react";
import { configureChains, createConfig, WagmiConfig, useNetwork } from "wagmi";
import {
  // arbitrum,
  // arbitrumGoerli,
  // avalanche,
  // avalancheFuji,
  // bsc,
  // bscTestnet,
  // cronos,
  // mainnet,
  // fantom,
  // fantomTestnet,
  // goerli,
  polygonMumbai,
  // optimism,
  // polygon,
  // sepolia,
} from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import store from "../redux/store";
import { Provider } from "react-redux";
const Moralis = require("moralis").default;

const { chains, publicClient } = configureChains(
  [
    // arbitrum,
    // // arbitrumGoerli,
    // avalanche,
    // // avalancheFuji,
    // bsc,
    // bscTestnet,
    // cronos,
    // mainnet,
    // fantom,
    // // fantomTestnet,
    // goerli,
    polygonMumbai,
    // // optimism,
    // polygon,
    // sepolia,
  ],
  [
    // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
    publicProvider(),
  ],
);
const connectors = w3mConnectors({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

// const { connectors } = getDefaultWallets({
//     appName: "Zuxt",
//     projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
//     chains,
// });

const metadata = {
  title: "Aikisend",
  description: "Multi token transfer",
};

Moralis.start({
  apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
  // ...and any other configuration
});

export default function RootLayout({ children }) {
  // useEffect(() => {
  //     const func = async () => {};
  //     func();
  // }, []);
  return (
    <Provider store={store}>
      <html
        lang="en"
        className="scrollbar-thin scrollbar-thumb-gray-500 h-full"
      >
        <body className=" font-farro h-full">
          <WagmiConfig config={wagmiConfig}>
            {children}
          </WagmiConfig>
          <Web3Modal
            projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
            ethereumClient={ethereumClient}
          />
        </body>
      </html>
    </Provider>
  );
}
