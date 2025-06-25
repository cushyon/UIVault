import { useQuery } from "@tanstack/react-query";
import { ApyReturnsLookup } from "@/types/vaults";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL +
  "/api/get-tvl/cmav852gx0000w8cmlqa6yben";

export const useVaultTvl = (vaultPubkey: string) => {
  const { data, isLoading } = useQuery<ApyReturnsLookup>({
    queryKey: ["vault-tvl", vaultPubkey],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch vault APY");
      return res.json();
    },
    refetchInterval: 5000, // 5 seconds
    enabled: !!vaultPubkey,
  });

  // @ts-ignore
  const tvl: number | null = data?.tvl ?? null;

  return { tvl, isLoading };
};
