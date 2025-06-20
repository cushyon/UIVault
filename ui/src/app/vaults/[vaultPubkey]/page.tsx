"use client";

import { useVault } from "@/hooks/useVault";
import { getUiVaultConfig } from "@/lib/utils";
import { use, useState } from "react";
import { VaultPerformance } from "../(components)/VaultPerformance";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UserPerformance } from "../(components)/UserPerformance";
import { VaultDepositWithdrawForm } from "../(components)/VaultDepositWithdrawForm";
import useAppStore from "@/stores/app/useAppStore";

type ContentTab = "VaultPerformance" | "UserPerformance" | "Overview";

const CONTENT_TAB_OPTIONS: { value: ContentTab; label: string }[] = [
  {
    value: "VaultPerformance",
    label: "Vault Performance",
  },
  {
    value: "UserPerformance",
    label: "Your Performance",
  },
];

export default function VaultPage(props: {
  params: Promise<{
    vaultPubkey: string;
  }>;
}) {
  const params = use(props.params);
  const vaultPubkey = params.vaultPubkey;
  const uiVaultConfig = getUiVaultConfig(vaultPubkey);
  //const vaultStats = useAppStore((s) => s.vaultsStats[vaultPubkey]);

  const [activeTab, setActiveTab] = useState<ContentTab>(
    CONTENT_TAB_OPTIONS[0].value
  );

  const {
    vaultAccountData,
    vaultDepositorAccountData,
    isVaultDepositorLoaded,
    syncVaultStats,
  } = useVault(vaultPubkey);
  //console.log("vaultStats: ", vaultStats);

  if (
    !uiVaultConfig ||
    !vaultAccountData //||
    //!vaultStats?.hasLoadedOnChainStats
  ) {
    return <div>Vault loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{uiVaultConfig?.name}</h1>
      {/* <p>Vault Pubkey: {vaultPubkey}</p> */}
      <p>{uiVaultConfig?.description}</p>

      <div className="flex mt-4">
        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ContentTab)}
        >
          {CONTENT_TAB_OPTIONS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6 mt-4">
        {activeTab === "VaultPerformance" && (
          <VaultPerformance uiVaultConfig={uiVaultConfig} />
        )}
        {activeTab === "UserPerformance" && vaultDepositorAccountData && (
          <UserPerformance
            depositAssetConfig={uiVaultConfig.market}
            vaultPubkey={vaultPubkey}
            vaultAccountData={vaultAccountData}
            vaultDepositorAccountData={vaultDepositorAccountData}
            isVaultDepositorLoaded={isVaultDepositorLoaded}
          />
        )}
        <div className="w-full md:max-w-[400px]">
          <VaultDepositWithdrawForm
            uiVaultConfig={uiVaultConfig}
            vaultDepositorAccountData={vaultDepositorAccountData}
            isVaultDepositorLoaded={isVaultDepositorLoaded}
            vaultAccountData={vaultAccountData}
            syncVaultStats={syncVaultStats}
          />
        </div>
      </div>
    </div>
  );
}
