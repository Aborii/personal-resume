import {
  TsBadgeDoodle,
  CodeTagDoodle,
  CoffeeCupDoodle,
  BoltDoodle,
  AtomDoodle,
} from "./doodles";
import type { ResumeData } from "../../types/resume-data";

/**
 * The front face of the notebook cover: embossed leather with
 * die-cut laptop stickers and the elastic band.
 */
export default function CoverFront({
  personalInfo,
  onOpen,
}: {
  personalInfo: ResumeData["personalInfo"];
  onOpen: () => void;
}) {
  return (
    <button type="button" className="nb-cover-front" onClick={onOpen} aria-label="Open the notebook">
      <span className="nb-elastic" aria-hidden="true" />

      {/* stickers */}
      <span className="nb-sticker text-[#2b3a55]" style={{ top: "14%", left: "10%", "--rot": "-7deg" } as React.CSSProperties} aria-hidden="true">
        <TsBadgeDoodle size={30} />
      </span>
      <span className="nb-sticker text-[#2b3a55]" style={{ top: "23%", right: "22%", "--rot": "5deg" } as React.CSSProperties} aria-hidden="true">
        <CodeTagDoodle size={34} />
      </span>
      <span className="nb-sticker text-[#7a4b21]" style={{ bottom: "26%", left: "14%", "--rot": "6deg" } as React.CSSProperties} aria-hidden="true">
        <CoffeeCupDoodle size={30} />
      </span>
      <span className="nb-sticker text-[#a8741f]" style={{ bottom: "17%", right: "17%", "--rot": "-8deg" } as React.CSSProperties} aria-hidden="true">
        <BoltDoodle size={26} />
      </span>
      <span className="nb-sticker text-[#2f6b8f]" style={{ top: "44%", left: "7%", "--rot": "3deg" } as React.CSSProperties} aria-hidden="true">
        <AtomDoodle size={28} />
      </span>

      {/* embossed title */}
      <span className="absolute inset-x-6 top-[32%] block text-center">
        <span className="nb-cover-emboss block text-[clamp(30px,4.5vw,46px)] font-bold leading-tight">
          {personalInfo.name}
        </span>
        <span className="nb-cover-emboss mt-2 block text-[clamp(16px,1.8vw,21px)]">
          field notes · full-stack engineering
        </span>
      </span>

      <span className="nb-cover-cta absolute bottom-[7%] left-1/2 -translate-x-1/2 text-[20px] nb-openhint">
        tap to open →
      </span>
    </button>
  );
}
