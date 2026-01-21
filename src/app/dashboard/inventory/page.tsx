import { mockInventory } from '@/lib/data';
import { InventoryItem } from '@/lib/types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { AddItemSheet } from './add-item-sheet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

async function getInventory(): Promise<InventoryItem[]> {
  // In a real app, you'd fetch this from a database
  return mockInventory;
}

export default async function InventoryPage() {
  const data = await getInventory();

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
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
