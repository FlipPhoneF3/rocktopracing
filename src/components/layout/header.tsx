'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MobileNav } from '@/components/layout/mobile-nav';

export function Header() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/results', label: 'Results' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Rock Top Racing" style={{ height: '80px', width: 'auto' }} />
          </Link>
        </div>
        <nav className="hidden flex-1 items-center justify-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-foreground/80 transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground/80 transition-colors hover:text-foreground">
              Events
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/events/granite-grinder-2024">
                <DropdownMenuItem>Waxhaw Trail Fest</DropdownMenuItem>
              </Link>
              <Link href="/events/ridge-runner-ramble-2024">
                <DropdownMenuItem>Inferno</DropdownMenuItem>
              </Link>
              <Link href="/events/creekside-crawl-2025">
                <DropdownMenuItem>Terror Trails</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
            <Link href="/register" passHref>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Register Now</Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
