'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mockInventory } from '@/lib/data';
import { suggestRecipes } from '@/ai/flows/recipe-suggestions-based-on-expiry';
import type { Recipe } from '@/lib/types';
import { ChefHat, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const ingredients = mockInventory.map(item => ({
        name: item.name,
        expiryDate: format(item.expiryDate, 'yyyy-MM-dd'),
      }));

      const result = await suggestRecipes({ ingredients });
      setRecipes(result.recipes);
    } catch (e) {
      setError('Failed to generate recipes. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Suggestions</CardTitle>
          <CardDescription>
            Get recipe ideas based on your current inventory. The AI will prioritize items that are expiring soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateRecipes} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Recipes'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription className="text-destructive">{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      {recipes.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="text-primary" /> {recipe.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="ingredients">
                    <AccordionTrigger>Ingredients</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="instructions">
                    <AccordionTrigger>Instructions</AccordionTrigger>
                    <AccordionContent className="whitespace-pre-wrap">
                      {recipe.instructions}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
