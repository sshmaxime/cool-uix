import { NFT } from "@premier-labs/contracts/dist/types";
import { ethers } from "ethers";
const { AddressZero } = ethers.constants;

export const ShortenAddress = (address: string | undefined) => {
  if (!address) return "";
  return (address.slice(0, 6) + "..." + address.slice(-4)).toLowerCase();
};

export const placeholderItem: NFT = {
  address: AddressZero,
  img: "/placeholder.png",
  id: 0,
  name: "",
  symbol: "",
};
