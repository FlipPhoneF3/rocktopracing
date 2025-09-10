import Image from 'next/image';
import Link from 'next/link';
import { upcomingEvents } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Flag, Mountain, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateStaticParams() {
  return upcomingEvents.map((event) => ({
    id: event.id,
  }));
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const event = upcomingEvents.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="font-headline text-4xl md:text-6xl mb-4 text-primary">{event.name}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{event.location}</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mb-8">{event.description}</p>
            
            <div className="mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Register for this Race</Button>
              </Link>
            </div>
            
            <h2 className="font-headline text-3xl mb-4 text-primary">Course Map</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 shadow-md">
               <Image 
                 src={event.mapUrl} 
                 alt={`Map for ${event.name}`} 
                 fill 
                 className="object-cover" 
                 data-ai-hint="race map" 
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Race Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 text-accent"><Flag className="h-6 w-6" /></div>
                      <div>
                        <p className="font-semibold">Distance</p>
                        <p className="text-muted-foreground">{event.distance}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 text-accent"><Gauge className="h-6 w-6" /></div>
                      <div>
                        <p className="font-semibold">Difficulty</p>
                        <Badge variant="outline" className="capitalize">{event.difficulty}</Badge>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 text-accent"><Mountain className="h-6 w-6" /></div>
                      <div>
                        <p className="font-semibold">Terrain</p>
                        <p className="text-muted-foreground">{event.terrain}</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
