"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import resumeData from "../../../data/resumeData.json";
import { generateResumePDFForPrint } from "../../utils/pdfGenerator";
import BookmarkTabs, { type TabDef } from "./BookmarkTabs";
import CoverFront from "./Cover";
import IdentityPage, { type TocItem } from "./IdentityPage";
import LampToggle from "./LampToggle";
import { PaperclipDoodle } from "./doodles";
import SummaryPage from "./sections/SummaryPage";
import AchievementsPage from "./sections/AchievementsPage";
import SkillsPage from "./sections/SkillsPage";
import ExperiencePage from "./sections/ExperiencePage";
import ProjectsPage from "./sections/ProjectsPage";
import EducationPage from "./sections/EducationPage";
import ContactPage from "./sections/ContactPage";

type Section = {
  id: string;
  tab: string;
  color: string;
  render: () => React.ReactNode;
};

/** one physical half-sheet of the notebook */
type PageDef =
  | { type: "me"; col: number }
  | { type: "blank" }
  | { type: "end" }
  | { type: "content"; section: number; col: number };

type Flip = {
  dir: "fwd" | "back";
  /** page on the moving leaf's front (recto) face */
  front: PageDef;
  /** page on the leaf's back (verso) face; null = plain paper (mobile) */
  back: PageDef | null;
  /** fwd: page index the static left keeps showing until the leaf lands */
  holdLeft: number | null;
  /** back: page index the static right keeps showing until the leaf lands */
  holdRight: number | null;
  key: number;
};

const FLIP_DURATION = 0.85;
const COL_GAP = 96;

function isDesktop() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

const emptySubscribe = () => () => {};

/** hydration-safe read of the pre-paint "seen this session" marker */
function useVisitedAtLoad() {
  return useSyncExternalStore(
    emptySubscribe,
    () => document.documentElement.hasAttribute("data-nb-visited"),
    () => false,
  );
}

/**
 * Page sequence per real-notebook rules: index 0 is the inside cover
 * (identity); every section starts on a right (odd) page. A section
 * ending on a right page leaves the next left page blank; ending on a
 * left page lets the next section start beside it on the same spread.
 */
function buildPages(meCount: number, counts: number[]): PageDef[] {
  const pages: PageDef[] = [];
  for (let col = 0; col < Math.max(1, meCount); col++) pages.push({ type: "me", col });
  counts.forEach((count, section) => {
    if (pages.length % 2 === 0) pages.push({ type: "blank" });
    for (let col = 0; col < count; col++) pages.push({ type: "content", section, col });
  });
  if (pages.length % 2 === 1) pages.push({ type: "end" });
  return pages;
}

