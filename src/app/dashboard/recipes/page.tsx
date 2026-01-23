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
import { suggestRecipes } from '@/ai/flows/recipe-suggestions-based-on-expiry';
import type { InventoryItem, Recipe } from '@/lib/types';
import { ChefHat, Loader2 } from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';


export default function RecipesPage() {
  const { firestore, user } = useFirebase();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inventoryQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/inventoryItems`);
  }, [firestore, user]);

  const { data: inventory } = useCollection<InventoryItem>(inventoryQuery);

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      if (!inventory || inventory.length === 0) {
        setError('Your inventory is empty. Add some items to get recipe suggestions.');
        setIsLoading(false);
        return;
      }

      const ingredients = inventory.map(item => ({
        name: item.name,
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
            Get recipe ideas based on your current inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateRecipes} disabled={isLoading || !inventory}>
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
