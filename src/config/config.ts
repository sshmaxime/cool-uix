import { localhost, mainnet, sepolia } from "wagmi/chains";

const supportedChains = {
  [mainnet.id]: mainnet,
  [sepolia.id]: sepolia,
  [localhost.id]: localhost,
};

interface ServerEnvOptions {
  SERVER_WEB3_PROVIDER_URL: string;
  SERVER_IPFS_PROVIDER_URL: string;
  SERVER_OPENSEA_KEY: string;
}

interface PublicEnvOptions {
  NEXT_PUBLIC_CHAIN_ID: string;
  NEXT_PUBLIC_SERVER_URL: string;
}

const { SERVER_WEB3_PROVIDER_URL, SERVER_IPFS_PROVIDER_URL, SERVER_OPENSEA_KEY }: ServerEnvOptions =
  process.env as any as ServerEnvOptions;

const { NEXT_PUBLIC_CHAIN_ID, NEXT_PUBLIC_SERVER_URL }: PublicEnvOptions = {
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID as string,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
};

export const CONFIG = (() => {
  // ChainId verification
  const chainId = Number(NEXT_PUBLIC_CHAIN_ID);
  if (isNaN(chainId)) throw "ChainId shouldn't be NaN";
  if (chainId !== mainnet.id && chainId !== sepolia.id && chainId !== localhost.id)
    throw `ChainId ${chainId} is not supported`;

  return {
    public: {
      chain: supportedChains[chainId],
      server_url: NEXT_PUBLIC_SERVER_URL,
    },
    web3_provider_url: SERVER_WEB3_PROVIDER_URL,
    ipfs_provider_url: SERVER_IPFS_PROVIDER_URL,
    opensea_api_key: SERVER_OPENSEA_KEY,
  };
})();

export const isDevelopment = (() => CONFIG.public.chain.id === localhost.id)();
export const isStaging = (() => CONFIG.public.chain.id === sepolia.id)();
export const isProduction = (() => CONFIG.public.chain.id === mainnet.id)();
