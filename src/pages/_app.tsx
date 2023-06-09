import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_POLYGON_KEY as string, priority: 1, stallTimeout: 1_000}),
    infuraProvider({ apiKey: process.env.INFURA_POLYGON_KEY as string, priority: 0, stallTimeout: 1_000}),
    publicProvider({ priority: 2 }),
  ],
);

const { wallets } = getDefaultWallets({
  appName: 'Polygons Check Mint App',
  chains,
});

const AppInfo = {
  appName: 'Polygons Check Mint App',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Polygons Checks — Checks are now on Polygon</title>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={AppInfo} chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;