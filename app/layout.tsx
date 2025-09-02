import type { Metadata } from 'next';
import './globals.css';
import { SidebarNav } from '@/components/sidebar-nav';

export const metadata: Metadata = {
  title: 'Trackwork',
  description: 'Minimal time tracking platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen">
          <SidebarNav />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
