import { Drop } from "@premier-labs/contracts/dist/types";
import axios from "axios";
import { useQuery } from "react-query";
import { CONFIG } from "../../config/config";

export default function useDrop(dropId: number | undefined, options = { enabled: true }) {
  const queryKey = `drop_${dropId}`;

  const {
    isLoading: isDropLoading,
    error: isDropError,
    data: drop,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () =>
      axios.get(CONFIG.public.server_url + `/drop?dropId=${dropId}`).then((res) => res.data),
    enabled: options.enabled && dropId !== undefined && !isNaN(dropId),
  });

  return {
    isDropLoading,
    isDropError,
    drop: drop as Drop,
  };
}
