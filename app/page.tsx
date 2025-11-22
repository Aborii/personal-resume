export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans flex items-center justify-center px-8">
      <main className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-8">Abdullah Almofleh</h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="mailto:contact@abdullah-almofleh.com"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-lg transition-colors duration-200 underline"
          >
            contact@abdullah-almofleh.com
          </a>

          <a
            href="https://www.linkedin.com/in/abdullah-almofleh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-lg transition-colors duration-200 underline"
          >
            LinkedIn
          </a>
        </div>
      </main>
    </div>
  );
}
