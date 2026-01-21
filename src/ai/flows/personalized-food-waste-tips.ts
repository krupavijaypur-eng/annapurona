'use server';

/**
 * @fileOverview Provides personalized food waste reduction tips based on user consumption patterns.
 *
 * - `getPersonalizedFoodWasteTips` - A function that retrieves personalized food waste reduction tips.
 * - `PersonalizedFoodWasteTipsInput` - The input type for the `getPersonalizedFoodWasteTips` function.
 * - `PersonalizedFoodWasteTipsOutput` - The return type for the `getPersonalizedFoodWasteTips` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFoodWasteTipsInputSchema = z.object({
  consumptionPatterns: z
    .string()
    .describe(
      'A summary of the user consumption patterns, including frequently wasted items and common reasons for waste.'
    ),
});
export type PersonalizedFoodWasteTipsInput = z.infer<typeof PersonalizedFoodWasteTipsInputSchema>;

const PersonalizedFoodWasteTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized food waste reduction tips.'),
});
export type PersonalizedFoodWasteTipsOutput = z.infer<typeof PersonalizedFoodWasteTipsOutputSchema>;

export async function getPersonalizedFoodWasteTips(
  input: PersonalizedFoodWasteTipsInput
): Promise<PersonalizedFoodWasteTipsOutput> {
  return personalizedFoodWasteTipsFlow(input);
}

const foodWasteTipsPrompt = ai.definePrompt({
  name: 'foodWasteTipsPrompt',
  input: {schema: PersonalizedFoodWasteTipsInputSchema},
  output: {schema: PersonalizedFoodWasteTipsOutputSchema},
  prompt: `You are a helpful assistant that provides personalized food waste reduction tips based on a user's consumption patterns. Provide actionable and easy-to-implement tips.

Consumption Patterns: {{{consumptionPatterns}}}

Tips:`,
});

const personalizedFoodWasteTipsFlow = ai.defineFlow(
  {
    name: 'personalizedFoodWasteTipsFlow',
    inputSchema: PersonalizedFoodWasteTipsInputSchema,
    outputSchema: PersonalizedFoodWasteTipsOutputSchema,
  },
  async input => {
    const {output} = await foodWasteTipsPrompt(input);
    return output!;
  }
);
