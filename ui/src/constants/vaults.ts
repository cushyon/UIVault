import { SpotMarketConfig } from "@drift-labs/sdk";
import { SPOT_MARKETS_LOOKUP } from "./environment";

// these configs are hardcoded instead of fetching from the VaultAccount to save on RPC calls, since they are fixed on vault inception
export type UiVaultConfig = {
  name: string;
  vaultPubkeyString: string;
  managerPubkeyString: string;
  userPubKeyString: string;
  description: string;
  market: SpotMarketConfig;
  /**
   * If the main spot market of the vault is not USDC, but the vault's strategy is to focus on the notional growth,
   * then set this flag to true to ensure the relevant UI calculations are calculated accordingly.
   */
  isNotionalGrowthStrategy: boolean;
};

const SOLCPPI: UiVaultConfig = {
  name: "SOL CPPI (USDC)",
  vaultPubkeyString: "FTKm3WgS8K5AkDKL9UZnmD12JdhFnvxvNN1mF6adGXH9",
  managerPubkeyString: "CcfwPEzivuWSUYndGhL8XGw19s46fCaeB8e5nQBSzpEH",
  userPubKeyString: "2zSLRaFjF54daFxo1kciWYgtXcrNuKESPVhAaDuM5Qw4",
  description:
    "A Defi strategy with 60% capital guarantee and profit lock-in, invested in a risky asset (SOL) and USDC",
  market: SPOT_MARKETS_LOOKUP[0],
  isNotionalGrowthStrategy: false,
};

export const VAULTS = [SOLCPPI];
