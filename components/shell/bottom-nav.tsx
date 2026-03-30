'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/' as Route, label: 'Office', match: (pathname: string) => pathname === '/' },
  { href: '/activity' as Route, label: 'Activity', match: (pathname: string) => pathname === '/activity' },
  { href: '/inbox' as Route, label: 'Inbox', match: (pathname: string) => pathname === '/inbox' },
  { href: `/projects/${'rileys-office'}` as Route, label: 'Projects', match: (pathname: string) => pathname.startsWith('/projects/') },
  { href: `/agents/${'engineer-riley'}` as Route, label: 'Me', match: (pathname: string) => pathname.startsWith('/agents/') },
];

export function BottomNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const isActive = item.match(pathname);

        return (
          <Link key={item.href} href={item.href} className={`bottom-nav__item${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'page' : undefined}>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
