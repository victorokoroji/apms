import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-10">
        <div className="space-y-6">
          <div className="text-8xl md:text-9xl lg:text-[10rem] font-extrabold bg-gradient-to-r from-primary-950 to-primary-400 bg-clip-text text-transparent drop-shadow-lg">
            404
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Lost in your journey?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              It seems you&apos;ve taken a wrong turn in the digital realm.
              Don&apos;t worry, we&apos;re here to guide you back to safety.
            </p>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Let's help you get back on track!
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-primary-700 px-8 py-3 rounded-xl font-semibold border border-primary-200 shadow hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
              />
            </svg>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
