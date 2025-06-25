import { useQuery } from "@tanstack/react-query";
import { ApyReturnsLookup } from "@/types/vaults";

// const API_URL = "http://localhost:4000/api/get-apy/cmav852gx0000w8cmlqa6yben";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL +
  "/api/get-apy/cmav852gx0000w8cmlqa6yben";

export const useVaultApy = (vaultPubkey: string) => {
  const { data, isLoading } = useQuery<ApyReturnsLookup>({
    queryKey: ["vault-apy", vaultPubkey],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch vault APY");
      return res.json();
    },
    refetchInterval: 1000, // 1 second
    enabled: !!vaultPubkey,
  });

  // @ts-ignore
  const apy: number | null = data?.data?.apy ?? null;

  return { apy, isLoading };
};
