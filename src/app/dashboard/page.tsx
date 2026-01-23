import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Refrigerator, AlertTriangle, ShoppingBasket } from 'lucide-react';
import { ExpiringSoon } from '@/components/dashboard/expiring-soon';
import { ShoppingListSummary } from '@/components/dashboard/shopping-list-summary';
import { mockInventory, mockShoppingList } from '@/lib/data';
import { RecipeSuggestionsCta } from '@/components/dashboard/recipe-suggestions-cta';

export default function DashboardPage() {
  const inventoryCount = mockInventory.length;
  const expiringCount = mockInventory.filter(item => {
    if (!item.expiryDate) return false;
    const daysLeft = (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    return daysLeft <= 7;
  }).length;
  const shoppingListCount = mockShoppingList.filter(item => !item.checked).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Refrigerator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryCount} items</div>
            <p className="text-xs text-muted-foreground">in your kitchen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringCount} items</div>
            <p className="text-xs text-muted-foreground">within a week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shoppingListCount} items</div>
            <p className="text-xs text-muted-foreground">left to buy</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ExpiringSoon />
        </div>
        <div className="lg:col-span-1">
          <ShoppingListSummary />
        </div>
        <div className="lg:col-span-1">
          <RecipeSuggestionsCta />
        </div>
      </div>
    </div>
  );
}
