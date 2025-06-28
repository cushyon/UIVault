import { twMerge } from "tailwind-merge";
import { VaultStatsSkeleton } from "./VaultStatsSkeleton";
import { UIMarket } from "@drift/common";
import useAppStore from "@/stores/app/useAppStore";
import { DEFAULT_PERIOD_APY } from "@/constants/misc";
import { RollingNumber } from "../../../components/ui/rolling-number";
import { useVaultApy } from "@/hooks/useVaultApy";
import { useVaultTvl } from "@/hooks/useVaultTvl";
import { useMemo } from "react";

export const VaultStats = (props: {
  vaultPubkey: string;
  depositAssetMarketIndex: number;
}) => {
  const vaultStats = useAppStore((s) => s.vaultsStats[props.vaultPubkey]);
  const isLoadingVaultStats = !vaultStats?.hasLoadedOnChainStats;
  const depositAssetConfig = UIMarket.createSpotMarket(
    props.depositAssetMarketIndex
  ).market;

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 2,
      }),
    []
  );

  const { apy, isLoading: isApyLoading } = useVaultApy(props.vaultPubkey);
  const { tvl, isLoading: isTvlLoading } = useVaultTvl(props.vaultPubkey);

  const tvlString = tvl ? formatter.format(tvl) : "0";
  const [, tvlNumber = "0", tvlSuffix = ""] =
    tvlString.match(/([\d.]+)(.*)/) ?? [];

  console.log("tvlNumber: ", tvlNumber);
  console.log("tvlSuffix: ", tvlSuffix);

  const stats = [
    {
      label: "Performance (APY)",
      value: (
        <span className="flex items-end translate-y-[-2px]">
          {isApyLoading ? (
            <RollingNumber duration={1.6} value={0} />
          ) : (
            <RollingNumber
              duration={1.6}
              value={apy !== null ? `${apy.toFixed(2)}%` : "-"}
            />
          )}
        </span>
      ),
      //  `18.02%`, //`${apy?.toFixed(2)}%`,
      valueClassName: twMerge(),
      //apy < 0 ? "text-negative-red" : "text-positive-green"
      loading: isApyLoading,
    },
    {
      label: "TVL",
      value: (
        <span className="flex items-end translate-y-[-2px]">
          <RollingNumber duration={1.6} value={tvlNumber + tvlSuffix} />
          {/* {tvlSuffix} */}
        </span>
      ),
      marketSymbol: depositAssetConfig.symbol,
      loading: isTvlLoading,
    },
    {
      label: "Protection floor",
      value: <span className="flex items-end translate-y-[-2px]">60 %</span>,
      loading: isTvlLoading,
    },
    {
      label: "Rebalancing",
      value: <span className="flex items-end translate-y-[-2px]">1 Day</span>,
      loading: isTvlLoading,
    },
    // {
    //   label: "Capacity",
    //   value: vaultStats?.isUncappedCapacity
    //     ? "Uncapped"
    //     : `${vaultStats?.capacityPct.toFixed(2)}%`,
    //   loading: isLoadingVaultStats,
    // },
  ];

  return <VaultStatsSkeleton stats={stats} />;
};
