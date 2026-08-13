import React from "react";
import { cn } from "../../utils/cn";
import { PinDoodle, SketchUnderline, LinkOutDoodle } from "./doodles";

/* ---------------- sticky note ---------------- */

const STICKY_COLORS = {
  yellow: "var(--nb-st-y)",
  pink: "var(--nb-st-p)",
  mint: "var(--nb-st-m)",
  blue: "var(--nb-st-b)",
  orange: "var(--nb-st-o)",
} as const;

export type StickyColor = keyof typeof STICKY_COLORS;

export function StickyNote({
  color = "yellow",
  rotate = -2,
  attach = "pin",
  className,
  style,
  children,
}: {
  color?: StickyColor;
  rotate?: number;
  attach?: "pin" | "tape" | "none";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("nb-sticky", className)}
      style={
        {
          "--sc": STICKY_COLORS[color],
          "--rot": `${rotate}deg`,
          ...style,
        } as React.CSSProperties
      }
    >
      {attach === "pin" && (
        <PinDoodle className="absolute -top-2.5 left-1/2 -translate-x-1/2" size={27} />
      )}
      {attach === "tape" && <WashiTape color="rgba(226, 222, 214, 0.55)" className="-top-3 left-1/2 -translate-x-1/2" rotate={-2} />}
      {children}
    </div>
  );
}

/* ---------------- washi tape ---------------- */

export function WashiTape({
  color = "rgba(240, 170, 185, 0.6)",
  rotate = -4,
  className,
  style,
}: {
  color?: string;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("nb-tape", className)}
      style={
        {
          "--tape-c": color,
          "--rot": `${rotate}deg`,
          ...style,
        } as React.CSSProperties
      }
    />
  );
}

/* ---------------- manual highlight ---------------- */

export function Hl({
  color = "y",
  children,
  className,
}: {
  color?: "y" | "g" | "p";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <mark className={cn("nb-hl", color === "g" && "nb-hl--g", color === "p" && "nb-hl--p", className)}>
      {children}
    </mark>
  );
}

/* ---------------- ink link ---------------- */

export function InkLink({
  href,
  children,
  className,
  external = true,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={cn("nb-inklink", className)}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <LinkOutDoodle className="inline-block ml-1 -mt-0.5 opacity-70" />}
    </a>
  );
}

/* ---------------- section heading ---------------- */

export function SectionTitle({
  children,
  note,
  className,
}: {
  children: React.ReactNode;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-[calc(var(--nb-line)*0.55)]", className)}>
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <h2 className="nb-h2">{children}</h2>
        {note && (
          <span className="nb-marginnote mb-1" style={{ "--rot": "-1.5deg" } as React.CSSProperties}>
            {note}
          </span>
        )}
      </div>
      <SketchUnderline className="block h-[11px] w-[min(230px,70%)] -mt-1 text-[var(--nb-ink-soft)]" />
    </div>
  );
}

/* ---------------- margin note ---------------- */

export function MarginNote({
  children,
  rotate = -2,
  className,
}: {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
}) {
  return (
    <span className={cn("nb-marginnote", className)} style={{ "--rot": `${rotate}deg` } as React.CSSProperties}>
      {children}
    </span>
  );
}
