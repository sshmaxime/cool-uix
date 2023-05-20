import { Store__factory } from "@premier-labs/contracts/dist/typechain";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import { useState } from "react";
import { Address } from "wagmi";
import { useStore } from "@/hooks/web3";

export default function useMutate() {
  const addRecentTransaction = useAddRecentTransaction();

  const [isMutateLoading, setLoading] = useState(false);
  const [isMutateError, setError] = useState(false);
  const [isMutateDone, setDone] = useState(false);
  const [mutateData, setData] = useState<{ hash?: string }>();

  const { storeContract } = useStore();

  const mutateReset = () => {
    setLoading(false);
    setError(false);
    setDone(false);
    setData({});
  };

  const mutate = async (dropId: number, dripId: number, tokenContract: string, tokenId: number) => {
    const config = await prepareWriteContract({
      address: storeContract,
      abi: Store__factory.abi,
      functionName: "mutate",
      args: [
        BigNumber.from(dropId),
        BigNumber.from(dripId),
        tokenContract as Address,
        BigNumber.from(tokenId),
      ],
    });

    const { hash } = await writeContract(config);

    addRecentTransaction({ hash: hash, description: `Mutatating #${dropId} #${dripId}` });

    setLoading(true);
    setData({ hash });

    await waitForTransaction({
      hash: hash,
    });

    setData({ hash });
    setLoading(false);
    setDone(true);
  };

  return {
    mutate,
    mutateReset,
    isMutateLoading,
    isMutateDone,
    isMutateError,
    mutateData,
  };
}
