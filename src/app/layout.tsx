import { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';

import { GlobalErrorBoundary } from '@/components/shared/GlobalErrorBoundary';
import GlobalFallback from '@/components/shared/GlobalFallback';

import { Providers } from '../providers';

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://admordglobal.com'),
  applicationName: 'Admord Performance Management System (APMS)',
  description:
    'Performance tracking, reporting, analytics, and team management platform for Admord Global.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Admord Performance Management System (APMS)',
  },
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'apple-itunes-app': 'app-id=6752776655',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} antialiased`}>
        <GlobalErrorBoundary>
          <Providers>
            <Suspense fallback={<GlobalFallback />}>
              {children}
              <ToastContainer />
            </Suspense>
          </Providers>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}

//redeploy: 1
