"use client";

import Link from "next/link";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import { usePathname } from "next/navigation";
import { PAGES } from "@/constants/pages";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname.split("/")[1] === href.split("/")[1];

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
};

export const TopBar = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Link
        href="/vaults"
        aria-label="Cushion Home"
        className="flex items-center"
      >
        <Image
          src="/logo_white.svg"
          width={280}
          height={80}
          priority
          alt="Cushion logo"
        />
      </Link>
      {/* <span className="text-2xl font-bold">Cushion</span> */}

      <div className="flex flex-row items-center gap-4">
        {/** Whitelist wallets to display this, to hide this link from normal users */}
        {/* <NavLink href={PAGES.vaultManagerHome}>Vault Manager</NavLink> */}

        {/* <NavLink href="/vaults">Vaults</NavLink> */}
      </div>

      <ConnectButton />
    </div>
  );
};
