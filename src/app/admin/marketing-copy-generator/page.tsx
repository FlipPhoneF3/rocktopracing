'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateMarketingCopy } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

const FormSchema = z.object({
  raceName: z.string().min(1, 'Race name is required.'),
  location: z.string().min(1, 'Location is required.'),
  terrain: z.string().min(1, 'Terrain is required.'),
  difficulty: z.enum(['Easy', 'Moderate', 'Difficult']),
  raceDistance: z.string().min(1, 'Race distance is required.'),
});

type FormValues = z.infer<typeof FormSchema>;

export default function MarketingCopyGeneratorPage() {
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      raceName: '',
      location: '',
      terrain: '',
      difficulty: 'Moderate',
      raceDistance: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    setGeneratedCopy('');
    const result = await generateMarketingCopy(data);
    setIsLoading(false);

    if (result.success && result.data) {
      setGeneratedCopy(result.data.marketingCopy);
      toast({
        title: 'Success!',
        description: 'Marketing copy generated.',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-6xl text-primary">AI Marketing Copy Generator</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Provide race details to generate compelling marketing content with the power of AI.</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-6 w-6" />
                <span>Race Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="raceName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Race Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., The Granite Grinder" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Stone Mountain, NC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="terrain" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Terrain</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Rocky, forest, mountain" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="difficulty" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Difficult">Difficult</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="raceDistance" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Race Distance</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5k, 10k, marathon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate Copy
                  </Button>
                </form>
              </Form>
            </CardContent>
        </Card>
        <div className="sticky top-24">
            <Card className="h-full shadow-lg">
                <CardHeader>
                    <CardTitle>Generated Copy</CardTitle>
                    <CardDescription>Your AI-powered marketing copy will appear below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        readOnly
                        value={isLoading ? "Generating..." : generatedCopy}
                        placeholder="Your generated content will be displayed here."
                        className="h-96 min-h-[400px] resize-none text-base"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
