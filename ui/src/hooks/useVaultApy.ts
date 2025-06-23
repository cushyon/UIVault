import { useQuery } from "@tanstack/react-query";
import { ApyReturnsLookup } from "@/types/vaults";

const API_URL = "http://localhost:4000/api/get-apy/cmav852gx0000w8cmlqa6yben";

export const useVaultApy = (vaultPubkey: string) => {
  const { data, isLoading } = useQuery<ApyReturnsLookup>({
    queryKey: ["vault-apy", vaultPubkey],
    queryFn: async () => {
      console.log("API_URL: ", API_URL);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch vault APY");
      console.log("res: ", res);
      return res.json();
    },
    refetchInterval: 1000, // 1 second
    enabled: !!vaultPubkey,
  });

  console.log("data: ", data);

  const apy: number | null = data?.data?.apy ?? null;

  return { apy, isLoading };
};
