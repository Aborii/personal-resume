import React from "react";

/**
 * Hand-drawn SVG doodles. Every stroke uses currentColor so ink color
 * is inherited, and "draw-on" paths use pathLength=1 with the .nb-draw
 * class so the CSS animation can sketch them in when a page activates.
 */

type DoodleProps = {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

const draw = { pathLength: 1, style: { ["--len" as string]: 1 } as React.CSSProperties };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SketchUnderline({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 12" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 8 C 38 3.5 74 9.5 112 6 S 182 8.5 217 4.5"
        {...stroke}
        strokeWidth="2.4"
        className="nb-draw"
        {...draw}
      />
      <path d="M8 10.5 C 40 8 66 11 96 9" {...stroke} strokeWidth="1.4" opacity="0.55" className="nb-draw" {...draw} />
    </svg>
  );
}

export function SketchEllipse({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} style={style} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M60 5 C 96 4 116 14 115 29 C 114 46 88 56 57 55 C 26 54 4 45 5 29 C 6 13 32 6 66 6"
        {...stroke}
        strokeWidth="2.2"
        className="nb-draw"
        {...draw}
      />
    </svg>
  );
}

export function ArrowCurve({ className, size = 40, style }: DoodleProps & { flip?: boolean }) {
  return (
    <svg width={size} viewBox="0 0 40 34" className={className} style={style} aria-hidden="true">
      <path d="M4 4 C 20 3 30 11 33 24" {...stroke} strokeWidth="1.9" className="nb-draw" {...draw} />
      <path d="M27 20 L 33.5 25.5 L 36 17.5" {...stroke} strokeWidth="1.9" className="nb-draw" {...draw} />
    </svg>
  );
}

export function ArrowBullet({ className, size = 17 }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 20 14" className={className} aria-hidden="true">
      <path d="M2 7.5 C 7 6.5 11 7.5 16 7" {...stroke} strokeWidth="1.9" />
      <path d="M12 3.5 L 17 7 L 12 10.8" {...stroke} strokeWidth="1.9" />
    </svg>
  );
}

