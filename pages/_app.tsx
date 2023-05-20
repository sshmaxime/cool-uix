import "@rainbow-me/rainbowkit/styles.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { RainbowKitProvider, getDefaultWallets, lightTheme } from "@rainbow-me/rainbowkit";
import { AppProps } from "next/app";
import Head from "next/head";
import { ScriptProps } from "next/script";
import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import { localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../src/layout/navbar";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/config/theme";

import { QueryClient, QueryClientProvider } from "react-query";
import "./style.css";

import { register } from "swiper/element/bundle";
register();

const { chains, provider } = configureChains([localhost, mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const Noop = ({ children }: ScriptProps) => <>{children}</>;

export const App = (props: MyAppProps) => {
  const { Component, pageProps } = props;
  const theme = useTheme();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            showRecentTransactions={true}
            theme={lightTheme({
              accentColor: theme.colors.black,
              accentColorForeground: theme.colors.primary,
            })}
          >
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};

export default function MyApp(props: MyAppProps) {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/*  */}
        <App {...props} />
        {/*  */}
      </ThemeProvider>
    </CacheProvider>
  );
}
