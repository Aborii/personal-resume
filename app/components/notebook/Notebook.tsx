"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import resumeData from "../../../data/resumeData.json";
import { generateResumePDFForPrint } from "../../utils/pdfGenerator";
import { useNotebookSounds } from "./useNotebookSounds";
import BookmarkTabs, { type TabDef } from "./BookmarkTabs";
import CoverFront from "./Cover";
import IdentityPage, { type TocItem } from "./IdentityPage";
import LampToggle from "./LampToggle";
import { SpeakerDoodle } from "./doodles";
import SummaryPage from "./sections/SummaryPage";
import AchievementsPage from "./sections/AchievementsPage";
import SkillsPage from "./sections/SkillsPage";
import ExperiencePage from "./sections/ExperiencePage";
import ProjectsPage from "./sections/ProjectsPage";
import EducationPage from "./sections/EducationPage";
import ContactPage from "./sections/ContactPage";

type PageDef = {
  id: string;
  tab: string;
  color: string;
  render: () => React.ReactNode;
};

type Flip = {
  dir: "fwd" | "back";
  /** content on the moving leaf's front face (right-page side) */
  frontIdx: number;
  /** content on the leaf's back face (becomes/was the left page); null = blank verso (mobile) */
  backIdx: number | null;
  /** fwd: what the static left page keeps showing until the leaf lands (null = inside cover) */
  holdLeft: number | null;
  /** back: what the static right page keeps showing until the leaf lands */
  holdRight: number | null;
  key: number;
};

/** which section sits on the static left page for a given spread (null = the inside cover) */
const leftFor = (k: number) => (k >= 2 ? k - 1 : null);

const FLIP_DURATION = 0.85;

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

