'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { ShoppingListItem } from '@/lib/types';
import { addShoppingListItem, updateShoppingListItem, deleteShoppingListItem } from '@/firebase/firestore/actions';

export default function ShoppingListPage() {
  const { firestore, user } = useFirebase();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState('items');

  const shoppingListQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/shoppingListItems`);
  }, [firestore, user]);

  const { data: shoppingList, isLoading } = useCollection<ShoppingListItem>(shoppingListQuery);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() && newItemQuantity > 0 && newItemUnit.trim() && user) {
      addShoppingListItem(firestore, user.uid, {
        name: newItemName.trim(),
        quantity: newItemQuantity,
        unit: newItemUnit.trim(),
        isPurchased: false,
      });
      setNewItemName('');
      setNewItemQuantity(1);
      setNewItemUnit('items');
    }
  };

  const handleToggleItem = (item: ShoppingListItem) => {
    if (!user) return;
    updateShoppingListItem(firestore, user.uid, item.id, { isPurchased: !item.isPurchased });
  };

  const handleClearChecked = () => {
    if (!user || !shoppingList) return;
    const batch = writeBatch(firestore);
    shoppingList.forEach(item => {
      if (item.isPurchased) {
        const itemRef = doc(firestore, `users/${user.uid}/shoppingListItems`, item.id);
        batch.delete(itemRef);
      }
    });
    batch.commit().catch(console.error);
  };

  if (isLoading || !shoppingList) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-96 mt-2" />
            </div>
            <Skeleton className="h-10 w-44 mt-4 sm:mt-0" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-6">
            <div className="flex-grow"><Skeleton className="h-10" /></div>
            <div className="w-24"><Skeleton className="h-10" /></div>
            <div className="w-28"><Skeleton className="h-10" /></div>
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const purchasedItems = shoppingList.filter(item => item.isPurchased);
  const unpurchasedItems = shoppingList.filter(item => !item.isPurchased);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Shopping List</CardTitle>
            <CardDescription>
              Manage your grocery needs.
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleClearChecked} className="mt-4 sm:mt-0" disabled={purchasedItems.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Checked Items
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddItem} className="flex items-end gap-2 mb-6">
          <div className="flex-grow">
            <Label htmlFor="itemName" className="sr-only">Name</Label>
            <Input id="itemName" value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="Add new item..." />
          </div>
          <div className="w-24">
            <Label htmlFor="itemQuantity" className="sr-only">Quantity</Label>
            <Input id="itemQuantity" type="number" min="0" step="0.1" value={newItemQuantity} onChange={e => setNewItemQuantity(parseFloat(e.target.value) || 0)} className="text-center" />
          </div>
          <div className="w-28">
            <Label htmlFor="itemUnit" className="sr-only">Unit</Label>
            <Input id="itemUnit" value={newItemUnit} onChange={e => setNewItemUnit(e.target.value)} placeholder="e.g. kg" />
          </div>
          <Button type="submit" size="icon"><Plus className="h-4 w-4" /></Button>
        </form>

        <div className="space-y-4">
          {unpurchasedItems.length > 0 && (
            <ul className="space-y-3">
              {unpurchasedItems.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                  <Checkbox id={item.id} checked={item.isPurchased} onCheckedChange={() => handleToggleItem(item)} />
                  <label htmlFor={item.id} className="flex-1 text-sm font-medium">{item.name}</label>
                  <span className="text-sm text-muted-foreground">{`${item.quantity} ${item.unit}`}</span>
                </li>
              ))}
            </ul>
          )}

          {purchasedItems.length > 0 && unpurchasedItems.length > 0 && <Separator />}

          {purchasedItems.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Completed</h3>
              <ul className="space-y-3">
                {purchasedItems.map(item => (
                  <li key={item.id} className="flex items-center gap-3">
                    <Checkbox id={item.id} checked={item.isPurchased} onCheckedChange={() => handleToggleItem(item)} />
                    <label htmlFor={item.id} className="flex-1 text-sm text-muted-foreground line-through">{item.name}</label>
                    <span className="text-sm text-muted-foreground line-through">{`${item.quantity} ${item.unit}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {shoppingList.length === 0 && (
            <p className="text-center text-muted-foreground py-8">Your shopping list is empty.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
