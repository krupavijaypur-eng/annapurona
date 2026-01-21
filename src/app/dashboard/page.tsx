import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExpiringSoon } from '@/components/dashboard/expiring-soon';
import { QuickAdd } from '@/components/dashboard/quick-add';
import { RecipeSuggestionsCta } from '@/components/dashboard/recipe-suggestions-cta';
import { ShoppingListSummary } from '@/components/dashboard/shopping-list-summary';

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Welcome to Annapourna!</CardTitle>
          <CardDescription>
            Your smart kitchen assistant. Here&apos;s a quick overview of your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpiringSoon />
        </CardContent>
      </Card>
      
      <QuickAdd />

      <div className="grid gap-6 lg:col-span-3 md:grid-cols-2">
        <RecipeSuggestionsCta />
        <ShoppingListSummary />
      </div>
    </div>
  );
}
