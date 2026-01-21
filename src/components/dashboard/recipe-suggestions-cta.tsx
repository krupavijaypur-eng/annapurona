import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ChefHat } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function RecipeSuggestionsCta() {
  const recipeImage = PlaceHolderImages.find(img => img.id === 'recipe-placeholder');
  
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <ChefHat className="text-primary"/>
            <CardTitle>Recipe Suggestions</CardTitle>
        </div>
        <CardDescription>
          Discover delicious recipes you can make with what you have.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
          {recipeImage && (
             <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                <Image
                    src={recipeImage.imageUrl}
                    alt={recipeImage.description}
                    data-ai-hint={recipeImage.imageHint}
                    fill
                    className="object-cover"
                />
             </div>
          )}
        <p className="mt-4 text-sm text-muted-foreground">
          Let AI help you reduce waste and cook amazing meals.
        </p>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href="/dashboard/recipes">
          <Button className="w-full" variant="outline">
            Find Recipes <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
