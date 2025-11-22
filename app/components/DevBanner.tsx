const DevBanner = () => {
  const isDevEnvironment = process.env.GITHUB_REF_NAME !== "main";

  if (!isDevEnvironment) return null;

  return (
    <div className="fixed top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium z-50 shadow-lg">
      <span>DEV {process.env.GITHUB_REF_NAME}</span>
    </div>
  );
};

export default DevBanner;
