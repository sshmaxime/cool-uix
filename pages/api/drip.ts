import type { NextApiRequest, NextApiResponse } from "next";
import { DripInfoStructOutput } from "@premier-labs/contracts/dist/typechain/contracts/system/Drop";
import { Drip, DripStatus } from "@premier-labs/contracts/dist/types";
import { getDrop } from "./drop";
import { getAsset } from "./utils/opensea";
import { Store } from "./utils/web3";

export const getDrip = async (dropId: number, dripId: number): Promise<Drip | undefined> => {
  let dripInfo: DripInfoStructOutput;
  try {
    dripInfo = await Store.dripInfo(dropId, dripId);
  } catch {
    return undefined;
  }
  const drop = await getDrop(dropId);

  const nft = (async () => {
    if (dripInfo.drip.status === DripStatus.MUTATED) {
      return await getAsset(
        dripInfo.drip.mutation.tokenContract,
        dripInfo.drip.mutation.tokenId.toNumber()
      );
    }
    return undefined;
  })();

  return {
    drop: drop as any,
    id: dripId,
    version: dripInfo.drip.version,
    img: "", // TODO
    status: dripInfo.drip.status,
    owner: dripInfo.owner,
    nft: await nft,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dropId = Number(req.query.dropId);
  const dripId = Number(req.query.dripId);

  return res.status(200).json(await getDrip(dropId, dripId));
}

export { handler };
