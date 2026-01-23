'use client';

import * as React from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const [isClient, setIsClient] = React.useState(false);
    const [inventoryCount, setInventoryCount] = React.useState(0);
    const [expiringCount, setExpiringCount] = React.useState(0);
    const [shoppingListCount, setShoppingListCount] = React.useState(0);

    React.useEffect(() => {
        const invCount = mockInventory.length;
        const expCount = mockInventory.filter(item => {
            if (!item.expiryDate) return false;
            const daysLeft = (new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
            return daysLeft <= 7;
        }).length;
        const shopCount = mockShoppingList.filter(item => !item.checked).length;

        setInventoryCount(invCount);
        setExpiringCount(expCount);
        setShoppingListCount(shopCount);
        setIsClient(true);
    }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Refrigerator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isClient ? (
                <>
                    <div className="text-2xl font-bold">{inventoryCount} items</div>
                    <p className="text-xs text-muted-foreground">in your kitchen</p>
                </>
            ) : (
                <>
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-3 w-28" />
                </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isClient ? (
                <>
                    <div className="text-2xl font-bold">{expiringCount} items</div>
                    <p className="text-xs text-muted-foreground">within a week</p>
                </>
            ) : (
                <>
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-3 w-24" />
                </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isClient ? (
                <>
                    <div className="text-2xl font-bold">{shoppingListCount} items</div>
                    <p className="text-xs text-muted-foreground">left to buy</p>
                </>
            ) : (
                <>
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-3 w-20" />
                </>
            )}
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
