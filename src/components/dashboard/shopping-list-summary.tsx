'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ShoppingBasket } from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { ShoppingListItem } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

export function ShoppingListSummary() {
  const { firestore, user } = useFirebase();

  const shoppingListQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/shoppingListItems`);
  }, [firestore, user]);

  const { data: shoppingList, isLoading } = useCollection<ShoppingListItem>(shoppingListQuery);
  const listToShow = shoppingList?.filter(item => !item.checked).slice(0, 5) ?? [];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingBasket className="text-primary" />
          <CardTitle>Shopping List</CardTitle>
        </div>
        <CardDescription>
          A quick look at what you need to buy.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-full">
          {isLoading ? (
            <div className="space-y-3 pr-4">
              {[...Array(3)].map((_, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm bg-muted animate-pulse" />
                    <div className="h-4 w-1/2 rounded-sm bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          ) : listToShow.length > 0 ? (
            <ul className="space-y-3 pr-4">
              {listToShow.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                  <Checkbox id={`summary-${item.id}`} checked={item.checked} disabled />
                  <label
                    htmlFor={`summary-${item.id}`}
                    className={`flex-1 text-sm ${item.checked ? 'text-muted-foreground line-through' : ''}`}
                  >
                    {item.name}
                  </label>
                  <span className="text-sm text-muted-foreground">{`${item.quantity} ${item.unit}`}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-muted-foreground">Your shopping list is empty.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href="/dashboard/shopping-list">
          <Button className="w-full" variant="outline">
            View Full List <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
