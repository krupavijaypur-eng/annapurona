import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuickAdd } from '@/components/dashboard/quick-add';
import { RecipeSuggestionsCta } from '@/components/dashboard/recipe-suggestions-cta';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Welcome to Annapourna!</CardTitle>
          <CardDescription>
            Your smart kitchen assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p>This is your smart kitchen assistant. Use the navigation to explore your inventory, recipes, and more.</p>
        </CardContent>
      </Card>
      
      <QuickAdd />

      <div className="lg:col-span-3">
        <RecipeSuggestionsCta />
      </div>
    </div>
  );
}
