import { Drips } from "@premier-labs/contracts/dist/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDrip } from "./drip";
import { Store, getDrop } from "./utils/web3";

const getDripsOwnedByAddress = async (address: string) => {
  const dropSupply = (await Store.dropSupply()).toNumber();

  const dripsByAddress: Drips = [];
  for (let dropId = 0; dropId < dropSupply; dropId++) {
    const dropContract = await getDrop(dropId);

    const balanceDripOfAddress = (await dropContract.balanceOf(address)).toNumber();
    for (let dripIndex = 0; dripIndex < balanceDripOfAddress; dripIndex++) {
      const tokenId = (await dropContract.tokenOfOwnerByIndex(address, dripIndex)).toNumber();
      dripsByAddress.push((await getDrip(dropId, tokenId)) as any);
    }
  }

  return dripsByAddress;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = req.query.address as string;

  const a = await getDripsOwnedByAddress(address);

  return res.status(200).json(a);
}

export { handler };
