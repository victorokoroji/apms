'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(
    error: Error,
    errorInfo: unknown & { componentStack: string }
  ) {
    console.error(
      '🚨 Global Error Boundary caught an error:',
      error,
      errorInfo
    );

    // Track error with sentry u hear?

    // Track error analytics (if Google Analytics is available as well)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-20 w-32 h-32 border border-[#FE3403]/20 rounded-full animate-float"></div>
              <div className="absolute bottom-40 right-32 w-20 h-20 border border-[#FE8003]/20 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-[#FE3403]/10 rounded-full animate-float"></div>
            </div>

            <div className="relative text-center space-y-6 p-8 max-w-md mx-auto animate-fadeInUp">
              <div className="relative mx-auto w-20 h-20 mb-6 animate-pulse-glow">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FE3403]/10 to-[#FE8003]/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-3xl animate-bounce">😕</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2 animate-slide-up animation-delay-200">
                  <h2 className="text-2xl font-bold text-[#121212] tracking-[-0.02em]">
                    Oops! Something went wrong
                  </h2>
                  <p className="text-[#586474] leading-relaxed animate-fade-in animation-delay-300">
                    We encountered an unexpected error. Don&apos;t worry, our
                    team has been notified.
                  </p>
                </div>

                {/* Error details (development only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                    <summary className="cursor-pointer text-sm font-medium text-red-700">
                      Error Details (Development Only)
                    </summary>
                    <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-slide-up animation-delay-500">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-[#FE3403] to-[#FE8003] text-white font-semibold rounded-lg 
                          hover:shadow-lg hover:scale-105 transition-all duration-200 
                          focus:outline-none focus:ring-2 focus:ring-[#FE3403]/50 focus:ring-offset-2 cursor-pointer"
                >
                  🔄 Refresh Page
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-white text-[#586474] font-semibold rounded-lg border border-[#E6E6E6]
                          hover:bg-[#F9FAFB] hover:border-[#FE3403]/30 transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-[#FE3403]/50 focus:ring-offset-2 cursor-pointer"
                >
                  ← Go Back
                </button>
              </div>

              <p className="text-sm text-[#586474] pt-4 animate-fade-in animation-delay-600">
                Still having issues? Contact our{' '}
                <a
                  href="mailto:support@admordglobal.com"
                  className="text-[#FE3403] hover:text-[#FE8003] font-medium underline decoration-2 underline-offset-2"
                >
                  support team
                </a>
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
