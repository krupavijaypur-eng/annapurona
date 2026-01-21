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

export default function ShoppingListPage() {
  const [list, setList] = useState<ShoppingListItem[]>([]);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    setList(mockShoppingList);
  }, []);

  const handleToggleItem = (id: string) => {
    setList(
      list.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      const newItem: ShoppingListItem = {
        id: new Date().toISOString(),
        name: newItemName.trim(),
        quantity: 1,
        checked: false,
      };
      setList([...list, newItem]);
      setNewItemName('');
    }
  };

  const handleRemoveChecked = () => {
    setList(list.filter(item => !item.checked));
  };
  
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
        <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
          <Input
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            placeholder="Add new item..."
          />
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
