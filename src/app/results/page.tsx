import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pastRaces } from "@/lib/data";

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl text-primary">
          Race Results Archive
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse results from our past events. Congratulations to all the runners!
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {pastRaces.map((race) => (
          <AccordionItem value={race.id} key={race.id}>
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              {race.name} - <span className="text-muted-foreground ml-2 font-normal">{race.date}</span>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {race.results.map((result) => (
                    <TableRow key={result.rank}>
                      <TableCell className="font-medium">{result.rank}</TableCell>
                      <TableCell>{result.name}</TableCell>
                      <TableCell className="text-right">{result.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
