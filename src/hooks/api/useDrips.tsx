import { CONFIG } from "@/config/config";
import { Drips } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";

export default function useDrips(address: string | undefined, options = { enabled: true }) {
  const queryKey = `drips_${address}`;

  const {
    isLoading: isDripsLoading,
    error: isDripsError,
    data: drips,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.public.server_url + `/drips?address=${address}`).then((res) => res.data),
    enabled: options.enabled && address !== undefined,
  });

  return {
    isDripsLoading,
    isDripsError,
    drips: drips as Drips,
    isRefetching,
    refetch,
  };
}
