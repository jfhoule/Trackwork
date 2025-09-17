import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/ui/sidebar';
import { Header } from '@/components/ui/header';

export const metadata: Metadata = {
  title: 'Trackwork',
  description: 'Minimal time tracking platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        <div className="flex min-h-screen">
          <Sidebar className="hidden md:flex" />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
