import { useEffect, useRef, useState } from "react";
import {
  VAULT_PROGRAM_ID,
  VaultDepositor,
  VaultDepositorAccount,
  getDriftVaultProgram,
} from "@drift-labs/vaults-sdk";
import { useCommonDriftStore } from "@drift-labs/react";
import { COMMON_UI_UTILS } from "@drift/common";
import { PublicKey } from "@drift-labs/sdk";

/**
 * Subscribed to changes in the vault depositor account.
 */
export const useSubscribedVaultDepositor = (
  vaultPubkey?: string
): {
  vaultDepositorAccountData: VaultDepositor | undefined;
  isLoaded: boolean;
} => {
  const authority = useCommonDriftStore((s) => s.authority);
  const bulkAccountLoader = useCommonDriftStore((s) => s.bulkAccountLoader);
  const connection = useCommonDriftStore((s) => s.connection);

  const [vaultDepositorAccountData, setVaultDepositorAccountData] = useState<
    VaultDepositor | undefined
  >();
  const [isLoaded, setIsLoaded] = useState(false);

  const vaultDepositorAccountRef = useRef<VaultDepositorAccount | undefined>();

  useEffect(() => {
    if (!authority) {
      setVaultDepositorAccountData(undefined);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [authority]);

  useEffect(() => {
    console.log("Entering useEffect in useSubscribedVaultDepositor");
    console.log("vaultPubkey: ", vaultPubkey);
    console.log("authority: ", authority);
    console.log("bulkAccountLoader: ", bulkAccountLoader);
    console.log("connection: ", connection);
    if (!vaultPubkey || !authority || !bulkAccountLoader || !connection) return;

    setIsLoaded(false);

    syncVaultDepositorAccountAndData();

    return () => {
      vaultDepositorAccountRef.current?.unsubscribe();
    };
  }, [vaultPubkey, authority, bulkAccountLoader, connection]);

  async function syncVaultDepositorAccountAndData() {
    console.log("Entering syncVaultDepositorAccountAndData");
    if (!vaultPubkey || !authority || !bulkAccountLoader || !connection) return;

    const vaultDepositorPubkey = VaultDepositorAccount.getAddressSync(
      VAULT_PROGRAM_ID,
      new PublicKey(vaultPubkey),
      authority
    );
    console.log("vaultDepositorPubkey: ", vaultDepositorPubkey);
    const newWallet =
      COMMON_UI_UTILS.createThrowawayIWallet(vaultDepositorPubkey);
    const driftVaultsProgram = getDriftVaultProgram(connection, newWallet);

    const vaultDepositorAccount = new VaultDepositorAccount(
      driftVaultsProgram,
      vaultDepositorPubkey,
      bulkAccountLoader
    );
    vaultDepositorAccountRef.current = vaultDepositorAccount;

    await vaultDepositorAccount.subscribe();

    try {
      const vaultDepositorAccountData = vaultDepositorAccount.getData();
      setVaultDepositorAccountData(vaultDepositorAccountData);
    } catch (e) {
      // error thrown above means that the vault depositor is not initialized
    } finally {
      setIsLoaded(true);

      // TODO: check if there is an update when vault depositor is initialized,
      // it should have, otherwise need to force fetch again by exporting this function
      vaultDepositorAccount.eventEmitter.on(
        "vaultDepositorUpdate",
        (newVaultDepositorData) => {
          setVaultDepositorAccountData(newVaultDepositorData);
        }
      );
    }
  }

  return {
    vaultDepositorAccountData,
    isLoaded,
  };
};
