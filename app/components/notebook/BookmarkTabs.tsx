"use client";

import { useEffect, useRef } from "react";

export type TabDef = {
  id: string;
  tab: string;
  color: string;
  index: number;
};

/**
 * Colorful plastic index tabs. Desktop: sticking out of the right page
 * edge. Mobile: a row along the top edge of the notepad.
 */
export default function BookmarkTabs({
  variant,
  tabs,
  current,
  onSelect,
}: {
  variant: "desktop" | "mobile";
  tabs: TabDef[];
  current: number;
  onSelect: (index: number) => void;
}) {
  const isDesktop = variant === "desktop";
  const rowRef = useRef<HTMLDivElement>(null);

  // keep the active tab in view when the mobile row overflows
  useEffect(() => {
    if (isDesktop) return;
    const row = rowRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const active = row.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!active) return;
    const target = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    row.scrollTo({ left: target, behavior: "smooth" });
  }, [isDesktop, current]);

  return (
    <div
      ref={rowRef}
      className={isDesktop ? "nb-tabs-d" : "nb-tabs-m"}
      role="tablist"
      aria-label="Notebook sections"
      aria-orientation={isDesktop ? "vertical" : "horizontal"}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`nb-tab${isDesktop ? "d" : "m"}-${tab.id}`}
          aria-selected={current === tab.index}
          aria-controls={`nb-panel-${tab.id}`}
          tabIndex={current === tab.index ? 0 : -1}
          className={isDesktop ? "nb-tab-d" : "nb-tab-m"}
          style={{ "--tab-c": tab.color } as React.CSSProperties}
          onClick={() => onSelect(tab.index)}
        >
          {tab.tab}
        </button>
      ))}
    </div>
  );
}