export function StarDoodle({ className, size = 16, style }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2.5 L 14.6 8.9 L 21.5 9.3 L 16.2 13.8 L 18 20.6 L 12 16.9 L 6.1 20.8 L 7.8 13.9 L 2.6 9.2 L 9.5 8.8 Z"
        {...stroke}
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function PinDoodle({ className, size = 26, style }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" className={className} style={style} aria-hidden="true">
      <ellipse cx="13" cy="21.5" rx="4.5" ry="1.6" fill="rgba(0,0,0,0.18)" />
      <path d="M13 12.5 L 13 20" stroke="#7c7f8a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="13" cy="8.5" r="6" fill="#d64550" />
      <circle cx="13" cy="8.5" r="6" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      <circle cx="10.8" cy="6.6" r="1.8" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

export function PaperclipDoodle({ className, size = 30, style }: DoodleProps) {
  return (
    <svg width={size * 0.55} height={size} viewBox="0 0 18 34" className={className} style={style} aria-hidden="true">
      <path
        d="M13.5 8 L 13.5 25 C 13.5 29 10.5 31 8.5 31 C 6.5 31 4 29.4 4 25.5 L 4 7.5 C 4 4 6 2.5 8.7 2.5 C 11.4 2.5 13.5 4.2 13.5 7.4 M 13.5 8 L 13.5 8 M 10.5 8.5 L 10.5 24 C 10.5 26 9.6 27 8.6 27 C 7.6 27 7 26 7 24.5 L 7 9"
        fill="none"
        stroke="#8b93a3"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BinderClipDoodle({ className, size = 34, style }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 34 28" className={className} style={style} aria-hidden="true">
      <path d="M5 12 L 17 3 L 29 12 L 29 24 L 5 24 Z" fill="#3c4557" stroke="#252c3a" strokeWidth="1.2" />
      <path d="M11 12 C 9 6 12 4 14 6 M 23 12 C 25 6 22 4 20 6" fill="none" stroke="#9aa3b5" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 14 L 27 14" stroke="rgba(255,255,255,0.14)" strokeWidth="1.4" />
    </svg>
  );
}

export function CoffeeRingDoodle({ className, size = 120, style }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 120 114" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="#7a4a1e" strokeLinecap="round">
        {/* mug ring */}
        <path
          d="M60 12 C 92 10 108 28 107 52 C 106 80 86 96 58 95 C 30 94 12 78 13 51 C 14 27 32 13 60 12 Z"
          strokeWidth="8"
          opacity="0.4"
        />
        {/* heavier crescent where the mug rested */}
        <path d="M20 66 C 25 85 42 95 60 95" strokeWidth="9" opacity="0.45" />
        {/* second faint ring from setting the mug down twice */}
        <path d="M60 18 C 87 17 101 32 100 52 C 99 75 82 89 57 88" strokeWidth="2.2" opacity="0.4" />
        {/* run + droplets */}
        <path d="M19 72 C 15 79 16 86 21 90" strokeWidth="4.5" opacity="0.32" />
        <circle cx="28" cy="105" r="2.8" fill="#7a4a1e" stroke="none" opacity="0.35" />
        <circle cx="98" cy="27" r="1.9" fill="#7a4a1e" stroke="none" opacity="0.3" />
      </g>
    </svg>
  );
}

export function DownloadDoodle({ className, size = 16 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M10 2.8 C 10.4 6.6 10.3 9.6 10 12.6 M 6.2 9.2 L 10 13.4 L 13.8 9" {...stroke} strokeWidth="1.8" />
      <path d="M3.8 13.8 C 3.7 16 4.8 17.2 7 17.2 L 13.2 17.2 C 15.4 17.2 16.4 16 16.2 13.6" {...stroke} strokeWidth="1.8" />
    </svg>
  );
}

export function PrintDoodle({ className, size = 16 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-hidden="true">
      <path d="M7 7.5 L 7.2 3.4 C 9.7 3.1 12.4 3.1 14.9 3.4 L 15.1 7.5" {...stroke} strokeWidth="1.7" />
      <path
        d="M4.5 8 C 9 7.6 13.4 7.6 17.5 8 C 17.9 10.2 17.9 12.4 17.5 14.6 L 15.2 14.4 L 15.4 18.6 C 12.7 19 9.5 19 6.8 18.6 L 7 14.4 L 4.5 14.6 C 4.1 12.4 4.1 10.2 4.5 8 Z"
        {...stroke}
        strokeWidth="1.7"
      />
      <path d="M7 14.4 C 9.7 14.1 12.6 14.1 15.2 14.4" {...stroke} strokeWidth="1.5" />
      <circle cx="15.1" cy="10.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function PaperPlaneDoodle({ className, size = 100, style }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 100 62" className={className} style={style} aria-hidden="true">
      <path
        d="M4 52 C 20 46 34 34 44 30 C 30 40 24 48 22 56"
        {...stroke}
        strokeWidth="1.8"
        strokeDasharray="4 6"
        opacity="0.6"
      />
      <path d="M46 30 L 94 6 L 74 44 L 62 33 Z" {...stroke} strokeWidth="2" className="nb-draw" {...draw} />
      <path d="M62 33 L 60 47 L 68 38" {...stroke} strokeWidth="2" className="nb-draw" {...draw} />
      <path d="M94 6 L 62 33" {...stroke} strokeWidth="1.4" opacity="0.6" className="nb-draw" {...draw} />
    </svg>
  );
}

export function TallyMarks({ count, className }: { count: number; className?: string }) {
  const groups: number[] = [];
  let left = Math.max(0, Math.min(count, 15));
  while (left > 0) {
    groups.push(Math.min(left, 5));
    left -= 5;
  }
  const groupW = 24;
  const width = groups.length * groupW + 4;
  return (
    <svg
      width={width}
      height={18}
      viewBox={`0 0 ${width} 18`}
      className={className}
      role="img"
      aria-label={`${count} years`}
    >
      {groups.map((n, g) => {
        const x0 = 4 + g * groupW;
        return (
          <g key={g} {...stroke} strokeWidth="1.8">
            {Array.from({ length: Math.min(n, 4) }).map((_, i) => (
              <path
                key={i}
                d={`M${x0 + i * 4.6 + (i % 2 ? 0.7 : -0.4)} ${2.4 + (i % 3) * 0.5} L ${x0 + i * 4.6 + (i % 2 ? -0.5 : 0.6)} 15.6`}
              />
            ))}
            {n === 5 && <path d={`M${x0 - 2.5} 13.5 L ${x0 + 17} 3.5`} strokeWidth="1.9" />}
          </g>
        );
      })}
    </svg>
  );
}

export function CheckboxDoodle({ checked, className, size = 20 }: DoodleProps & { checked: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`${className ?? ""} ${checked ? "is-checked" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M4.5 4 C 11 3.2 17 3.6 20 4.2 C 20.6 10 20.4 15.5 20 19.6 C 14 20.4 8.5 20.3 4.2 19.8 C 3.6 14 3.8 8.5 4.5 4 Z"
        {...stroke}
        strokeWidth="1.7"
        opacity="0.8"
      />
      <path
        d="M6.5 12.5 L 10.5 17.5 L 21 3.5"
        {...stroke}
        strokeWidth="2.4"
        stroke="var(--nb-accent, #c44e4e)"
        pathLength={1}
        className="nb-check-path"
      />
    </svg>
  );
}

export function SigFlourish({ className, size = 120, style }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.3} viewBox="0 0 120 36" className={className} style={style} aria-hidden="true">
      <path
        d="M6 26 C 26 8 38 10 34 20 C 30 30 46 30 58 18 C 66 11 64 26 76 24 C 88 22 92 14 114 20"
        {...stroke}
        strokeWidth="1.9"
        className="nb-draw"
        {...draw}
      />
    </svg>
  );
}

/* --- lamp + speaker controls --- */

export function LampDoodle({ className, size = 24, lit }: DoodleProps & { lit?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden="true">
      {lit && (
        <g stroke="#e9a23b" strokeWidth="1.7" strokeLinecap="round" opacity="0.9">
          <path d="M5.5 15 L 2.5 17" />
          <path d="M7 19.5 L 4 23" />
          <path d="M12 20.5 L 11.5 24.5" />
        </g>
      )}
      <path d="M17 4 L 8 12 L 13.5 17.5 Z" fill={lit ? "#f3c34f" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17.5 3.5 C 19.5 5 20.5 6.5 21 8.5" {...stroke} strokeWidth="1.8" />
      <path d="M15.5 11 C 19 13 21.5 17 22 22" {...stroke} strokeWidth="1.8" />
      <path d="M16.5 25 C 19.5 24 24 24 25.5 25" {...stroke} strokeWidth="2" />
      <path d="M22 22 L 21.5 24.6" {...stroke} strokeWidth="1.8" />
    </svg>
  );
}

export function SpeakerDoodle({ className, size = 22, on }: DoodleProps & { on?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" className={className} aria-hidden="true">
      <path d="M4 10.5 C 6 10 7.5 10 9 10 L 14.5 5 C 15 10.5 15 15.5 14.5 21 L 9 16 C 7.5 16 6 16 4.3 15.7 C 3.9 14 3.9 12.2 4 10.5 Z" {...stroke} strokeWidth="1.8" />
      {on ? (
        <g {...stroke} strokeWidth="1.8">
          <path d="M18 9.5 C 19.5 11.5 19.5 14.5 18 16.5" />
          <path d="M21 7 C 23.5 10 23.5 16 21 19" />
        </g>
      ) : (
        <path d="M18 9 L 24 17 M 24 9 L 18 17" {...stroke} strokeWidth="1.8" />
      )}
    </svg>
  );
}

/* --- tiny contact doodles --- */

export function MapPinDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-hidden="true">
      <path d="M11 2.5 C 15.5 2.5 18.5 5.8 18.4 9.6 C 18.3 14 13.5 17.5 11 20 C 8.5 17.4 3.7 14 3.6 9.5 C 3.5 5.6 6.7 2.6 11 2.5 Z" {...stroke} strokeWidth="1.8" />
      <circle cx="11" cy="9.5" r="2.6" {...stroke} strokeWidth="1.7" />
    </svg>
  );
}

export function PhoneDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-hidden="true">
      <path d="M5 3.5 C 3.4 4.6 3 6.5 3.6 8.4 C 5.3 13.6 8.6 17 13.7 18.6 C 15.6 19.2 17.5 18.6 18.5 17 C 18.9 16.2 18.7 15.3 17.9 14.7 L 15.2 12.9 C 14.4 12.4 13.6 12.5 12.9 13.2 C 12.3 13.8 11.4 13.9 10.6 13.2 C 9.5 12.3 8.6 11.3 8 10.2 C 7.5 9.4 7.6 8.6 8.3 8 C 9 7.3 9.2 6.5 8.7 5.7 L 7.1 3.9 C 6.5 3.1 5.7 3 5 3.5 Z" {...stroke} strokeWidth="1.7" />
    </svg>
  );
}

export function MailDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 20" className={className} aria-hidden="true">
      <path d="M3 4.5 C 9 3.8 15.5 3.9 21 4.4 C 21.5 8 21.4 12 21 15.6 C 15 16.3 9 16.2 3.2 15.7 C 2.7 12 2.8 8 3 4.5 Z" {...stroke} strokeWidth="1.7" />
      <path d="M3.5 5.5 L 12 11.5 L 20.5 5.3" {...stroke} strokeWidth="1.7" />
    </svg>
  );
}

export function GithubDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3.5 C 17 3.5 20.5 7 20.5 11.6 C 20.5 15.4 18.2 18.3 14.8 19.6 C 14.7 18.4 14.8 17.2 14.3 16.4 C 17 15.9 18 14.2 18 12 C 18 10.9 17.7 10 17 9.3 C 17.2 8.5 17.2 7.6 16.9 6.8 C 15.9 6.9 15.1 7.4 14.4 7.9 C 12.9 7.5 11.2 7.5 9.7 7.9 C 9 7.4 8.1 6.9 7.2 6.8 C 6.9 7.7 6.9 8.5 7.1 9.3 C 6.4 10 6 10.9 6 12.1 C 6 14.2 7 15.9 9.7 16.4 C 9.4 16.9 9.3 17.5 9.3 18.2 L 9.3 19.7 C 5.9 18.4 3.5 15.4 3.5 11.6 C 3.5 7 7 3.5 12 3.5 Z" {...stroke} strokeWidth="1.6" />
      <path d="M9.3 18.4 C 8 18.9 6.8 18.6 6.1 17.2" {...stroke} strokeWidth="1.6" />
    </svg>
  );
}

export function LinkedinDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 4.5 C 10 3.8 15.5 3.9 19.8 4.4 C 20.3 9.5 20.2 14.5 19.8 19.4 C 14.5 20 9.5 19.9 4.7 19.5 C 4.2 14.5 4.3 9.5 4.5 4.5 Z" {...stroke} strokeWidth="1.6" />
      <path d="M8 10.5 L 8 16.2 M 8 8 L 8 8.2" {...stroke} strokeWidth="2" />
      <path d="M11.5 16.2 L 11.5 10.5 C 13 9.8 15.8 9.9 15.9 12.6 L 15.9 16.2" {...stroke} strokeWidth="1.8" />
    </svg>
  );
}

export function GlobeDoodle({ className, size = 18 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" className={className} aria-hidden="true">
      <path d="M11 2.6 C 16 2.5 19.5 6.3 19.4 11 C 19.3 15.9 15.5 19.4 11 19.4 C 6.4 19.4 2.7 15.7 2.7 11 C 2.7 6.3 6.5 2.7 11 2.6 Z" {...stroke} strokeWidth="1.7" />
      <path d="M3.2 11 L 18.9 11 M 11 2.8 C 7.8 7.8 7.8 14 11 19.2 M 11 2.8 C 14.2 7.8 14.2 14 11 19.2" {...stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function LinkOutDoodle({ className, size = 14 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M4 12.5 C 7 9 10 6 12.5 3.5 M 7 3 L 13 2.8 L 12.8 9" {...stroke} strokeWidth="1.7" />
    </svg>
  );
}

/* --- cover stickers --- */

export function CoffeeCupDoodle({ className, size = 26 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M6 11 C 11 10.4 16.5 10.5 21 11 C 21 16 20 21.5 17.5 23.5 C 15 24 12 24 9.7 23.5 C 7 21 6.2 15.5 6 11 Z" {...stroke} strokeWidth="1.8" />
      <path d="M21 13 C 24 12.7 25.5 14.5 24.5 16.5 C 23.7 18 22 18.6 20.4 18.4" {...stroke} strokeWidth="1.7" />
      <path d="M11 7.5 C 10.4 6 11.5 5.4 11.2 4 M 15.5 7.5 C 14.9 6 16 5.4 15.7 4" {...stroke} strokeWidth="1.6" opacity="0.75" />
    </svg>
  );
}

export function CodeTagDoodle({ className, size = 26 }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 34 24" className={className} aria-hidden="true">
      <path d="M10 4.5 C 7 7 5 9.5 3.5 12 C 5.2 14.5 7.3 17 10 19.5" {...stroke} strokeWidth="2" />
      <path d="M24 4.5 C 27 7 29 9.5 30.5 12 C 28.8 14.5 26.7 17 24 19.5" {...stroke} strokeWidth="2" />
      <path d="M19.5 3.5 C 17.5 9 16 14.5 14.5 20.5" {...stroke} strokeWidth="1.9" />
    </svg>
  );
}

export function BoltDoodle({ className, size = 22 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 26" className={className} aria-hidden="true">
      <path d="M13 2.5 L 5 14.5 L 10.5 15 L 8.5 23.5 L 17.5 11 L 11.8 10.6 Z" {...stroke} strokeWidth="1.8" />
    </svg>
  );
}

export function AtomDoodle({ className, size = 26 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="1.9" fill="currentColor" />
      <ellipse cx="14" cy="14" rx="11" ry="4.4" {...stroke} strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="11" ry="4.4" {...stroke} strokeWidth="1.5" transform="rotate(60 14 14)" />
      <ellipse cx="14" cy="14" rx="11" ry="4.4" {...stroke} strokeWidth="1.5" transform="rotate(-60 14 14)" />
    </svg>
  );
}

export function TsBadgeDoodle({ className, size = 26 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M4.5 4.5 C 11 3.8 17.5 3.9 23.5 4.4 C 24.1 10.5 24 16.8 23.5 23.4 C 17 24 11 23.9 4.7 23.5 C 4.1 17 4.2 10.5 4.5 4.5 Z" fill="#3178c6" stroke="#22598f" strokeWidth="1.2" />
      <path d="M8 11 L 15 11 M 11.5 11 L 11.5 20" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M21 12 C 19.5 10.5 16.8 11 17 13 C 17.2 15 20.8 14.7 21 17 C 21.2 19.3 18 19.8 16.4 18.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
