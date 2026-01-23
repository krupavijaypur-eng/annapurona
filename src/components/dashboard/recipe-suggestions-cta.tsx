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
import { useLanguage } from '@/context/LanguageContext';

export function RecipeSuggestionsCta() {
  const { t } = useLanguage();
  const recipeImage = PlaceHolderImages.find(img => img.id === 'recipe-placeholder');
  
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <ChefHat className="text-primary"/>
            <CardTitle>{t('recipes.title')}</CardTitle>
        </div>
        <CardDescription>
          {t('dashboard.recipeCta.description')}
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
          {t('dashboard.recipeCta.subtext')}
        </p>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href="/dashboard/recipes">
          <Button className="w-full" variant="outline">
            {t('dashboard.recipeCta.button')} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
