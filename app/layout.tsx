import type { Metadata } from 'next';
import '@/styles/globals.css';
import { BottomNav } from '@/components/shell/bottom-nav';
import { AppShell } from '@/components/shell/app-shell';

export const metadata: Metadata = {
  title: "Riley's_Office",
  description: 'Mobile-first OpenClaw command center.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
          <BottomNav />
        </AppShell>
      </body>
    </html>
  );
}
