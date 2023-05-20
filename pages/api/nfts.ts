import type { NextApiRequest, NextApiResponse } from "next";

import { OPENSEA, getAssetsOwnedByAddress_Mock } from "./utils/opensea";
import { isDevelopment } from "@/config/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = req.query.address as string;

  return res
    .status(200)
    .json(
      isDevelopment
        ? await getAssetsOwnedByAddress_Mock(address)
        : await OPENSEA.getAssetsOwnedByAddress(address)
    );
}

export { handler };
