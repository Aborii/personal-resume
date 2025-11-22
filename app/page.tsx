export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 via-blue-50 to-purple-50 font-sans dark:from-green-900 dark:via-gray-900 dark:to-purple-900">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Abdullah Almofleh</h1>
          <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6">Software Developer & Tech Enthusiast</h2>

          {/* Funny Development Status */}
          <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="text-green-600 dark:text-green-400 mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-green-800 dark:text-green-200 font-medium">🚧 Under Construction! 🚧</p>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  This resume is currently being built with more caffeine than sleep. Please excuse the digital dust
                  while I code my way to greatness! ☕️💻
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Get In Touch</h3>

          <div className="space-y-4">
            {/* LinkedIn */}
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <a
                href="https://www.linkedin.com/in/abdullah-almofleh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium"
              >
                linkedin.com/in/abdullah-almofleh
              </a>
            </div>

            {/* Email 1 */}
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:abdullah@abdullah-almofleh.com"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
              >
                abdullah@abdullah-almofleh.com
              </a>
            </div>

            {/* Email 2 */}
            <div className="flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:almofleh.abdullah@gmail.com"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
              >
                almofleh.abdullah@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">Coming Soon...</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            My full resume with all the fancy animations, project showcases, and probably way too many hover effects.
            Because why use one CSS transition when you can use twenty? 🎨
          </p>

          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
