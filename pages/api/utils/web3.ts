import { CONFIG } from "@/config/config";
import { ChainIdToStoreContract } from "@premier-labs/contracts/dist/system";
import { Drop__factory, Store__factory } from "@premier-labs/contracts/dist/typechain";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(CONFIG.web3_provider_url);

const Store = Store__factory.connect(ChainIdToStoreContract[CONFIG.public.chain.id], provider);

const getDrop = async (dropId: number) => Drop__factory.connect(await Store.drop(dropId), provider);

export { provider, Store, getDrop };