export default function Notebook() {
  const reduced = useReducedMotion();
  const visitedAtLoad = useVisitedAtLoad();

  const sections: Section[] = useMemo(
    () => [
      { id: "about", tab: "About", color: "#ffd166", render: () => <SummaryPage summary={resumeData.summary} /> },
      { id: "wins", tab: "Wins", color: "#ef767a", render: () => <AchievementsPage achievements={resumeData.keyAchievements} /> },
      { id: "skills", tab: "Skills", color: "#7fb069", render: () => <SkillsPage skills={resumeData.skills} topSkills={resumeData.og.topSkills} /> },
      { id: "work", tab: "Work", color: "#5aa9e6", render: () => <ExperiencePage experiences={resumeData.experience} /> },
      { id: "projects", tab: "Projects", color: "#b088f9", render: () => <ProjectsPage projects={resumeData.projects} /> },
      { id: "school", tab: "School", color: "#f79ad3", render: () => <EducationPage education={resumeData.education} languages={resumeData.languages} /> },
      { id: "say-hi", tab: "Say hi", color: "#4ecdc4", render: () => <ContactPage personalInfo={resumeData.personalInfo} /> },
    ],
    [],
  );

  const [pos, setPos] = useState(1);
  /** page whose ink should draw itself on arrival (null = arrive fully inked) */
  const [animPage, setAnimPage] = useState<number | null>(1);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [coverOpen, setCoverOpen] = useState<"closed" | "opening" | "open">("closed");
  const [visited, setVisited] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [metrics, setMetrics] = useState<{ colw: number; colh: number } | null>(null);
  const [counts, setCounts] = useState<number[] | null>(null);
  const [fontsReady, setFontsReady] = useState(false);

  const pendingRef = useRef<number | null>(null);
  const flipCount = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef(0);
  const navigateRef = useRef<(index: number) => void>(() => {});

  // same-session visitors and reduced-motion users get an already-open notebook
  const coverState = coverOpen === "closed" && (visitedAtLoad || reduced) ? "open" : coverOpen;
  const coverIsOpen = coverState !== "closed";

  // counts[0] is the identity page's column count; the rest are the sections'
  const pages = useMemo(
    () => buildPages(counts?.[0] ?? 1, counts?.slice(1) ?? sections.map(() => 1)),
    [counts, sections],
  );

  const sectionStart = useMemo(() => {
    const starts: number[] = [];
    pages.forEach((p, i) => {
      if (p.type === "content" && p.col === 0) starts[p.section] = i;
    });
    return starts;
  }, [pages]);

  const sectionOfPage = useCallback(
    (index: number): number | null => {
      const p = pages[index];
      if (p?.type === "content") return p.section;
      return null;
    },
    [pages],
  );

  /** section shown at a position: the right page's section, else the left's */
  const activeSection = pos === 0 ? -1 : (sectionOfPage(pos) ?? sectionOfPage(pos - 1) ?? 0);

  const isFiller = useCallback(
    (index: number) => {
      const t = pages[index]?.type;
      return t === "blank" || t === "end";
    },
    [pages],
  );

  const stepReal = useCallback(
    (from: number, dir: 1 | -1) => {
      let i = from + dir;
      while (i >= 0 && i < pages.length && isFiller(i)) i += dir;
      return i >= 0 && i < pages.length ? i : null;
    },
    [pages.length, isFiller],
  );

  const lastRight = pages.length % 2 === 0 ? pages.length - 1 : pages.length - 2;

  // ---------- page-size measurement ----------
  useEffect(() => {
    const probe = probeRef.current;
    if (!probe) return undefined;
    const compute = () => {
      const cs = getComputedStyle(probe);
      const line = parseFloat(cs.lineHeight) || 30;
      const colw =
        probe.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const raw =
        probe.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const colh = Math.max(line * 4, Math.floor(raw / line) * line);
      if (colw > 50 && colh > 50) {
        setMetrics((prev) =>
          prev && Math.abs(prev.colw - colw) < 1 && Math.abs(prev.colh - colh) < 1
            ? prev
            : { colw, colh },
        );
      }
    };
    const ro = new ResizeObserver(compute);
    ro.observe(probe);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    void document.fonts?.ready?.then(() => {
      if (alive) setFontsReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  // count how many page-columns each section needs at the current size
  useEffect(() => {
    const measurer = measureRef.current;
    if (!metrics || !measurer) return;
    const next: number[] = [];
    measurer.querySelectorAll<HTMLElement>(".nb-measure-flow").forEach((flow) => {
      const n = Math.max(1, Math.round((flow.scrollWidth + COL_GAP) / (metrics.colw + COL_GAP)));
      next.push(n);
    });
     
    setCounts((prev) => (prev && prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
  }, [metrics, fontsReady, sections]);

  // when pagination changes, stay on the section the reader was in
  useEffect(() => {
    if (!counts) return;
    const section = lastSectionRef.current;
     
    setPos((p) => {
      if (p === 0) return p;
      const target = sectionStart[section] ?? 1;
      return sectionOfPage(p) === section ? p : target;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  // ---------- storage / cover ----------
  const markVisitedStorage = useCallback(() => {
    try {
      sessionStorage.setItem("nb-open", "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openCover = useCallback(() => {
    setCoverOpen((state) => {
      if (state !== "closed") return state;
      markVisitedStorage();
      return reduced ? "open" : "opening";
    });
  }, [markVisitedStorage, reduced]);

  // ---------- navigation ----------
  const navigate = useCallback(
    (index: number) => {
      if (index < 0 || index >= pages.length) return;
      const desktop = isDesktop();
      if (desktop && index === 0) return;
      if (desktop && index % 2 === 0) index += 1;
      if (!desktop && isFiller(index)) {
        const real = stepReal(index, index > pos ? 1 : -1);
        if (real === null) return;
        index = real;
      }
      const section = sectionOfPage(index) ?? sectionOfPage(index - 1);
      const writeHash = () => {
        const id = index === 0 ? "hello" : section !== null ? sections[section]?.id : undefined;
        if (id) window.history.replaceState(null, "", `#${id}`);
      };
      if (coverState === "closed") {
        openCover();
        if (index !== pos) {
          setPos(index);
          writeHash();
        }
        if (section !== null) {
          lastSectionRef.current = section;
          setVisited((prev) => new Set(prev).add(section));
        }
        return;
      }
      if (flip) {
        pendingRef.current = index;
        return;
      }
      if (index === pos) return;
      writeHash();
      if (section !== null) {
        lastSectionRef.current = section;
        setVisited((prev) => new Set(prev).add(section));
      }
      // ink only draws itself when turning forward into new pages; turning
      // back lands on pages already written, so they arrive fully inked
      setAnimPage(index > pos ? index : null);

      if (reduced) {
        setPos(index);
        return;
      }

      const dir: Flip["dir"] = index > pos ? "fwd" : "back";
      flipCount.current += 1;
      const blank: PageDef = { type: "blank" };
      if (dir === "fwd") {
        setFlip({
          dir,
          front: pages[pos] ?? blank,
          back: desktop ? (pages[index - 1] ?? blank) : null,
          holdLeft: desktop ? pos - 1 : null,
          holdRight: null,
          key: flipCount.current,
        });
      } else {
        setFlip({
          dir,
          front: pages[index] ?? blank,
          back: desktop ? (pages[pos - 1] ?? blank) : null,
          holdLeft: null,
          holdRight: pos,
          key: flipCount.current,
        });
      }
      setPos(index);
    },
    [pages, pos, flip, coverState, reduced, openCover, sectionOfPage, sections, isFiller, stepReal],
  );

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const onFlipDone = useCallback(() => {
    setFlip(null);
  }, []);

  useEffect(() => {
    if (!flip && pendingRef.current !== null) {
      const next = pendingRef.current;
      pendingRef.current = null;
      navigate(next);
    }
  }, [flip, navigate]);

  const stepNext = useCallback(() => {
    if (isDesktop()) {
      if (pos + 2 <= lastRight) navigateRef.current(pos + 2);
    } else {
      const next = stepReal(pos, 1);
      if (next !== null) navigateRef.current(next);
    }
  }, [pos, lastRight, stepReal]);

  const stepPrev = useCallback(() => {
    if (isDesktop()) {
      if (pos - 2 >= 1) navigateRef.current(pos - 2);
    } else {
      const prev = stepReal(pos, -1);
      if (prev !== null) navigateRef.current(prev);
    }
  }, [pos, stepReal]);

  // first mount: resolve deep links, then schedule the cover auto-open
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const sec = sections.findIndex((s) => s.id === hash);
      const target = hash === "hello" ? (isDesktop() ? 1 : 0) : sec >= 0 ? sectionStart[sec] : undefined;
      if (target !== undefined && target !== pos) {
        // one-time sync from the URL hash
        setPos(target);
        setAnimPage(target);
        if (sec >= 0) {
          lastSectionRef.current = sec;
          setVisited((prev) => new Set(prev).add(sec));
        }
      }
    } else if (!isDesktop()) {
      // a phone shows one page at a time, so it opens on the identity page;
      // on a spread that page is the inside cover, with About facing it
      setPos(0);
      setAnimPage(0);
      // nothing has been read yet, so no section is ticked off
      setVisited(new Set());
    }

    if (visitedAtLoad) return undefined;
    if (reduced) {
      markVisitedStorage();
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setCoverOpen((state) => {
        if (state !== "closed") return state;
        markVisitedStorage();
        return "opening";
      });
    }, 1200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // safety net: if the transitionend event is lost, settle the cover anyway
  useEffect(() => {
    if (coverOpen !== "opening") return undefined;
    const timer = window.setTimeout(() => {
      setCoverOpen((state) => (state === "opening" ? "open" : state));
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [coverOpen]);

  // growing to the two-page spread: land on a right page, never on "Me"
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) return;
      setPos((p) => {
        if (p === 0) {
          window.history.replaceState(null, "", "#about");
          lastSectionRef.current = 0;
          return 1;
        }
        return p % 2 === 0 ? p + 1 : p;
      });
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // arrow-key page turns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (typeof target?.closest === "function" && target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (e.key === "ArrowRight") stepNext();
      else if (e.key === "ArrowLeft") stepPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stepNext, stepPrev]);

  // Ctrl/Cmd+P and window.print produce the classic printable PDF
  useEffect(() => {
    const printPDF = () => {
      try {
        generateResumePDFForPrint(resumeData);
      } catch (error) {
        console.error("Error printing PDF:", error);      }
    };
    const onBeforePrint = (e: Event) => {
      e.preventDefault();
      printPDF();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        printPDF();
      }
    };
    window.addEventListener("beforeprint", onBeforePrint);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("beforeprint", onBeforePrint);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // touch swipe = page turn
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch" || !swipeRef.current) return;
    const dx = e.clientX - swipeRef.current.x;
    const dy = e.clientY - swipeRef.current.y;
    swipeRef.current = null;
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 2) {
      if (dx < 0) stepNext();
      else stepPrev();
    }
  };

  const onCoverTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    setCoverOpen((state) => (state === "opening" ? "open" : state));
  };

  // ---------- derived render state ----------
  const rightShown = flip?.dir === "back" && flip.holdRight !== null ? flip.holdRight : pos;
  const leftShown = flip?.dir === "fwd" && flip.holdLeft !== null ? flip.holdLeft : pos - 1;
  const leftPage = leftShown >= 1 ? pages[leftShown] : null;

  const toc: TocItem[] = useMemo(
    () => sections.map((s, i) => ({ id: s.id, label: tocLabel(s.id), index: i })),
    [sections],
  );

  const identity = useCallback(
    () => (
      <IdentityPage
        personalInfo={resumeData.personalInfo}
        toc={toc}
        current={activeSection}
        visited={visited}
        onNavigate={(sectionIdx) => {
          const target = sectionStart[sectionIdx];
          if (target !== undefined) navigateRef.current(target);
        }}
      />
    ),
    [toc, activeSection, visited, sectionStart],
  );

  const tabs: TabDef[] = useMemo(() => {
    const list: TabDef[] = [{ id: "hello", tab: "Me", color: "#d4a373", index: 0 }];
    sections.forEach((s, i) => {
      const start = sectionStart[i];
      if (start !== undefined) list.push({ id: s.id, tab: s.tab, color: s.color, index: start });
    });
    return list;
  }, [sections, sectionStart]);

  const selectedPos = pos === 0 ? 0 : (sectionStart[activeSection] ?? pos);

  const colStyle = (col: number) =>
    ({
      "--nb-col": col,
      ...(metrics ? { "--nb-colw": `${metrics.colw}px`, "--nb-colh": `${metrics.colh}px` } : {}),
    }) as React.CSSProperties;

  const renderContentInner = (page: Extract<PageDef, { type: "content" }>) => (
    <div className="nb-sheet-inner nb-pageview">
      <div className="nb-colflow" style={colStyle(page.col)}>
        {sections[page.section]?.render()}
      </div>
    </div>
  );

  /** the identity page flows across columns too, so it never scrolls */
  const renderIdentityInner = (col: number) => (
    <div className="nb-sheet-inner nb-pageview">
      <div className="nb-colflow" style={colStyle(col)}>
        {identity()}
      </div>
    </div>
  );

  /* the clip grips the paper's top edge, so it lives outside the sheet's clip */
  const paperclip = <PaperclipDoodle className="nb-idclip" size={36} />;

  const pageNumber = (index: number, page: PageDef) =>
    page.type === "end" ? (
      <span className="nb-verso-num">· the end ·</span>
    ) : page.type === "me" ? null : (
      <span className="nb-verso-num">· {index} ·</span>
    );

  return (
    <div className="nb-scene">
      <div className="nb-lampglow" aria-hidden="true" />

      <div className="nb-stagewrap">
        <BookmarkTabs variant="mobile" tabs={tabs} current={selectedPos} onSelect={(i) => navigate(i)} />

        <div
          className="nb-book"
          data-cover={coverIsOpen ? "open" : "closed"}
          suppressHydrationWarning
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="nb-bookback" aria-hidden="true" />

          <BookmarkTabs variant="desktop" tabs={tabs.slice(1)} current={selectedPos} onSelect={(i) => navigate(i)} />

          <div className="nb-spread">
            <div className="nb-half nb-half--left">
              {leftPage && (
                <div className="nb-leftpage">
                  <div className="nb-stack-l" aria-hidden="true" />
                  <div className="nb-sheet nb-sheet--left nb-static">
                    {leftPage.type === "content" ? (
                      renderContentInner(leftPage)
                    ) : (
                      <div className="nb-sheet-inner" />
                    )}
                    {pageNumber(leftShown, leftPage)}
                  </div>
                  <button
                    type="button"
                    className="nb-corner nb-corner--prev hidden lg:block"
                    onClick={stepPrev}
                    aria-label="Turn back a page"
                  />
                </div>
              )}
            </div>

            <div className="nb-half nb-half--right">
              <div className="nb-stack-r" aria-hidden="true" />

              {/* invisible page-sized probe: the source of column metrics */}
              <div ref={probeRef} className="nb-sheet-inner nb-probe" aria-hidden="true" />

              {pages.map((page, i) => {
                if (page.type === "blank") return null;
                const startOfSection = page.type === "content" && page.col === 0;
                const sectionDef = page.type === "content" ? sections[page.section] : undefined;
                return (
                  <div
                    key={page.type === "content" ? `c-${page.section}-${page.col}` : `${page.type}-${i}`}
                    {...(startOfSection && sectionDef ? { id: `nb-panel-${sectionDef.id}`, role: "tabpanel", "aria-labelledby": `nb-tabd-${sectionDef.id}` } : {})}
                    className="nb-sheetwrap"
                    data-active={i === rightShown ? "true" : "false"}
                    data-anim={i === pos && i === animPage ? "true" : "false"}
                    suppressHydrationWarning
                  >
                    <div className={`nb-sheet nb-sheet--right ${page.type === "me" ? "nb-sheet--me" : ""}`}>
                      {page.type === "me" ? (
                        renderIdentityInner(page.col)
                      ) : page.type === "content" ? (
                        renderContentInner(page)
                      ) : (
                        <div className="nb-sheet-inner" />
                      )}
                      {page.type === "me" && page.col === 0 && paperclip}
                      {pageNumber(i, page)}
                    </div>
                  </div>
                );
              })}

              {pos + 2 <= lastRight || (!isFiller(pos) && stepReal(pos, 1) !== null) ? (
                <button
                  type="button"
                  className="nb-corner nb-corner--next hidden lg:block"
                  onClick={stepNext}
                  aria-label="Turn to the next page"
                />
              ) : null}
              {flip && (
                <React.Fragment key={flip.key}>
                  <motion.div
                    className="nb-castshadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: FLIP_DURATION, times: [0, 0.5, 1], ease: "linear" }}
                  />
                  <motion.div
                    className="nb-leaf"
                    initial={{ rotateY: flip.dir === "fwd" ? 0 : -180 }}
                    animate={{ rotateY: flip.dir === "fwd" ? -180 : 0 }}
                    transition={{ duration: FLIP_DURATION, ease: [0.45, 0.06, 0.35, 0.96] }}
                    onAnimationComplete={onFlipDone}
                  >
                    <div className="nb-leaf-face nb-static" aria-hidden="true">
                      {flip.front.type === "content" ? (
                        renderContentInner(flip.front)
                      ) : flip.front.type === "me" ? (
                        renderIdentityInner(flip.front.col)
                      ) : (
                        <div className="nb-sheet-inner" />
                      )}
                      <motion.div
                        className="nb-leaf-shadow"
                        initial={{ opacity: flip.dir === "fwd" ? 0 : 0.3 }}
                        animate={{ opacity: flip.dir === "fwd" ? [0, 0.32, 0.05] : [0.3, 0.32, 0] }}
                        transition={{ duration: FLIP_DURATION, times: [0, 0.55, 1], ease: "linear" }}
                      />
                    </div>
                    <div className="nb-leaf-face nb-leaf-face--back nb-static" aria-hidden="true">
                      {flip.back && flip.back.type === "content" ? (
                        renderContentInner(flip.back)
                      ) : (
                        <div className="nb-sheet-inner" />
                      )}
                    </div>
                  </motion.div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="nb-gutter" aria-hidden="true" />

          {/* the cover: its inside face is the identity page the pages stack onto */}
          <div
            className={`nb-coverleaf ${coverIsOpen ? "nb-coverleaf--open" : ""} ${
              coverState === "open" ? "nb-coverleaf--settled nb-coverleaf--done-mobile" : ""
            }`}
            suppressHydrationWarning
            onTransitionEnd={onCoverTransitionEnd}
          >
            <div inert={coverIsOpen}>
              <CoverFront personalInfo={resumeData.personalInfo} onOpen={openCover} />
            </div>
            <div className="nb-cover-back" inert={!coverIsOpen || leftPage !== null}>
              {renderIdentityInner(0)}
              {paperclip}
            </div>
          </div>

          {/* hidden measuring rig: how many page-columns does each flow need?
              The identity page is measured first, then every section. */}
          <div ref={measureRef} className="nb-measure" aria-hidden="true" inert>
            {metrics &&
              [{ id: "hello", render: identity }, ...sections].map((s) => (
                <div
                  key={s.id}
                  className="nb-measure-flow"
                  style={{ "--nb-colw": `${metrics.colw}px`, "--nb-colh": `${metrics.colh}px` } as React.CSSProperties}
                >
                  {s.render()}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="nb-ctl">
        <LampToggle />
      </div>
    </div>
  );
}

function tocLabel(id: string): string {
  switch (id) {
    case "about":
      return "About me";
    case "wins":
      return "Things I'm proud of";
    case "skills":
      return "Toolbox";
    case "work":
      return "Where I've worked";
    case "projects":
      return "Notable projects";
    case "school":
      return "School days";
    default:
      return "Say hi";
  }
}
