"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { LampDoodle } from "./doodles";

const emptySubscribe = () => () => {};

/**
 * The desk lamp: flick it to switch between the daylight desk and the
 * warm night-lamp scene (light/dark theme).
 */
export default function LampToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // hydration-safe "is mounted" — the theme is only known on the client
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isNight = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="nb-ctl-btn"
      onClick={() => setTheme(isNight ? "light" : "dark")}
      aria-label={isNight ? "Turn the desk lamp off (light theme)" : "Turn the desk lamp on (dark theme)"}
      title={isNight ? "Day at the desk" : "Night at the desk"}
    >
      <LampDoodle lit={isNight} size={26} />
    </button>
  );
}
