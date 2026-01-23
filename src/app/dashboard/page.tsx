'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Refrigerator, ShoppingBasket } from 'lucide-react';
import { ShoppingListSummary } from '@/components/dashboard/shopping-list-summary';
import { RecipeSuggestionsCta } from '@/components/dashboard/recipe-suggestions-cta';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { InventoryItem, ShoppingListItem } from '@/lib/types';

export default function DashboardPage() {
    const { firestore, user } = useFirebase();

    const inventoryQuery = useMemoFirebase(() => {
        if (!user) return null;
        return collection(firestore, `users/${user.uid}/inventoryItems`);
    }, [firestore, user]);

    const shoppingListQuery = useMemoFirebase(() => {
        if (!user) return null;
        // Assuming a single shopping list, we use a subcollection for items
        return collection(firestore, `users/${user.uid}/shoppingListItems`);
    }, [firestore, user]);

    const { data: inventory, isLoading: isInventoryLoading } = useCollection<InventoryItem>(inventoryQuery);
    const { data: shoppingList, isLoading: isShoppingListLoading } = useCollection<ShoppingListItem>(shoppingListQuery);
    
    const isDataLoaded = !isInventoryLoading && !isShoppingListLoading;

    const inventoryCount = inventory?.length ?? 0;
    const shoppingListCount = shoppingList?.filter(item => !item.isPurchased).length ?? 0;

  if (!isDataLoaded) {
      return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <Skeleton className="h-5 w-32" />
                           <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-8 w-20 mb-1" />
                           <Skeleton className="h-3 w-28" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Skeleton className="h-96 lg:col-span-1" />
                <Skeleton className="h-96 lg:col-span-1" />
            </div>
        </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
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
            <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{shoppingListCount} items</div>
              <p className="text-xs text-muted-foreground">left to buy</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
