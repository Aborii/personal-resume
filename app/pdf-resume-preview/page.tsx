"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { buildResumePDF } from "../utils/pdfGenerator";
import resumeData from "../../data/resumeData.json";

export default function PdfResumePreviewPage() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [refreshInterval, setRefreshInterval] = useState<number>(2);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Save scroll position before refresh
  const saveScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      scrollPositionRef.current = container.scrollTop;
    }
  }, []);

  // Restore scroll position after refresh
  const restoreScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container && scrollPositionRef.current > 0) {
      // Restore immediately
      container.scrollTop = scrollPositionRef.current;

      // And retry a few times to ensure it sticks
      setTimeout(() => {
        if (container) container.scrollTop = scrollPositionRef.current;
      }, 50);
      setTimeout(() => {
        if (container) container.scrollTop = scrollPositionRef.current;
      }, 150);
    }
  }, []);

  const regeneratePDF = useCallback(() => {
    try {
      setError("");
      // Save current scroll position
      saveScrollPosition();

      // Revoke previous blob URL to prevent memory leaks
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      // Generate new PDF
      const doc = buildResumePDF(resumeData);
      const blobUrl = doc.output("bloburl") as unknown as string;

      setPdfUrl(blobUrl);
      setLastUpdate(new Date().toLocaleTimeString());

      // Restore scroll after a brief delay
      setTimeout(() => restoreScrollPosition(), 100);
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err instanceof Error ? err.message : "Failed to generate PDF");
    }
  }, [pdfUrl, saveScrollPosition, restoreScrollPosition]);

  // Generate PDF on mount
  useEffect(() => {
    regeneratePDF();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh based on interval
  useEffect(() => {
    if (!isAutoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      regeneratePDF();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [regeneratePDF, refreshInterval, isAutoRefresh]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Dev Banner */}
      <div className="bg-yellow-500 text-black px-6 py-3 font-semibold shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg">⚠️ DEV MODE - PDF Preview</span>
            {lastUpdate && <span className="text-sm opacity-80">Last updated: {lastUpdate}</span>}
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-refresh toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAutoRefresh}
                onChange={(e) => setIsAutoRefresh(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm">Auto-refresh</span>
            </label>

            {/* Refresh interval input */}
            <div className="flex items-center gap-2">
              <label htmlFor="refresh-interval" className="text-sm">
                Every
              </label>
              <input
                id="refresh-interval"
                type="number"
                min="1"
                max="60"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                disabled={!isAutoRefresh}
                className="w-16 px-2 py-1 rounded border border-gray-300 text-black disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-sm">sec</span>
            </div>

            {/* Force refresh button */}
            <button
              onClick={regeneratePDF}
              className="bg-black text-yellow-500 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              🔄 Refresh Now
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500 text-white px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Info Bar */}
      <div className="bg-blue-500 text-white px-6 py-2 text-sm">
        <div className="max-w-7xl mx-auto">
          💡{" "}
          {isAutoRefresh
            ? `Auto-refreshing every ${refreshInterval} second${refreshInterval !== 1 ? "s" : ""}.`
            : "Auto-refresh disabled."}{" "}
          Edit <code className="bg-blue-600 px-2 py-1 rounded">app/utils/pdfGenerator.ts</code> and save to see updates.{" "}
          Scroll position is preserved on refresh.
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          {pdfUrl ? (
            <div
              ref={scrollContainerRef}
              className="w-full h-[calc(100vh-200px)] overflow-auto border-2 border-gray-300 rounded-lg shadow-lg bg-gray-200"
            >
              <iframe
                key={pdfUrl}
                src={pdfUrl}
                className="w-full border-0"
                style={{ display: "block", height: "5000px" }}
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating PDF preview...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 text-gray-300 px-6 py-4 text-sm">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-bold text-white mb-2">Quick Tips:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Control auto-refresh with the toggle and interval input (1-60 seconds)</li>
            <li>Click &quot;Refresh Now&quot; to regenerate immediately</li>
            <li>Scroll position is automatically preserved across refreshes</li>
            <li>This page is for development only - not included in production build</li>
            <li>Press Ctrl+Shift+R (or Cmd+Shift+R) to hard refresh the page if needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
