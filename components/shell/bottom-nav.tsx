import type { Route } from 'next';
import Link from 'next/link';

const items = [
  { href: '/' as Route, label: 'Office' },
  { href: '/activity' as Route, label: 'Activity' },
  { href: '/inbox' as Route, label: 'Inbox' },
  { href: `/projects/${'rileys-office'}` as Route, label: 'Projects' },
  { href: `/agents/${'engineer-riley'}` as Route, label: 'Me' },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="bottom-nav__item">
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
