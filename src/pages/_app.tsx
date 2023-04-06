import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_MUMBAI_API_KEY }),
    publicProvider(),
  ]
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
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={AppInfo} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;