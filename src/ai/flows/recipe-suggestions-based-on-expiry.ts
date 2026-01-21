'use server';
/**
 * @fileOverview Recipe suggestion flow based on available ingredients and their expiry dates.
 *
 * - suggestRecipes - A function that suggests recipes based on available ingredients and their expiry dates.
 * - RecipeSuggestionsInput - The input type for the suggestRecipes function.
 * - RecipeSuggestionsOutput - The return type for the suggestRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionsInputSchema = z.object({
  ingredients: z
    .array(
      z.object({
        name: z.string().describe('The name of the ingredient.'),
        expiryDate: z.string().describe('The expiry date of the ingredient (YYYY-MM-DD).'),
      })
    )
    .describe('A list of available ingredients and their expiry dates.'),
});
export type RecipeSuggestionsInput = z.infer<typeof RecipeSuggestionsInputSchema>;

const RecipeSuggestionsOutputSchema = z.object({
  recipes: z
    .array(
      z.object({
        name: z.string().describe('The name of the recipe.'),
        ingredients: z.array(z.string()).describe('The ingredients required for the recipe.'),
        instructions: z.string().describe('The instructions to prepare the recipe.'),
      })
    )
    .describe('A list of suggested recipes based on available ingredients.'),
});
export type RecipeSuggestionsOutput = z.infer<typeof RecipeSuggestionsOutputSchema>;

export async function suggestRecipes(input: RecipeSuggestionsInput): Promise<RecipeSuggestionsOutput> {
  return recipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeSuggestionsPrompt',
  input: {schema: RecipeSuggestionsInputSchema},
  output: {schema: RecipeSuggestionsOutputSchema},
  prompt: `You are a recipe suggestion AI assistant. You will suggest recipes based on the available ingredients and their expiry dates.
Prioritize using ingredients that are expiring soon to minimize food waste.

Available Ingredients:
{{#each ingredients}}
- {{name}} (Expiry: {{expiryDate}})
{{/each}}

Suggest recipes that can be made with these ingredients. Provide the recipe name, a list of ingredients required, and the instructions to prepare the recipe.
Ensure that the ingredients listed in the recipe are a subset of the available ingredients.
`, 
});

const recipeSuggestionsFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionsFlow',
    inputSchema: RecipeSuggestionsInputSchema,
    outputSchema: RecipeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
