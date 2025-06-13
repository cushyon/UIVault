import { useMemo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

/** Utility: concatenate class names (Tailwind-friendly) */
const cn = (...classes: (string | undefined | false)[]) =>
  twMerge(classes.filter(Boolean).join(" "));

/**
 * RollingDigit – one column of rolling numbers (0‑9).
 *
 * NOTE: No explicit font‑size / font‑family classes here so it inherits whatever
 * typography wrapper (e.g. Typo.T1) provides.
 */
const RollingDigit = ({
  value,
  height = 32,
  duration = 0.6,
  className,
}: {
  value: number;
  height?: number;
  duration?: number;
  className?: string;
}) => {
  const digits = useMemo(
    () => Array.from({ length: 20 }, (_, i) => i % 10),
    []
  );

  return (
    <span
      className={cn(
        "inline-block overflow-hidden select-none leading-none",
        className
      )}
      style={{ height }}
    >
      <motion.div
        animate={{ y: -(value + 10) * height }}
        transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
      >
        {digits.map((d, idx) => (
          <span
            key={idx}
            className="flex items-center justify-center w-full"
            style={{ height }}
          >
            {d}
          </span>
        ))}
      </motion.div>
    </span>
  );
};

/**
 * RollingNumber – animates every digit of the provided value.
 *
 * Props:
 *   value      – number | string (decimals / suffix allowed)
 *   height     – pixel height of a single row (defaults 32)
 *   className  – classes forwarded to every RollingDigit & static char wrapper
 */
export const RollingNumber = ({
  value,
  height = 32,
  className,
  duration = 1,
  fractionDuration = 0.8,
}: {
  value: string | number;
  height?: number;
  className?: string;
  duration?: number;
  fractionDuration?: number;
}) => {
  const str = value.toString();
  const decimalIdx = str.indexOf(".");

  return (
    <span
      className={cn("inline-flex tabular-nums tracking-tighter", className)}
    >
      {Array.from(str).map((char, idx) => {
        if (/\d/.test(char)) {
          const isFraction = decimalIdx >= 0 && idx > decimalIdx;
          return (
            <RollingDigit
              key={idx}
              value={parseInt(char, 10)}
              height={height}
              duration={isFraction ? fractionDuration : duration}
            />
          );
        }
        return (
          <span
            key={idx}
            className="leading-none inline-block translate-y-[8px]"
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

/*
 * Typical usage inside a typography wrapper :
 *
 * <Typo.T1 className="text-positive-green">
 *   <RollingNumber value={"18.07"} height={28} />%
 * </Typo.T1>
 */
