
import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/results', label: 'Results' },
    { href: '/contact', label: 'Contact' },
  ];

  const eventItems = [
    { href: '/events/granite-grinder-2024', label: 'Waxhaw Trail Fest' },
    { href: '/events/ridge-runner-ramble-2024', label: 'Inferno' },
    { href: '/events/creekside-crawl-2025', label: 'Terror Trails' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4 p-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" alt="Rock Top Racing" style={{ height: '60px', width: 'auto' }} />
          </Link>
          <nav className="flex flex-col gap-4 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/80 transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Accordion type="single" collapsible>
              <AccordionItem value="events">
                <AccordionTrigger className="text-lg font-medium text-foreground/80">Events</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 pl-4">
                  {eventItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-foreground/80 transition-colors hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
          <div className="mt-4">
            <Link href="/register" passHref>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsOpen(false)}>
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
