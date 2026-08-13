import { Metadata } from "next";
import Notebook from "./components/notebook/Notebook";
import { generateMetadata } from "./utils/metadata";

export const metadata: Metadata = generateMetadata("home");

export default function Resume() {
  return (
    <>
      <noscript>
        {/* Without JS the notebook degrades to a plain stacked paper document. */}
        <style>{`
          .nb-book{width:min(96vw,860px)!important;height:auto!important;aspect-ratio:auto!important}
          .nb-spread{position:static!important;display:block!important;perspective:none!important}
          .nb-half{position:static!important}
          .nb-sheetwrap{position:static!important;visibility:visible!important;margin-bottom:24px}
          .nb-sheet{position:static!important}
          .nb-sheet-inner{position:static!important;overflow:visible!important}
          .nb-coverleaf,.nb-tabs-d,.nb-tabs-m,.nb-ctl,.nb-gutter,.nb-stack-l,.nb-stack-r{display:none!important}
          .nb-bookback{display:none!important}
          .nb-draw{stroke-dashoffset:0!important;animation:none!important}
          .nb-hl{background-size:100% 82%!important;animation:none!important}
          .nb-colflow{columns:auto!important;height:auto!important;width:auto!important;transform:none!important}
          .nb-pageview{overflow:visible!important}
          .nb-measure,.nb-probe,.nb-corner{display:none!important}
        `}</style>
      </noscript>
      <Notebook />
    </>
  );
}
