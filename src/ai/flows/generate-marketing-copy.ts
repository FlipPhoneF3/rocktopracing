'use server';

/**
 * @fileOverview AI-powered marketing copy generator for race events.
 *
 * - generateMarketingCopy - A function to generate marketing copy based on race details.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopy function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  raceName: z.string().describe('The name of the race event.'),
  location: z.string().describe('The location of the race.'),
  terrain: z.string().describe('The terrain of the race (e.g., rocky, forest, mountain).'),
  difficulty: z
    .enum(['Easy', 'Moderate', 'Difficult'])
    .describe('The difficulty level of the race.'),
  raceDistance: z.string().describe('The distance of the race (e.g., 5k, 10k, marathon).'),
});

export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  marketingCopy: z.string().describe('The generated marketing copy for the race.'),
});

export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopy(
  input: GenerateMarketingCopyInput
): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are a marketing expert specializing in creating compelling copy for trail races.

  Based on the following race details, generate engaging marketing copy to attract participants.

  Race Name: {{{raceName}}}
  Location: {{{location}}}
  Terrain: {{{terrain}}}
  Difficulty: {{{difficulty}}}
  Race Distance: {{{raceDistance}}}

  Write copy that is exciting and informative, highlighting the unique aspects of the race. The copy should be between 100 and 150 words.`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
