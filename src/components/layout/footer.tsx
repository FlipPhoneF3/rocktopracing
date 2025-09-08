import Link from 'next/link';
import { Mountain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">Rock Top Racing</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rock Top Racing. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/results" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Results</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            <Link href="/admin/marketing-copy-generator" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Admin</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
