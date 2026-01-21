'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

export function QuickAdd() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add</CardTitle>
        <CardDescription>
          Quickly add a new item to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input id="item-name" placeholder="e.g., Apples" />
          </div>
          <Button type="submit" className="w-full" variant="secondary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
