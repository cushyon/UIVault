import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 bg-main-bg">
      <Link
        href="/vaults"
        className="flex items-center justify-center px-6 py-3 text-lg font-medium text-white transition-colors rounded-lg from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70  bg-[linear-gradient(90deg,#091BCD_0%,#123FFC_35%,#0B3FE8_64%,#4571F4_100%)]"
      >
        Go to Vaults
      </Link>
    </div>
  );
}
