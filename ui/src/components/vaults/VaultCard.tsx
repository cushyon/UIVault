import { MarketIcon } from "../MarketIcon";
import { SPOT_MARKETS_LOOKUP } from "@/constants/environment";
import { PublicKey } from "@drift-labs/sdk";
import { Button } from "../ui/button";
import Link from "next/link";
import { PAGES } from "@/constants/pages";
import { getUiVaultConfig } from "@/lib/utils";
import { VaultStats } from "@/types/vaults";

// const VaultInfoRow = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: React.ReactNode;
// }) => {
//   return (
//     <div className="flex justify-between">
//       <span className="text-sm text-white max-w-[200px]">{label}</span>
//       <span className="text-sm text-right">{value}</span>
//     </div>
//   );
// };

export const VaultCard = ({
  vaultStat,
  vaultPubkey,
}: {
  vaultStat: VaultStats;
  vaultPubkey: string;
}) => {
  const uiVaultConfig = getUiVaultConfig(vaultPubkey);
  console.log("uiVaultConfig: ", uiVaultConfig);
  console.log("vaultStat: ", vaultStat);
  const { name, description } = uiVaultConfig ?? {
    name: "N/A",
    description: "N/A",
  };
  const spotMarketConfig = uiVaultConfig?.market ?? SPOT_MARKETS_LOOKUP[0];

  const tvlBase = vaultStat.tvlBase.toNum();
  const apy90d = vaultStat.apys["90d"].toFixed(2);

  if (!uiVaultConfig) {
    return null;
  }

  return (
    <div
      className="
            relative
            mx-auto
            flex flex-wrap
            items-end content-end
            w-[785px]      
            gap-y-[21px] gap-x-[102px]
            rounded-[40px]            
            bg-[#282E3E]             
            px-[28px] pt-[30px] pb-[40px]
            shadow-lg"
    >
      {/* === Header block (icon + text + pill) ============================ */}
      <div
        className="
          flex flex-col items-end gap-[40px] w-full
        "
      >
        {/* first row: icon + title/link/tagline */}
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-4 ">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#273041] self-start mt-2.5">
              <MarketIcon
                marketSymbol={spotMarketConfig.symbol}
                className="h-14 w-14"
              />
            </div>

            {/* text block --------------------------------------------------- */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col">
                <h3 className="text-[32px] font-semibold text-white leading-[52px]">
                  {name}
                </h3>
                <p className="w-[400px] text-[#94A3B8] text-[16px] leading-[30px] font-bold">
                  Cushion portfolio protection strategy
                </p>
              </div>

              <p className="text-sm text-slate-300">{description}</p>
            </div>
          </div>

          {/* performance pill ---------------------------------------------- */}
          <div className="flex flex-col items-start gap-[10px] rounded-[20px] bg-[#191818] px-[20px] py-[8px]">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Performance&nbsp;(90d)
            </p>
            <p className="text-xl font-semibold text-white">
              14.2{/*apy90d*/} %
            </p>
          </div>
        </div>

        {/* === Key stats row === */}
        <div className="flex items-start gap-x-[102px] text-left w-full">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Current TVL
            </p>
            <p className="text-[24px] font-semibold text-[#E2E8F0] leading-[36px]">
              $
              {tvlBase >= 1000
                ? `${(tvlBase / 1000).toFixed(2)}K`
                : tvlBase.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Guarantee level
            </p>
            <p className="text-[24px] font-semibold text-[#E2E8F0] leading-[36px]">
              {uiVaultConfig.vaultPubkeyString ===
              "FTKm3WgS8K5AkDKL9UZnmD12JdhFnvxvNN1mF6adGXH9"
                ? "60"
                : "N/A"}
              %
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Collateral
            </p>
            <p className="mt-2 flex gap-1">
              <MarketIcon
                marketSymbol={spotMarketConfig.symbol}
                className="w-6 h-6"
              />
              <MarketIcon marketSymbol={"SOL"} className="w-6 h-6" />
            </p>
          </div>
        </div>

        {/* === CTA === */}
        <Link
          href={`${PAGES.vaultsHome}/${vaultPubkey}`}
          className="w-full block"
        >
          <Button className="w-full">View vault</Button>
        </Link>
      </div>
    </div>
  );

  //   <div className="flex flex-col gap-1 p-4 border border-gray-200 rounded-md">
  //     <VaultInfoRow label="Vault Name" value={uiVaultConfig.name} />
  //     <VaultInfoRow
  //       label="Vault Description"
  //       value={uiVaultConfig.description}
  //     />
  //     <VaultInfoRow label="Vault Pubkey" value={vaultPubkey} />
  //     <VaultInfoRow
  //       label="Main Collateral"
  //       value={<MarketIcon marketSymbol={spotMarketConfig.symbol} />}
  //     />
  //     {/* <VaultInfoRow
  //       label="APY (90D)"
  //       value={`${vaultStat.apys["90d"].toFixed(2)}%`}
  //     /> */}
  //     {/* <VaultInfoRow
  //       label="Base TVL"
  //       value={
  //         <div className="flex items-center gap-1">
  //           <span>{vaultStat.tvlBase.toNum()}</span>
  //           <MarketIcon marketSymbol={spotMarketConfig.symbol} />
  //         </div>
  //       }
  //     />
  //     <VaultInfoRow label="Quote TVL" value={vaultStat.tvlQuote.toNotional()} /> */}
  //     {/* <VaultInfoRow
  //       label="Capacity %"
  //       value={`${vaultStat.capacityPct.toFixed(2)}%`}
  //     /> */}
  //     <VaultInfoRow
  //       label="Max Drawdown"
  //       value={`${vaultStat.maxDrawdownPct.toFixed(2)}%`}
  //     />
  //     {/* <VaultInfoRow
  //       label="30D Volume"
  //       value={vaultStat.volume30Days.toNotional()}
  //     /> */}
  //     <Link href={`${PAGES.vaultsHome}/${vaultPubkey}`}>
  //       <Button className="w-full mt-2">View Vault</Button>
  //     </Link>
  //   </div>
  // );
};
