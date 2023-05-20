import { useRouter } from "next/router";
import SoonPage from "../../src/ui/components/soonPage";
import { useEffect } from "react";

export default function Collectibles() {
  const router = useRouter();

  useEffect(() => {
    router.push("/collectibles/drop/0");
  }, []);
  return <></>;
}
