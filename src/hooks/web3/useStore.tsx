import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Address } from "wagmi";
import { CONFIG } from "../../config/config";

export default function useStore() {
  return { storeContract: ChainIdToStoreContract[CONFIG.public.chain.id] as Address };
}
