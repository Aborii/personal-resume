"use client";

import React from "react";

const DevBanner: React.FC = () => {
  const isDevEnvironment = process.env.APP_ENV !== "production";

  if (!isDevEnvironment) return null;

  return (
    <div className="fixed top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium z-50 shadow-lg">
      <div className="flex items-center gap-1">
        <span>DEV</span>
      </div>
    </div>
  );
};

export default DevBanner;
