const DevBanner = () => {
  const isDevEnvironment = process.env.GITHUB_REF_NAME !== "main";

  if (!isDevEnvironment) return null;

  return (
    // bottom-center on mobile: clear of the top tabs, the page-turn corners, and the control buttons
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:bottom-auto lg:top-4 lg:left-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium z-50 shadow-lg">
      <span>DEV {process.env.GITHUB_REF_NAME}</span>
    </div>
  );
};

export default DevBanner;
