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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';

export default function ShoppingListPage() {
  const { shoppingList, addShoppingListItem, toggleShoppingListItem, clearCheckedShoppingListItems, isDataLoaded } = useAppContext();
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemUnit, setNewItemUnit] = useState('items');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() && newItemQuantity > 0 && newItemUnit.trim()) {
      addShoppingListItem({
        name: newItemName.trim(),
        quantity: newItemQuantity,
        unit: newItemUnit.trim(),
      });
      setNewItemName('');
      setNewItemQuantity(1);
      setNewItemUnit('items');
    }
  };
  
  if (!isDataLoaded) {
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
                <div className="flex-grow">
                    <Skeleton className="h-10" />
                </div>
                <div className="w-24">
                   <Skeleton className="h-10" />
                </div>
                <div className="w-28">
                   <Skeleton className="h-10" />
                </div>
                 <Skeleton className="h-10 w-10" />
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </div>
          </CardContent>
        </Card>
      )
  }

  const checkedItems = shoppingList.filter(item => item.checked);
  const uncheckedItems = shoppingList.filter(item => !item.checked);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
                <CardTitle>Shopping List</CardTitle>
                <CardDescription>
                Manage your grocery needs. Add new items or check off what you've bought.
                </CardDescription>
            </div>
            <Button variant="outline" onClick={clearCheckedShoppingListItems} className="mt-4 sm:mt-0" disabled={checkedItems.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Checked Items
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddItem} className="flex items-end gap-2 mb-6">
          <div className="flex-grow">
            <Label htmlFor="itemName" className="sr-only">Item Name</Label>
            <Input
                id="itemName"
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                placeholder="Add new item..."
            />
          </div>
          <div className="w-24">
            <Label htmlFor="itemQuantity" className="sr-only">Quantity</Label>
            <Input
                id="itemQuantity"
                type="number"
                min="0"
                step="0.1"
                value={newItemQuantity}
                onChange={e => setNewItemQuantity(parseFloat(e.target.value) || 0)}
                className="text-center"
            />
          </div>
          <div className="w-28">
             <Label htmlFor="itemUnit" className="sr-only">Unit</Label>
             <Input
                id="itemUnit"
                value={newItemUnit}
                onChange={e => setNewItemUnit(e.target.value)}
                placeholder="e.g. kg"
             />
          </div>
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-4">
            {uncheckedItems.length > 0 && <ul className="space-y-3">
            {uncheckedItems.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleShoppingListItem(item.id)}
                />
                <label
                    htmlFor={item.id}
                    className="flex-1 text-sm font-medium"
                >
                    {item.name}
                </label>
                <span className="text-sm text-muted-foreground">{`${item.quantity} ${item.unit}`}</span>
                </li>
            ))}
            </ul>}
            
            {checkedItems.length > 0 && uncheckedItems.length > 0 && <Separator />}

            {checkedItems.length > 0 && (
                <div>
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">Completed</h3>
                    <ul className="space-y-3">
                    {checkedItems.map(item => (
                        <li key={item.id} className="flex items-center gap-3">
                        <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => toggleShoppingListItem(item.id)}
                        />
                        <label
                            htmlFor={item.id}
                            className="flex-1 text-sm text-muted-foreground line-through"
                        >
                            {item.name}
                        </label>
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
