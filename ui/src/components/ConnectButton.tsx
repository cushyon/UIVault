"use client";

import { useModalStore } from "@/stores/useModalStore";
import { useCommonDriftStore } from "@drift-labs/react";
import { COMMON_UI_UTILS } from "@drift/common";
import { twMerge } from "tailwind-merge";

import { Button } from "./ui/button";

export default function ConnectButton({ className }: { className?: string }) {
  const authority = useCommonDriftStore((s) => s.authority);

  const setModalStore = useModalStore((s) => s.set);

  const openConnectWalletModal = () => {
    setModalStore((s) => {
      s.modals.showConnectWalletModal = true;
    });
  };

  return (
    <Button
      className={twMerge(
        "flex items-center gap-2 text-white rounded-full bg-[linear-gradient(90deg,#091BCD_0%,#123FFC_35%,#0B3FE8_64%,#4571F4_100%)]"
      )}
      onClick={openConnectWalletModal}
    >
      {!authority && (
        <>
          <span>Connect</span>
        </>
      )}

      {authority && <span>{COMMON_UI_UTILS.abbreviateAddress(authority)}</span>}
    </Button>
  );
}
