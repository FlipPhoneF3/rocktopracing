import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { upcomingEvents, type RaceEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

function HeroSection() {
  return (
    <section className="relative h-[60vh] w-full">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="A trail runner on a mountain ridge"
        data-ai-hint="trail running"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
          Conquer The Summit
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-md">
          Push your limits with Rock Top Racing. Premier trail running events in the most breathtaking and challenging locations.
        </p>
        <div className="mt-8">
          <Link href="#events">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Races
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function UpcomingRacesSection() {
  return (
    <section id="events" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-headline text-4xl md:text-5xl mb-12 text-primary">
          Upcoming Races
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <RaceCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RaceCard({ event }: { event: RaceEvent }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={event.imageUrl}
            width={600}
            height={400}
            alt={`Image of ${event.name}`}
            className="object-cover w-full h-full"
            data-ai-hint="trail running race"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-4">
        <Badge variant="outline" className="capitalize">{event.difficulty}</Badge>
        <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
        <div className="text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}


export default function Home() {
  return (
    <>
      <HeroSection />
      <UpcomingRacesSection />
    </>
  );
}