export default function Notebook() {
  const reduced = useReducedMotion();
  const visitedAtLoad = useVisitedAtLoad();
  const { enabled: soundOn, toggle: toggleSound, playFlip, playTap } = useNotebookSounds();

  const [current, setCurrent] = useState(1);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [coverOpen, setCoverOpen] = useState<"closed" | "opening" | "open">("closed");
  const [visited, setVisited] = useState<ReadonlySet<number>>(() => new Set([1]));

  // same-session visitors and reduced-motion users get an already-open notebook
  const coverState = coverOpen === "closed" && (visitedAtLoad || reduced) ? "open" : coverOpen;

  const pendingRef = useRef<number | null>(null);
  const flipCount = useRef(0);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  const navigateRef = useRef<(index: number) => void>(() => {});

  const toc: TocItem[] = useMemo(
    () => [
      { id: "about", label: "About me", index: 1 },
      { id: "wins", label: "Things I'm proud of", index: 2 },
      { id: "skills", label: "Toolbox", index: 3 },
      { id: "work", label: "Where I've worked", index: 4 },
      { id: "projects", label: "Notable projects", index: 5 },
      { id: "school", label: "School days", index: 6 },
      { id: "say-hi", label: "Say hi", index: 7 },
    ],
    [],
  );

  const identity = useCallback(
    () => (
      <IdentityPage
        personalInfo={resumeData.personalInfo}
        toc={toc}
        current={current}
        visited={visited}
        onNavigate={(index) => navigateRef.current(index)}
      />
    ),
    [toc, current, visited],
  );

  const pages: PageDef[] = useMemo(
    () => [
      { id: "hello", tab: "Me", color: "#d4a373", render: identity },
      { id: "about", tab: "About", color: "#ffd166", render: () => <SummaryPage summary={resumeData.summary} /> },
      { id: "wins", tab: "Wins", color: "#ef767a", render: () => <AchievementsPage achievements={resumeData.keyAchievements} /> },
      { id: "skills", tab: "Skills", color: "#7fb069", render: () => <SkillsPage skills={resumeData.skills} topSkills={resumeData.og.topSkills} /> },
      { id: "work", tab: "Work", color: "#5aa9e6", render: () => <ExperiencePage experiences={resumeData.experience} /> },
      { id: "projects", tab: "Projects", color: "#b088f9", render: () => <ProjectsPage projects={resumeData.projects} /> },
      { id: "school", tab: "School", color: "#f79ad3", render: () => <EducationPage education={resumeData.education} languages={resumeData.languages} /> },
      { id: "say-hi", tab: "Say hi", color: "#4ecdc4", render: () => <ContactPage personalInfo={resumeData.personalInfo} /> },
    ],
    [identity],
  );

  const tabs: TabDef[] = useMemo(
    () => pages.map((p, index) => ({ id: p.id, tab: p.tab, color: p.color, index })),
    [pages],
  );

  const rightShown = flip?.dir === "back" && flip.holdRight !== null ? flip.holdRight : current;
  const leftShown = flip?.dir === "fwd" ? flip.holdLeft : leftFor(current);

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
      playFlip();
      markVisitedStorage();
      return reduced ? "open" : "opening";
    });
  }, [playFlip, markVisitedStorage, reduced]);

  const navigate = useCallback(
    (index: number) => {
      if (index < 0 || index >= pages.length) return;
      if (index === 0 && isDesktop()) return;
      const writeHash = () =>
        window.history.replaceState(null, "", `#${pages[index]?.id ?? ""}`);
      if (coverState === "closed") {
        openCover();
        if (index !== current) {
          setCurrent(index);
          setVisited((prev) => new Set(prev).add(index));
          writeHash();
        }
        return;
      }
      if (flip) {
        pendingRef.current = index;
        return;
      }
      if (index === current) return;
      writeHash();

      const dir: Flip["dir"] = index > current ? "fwd" : "back";
      setVisited((prev) => new Set(prev).add(index));
      playFlip();

      if (reduced) {
        setCurrent(index);
        return;
      }

      flipCount.current += 1;
      const backIdx = isDesktop() ? leftFor(dir === "fwd" ? index : current) : null;
      if (dir === "fwd") {
        setFlip({ dir, frontIdx: current, backIdx, holdLeft: leftFor(current), holdRight: null, key: flipCount.current });
      } else {
        setFlip({ dir, frontIdx: index, backIdx, holdLeft: null, holdRight: current, key: flipCount.current });
      }
      setCurrent(index);
    },
    [pages, coverState, flip, current, reduced, openCover, playFlip],
  );

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const onFlipDone = useCallback(() => {
    setFlip(null);
  }, []);

  // run a queued navigation once the current flip has finished
  useEffect(() => {
    if (!flip && pendingRef.current !== null) {
      const next = pendingRef.current;
      pendingRef.current = null;
      navigate(next);
    }
  }, [flip, navigate]);

  // first mount: resolve deep links, then schedule the cover auto-open
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const index = pages.findIndex((p) => p.id === hash);
      if (index >= 0 && !(index === 0 && isDesktop())) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL hash
        setCurrent(index);
        setVisited((prev) => new Set(prev).add(index));
      }
    }

    if (visitedAtLoad) return undefined;
    if (reduced) {
      markVisitedStorage();
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setCoverOpen((state) => {
        if (state !== "closed") return state;
        playFlip();
        markVisitedStorage();
        return "opening";
      });
    }, 1200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // safety net: if the transitionend event is lost (e.g. hidden tab), settle the cover anyway
  useEffect(() => {
    if (coverOpen !== "opening") return undefined;
    const timer = window.setTimeout(() => {
      setCoverOpen((state) => (state === "opening" ? "open" : state));
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [coverOpen]);

  // arrow-key page turns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (typeof target?.closest === "function" && target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (e.key === "ArrowRight") {
        navigateRef.current(Math.min(current + 1, pages.length - 1));
      } else if (e.key === "ArrowLeft") {
        navigateRef.current(Math.max(current - 1, isDesktop() ? 1 : 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, pages.length]);

  // Ctrl/Cmd+P and window.print produce the classic printable PDF
  useEffect(() => {
    const printPDF = () => {
      try {
        generateResumePDFForPrint(resumeData);
      } catch (error) {
        console.error("Error printing PDF:", error);
      }
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
      if (dx < 0) navigate(Math.min(current + 1, pages.length - 1));
      else navigate(Math.max(current - 1, isDesktop() ? 1 : 0));
    }
  };

  const onCoverTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    setCoverOpen((state) => (state === "opening" ? "open" : state));
  };

  const coverIsOpen = coverState !== "closed";
  const leafFront = flip ? pages[flip.frontIdx] : null;

  return (
    <div className="nb-scene">
      <div className="nb-lampglow" aria-hidden="true" />

      <div className="nb-stagewrap">
        <BookmarkTabs variant="mobile" tabs={tabs} current={current} onSelect={(i) => { playTap(); navigate(i); }} />

        <div
          className="nb-book"
          data-cover={coverIsOpen ? "open" : "closed"}
          suppressHydrationWarning
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="nb-bookback" aria-hidden="true" />

          <BookmarkTabs
            variant="desktop"
            tabs={tabs.slice(1)}
            current={current}
            onSelect={(i) => { playTap(); navigate(i); }}
          />

          <div className="nb-spread">
            <div className="nb-half nb-half--left">
              {/* blank back of the last turned sheet, atop the pile of turned pages */}
              {leftShown !== null && (
                <div className="nb-leftpage">
                  <div className="nb-stack-l" aria-hidden="true" />
                  <div className="nb-sheet nb-sheet--left">
                    <div className="nb-sheet-inner" />
                    <span className="nb-verso-num">· {leftShown} ·</span>
                  </div>
                  <button
                    type="button"
                    className="nb-corner nb-corner--prev hidden lg:block"
                    onClick={() => navigate(current - 1)}
                    aria-label="Turn back a page"
                  />
                </div>
              )}
            </div>

            <div className="nb-half nb-half--right">
              <div className="nb-stack-r" aria-hidden="true" />

              {pages.map((page, i) => (
                <div
                  key={page.id}
                  id={`nb-panel-${page.id}`}
                  role="tabpanel"
                  aria-labelledby={`nb-tabd-${page.id}`}
                  className="nb-sheetwrap"
                  data-active={i === rightShown ? "true" : "false"}
                  suppressHydrationWarning
                >
                  <div className="nb-sheet nb-sheet--right">
                    <div
                      className="nb-sheet-inner"
                      tabIndex={i === rightShown ? 0 : -1}
                      aria-label={page.tab}
                    >
                      {page.render()}
                    </div>
                  </div>
                </div>
              ))}

              {current < pages.length - 1 && (
                <button
                  type="button"
                  className="nb-corner nb-corner--next"
                  onClick={() => navigate(current + 1)}
                  aria-label="Turn to the next page"
                />
              )}
              {current > 0 && (
                <button
                  type="button"
                  className="nb-corner nb-corner--prev lg:hidden"
                  onClick={() => navigate(current - 1)}
                  aria-label="Turn back a page"
                />
              )}

              {flip && leafFront && (
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
                      <div className="nb-sheet-inner">{leafFront.render()}</div>
                      <motion.div
                        className="nb-leaf-shadow"
                        initial={{ opacity: flip.dir === "fwd" ? 0 : 0.3 }}
                        animate={{ opacity: flip.dir === "fwd" ? [0, 0.32, 0.05] : [0.3, 0.32, 0] }}
                        transition={{ duration: FLIP_DURATION, times: [0, 0.55, 1], ease: "linear" }}
                      />
                    </div>
                    <div className="nb-leaf-face nb-leaf-face--back nb-static" aria-hidden="true">
                      <div className="nb-sheet-inner" />
                      {flip.backIdx !== null && <span className="nb-verso-num">· {flip.backIdx} ·</span>}
                    </div>
                  </motion.div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="nb-gutter" aria-hidden="true" />

          {/* the cover: its inside face is the identity page the rest of the notebook stacks onto */}
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
            <div className="nb-cover-back" inert={!coverIsOpen || leftShown !== null}>
              <div className="nb-sheet-inner">{identity()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="nb-ctl">
        <button
          type="button"
          className="nb-ctl-btn"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute paper sounds" : "Enable paper sounds"}
          title={soundOn ? "Sounds on" : "Sounds off"}
        >
          <SpeakerDoodle on={soundOn} size={24} />
        </button>
        <LampToggle />
      </div>
    </div>
  );
}
