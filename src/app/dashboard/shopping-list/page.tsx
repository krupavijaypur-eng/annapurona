'use client';
import { useState, useEffect } from 'react';
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
import { mockShoppingList } from '@/lib/data';
import type { ShoppingListItem } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

export default function ShoppingListPage() {
  const [list, setList] = useState<ShoppingListItem[] | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);

  useEffect(() => {
    // Simulate fetching data to avoid hydration mismatch
    setList(mockShoppingList);
  }, []);

  const handleToggleItem = (id: string) => {
    if (!list) return;
    setList(
      list.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!list) return;
    if (newItemName.trim() && newItemQuantity > 0) {
      const newItem: ShoppingListItem = {
        id: new Date().toISOString(),
        name: newItemName.trim(),
        quantity: newItemQuantity,
        checked: false,
      };
      setList([...list, newItem]);
      setNewItemName('');
      setNewItemQuantity(1);
    }
  };

  const handleRemoveChecked = () => {
    if (!list) return;
    setList(list.filter(item => !item.checked));
  };
  
  if (list === null) {
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
                <div><Skeleton className="h-10 w-20" /></div>
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

  const checkedItems = list.filter(item => item.checked);
  const uncheckedItems = list.filter(item => !item.checked);

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
            <Button variant="outline" onClick={handleRemoveChecked} className="mt-4 sm:mt-0" disabled={checkedItems.length === 0}>
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
          <div>
            <Label htmlFor="itemQuantity" className="sr-only">Quantity</Label>
            <Input
                id="itemQuantity"
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={e => setNewItemQuantity(parseInt(e.target.value, 10) || 1)}
                className="w-20 text-center"
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
                    onCheckedChange={() => handleToggleItem(item.id)}
                />
                <label
                    htmlFor={item.id}
                    className="flex-1 text-sm font-medium"
                >
                    {item.name}
                </label>
                <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
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
                            onCheckedChange={() => handleToggleItem(item.id)}
                        />
                        <label
                            htmlFor={item.id}
                            className="flex-1 text-sm text-muted-foreground line-through"
                        >
                            {item.name}
                        </label>
                        <span className="text-sm text-muted-foreground line-through">Qty: {item.quantity}</span>
                        </li>
                    ))}
                    </ul>
                </div>
            )}

            {list.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Your shopping list is empty.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
