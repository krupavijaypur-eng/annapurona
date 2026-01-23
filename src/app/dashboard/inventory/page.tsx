'use client';

import * as React from 'react';
import { InventoryItem, StorageLocation } from '@/lib/types';
import { getColumns } from './columns';
import { DataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addInventoryItem, deleteInventoryItem } from '@/firebase/firestore/actions';

export default function InventoryPage() {
  const { firestore, user } = useFirebase();

  const inventoryQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/inventoryItems`);
  }, [firestore, user]);

  const { data: inventory, isLoading } = useCollection<InventoryItem>(inventoryQuery);

  const handleDelete = React.useCallback((itemId: string) => {
      if (!user) return;
      deleteInventoryItem(firestore, user.uid, itemId);
  }, [firestore, user]);

  const columns = React.useMemo(() => getColumns(handleDelete), [handleDelete]);

  if (isLoading || !inventory) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-72 mt-2" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Manage your fridge, freezer, and pantry items.</CardDescription>
          </div>
          <AddItemSheet />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={inventory} />
      </CardContent>
    </Card>
  );
}

function AddItemSheet() {
  const { firestore, user } = useFirebase();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [unit, setUnit] = React.useState('items');
  const [storageLocation, setStorageLocation] = React.useState<StorageLocation | undefined>();

  const handleSubmit = () => {
    if (name && quantity > 0 && storageLocation && unit && user) {
      addInventoryItem(firestore, user.uid, { name, quantity, unit, storageLocation });
      setOpen(false);
      // Reset form
      setName('');
      setQuantity(1);
      setUnit('items');
      setStorageLocation(undefined);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Item</SheetTitle>
          <SheetDescription>
            Enter the details of your new grocery item.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Apples" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="quantity"
                type="number"
                min="0"
                step="0.1"
                value={quantity}
                onChange={e => setQuantity(parseFloat(e.target.value) || 0)}
                className="col-span-1"
              />
              <Input
                id="unit"
                value={unit}
                onChange={e => setUnit(e.target.value)}
                placeholder="e.g. kg, g, items"
                className="col-span-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storage" className="text-right">
              Location
            </Label>
            <Select onValueChange={(value: StorageLocation) => setStorageLocation(value)} value={storageLocation}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select storage location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fridge">Fridge</SelectItem>
                <SelectItem value="freezer">Freezer</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit} type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
