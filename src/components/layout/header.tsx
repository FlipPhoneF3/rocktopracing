import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#events', label: 'Events' },
    { href: '/results', label: 'Results' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Rock Top Racing" style={{ height: '50px', width: '150px' }} />
          </Link>
        </div>
        <nav className="hidden flex-1 items-center justify-center space-x-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-foreground/80 transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
            <Link href="/register" passHref>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Register Now</Button>
            </Link>
            <Link href="/admin/marketing-copy-generator" passHref>
                <Button variant="outline">AI Tool</Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
