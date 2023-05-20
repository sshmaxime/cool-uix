import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { BigNumber } from "ethers";

import { Drop, DropMetadata } from "@premier-labs/contracts/dist/types";

import { normalizeIPFSUrl } from "./utils/ipfs";
import { Store } from "./utils/web3";

export const getDrop = async (dropId: BigNumber | number): Promise<Drop> => {
  const dropInfo = await Store.dropInfo(BigNumber.from(dropId));

  const metadataUrl = normalizeIPFSUrl(dropInfo.dropURI);

  console.log("Fetching data from IPFS");
  const metadata = (await axios.get(metadataUrl)).data as DropMetadata;
  console.log("Done fetching data from IPFS");

  for (const version of metadata.versions) {
    version.texture = normalizeIPFSUrl(version.texture);
  }

  metadata.model = normalizeIPFSUrl(metadata.model);

  return {
    address: dropInfo._contract,
    id: dropInfo.id.toNumber(),
    symbol: dropInfo.symbol,
    price: dropInfo.price.toString(),
    maxSupply: dropInfo.maxSupply.toNumber(),
    currentSupply: dropInfo.currentSupply.toNumber(),
    metadata: metadata,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dropId = Number(req.query.dropId);

  return res.status(200).json(await getDrop(dropId));
}

export { handler };
